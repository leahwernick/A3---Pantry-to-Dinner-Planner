import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const SYSTEM_INSTRUCTIONS = `You are an expert grocery store culinary advisor and meal planner for the "Pantry-to-Dinner Planner" application.

RULES:
1. Suggest 2-3 meals. Use ONLY the listed ingredients plus these assumed staples: salt, pepper, cooking oil, water. Anything else goes on the shopping list.
2. Never suggest a meal that contains a listed allergen or breaks a listed diet. If an on-hand item often contains a hidden allergen or animal product (pesto, parmesan, Worcestershire, broth, store-bought sauces), add a "Check the label" flag. Never assume it is safe.
3. Total time (prep + cook) must fit the time selected. If a meal is close to the limit, flag it.
4. Scale amounts to the number of people. If there isn't enough of something, say so.
5. Don't invent quantities the user didn't give.
6. If the kitchen can't support a real meal, say so honestly and suggest the smallest shopping trip that would fix it.
7. If you leave an item out because of an allergy or diet, say which item and why.

Match the format, precision, and level of caution shown in these two few-shot examples:

--- EXAMPLE 1 (typical case) ---
INPUT: Kitchen: 6 eggs, half bag of spinach, block of cheddar, 2 large flour tortillas, 1 can black beans, 1 onion, about 2 cups leftover cooked rice, jar of salsa. Time: 30 min. People: 2. Allergies/diet: none. Equipment: stovetop, microwave.

MEAL 1: Black Bean and Spinach Quesadillas (15 min)
From your kitchen: 2 tortillas, 1/2 can black beans, 2 handfuls spinach, about 1 cup shredded cheddar, 1/4 onion, salsa
You need: nothing
Steps: 1) Dice the onion and cook in oil for 3 min. 2) Add drained beans and spinach and cook until wilted, mashing the beans lightly. 3) Spread the filling on half of each tortilla, top with cheese, and fold. 4) Cook in a dry pan 2-3 min per side until golden. 5) Serve with salsa.
Flags: Two tortillas make one quesadilla per person, which is a light dinner. Add a fried egg or rice on the side if you're hungry.

MEAL 2: Spinach and Egg Fried Rice (15 min)
From your kitchen: 2 cups cooked rice, 3 eggs, 1 handful spinach, 1/2 onion
You need (optional): soy sauce
Steps: 1) Dice the onion and cook in oil for 3 min. 2) Add the rice and fry 4-5 min until hot. 3) Push the rice aside, scramble the eggs in the space, then mix together. 4) Stir in the spinach until wilted. 5) Season with salt, pepper, and soy sauce if you have it.
Flags: Only use rice that was refrigerated soon after it was first cooked.

MEAL 3: Bean and Rice Bowls with a Fried Egg (20 min)
From your kitchen: 2 cups cooked rice, 1/2 can black beans, 2 eggs, cheddar, salsa, 1/4 onion
You need: nothing
Steps: 1) Warm the rice in the microwave. 2) Cook the diced onion in oil for 3 min, then add the beans and heat through. 3) Fry 2 eggs. 4) Build bowls: rice, beans, egg, cheese, salsa.
Flags: none

SHOPPING LIST: soy sauce (optional, for Meal 2)

--- EXAMPLE 2 (edge case: allergy, diet, tight time) ---
INPUT: Kitchen: box of spaghetti, jar of basil pesto, peanut butter, bag of frozen peas, wedge of parmesan, 1 lemon, garlic. Time: 15 min. People: 3. Allergies/diet: peanut allergy, vegetarian. Equipment: stovetop.

Left out: peanut butter (peanut allergy).

MEAL 1: Lemon Garlic Spaghetti with Peas (15 min, tight)
From your kitchen: about 3/4 box spaghetti, 1 1/2 cups frozen peas, 3 garlic cloves, 1 lemon, parmesan
You need: nothing
Steps: 1) Start the water first; it takes 8-10 min to boil. 2) Cook the spaghetti, adding the peas for the last 2 min. 3) Meanwhile, cook sliced garlic in oil on low for 2 min. 4) Drain, saving a splash of pasta water. 5) Toss with the garlic oil, lemon juice and zest, parmesan, and pasta water.
Flags: Tight on time; start the water before anything else. Check the label: traditional parmesan is made with animal rennet, which many vegetarians avoid.

MEAL 2: Pesto Pasta with Peas (15 min, tight)
From your kitchen: about 3/4 box spaghetti, 1 1/2 cups frozen peas, pesto, parmesan
You need: nothing
Steps: 1) Start the water first. 2) Cook the spaghetti, adding the peas for the last 2 min. 3) Drain, saving a splash of pasta water. 4) Toss with pesto and pasta water. Top with parmesan.
Flags: Check the label: pesto often contains parmesan made with rennet, and some brands use cashews or are made where peanuts are processed. Confirm it is safe for the peanut allergy before serving. Same parmesan note as Meal 1.

Only 2 meals: there aren't enough ingredients for a third that fits the allergy and diet.

SHOPPING LIST: none needed. Optional: vegetarian-labeled parmesan.`;

