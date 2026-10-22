import React, { useState } from 'react';
import { CheckSquare, Square, Copy, Check, Lock, AlertCircle, ShoppingBag } from 'lucide-react';
import { MealPlan } from '../types';

interface BeforeYouCookChecklistProps {
  shoppingList: string[];
  meals: MealPlan[];
}

export const BeforeYouCookChecklist: React.FC<BeforeYouCookChecklistProps> = ({
  shoppingList,
  meals,
}) => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [copied, setCopied] = useState(false);

  const allChecked = check1 && check2 && check3;

  const handleCopy = async () => {
    if (!allChecked) return;

    let text = `🛒 PANTRY-TO-DINNER SHOPPING LIST\n`;
    text += `===============================\n\n`;

    if (
      shoppingList.length === 0 ||
      (shoppingList.length === 1 &&
        shoppingList[0].toLowerCase().includes('none needed'))
    ) {
      text += `No extra ingredients needed! You have everything for your meals.\n\n`;
    } else {
      shoppingList.forEach((item) => {
        text += `• ${item}\n`;
      });
      text += `\n`;
    }

    text += `MEAL IDEAS INCLUDED:\n`;
    meals.forEach((m, idx) => {
      text += `${idx + 1}. ${m.name} (${m.totalTime})\n`;
      if (m.flags.length > 0) {
        text += `   Flags: ${m.flags.join(' | ')}\n`;
      }
    });

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md border border-stone-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Kitchen Safety & Readiness
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Before You Cook Checklist
          </h3>
          <p className="text-sm text-stone-400 mt-1">
            Complete these 3 safety and quantity checks to unlock your consolidated shopping list.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              allChecked
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                : 'bg-stone-800 text-stone-400 border border-stone-700'
            }`}
          >
            {allChecked ? 'Ready to cook & shop' : `${[check1, check2, check3].filter(Boolean).length}/3 completed`}
          </span>
        </div>
      </div>

      {/* The 3 Required Checkboxes */}
      <div className="space-y-3">
        {/* Checkbox 1 */}
        <label
          onClick={() => setCheck1(!check1)}
          className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer select-none ${
            check1
              ? 'bg-stone-800/90 border-emerald-500/80 text-white'
              : 'bg-stone-800/40 border-stone-700/80 text-stone-300 hover:bg-stone-800/70 hover:border-stone-600'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {check1 ? (
              <CheckSquare className="w-5 h-5 text-emerald-400" />
            ) : (
              <Square className="w-5 h-5 text-stone-500" />
            )}
          </div>
          <div className="space-y-0.5">
            <p className="text-sm sm:text-base font-semibold">
              Everything marked &ldquo;From your kitchen&rdquo; is actually here, in enough quantity
            </p>
            <p className="text-xs text-stone-400">
              Verify your fridge, pantry bins, and shelf quantities before starting heat.
            </p>
          </div>
        </label>

        {/* Checkbox 2 */}
        <label
          onClick={() => setCheck2(!check2)}
          className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer select-none ${
            check2
              ? 'bg-stone-800/90 border-emerald-500/80 text-white'
              : 'bg-stone-800/40 border-stone-700/80 text-stone-300 hover:bg-stone-800/70 hover:border-stone-600'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {check2 ? (
              <CheckSquare className="w-5 h-5 text-emerald-400" />
            ) : (
              <Square className="w-5 h-5 text-stone-500" />
            )}
          </div>
          <div className="space-y-0.5">
            <p className="text-sm sm:text-base font-semibold">
              I reviewed every flag and checked labels on packaged items
            </p>
            <p className="text-xs text-stone-400">
              Double-check pesto, parmesan (rennet), broths, and packaged sauces for hidden allergens or dietary restrictions.
            </p>
          </div>
        </label>

        {/* Checkbox 3 */}
        <label
          onClick={() => setCheck3(!check3)}
          className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer select-none ${
            check3
              ? 'bg-stone-800/90 border-emerald-500/80 text-white'
              : 'bg-stone-800/40 border-stone-700/80 text-stone-300 hover:bg-stone-800/70 hover:border-stone-600'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {check3 ? (
              <CheckSquare className="w-5 h-5 text-emerald-400" />
            ) : (
              <Square className="w-5 h-5 text-stone-500" />
            )}
          </div>
          <div className="space-y-0.5">
            <p className="text-sm sm:text-base font-semibold">
              The cook time works for me
            </p>
            <p className="text-xs text-stone-400">
              Ensure you have sufficient prep and cleanup buffer, especially for meals marked tight on time.
            </p>
          </div>
        </label>
      </div>

      {/* Copy Shopping List Button & Status */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-800">
        <div className="flex items-center gap-2 text-xs text-stone-400">
          {!allChecked ? (
            <div className="flex items-center gap-1.5 text-amber-400">
              <Lock className="w-4 h-4 shrink-0" />
              <span>Button unlocks when all 3 checklist items are confirmed</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Check className="w-4 h-4 shrink-0" />
              <span>All 3 conditions confirmed. Ready to copy shopping list!</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!allChecked}
          className={`px-5 py-3 rounded-xl font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
            allChecked
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg active:scale-95'
              : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700/50'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Copied shopping list!</span>
            </>
          ) : (
            <>
              {allChecked ? (
                <Copy className="w-4 h-4 text-emerald-100" />
              ) : (
                <Lock className="w-4 h-4 text-stone-500" />
              )}
              <span>Copy shopping list</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
