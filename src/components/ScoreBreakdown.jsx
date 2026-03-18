"use client";

import { motion } from "framer-motion";

function ScoreCircle({ label, score, color }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#e9ecef"
            strokeWidth="6"
            fill="none"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeDasharray={circumference}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-surface-900">{score}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-surface-700">{label}</span>
    </div>
  );
}

export default function ScoreBreakdown({ effectiveness, value, longevity, overall }) {
  return (
    <div className="bg-white rounded-2xl border border-surface-200 p-6">
      <h3 className="text-lg font-bold text-surface-900 mb-6">Score Breakdown</h3>
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" stroke="#e9ecef" strokeWidth="8" fill="none" />
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 36 - (overall / 100) * 2 * Math.PI * 36 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeDasharray={2 * Math.PI * 36}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4c6ef5" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold gradient-text">{overall}</span>
            <span className="text-xs text-surface-700">AI Score</span>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <ScoreCircle label="Effectiveness" score={effectiveness} color="#10b981" />
        <ScoreCircle label="Value" score={value} color="#f59e0b" />
        <ScoreCircle label="Longevity" score={longevity} color="#6366f1" />
      </div>
    </div>
  );
}
