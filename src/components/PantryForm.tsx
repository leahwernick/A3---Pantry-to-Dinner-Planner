import React from 'react';
import { Sparkles, Clock, Users, ShieldAlert, Wrench, ArrowRight, Lightbulb } from 'lucide-react';
import { PlannerInput } from '../types';

interface PantryFormProps {
  formData: PlannerInput;
  onChange: (data: Partial<PlannerInput>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onLoadExample1: () => void;
  onLoadExample2: () => void;
  isLoading: boolean;
}

const EQUIPMENT_OPTIONS = [
  { id: 'stovetop', label: 'Stovetop' },
  { id: 'oven', label: 'Oven' },
  { id: 'microwave', label: 'Microwave' },
  { id: 'air fryer', label: 'Air Fryer' },
];

const TIME_OPTIONS = ['15 min', '30 min', '45 min', '1 hour+'];

export const PantryForm: React.FC<PantryFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onLoadExample1,
  onLoadExample2,
  isLoading,
}) => {
  const toggleEquipment = (id: string) => {
    const current = new Set(formData.equipment);
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    onChange({ equipment: Array.from(current) });
  };

  return (
    <form
      id="kitchen-form"
      onSubmit={onSubmit}
      className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Tell us what you have
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            We will turn your on-hand ingredients into safe, fast meals with accurate shopping lists.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onLoadExample1}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 text-emerald-700" />
            <span>Try an example</span>
          </button>
          <button
            type="button"
            onClick={onLoadExample2}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors cursor-pointer"
            title="Spaghetti, pesto, peanut allergy & 15 min edge case"
          >
            <span>Try Example 2 (Allergy & 15 min)</span>
          </button>
        </div>
      </div>

      {/* 1. What's in your kitchen */}
      <div className="space-y-2">
        <label
          htmlFor="kitchen-input"
          className="block text-sm font-semibold text-stone-900"
        >
          What's in your kitchen?{' '}
          <span className="text-stone-400 font-normal">(free-form list, amounts optional)</span>
        </label>
        <div className="relative">
          <textarea
            id="kitchen-input"
            rows={4}
            value={formData.kitchen}
            onChange={(e) => onChange({ kitchen: e.target.value })}
            placeholder="e.g., 6 eggs, half bag of spinach, block of cheddar, 2 large flour tortillas, 1 can black beans, 1 onion, leftover cooked rice, jar of salsa"
            required
            className="w-full px-4 py-3 text-stone-800 text-sm sm:text-base bg-stone-50/50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-colors placeholder:text-stone-400 resize-y min-h-[110px]"
          />
        </div>
        <p className="text-xs text-stone-500 leading-relaxed">
          <strong className="text-stone-700">Assumed staples:</strong> salt, pepper, cooking oil, and water are already assumed. Any other ingredient not listed here will be placed on your shopping list.
        </p>
      </div>

      {/* Grid: Time & People */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
        {/* Time Available Dropdown */}
        <div className="space-y-2">
          <label
            htmlFor="time-select"
            className="flex items-center gap-2 text-sm font-semibold text-stone-900"
          >
            <Clock className="w-4 h-4 text-stone-500" />
            <span>Time available</span>
          </label>
          <div className="relative">
            <select
              id="time-select"
              value={formData.timeAvailable}
              onChange={(e) => onChange({ timeAvailable: e.target.value })}
              className="w-full appearance-none px-4 py-2.5 text-sm sm:text-base font-medium text-stone-800 bg-stone-50/50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-colors cursor-pointer"
            >
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-stone-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Number of People */}
        <div className="space-y-2">
          <label
            htmlFor="people-input"
            className="flex items-center gap-2 text-sm font-semibold text-stone-900"
          >
            <Users className="w-4 h-4 text-stone-500" />
            <span>Number of people</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onChange({ peopleCount: Math.max(1, formData.peopleCount - 1) })}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900 text-lg font-bold transition-colors cursor-pointer"
              aria-label="Decrease people"
            >
              -
            </button>
            <input
              id="people-input"
              type="number"
              min={1}
              max={20}
              value={formData.peopleCount}
              onChange={(e) =>
                onChange({ peopleCount: Math.max(1, parseInt(e.target.value, 10) || 1) })
              }
              className="w-full text-center py-2 text-base font-semibold text-stone-800 bg-stone-50/50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 tabular-nums"
              required
            />
            <button
              type="button"
              onClick={() => onChange({ peopleCount: Math.min(20, formData.peopleCount + 1) })}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900 text-lg font-bold transition-colors cursor-pointer"
              aria-label="Increase people"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Allergies & Diet */}
      <div className="space-y-2">
        <label
          htmlFor="diet-input"
          className="flex items-center gap-2 text-sm font-semibold text-stone-900"
        >
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Allergies and diet</span>
          <span className="text-stone-400 font-normal text-xs">(optional)</span>
        </label>
        <input
          id="diet-input"
          type="text"
          value={formData.allergiesDiet}
          onChange={(e) => onChange({ allergiesDiet: e.target.value })}
          placeholder="e.g., peanut allergy, vegetarian, dairy-free, gluten-free"
          className="w-full px-4 py-2.5 text-stone-800 text-sm sm:text-base bg-stone-50/50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-colors placeholder:text-stone-400"
        />
        <p className="text-xs text-stone-500">
          We strictly exclude allergens and flag ingredients that frequently contain hidden animal products or allergen traces (e.g., parmesan rennet, pesto nuts).
        </p>
      </div>

      {/* Equipment checkboxes */}
      <div className="space-y-2.5 pt-1">
        <label className="flex items-center gap-2 text-sm font-semibold text-stone-900">
          <Wrench className="w-4 h-4 text-stone-500" />
          <span>Equipment available</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EQUIPMENT_OPTIONS.map((item) => {
            const isChecked = formData.equipment.includes(item.id);
            return (
              <label
                key={item.id}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer select-none ${
                  isChecked
                    ? 'bg-emerald-50/80 border-emerald-600 text-emerald-900 shadow-xs'
                    : 'bg-stone-50/50 border-stone-200 text-stone-700 hover:bg-stone-100/70'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleEquipment(item.id)}
                  className="rounded text-emerald-700 focus:ring-emerald-600 w-4 h-4 border-stone-300"
                />
                <span>{item.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-3">
        <button
          type="submit"
          disabled={isLoading || !formData.kitchen.trim()}
          className="w-full py-3.5 px-6 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2.5 text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Checking your kitchen & safety rules...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Find dinner ideas</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
