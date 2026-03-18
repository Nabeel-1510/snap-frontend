"use client";

import { motion } from "framer-motion";
import { ExternalLink, Store } from "lucide-react";

export default function PriceComparison({ prices }) {
  if (!prices || prices.length === 0) return null;

  const sorted = [...prices].sort((a, b) => a.price - b.price);
  const lowestPrice = sorted[0].price;

  return (
    <div className="bg-white rounded-2xl border border-surface-200 p-6">
      <h3 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
        <Store size={20} className="text-brand-600" />
        Price Comparison
      </h3>
      <div className="space-y-3">
        {sorted.map((price, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
              price.price === lowestPrice
                ? "border-emerald-200 bg-emerald-50"
                : "border-surface-100 bg-surface-50 hover:bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              {price.store_logo ? (
                <img
                  src={price.store_logo}
                  alt={price.store_name}
                  className="w-8 h-8 rounded-lg object-contain"
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-surface-200 flex items-center justify-center">
                  <Store size={16} className="text-surface-700" />
                </div>
              )}
              <div>
                <p className="font-medium text-surface-900 text-sm">{price.store_name}</p>
                {price.price === lowestPrice && (
                  <span className="text-xs text-emerald-600 font-semibold">Lowest Price</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-surface-900">
                {price.currency === "INR" ? "₹" : "$"}
                {price.price.toLocaleString()}
              </span>
              {price.affiliate_url && (
                <a
                  href={price.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
                >
                  Buy
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
