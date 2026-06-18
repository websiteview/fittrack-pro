export async function getRandomMeal() {
  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );

    const data = await res.json();
    return data.meals[0];

  } catch (err) {
    console.error("MealDB error:", err);
    return null;
  }
}