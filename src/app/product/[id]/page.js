"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, CheckCircle2, XCircle, BookOpen, Loader2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScoreBreakdown from "@/components/ScoreBreakdown";
import PriceComparison from "@/components/PriceComparison";
import ChatWidget from "@/components/ChatWidget";
import { getProduct } from "@/lib/api";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    setLoading(true);
    getProduct(params.id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 size={40} className="text-brand-500 animate-spin" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold text-surface-900 mb-2">Product Not Found</h2>
          <Link href="/" className="text-brand-600 hover:underline">Back to Home</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-surface-700 hover:text-brand-600 mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-surface-200 overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-80 bg-surface-50 flex items-center justify-center p-8">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full max-h-72 object-contain rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-72 flex items-center justify-center text-surface-300">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1">
                    {product.brand && (
                      <p className="text-sm text-brand-600 font-semibold uppercase tracking-wide mb-1">
                        {product.brand}
                      </p>
                    )}
                    <h1 className="text-2xl font-bold text-surface-900 mb-3 leading-snug">
                      {product.title}
                    </h1>
                    {product.description && (
                      <p className="text-sm text-surface-700 leading-relaxed mb-4">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50">
                        <span className="text-2xl font-bold gradient-text">{product.ai_score}</span>
                        <span className="text-xs text-surface-700">AI Score</span>
                      </div>
                      <span className="text-sm text-surface-700">
                        Based on {product.review_count} reviews
                      </span>
                    </div>
                    {product.source_url && (
                      <a
                        href={product.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-4 text-sm text-brand-600 hover:underline"
                      >
                        View Original <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>

              {product.ai_summary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl border border-surface-200 p-6"
                >
                  <h3 className="text-lg font-bold text-surface-900 mb-3 flex items-center gap-2">
                    <BookOpen size={20} className="text-brand-600" />
                    AI Summary
                  </h3>
                  <p className="text-surface-700 leading-relaxed">{product.ai_summary}</p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {product.pros && product.pros.length > 0 && (
                  <div className="bg-white rounded-2xl border border-surface-200 p-6">
                    <h3 className="text-lg font-bold text-emerald-600 mb-4 flex items-center gap-2">
                      <CheckCircle2 size={20} />
                      Pros
                    </h3>
                    <ul className="space-y-3">
                      {product.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-surface-700">
                          <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.cons && product.cons.length > 0 && (
                  <div className="bg-white rounded-2xl border border-surface-200 p-6">
                    <h3 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">
                      <XCircle size={20} />
                      Cons
                    </h3>
                    <ul className="space-y-3">
                      {product.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-surface-700">
                          <XCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>

              <PriceComparison prices={product.prices} />

              {product.sources && product.sources.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl border border-surface-200 p-6"
                >
                  <h3 className="text-lg font-bold text-surface-900 mb-4">Review Sources</h3>
                  <div className="space-y-2">
                    {product.sources.map((source, i) => (
                      <a
                        key={i}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold uppercase px-2 py-1 rounded-lg bg-brand-100 text-brand-700">
                            {source.platform}
                          </span>
                          <span className="text-sm text-surface-700 line-clamp-1">
                            {source.title || source.url}
                          </span>
                        </div>
                        <ExternalLink size={14} className="text-surface-300" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <ScoreBreakdown
                effectiveness={product.effectiveness_score}
                value={product.value_score}
                longevity={product.longevity_score}
                overall={product.ai_score}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget productId={product.id} productTitle={product.title} />
    </>
  );
}
