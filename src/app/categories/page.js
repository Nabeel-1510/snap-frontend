"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Loader2, Package } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/api";

const ICON_COLORS = [
  "from-brand-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-pink-500 to-rose-500",
  "from-cyan-500 to-blue-500",
  "from-violet-500 to-indigo-500",
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-surface-900 flex items-center gap-3">
              <LayoutGrid size={28} className="text-brand-600" />
              Categories
            </h1>
            <p className="text-surface-700 mt-2">Browse products by category</p>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-24">
              <Loader2 size={40} className="text-brand-500 animate-spin" />
            </div>
          )}

          {!loading && categories.length === 0 && (
            <div className="text-center py-24">
              <Package size={48} className="text-surface-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-surface-900 mb-2">No categories yet</h3>
              <p className="text-surface-700">Categories will appear as products are analyzed.</p>
            </div>
          )}

          {!loading && categories.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={`/search?q=${encodeURIComponent(cat.name)}`}>
                    <div className="bg-white rounded-2xl border border-surface-200 p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${ICON_COLORS[i % ICON_COLORS.length]} flex items-center justify-center mb-4`}>
                        <span className="text-2xl">{cat.icon || "📦"}</span>
                      </div>
                      <h3 className="text-lg font-bold text-surface-900 mb-1">{cat.name}</h3>
                      <p className="text-sm text-surface-700">
                        {cat.product_count} {cat.product_count === 1 ? "product" : "products"}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
