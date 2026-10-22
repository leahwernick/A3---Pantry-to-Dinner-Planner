import React from 'react';
import { CheckCircle2, PlusCircle, AlertTriangle, Clock } from 'lucide-react';
import { MealPlan } from '../types';

interface MealCardProps {
  meal: MealPlan;
  index: number;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, index }) => {
  const isTight =
    meal.totalTime.toLowerCase().includes('tight') ||
    meal.flags.some((f) => f.toLowerCase().includes('tight on time'));

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col h-full">
      {/* Meal Header */}
      <div className="p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-start justify-between gap-3 bg-stone-50/40">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Meal Idea {index + 1}
          </span>
          <h3 className="text-xl font-bold text-stone-900 tracking-tight mt-0.5">
            {meal.name}
          </h3>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              isTight
                ? 'bg-amber-100 text-amber-900 border border-amber-300/70'
                : 'bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            <Clock className={`w-3.5 h-3.5 ${isTight ? 'text-amber-700' : 'text-stone-500'}`} />
            <span>{meal.totalTime}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Ingredients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* From your kitchen (Green Check) */}
            <div className="bg-emerald-50/40 rounded-xl p-4 border border-emerald-100">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>From your kitchen</span>
              </h4>
              <ul className="space-y-1.5 text-sm text-stone-700">
                {meal.fromYourKitchen.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-1 shrink-0" />
                    <span className="font-medium text-stone-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* You need (Orange Plus) */}
            <div className="bg-amber-50/40 rounded-xl p-4 border border-amber-100">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <PlusCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>You need</span>
              </h4>
              <ul className="space-y-1.5 text-sm text-stone-700">
                {meal.youNeed.length === 0 ||
                (meal.youNeed.length === 1 && meal.youNeed[0].toLowerCase().trim() === 'nothing') ? (
                  <li className="flex items-center gap-2 text-stone-500 italic text-sm">
                    <span>Nothing extra needed</span>
                  </li>
                ) : (
                  meal.youNeed.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <PlusCircle className="w-3.5 h-3.5 text-amber-600 mt-1 shrink-0" />
                      <span className="font-medium text-amber-950">{item}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          {/* Cooking Steps (4-6 short steps) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Instructions ({meal.steps.length} steps)
            </h4>
            <ol className="space-y-2.5 text-sm text-stone-700">
              {meal.steps.map((step, i) => {
                // Remove existing step prefixes if present (e.g. "1) " or "1. ")
                const cleanStep = step.replace(/^\d+[\)\.]\s*/, '');
                return (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-snug text-stone-800">{cleanStep}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Flags Section */}
        {meal.flags && meal.flags.length > 0 && (
          <div className="pt-4 border-t border-stone-100 space-y-2">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Notes & Flags</span>
            </h4>
            <div className="space-y-1.5">
              {meal.flags.map((flag, i) => {
                const isLabelCheck = flag.toLowerCase().includes('check the label');
                return (
                  <div
                    key={i}
                    className={`text-xs p-2.5 rounded-lg border leading-relaxed flex items-start gap-2 ${
                      isLabelCheck
                        ? 'bg-amber-50/80 border-amber-200 text-amber-950 font-medium'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    <span className="font-semibold text-amber-700 shrink-0">•</span>
                    <span>{flag}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
