import { getRandomMeal } from "../services/mealService.js";
import { calculateMacros } from "../services/nutritionCalculator.js";

const mealContainer = document.getElementById("mealContainer");

export async function loadMeal() {

  mealContainer.innerHTML = "<p>Loading meal...</p>";

  const meal = await getRandomMeal();

  if (!meal) {
    mealContainer.innerHTML = "<p>Error loading meal</p>";
    return;
  }

  // ingredientes reales de TheMealDB
  const ingredients = [];

  for (let i = 1; i <= 10; i++) {
    const ing = meal[`strIngredient${i}`];
    if (ing) ingredients.push(ing.toLowerCase());
  }

  const macros = await calculateMacros(ingredients);

  renderMeal(meal, macros);
}

function renderMeal(meal, macros) {

  mealContainer.innerHTML = `
    <div class="meal-card">

      <!-- HERO IMAGE -->
      <div class="meal-hero">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="meal-title-overlay">
          <h2>${meal.strMeal}</h2>
        </div>
      </div>

      <!-- INFO -->
      <div class="meal-info">

        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Origin:</strong> ${meal.strArea}</p>

        <div class="macros">
          <p><strong>Calories:</strong> ${Math.round(macros.calories)} kcal</p>
          <p><strong>Protein:</strong> ${Math.round(macros.protein)} g</p>
        </div>

        <!-- TOGGLE -->
        <button id="toggleRecipeBtn" class="toggle-recipe">
          ▼ View Recipe
        </button>

        <div id="recipeDetails" class="hidden-recipe">
          <p>${meal.strInstructions}</p>
        </div>

      </div>

    </div>
  `;

  const btn = document.getElementById("toggleRecipeBtn");
  const details = document.getElementById("recipeDetails");

  let open = false;

  btn.addEventListener("click", () => {

    open = !open;

    if (open) {
      details.classList.add("show");
      btn.innerHTML = "▲ Hide Recipe";
    } else {
      details.classList.remove("show");
      btn.innerHTML = "▼ View Recipe";
    }

  });
}