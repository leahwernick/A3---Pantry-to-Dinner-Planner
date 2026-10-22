import React, { useState } from 'react';
import { ShoppingCart, Check, Plus, Tag } from 'lucide-react';

interface ShoppingListSectionProps {
  items: string[];
}

export const ShoppingListSection: React.FC<ShoppingListSectionProps> = ({ items }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleItem = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const isNoneNeeded =
    items.length === 0 ||
    (items.length === 1 && items[0].toLowerCase().includes('none needed'));

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Consolidated Grocery Additions
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2 mt-0.5">
            <ShoppingCart className="w-5 h-5 text-emerald-800" />
            <span>Combined Shopping List</span>
          </h3>
          <p className="text-sm text-stone-500 mt-0.5">
            Everything you need beyond your kitchen staples (salt, pepper, cooking oil, water).
          </p>
        </div>

        <div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              isNoneNeeded
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            {isNoneNeeded ? '0 items required' : `${items.length} item${items.length === 1 ? '' : 's'}`}
          </span>
        </div>
      </div>

      {isNoneNeeded ? (
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5 text-center sm:text-left flex flex-col sm:flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-900">
              No grocery trip needed!
            </h4>
            <p className="text-xs sm:text-sm text-emerald-800 mt-0.5">
              Your kitchen has everything necessary for these meals (assuming basic oil, salt, pepper, and water).
              {items[0] && items[0].toLowerCase().includes('optional') && (
                <span className="block mt-1 font-medium text-emerald-950">
                  Note: {items[0]}
                </span>
              )}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, idx) => {
            const isChecked = !!checkedItems[idx];
            const isOptional = item.toLowerCase().includes('optional');

            return (
              <div
                key={idx}
                onClick={() => toggleItem(idx)}
                className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all cursor-pointer select-none ${
                  isChecked
                    ? 'bg-stone-50/70 border-stone-200 opacity-60'
                    : 'bg-stone-50/40 border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? 'bg-emerald-700 border-emerald-700 text-white'
                      : 'border-stone-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold text-stone-900 leading-snug ${
                      isChecked ? 'line-through text-stone-400' : ''
                    }`}
                  >
                    {item}
                  </p>
                  {isOptional && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-500 mt-0.5">
                      <Tag className="w-3 h-3" /> Optional enhancement
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
