import React from 'react';
import { ShieldAlert, Info, AlertOctagon } from 'lucide-react';

interface LeftOutBannerProps {
  leftOut: string[];
  generalNote?: string;
  canSupportMeals: boolean;
}

export const LeftOutBanner: React.FC<LeftOutBannerProps> = ({
  leftOut,
  generalNote,
  canSupportMeals,
}) => {
  const hasLeftOut = leftOut && leftOut.length > 0;
  const hasNote = Boolean(generalNote && generalNote.trim());

  if (!hasLeftOut && !hasNote && canSupportMeals) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Insufficient kitchen warning */}
      {!canSupportMeals && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-rose-950">
              Kitchen ingredients insufficient for a complete dinner
            </h4>
            <p className="text-sm text-rose-900 leading-relaxed">
              {generalNote ||
                'Your current items cannot form a balanced meal. Check our suggested smallest shopping trip below.'}
            </p>
          </div>
        </div>
      )}

      {/* Excluded items due to allergy or diet */}
      {hasLeftOut && (
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-amber-950">
              Excluded from recipes (Allergy &amp; Diet Safety)
            </h4>
            <div className="text-sm text-amber-900 space-y-1">
              {leftOut.map((item, idx) => (
                <p key={idx} className="font-medium">
                  • Left out: <span className="font-semibold text-amber-950">{item}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Meal count or edge-case explanation note */}
      {hasNote && canSupportMeals && (
        <div className="bg-stone-100/80 border border-stone-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-stone-700">
          <Info className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider">
              Planner Note
            </h4>
            <p className="text-sm font-medium text-stone-900 leading-relaxed">
              {generalNote}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
