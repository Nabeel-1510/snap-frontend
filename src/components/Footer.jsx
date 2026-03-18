import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">Snap Search</span>
            </div>
            <p className="text-sm leading-relaxed">
              AI-powered product research assistant. Get instant, data-driven insights from thousands of reviews.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/categories" className="hover:text-white transition-colors">Categories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">About</h4>
            <p className="text-sm leading-relaxed">
              We aggregate reviews from Reddit, YouTube, and expert blogs to give you unbiased product recommendations.
            </p>
          </div>
        </div>
        <div className="border-t border-surface-800 mt-8 pt-6 text-center text-xs text-surface-700">
          © 2026 Snap Search. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
