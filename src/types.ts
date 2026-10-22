export interface PlannerInput {
  kitchen: string;
  timeAvailable: string; // '15 min' | '30 min' | '45 min' | '1 hour+'
  peopleCount: number;
  allergiesDiet: string;
  equipment: string[]; // ['stovetop', 'oven', 'microwave', 'air fryer']
}

export interface MealPlan {
  id: string;
  name: string;
  totalTime: string;
  fromYourKitchen: string[];
  youNeed: string[];
  steps: string[];
  flags: string[];
}

export interface PlannerResult {
  leftOut: string[];
  canSupportMeals: boolean;
  generalNote?: string;
  meals: MealPlan[];
  shoppingList: string[];
}