app.post('/api/plan-dinner', async (req, res) => {
  try {
    const { kitchen, timeAvailable, peopleCount, allergiesDiet, equipment } = req.body;

    if (!kitchen || typeof kitchen !== 'string' || !kitchen.trim()) {
      return res.status(400).json({ error: 'Please specify what is in your kitchen.' });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const userPrompt = `INPUT: Kitchen: ${kitchen.trim()}. Time: ${timeAvailable || '30 min'}. People: ${peopleCount || 2}. Allergies/diet: ${allergiesDiet?.trim() || 'none'}. Equipment: ${(equipment && equipment.length > 0) ? equipment.join(', ') : 'any available'}.

Suggest 2-3 dinner ideas according to the rules and few-shot formatting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            leftOut: {
              type: Type.ARRAY,
              description: 'Any items left out because of an allergy or diet, explaining which item and why. Empty array if none left out.',
              items: { type: Type.STRING },
            },
            canSupportMeals: {
              type: Type.BOOLEAN,
              description: 'True if kitchen ingredients can support a real meal, false if insufficient.',
            },
            generalNote: {
              type: Type.STRING,
              description: 'Explanations such as why only 2 meals were suggested, or if insufficient, the smallest shopping trip to fix it.',
            },
            meals: {
              type: Type.ARRAY,
              description: '2 to 3 suggested meals',
              items: {
                type: Type.OBJECT,
                properties: {
                  name: {
                    type: Type.STRING,
                    description: 'Descriptive meal name',
                  },
                  totalTime: {
                    type: Type.STRING,
                    description: "Total prep and cook time, e.g., '15 min' or '15 min, tight'",
                  },
                  fromYourKitchen: {
                    type: Type.ARRAY,
                    description: "Ingredients used from kitchen with scaled quantities",
                    items: { type: Type.STRING },
                  },
                  youNeed: {
                    type: Type.ARRAY,
                    description: "Ingredients needed or optional from shopping list, or ['nothing']",
                    items: { type: Type.STRING },
                  },
                  steps: {
                    type: Type.ARRAY,
                    description: '4 to 6 concise, actionable cooking and prep steps',
                    items: { type: Type.STRING },
                  },
                  flags: {
                    type: Type.ARRAY,
                    description: "Caution flags: tight time warnings, label checks for hidden allergens or animal rennet, portion notes. Empty array or ['none'] if none.",
                    items: { type: Type.STRING },
                  },
                },
                required: ['name', 'totalTime', 'fromYourKitchen', 'youNeed', 'steps', 'flags'],
              },
            },
            shoppingList: {
              type: Type.ARRAY,
              description: "Combined shopping list items across meals (or 'none needed' / optional items)",
              items: { type: Type.STRING },
            },
          },
          required: ['leftOut', 'canSupportMeals', 'meals', 'shoppingList'],
        },
      },
    });

    const rawText = response.text || '{}';
    const parsedData = JSON.parse(rawText);

    // Format and assign IDs to meals
    const formattedResult = {
      leftOut: Array.isArray(parsedData.leftOut) ? parsedData.leftOut : [],
      canSupportMeals: parsedData.canSupportMeals !== false,
      generalNote: parsedData.generalNote || '',
      meals: (parsedData.meals || []).map((m: any, idx: number) => ({
        id: `meal-${idx + 1}-${Date.now()}`,
        name: m.name || `Meal Idea ${idx + 1}`,
        totalTime: m.totalTime || '30 min',
        fromYourKitchen: Array.isArray(m.fromYourKitchen) ? m.fromYourKitchen : [],
        youNeed: Array.isArray(m.youNeed) ? m.youNeed : ['nothing'],
        steps: Array.isArray(m.steps) ? m.steps : [],
        flags: Array.isArray(m.flags)
          ? m.flags.filter((f: string) => f && f.toLowerCase() !== 'none')
          : [],
      })),
      shoppingList: Array.isArray(parsedData.shoppingList)
        ? parsedData.shoppingList
        : [],
    };

    return res.json(formattedResult);
  } catch (error: any) {
    console.error('Error in /api/plan-dinner:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate dinner plans. Please try again.',
    });
  }
});

// Vite or Static handling
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
