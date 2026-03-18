"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, SearchX } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import { searchProducts } from "@/lib/api";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "text";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }
    setLoading(true);
    searchProducts(query, type)
      .then((data) => {
        setResults(data.results || []);
        setTaskId(data.task_id || null);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [query, type]);

  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <SearchBar />
        </div>

        {query && (
          <p className="text-surface-700 mb-6">
            Showing results for <span className="font-semibold text-surface-900">"{query}"</span>
          </p>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 size={40} className="text-brand-500 animate-spin mb-4" />
            <p className="text-surface-700">Searching...</p>
          </div>
        )}

        {!loading && taskId && results.length === 0 && (
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
              Our AI is scraping reviews and generating insights. This may take a minute. Refresh to check progress.
            </p>
          </motion.div>
        )}

        {!loading && !taskId && results.length === 0 && query && (
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
