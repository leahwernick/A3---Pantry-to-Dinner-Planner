/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { PantryForm } from './components/PantryForm';
import { MealCard } from './components/MealCard';
import { ShoppingListSection } from './components/ShoppingListSection';
import { BeforeYouCookChecklist } from './components/BeforeYouCookChecklist';
import { LeftOutBanner } from './components/LeftOutBanner';
import { HowItWorksModal, SafetyGuideModal } from './components/InfoModals';
import { PlannerInput, PlannerResult } from './types';
import { ChefHat, Check, AlertCircle, Sparkles, UtensilsCrossed } from 'lucide-react';

const INITIAL_FORM_STATE: PlannerInput = {
  kitchen: '',
  timeAvailable: '30 min',
  peopleCount: 2,
  allergiesDiet: '',
  equipment: ['stovetop', 'microwave'],
};

// Example 1 from prompt
const EXAMPLE_1_DATA: PlannerInput = {
  kitchen:
    '6 eggs, half bag of spinach, block of cheddar, 2 large flour tortillas, 1 can black beans, 1 onion, about 2 cups leftover cooked rice, jar of salsa',
  timeAvailable: '30 min',
  peopleCount: 2,
  allergiesDiet: 'none',
  equipment: ['stovetop', 'microwave'],
};

// Example 2 from prompt (edge case)
const EXAMPLE_2_DATA: PlannerInput = {
  kitchen:
    'box of spaghetti, jar of basil pesto, peanut butter, bag of frozen peas, wedge of parmesan, 1 lemon, garlic',
  timeAvailable: '15 min',
  peopleCount: 3,
  allergiesDiet: 'peanut allergy, vegetarian',
  equipment: ['stovetop'],
};

export default function App() {
  const [formData, setFormData] = useState<PlannerInput>(INITIAL_FORM_STATE);
  const [result, setResult] = useState<PlannerResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isSafetyGuideOpen, setIsSafetyGuideOpen] = useState(false);

  const handleFormChange = (updates: Partial<PlannerInput>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setResult(null);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadExample1 = () => {
    setFormData(EXAMPLE_1_DATA);
    setErrorMessage(null);
  };

  const handleLoadExample2 = () => {
    setFormData(EXAMPLE_2_DATA);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kitchen.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/plan-dinner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Server responded with status ${response.status}`
        );
      }

      const data: PlannerResult = await response.json();
      setResult(data);

      // Smooth scroll down to results
      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Error submitting planner form:', err);
      setErrorMessage(
        err.message || 'Unable to connect to the dinner planner. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
      {/* Top Bar Navigation */}
      <Header
        onReset={handleReset}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenSafetyGuide={() => setIsSafetyGuideOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white shadow-lg border border-stone-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[280px]">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-4 z-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 bg-stone-800/80 px-3 py-1 rounded-full w-fit border border-amber-300/20">
                <ChefHat className="w-3.5 h-3.5" />
                <span>Grocery Store Customer Companion</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
                Turn your kitchen into tonight&apos;s dinner.
              </h1>
              <p className="text-stone-300 text-sm sm:text-base max-w-xl leading-relaxed">
                List whatever ingredients you have on hand. We suggest 2–3 complete dinner ideas using only your ingredients and standard staples, with uncompromising allergen vigilance.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-stone-400">
                <span>✓ 4 Assumed staples only</span>
                <span aria-hidden="true">·</span>
                <span>✓ Strict allergen &amp; diet checks</span>
                <span aria-hidden="true">·</span>
                <span>✓ Zero invented quantities</span>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative min-h-[200px] lg:min-h-full">
              <img
                src="/src/assets/images/pantry_fresh_ingredients_1792681722155.jpg"
                alt="Fresh pantry ingredients arranged on a rustic kitchen prep table"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-stone-900 lg:via-transparent lg:to-transparent" />
            </div>
          </div>
        </div>

        {/* Assumed Staples Info Bar */}
        <div
          id="staples"
          className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-stone-600 shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
              4
            </div>
            <div>
              <span className="font-bold text-stone-900">Standard Assumed Staples:</span>{' '}
              <span className="text-stone-700 font-medium">Salt, black pepper, cooking oil, and tap water.</span>
            </div>
          </div>
          <div className="text-stone-500 text-xs sm:text-right">
            Every other required ingredient goes directly onto your grocery shopping list.
          </div>
        </div>

        {/* Input Form */}
        <PantryForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onLoadExample1={handleLoadExample1}
          onLoadExample2={handleLoadExample2}
          isLoading={isLoading}
        />

        {/* Error Notification */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-red-900">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-sm">Planner Notice</h4>
              <p className="text-sm">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Loading Spinner Skeleton */}
        {isLoading && (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-800/20 border-t-emerald-800 animate-spin mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-stone-900">
                Evaluating your pantry ingredients...
              </h3>
              <p className="text-sm text-stone-500 max-w-md mx-auto">
                Auditing diet requirements, allergen risks, portion adequacy, and prep times.
              </p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && !isLoading && (
          <div id="results-section" className="space-y-8 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  Generated Recipes
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2 mt-0.5">
                  <UtensilsCrossed className="w-6 h-6 text-emerald-800" />
                  <span>Suggested Dinner Ideas</span>
                </h2>
              </div>
              <div className="text-xs text-stone-500">
                Showing {result.meals.length} curated meal idea{result.meals.length === 1 ? '' : 's'}
              </div>
            </div>

            {/* Left Out Banner & General Notes */}
            <LeftOutBanner
              leftOut={result.leftOut}
              generalNote={result.generalNote}
              canSupportMeals={result.canSupportMeals}
            />

            {/* Meal Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {result.meals.map((meal, idx) => (
                <MealCard key={meal.id || idx} meal={meal} index={idx} />
              ))}
            </div>

            {/* Combined Shopping List */}
            <ShoppingListSection items={result.shoppingList} />

            {/* Before You Cook Checklist (Required checkboxes before Copy) */}
            <BeforeYouCookChecklist
              shoppingList={result.shoppingList}
              meals={result.meals}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-stone-200 bg-white py-8 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="font-semibold text-stone-700">
            Pantry-to-Dinner Planner · Grocery Customer Companion
          </p>
          <p>
            Always verify manufacturer allergen labels on pre-packaged ingredients before serving.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
      <SafetyGuideModal
        isOpen={isSafetyGuideOpen}
        onClose={() => setIsSafetyGuideOpen(false)}
      />
    </div>
  );
}
