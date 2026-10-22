import React from 'react';
import { X, ShieldCheck, CheckCircle2, Clock, Scale, AlertTriangle, BookOpen } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-xl border border-stone-200">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-emerald-800" />
            <h3 className="text-xl font-bold text-stone-900">How the Planner Works</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm text-stone-700">
          <p className="leading-relaxed">
            Designed for grocery store shoppers, the Pantry-to-Dinner Planner takes the uncertainty out of cooking with what you already have at home:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> 1. Exact Kitchen Scope
              </span>
              <p className="text-xs text-stone-600">
                We only use what you listed, plus 4 assumed basics: salt, pepper, cooking oil, and water.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" /> 2. Uncompromising Safety
              </span>
              <p className="text-xs text-stone-600">
                Never breaks a diet or allergen rule. If an item could hide allergens, we flag it immediately.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-stone-700" /> 3. Real Time Guarantees
              </span>
              <p className="text-xs text-stone-600">
                Prep and cook times strictly fit your selected limit, flagging recipes that cut it close.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-stone-700" /> 4. Honest Portion Scaling
              </span>
              <p className="text-xs text-stone-600">
                Quantities scale to your group size. We warn you if quantities make a light portion.
              </p>
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-emerald-950 text-xs sm:text-sm">
            <strong>Before you cook:</strong> Verify all 3 safety checks at the bottom to unlock your clean, copyable shopping list!
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Got it, take me back
          </button>
        </div>
      </div>
    </div>
  );
};

export const SafetyGuideModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-xl border border-stone-200">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
            <h3 className="text-xl font-bold text-stone-900">Food Safety &amp; Label Caution Guide</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm text-stone-700">
          <p className="leading-relaxed">
            Our planner actively inspects on-hand packaged items for common culinary pitfalls. Here is why we flag them:
          </p>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
              <h4 className="font-bold text-amber-950 text-xs sm:text-sm">
                🧀 Parmesan &amp; Hard Italian Cheeses (Vegetarian Caution)
              </h4>
              <p className="text-xs text-amber-900 mt-1">
                Authentic Parmigiano-Reggiano and traditional parmesan cheeses require animal rennet. Look for &ldquo;Vegetarian-friendly&rdquo; cheeses made with microbial rennet.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
              <h4 className="font-bold text-amber-950 text-xs sm:text-sm">
                🌿 Pesto &amp; Jarred Sauces (Nut &amp; Dairy Allergens)
              </h4>
              <p className="text-xs text-amber-900 mt-1">
                Store-bought basil pesto often substitutes cheaper cashews or walnuts for pine nuts, is produced in shared tree-nut/peanut facilities, and typically includes animal-rennet cheese.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
              <h4 className="font-bold text-amber-950 text-xs sm:text-sm">
                🍚 Cooked Leftover Rice (Bacillus Cereus Precaution)
              </h4>
              <p className="text-xs text-amber-900 mt-1">
                Leftover cooked rice must be cooled and refrigerated promptly within an hour of cooking to prevent spore germination. Do not use cooked rice kept at room temperature.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
              <h4 className="font-bold text-amber-950 text-xs sm:text-sm">
                🥣 Worcestershire, Asian Sauces &amp; Broths
              </h4>
              <p className="text-xs text-amber-900 mt-1">
                Worcestershire contains anchovies (fish allergen). Broths frequently contain chicken or beef extracts, while packaged marinades may have hidden gluten or soy.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
          >
            I understand
          </button>
        </div>
      </div>
    </div>
  );
};
