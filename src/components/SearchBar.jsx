"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Link2, ArrowRight } from "lucide-react";

export default function SearchBar() {
  const [mode, setMode] = useState("text");
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const type = mode === "url" ? "url" : "text";
    router.push(`/search?q=${encodeURIComponent(query)}&type=${type}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="flex gap-2 mb-4 justify-center">
        <button
          onClick={() => setMode("text")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            mode === "text"
              ? "bg-brand-600 text-white shadow-glow"
              : "bg-white text-surface-700 hover:bg-surface-100 border border-surface-200"
          }`}
        >
          <Search size={16} />
          Search
        </button>
        <button
          onClick={() => setMode("url")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            mode === "url"
              ? "bg-brand-600 text-white shadow-glow"
              : "bg-white text-surface-700 hover:bg-surface-100 border border-surface-200"
          }`}
        >
          <Link2 size={16} />
          Paste URL
        </button>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type={mode === "url" ? "url" : "text"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            mode === "url"
              ? "Paste a product URL (Amazon, Nykaa, etc.)"
              : "What product are you looking for?"
          }
          className="w-full px-6 py-4 pr-14 rounded-2xl bg-white border border-surface-200 text-lg shadow-card focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all duration-300 placeholder:text-surface-300"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition-colors duration-200"
        >
          <ArrowRight size={18} />
        </button>
      </form>
    </motion.div>
  );
}
