import { getNutrition } from "./nutritionService.js";
import { nutritionDB } from "./nutritionFallback.js";

export async function calculateMacros(ingredients) {

  let total = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };

  for (let ing of ingredients) {

    const key = ing.toLowerCase();

    // 1. intenta USDA
    let data = await getNutrition(key);

    // 2. fallback SI USDA falla o da 0
    if (!data || data.calories === 0) {
      data = nutritionDB[key] || null;
    }

    if (!data) continue;

    total.calories += data.calories;
    total.protein += data.protein;
    total.carbs += data.carbs;
    total.fat += data.fat;
  }

  return total;
}