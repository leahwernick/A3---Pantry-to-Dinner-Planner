import React from 'react';
import { ChefHat, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onOpenHowItWorks: () => void;
  onOpenSafetyGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onOpenHowItWorks,
  onOpenSafetyGuide,
}) => {
  return (
    <header className="border-b border-stone-200 bg-white/95 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onReset();
          }}
          className="flex items-center gap-2.5 text-stone-900 font-bold tracking-tight text-lg sm:text-xl whitespace-nowrap shrink-0 hover:text-emerald-800 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
            <ChefHat className="w-5 h-5" />
          </div>
          <span>Pantry-to-Dinner Planner</span>
        </a>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <a
            href="#kitchen-form"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Recipe Planner
          </a>
          <button
            type="button"
            onClick={onOpenHowItWorks}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={onOpenSafetyGuide}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Label & Safety Rules
          </button>
          <a
            href="#staples"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Assumed Staples
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Start over with a fresh form"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Plan</span>
          </button>
        </div>
      </div>
    </header>
  );
};
