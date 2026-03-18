"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, SearchX, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import { searchProducts, checkSearchStatus, getProduct } from "@/lib/api";

const POLL_TIMEOUT_MS = 3 * 60 * 1000; // 3 minutes

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "text";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskId, setTaskId] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const pollStartRef = useRef(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setTaskId(null);
    setError(null);
    setProcessing(false);
    setResults([]);

    searchProducts(query, type)
      .then((data) => {
        const items = data.results || [];
        setResults(items);
        if (data.task_id) {
          setTaskId(data.task_id);
          pollStartRef.current = Date.now();
          setLoading(false);
          setProcessing(true);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.detail ||
          err?.message ||
          "Could not reach the server. Please try again.";
        setError(msg);
        setResults([]);
        setLoading(false);
      });
  }, [query, type]);

  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(() => {
      // Timeout guard
      if (Date.now() - pollStartRef.current > POLL_TIMEOUT_MS) {
        clearInterval(interval);
        setTaskId(null);
        setProcessing(false);
        setError("Analysis timed out. The product may still be processing — please try searching again in a few minutes.");
        return;
      }

      checkSearchStatus(taskId)
        .then((data) => {
          if (data.status === "completed" && data.result?.product_id) {
            clearInterval(interval);
            getProduct(data.result.product_id)
              .then((prod) => {
                setResults([prod]);
                setTaskId(null);
                setProcessing(false);
              })
              .catch(() => {
                setTaskId(null);
                setProcessing(false);
                setError("Product was analysed but could not be loaded. Please try again.");
              });
          } else if (data.status === "failed") {
            clearInterval(interval);
            setTaskId(null);
            setProcessing(false);
            setError("Analysis failed. Please check the URL and try again.");
          }
        })
        .catch(() => {
          clearInterval(interval);
          setTaskId(null);
          setProcessing(false);
          setError("Lost connection while waiting for results. Please try again.");
        });
    }, 3000);

    return () => clearInterval(interval);
  }, [taskId]);

  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <SearchBar />
        </div>

        {query && !loading && (
          <p className="text-surface-700 mb-6">
            Showing results for{" "}
            <span className="font-semibold text-surface-900">"{query}"</span>
          </p>
        )}

        {/* Initial loading spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 size={40} className="text-brand-500 animate-spin mb-4" />
            <p className="text-surface-700">Searching...</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={28} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-surface-900 mb-2">Something went wrong</h3>
            <p className="text-surface-700 max-w-md mx-auto">{error}</p>
          </motion.div>
        )}

        {/* Background processing state */}
        {!loading && processing && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
              <Loader2 size={28} className="text-brand-600 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-surface-900 mb-2">Analyzing Product</h3>
            <p className="text-surface-700 max-w-md mx-auto">
              Our AI is scraping reviews and generating insights. This usually takes 1–2 minutes…
            </p>
          </motion.div>
        )}

        {/* No results */}
        {!loading && !processing && !error && results.length === 0 && query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <SearchX size={48} className="text-surface-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-surface-900 mb-2">No results found</h3>
            <p className="text-surface-700">Try a different search term or paste a product URL.</p>
          </motion.div>
        )}

        {/* Results grid */}
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center py-24">
            <Loader2 size={40} className="text-brand-500 animate-spin" />
          </div>
        }
      >
        <SearchContent />
      </Suspense>
      <Footer />
    </>
  );
}
