"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";

export default function ProductCard({ product, index = 0 }) {
  const scoreColor =
    product.ai_score >= 80
      ? "text-emerald-500"
      : product.ai_score >= 60
      ? "text-amber-500"
      : "text-red-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link href={`/product/${product.id}`}>
        <div className="group bg-white rounded-2xl border border-surface-200 overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="relative aspect-square bg-surface-50 overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-surface-300">
                <TrendingUp size={48} />
              </div>
            )}
            <div className="absolute top-3 right-3 glass rounded-xl px-3 py-1.5 flex items-center gap-1.5">
              <Star size={14} className={scoreColor} fill="currentColor" />
              <span className={`font-bold text-sm ${scoreColor}`}>
                {product.ai_score}
              </span>
            </div>
          </div>

          <div className="p-4">
            <p className="text-xs text-brand-600 font-semibold uppercase tracking-wide mb-1">
              {product.brand || "Brand"}
            </p>
            <h3 className="font-semibold text-surface-900 line-clamp-2 mb-2 leading-snug">
              {product.title}
            </h3>

            {product.pros && product.pros.length > 0 && (
              <ul className="space-y-1 mb-3">
                {product.pros.slice(0, 2).map((pro, i) => (
                  <li
                    key={i}
                    className="text-xs text-surface-700 flex items-start gap-1.5"
                  >
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span className="line-clamp-1">{pro}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-surface-100">
              {product.lowest_price ? (
                <span className="font-bold text-surface-900">
                  ₹{product.lowest_price.toLocaleString()}
                </span>
              ) : (
                <span className="text-sm text-surface-300">Price N/A</span>
              )}
              {product.store_count > 0 && (
                <span className="text-xs text-surface-700 bg-surface-50 px-2 py-1 rounded-lg">
                  {product.store_count} stores
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
