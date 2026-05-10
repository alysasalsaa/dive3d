'use client';
import React from 'react';

export default function DashboardSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <div className={`flex flex-col h-screen ${isDark ? 'bg-[#00040a]' : 'bg-sky-50'}`}>
      {/* Header Skeleton */}
      <header className="px-6 py-5 grid grid-cols-3 items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-700/20 animate-pulse" />
          <div className="space-y-2">
            <div className="w-24 h-4 bg-gray-700/20 animate-pulse rounded" />
            <div className="w-16 h-3 bg-gray-700/20 animate-pulse rounded" />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-64 h-10 bg-gray-700/20 animate-pulse rounded-full" />
        </div>
        <div className="flex justify-end gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-700/20 animate-pulse" />
          <div className="w-10 h-10 rounded-full bg-gray-700/20 animate-pulse" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Skeleton */}
        <aside className={`w-60 border-r p-4 space-y-4 ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-gray-200 bg-white'}`}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full h-12 bg-gray-700/10 animate-pulse rounded-xl" />
          ))}
          <div className="mt-auto pt-4 border-t border-white/5">
            <div className="w-full h-12 bg-gray-700/10 animate-pulse rounded-xl" />
          </div>
        </aside>

        {/* Content Skeleton */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="w-full h-32 bg-gray-700/10 animate-pulse rounded-2xl" />
          <div className="grid grid-cols-3 gap-6">
            <div className="h-48 bg-gray-700/10 animate-pulse rounded-2xl" />
            <div className="h-48 bg-gray-700/10 animate-pulse rounded-2xl" />
            <div className="h-48 bg-gray-700/10 animate-pulse rounded-2xl" />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="h-64 bg-gray-700/10 animate-pulse rounded-2xl" />
            <div className="h-64 bg-gray-700/10 animate-pulse rounded-2xl" />
            <div className="h-64 bg-gray-700/10 animate-pulse rounded-2xl" />
          </div>
        </main>
      </div>
    </div>
  );
}
