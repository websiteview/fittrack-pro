export function calculateDailyMacros(goal, weight) {

  let calories;

  switch(goal) {

    case "lose_fat":
      calories = weight * 12;
      break;

    case "lose_light":
      calories = weight * 13;
      break;

    case "maintain":
      calories = weight * 15;
      break;

    case "lean_gain":
      calories = weight * 16;
      break;

    case "bulk":
      calories = weight * 18;
      break;

    case "athletic":
      calories = weight * 17;
      break;

    case "strength":
      calories = weight * 19;
      break;

    default:
      calories = weight * 15;
  }

  return {
    calories,
    protein: calories * 0.25 / 4,
    carbs: calories * 0.45 / 4,
    fat: calories * 0.30 / 9
  };
}