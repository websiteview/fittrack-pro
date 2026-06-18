const API_KEY = "YOUR_API_KEY_HERE";

export async function getNutrition(ingredient) {
  try {

    const res = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${ingredient}&api_key=${API_KEY}`
    );

    const data = await res.json();

    if (!data.foods || data.foods.length === 0) {
      return null;
    }

    // 🔥 filtra solo alimentos con nutrientes
    const validFoods = data.foods.filter(
      f => f.foodNutrients && f.foodNutrients.length > 0
    );

    const food = validFoods[0] || data.foods[0];

    const nutrients = food.foodNutrients || [];

    // 🔥 soporte para ambos formatos
    const findNutrient = (keywords) => {

      const nutrient = nutrients.find(n => {

        const name =
          n.nutrientName ||
          n.nutrient?.name ||
          "";

        return keywords.some(k =>
          name.toLowerCase().includes(k.toLowerCase())
        );
      });

      return nutrient?.value || 0;
    };

    return {
      calories: findNutrient(["energy", "calories"]),
      protein: findNutrient(["protein"]),
      carbs: findNutrient(["carbohydrate"]),
      fat: findNutrient(["fat", "lipid"])
    };

  } catch (err) {
    console.error("USDA error:", err);

    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
  }
}