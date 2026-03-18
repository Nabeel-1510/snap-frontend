"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    desc: "We analyze thousands of reviews from Reddit, YouTube, and expert blogs.",
    color: "from-brand-500 to-purple-500",
  },
  {
    icon: Shield,
    title: "Unbiased Scoring",
    desc: "Our AI score is based on real user sentiment, not sponsored rankings.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: TrendingUp,
    title: "Price Tracking",
    desc: "Compare prices across multiple stores and find the best deals.",
    color: "from-amber-500 to-orange-500",
  },
];

export default function HomePage() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getProducts({ sort: "ai_score", page_size: 8 })
      .then((data) => setTrending(data.products || []))
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden py-24 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-purple-50" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-6">
                <Zap size={14} />
                AI-Powered Product Research
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                Find the <span className="gradient-text">best products</span>
                <br />in seconds, not hours
              </h1>
              <p className="text-lg text-surface-700 max-w-xl mx-auto mb-10 leading-relaxed">
                Get instant AI-synthesized insights from thousands of real user reviews
                across Reddit, YouTube, and expert blogs.
              </p>
            </motion.div>

            <SearchBar />
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-white rounded-2xl border border-surface-200 p-6 shadow-card hover:shadow-elevated transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-surface-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-surface-700 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {trending.length > 0 && (
          <section className="py-20 px-4 bg-surface-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-surface-900 mb-2">Trending Products</h2>
              <p className="text-surface-700 mb-8">Top-rated products analyzed by our AI</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {trending.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
