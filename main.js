import { loadMeal } from "./controllers/mealController.js";
import { saveUser, getUser } from "./utils/storage.js";
import { calculateDailyMacros } from "./utils/macros.js";
import { getExercisesByBodyPart } from "./services/exerciseService.js";

/* ======================
   CALORIE BUTTON
====================== */
document.getElementById("goalBtn")
?.addEventListener("click", () => {

  const weight = prompt("Enter weight in lbs");
  if (!weight) return;

  const calories = Math.round(weight * 15);

  alert(`Estimated maintenance calories: ${calories} calories/day`);
});


/* ======================
   PROFILE FORM
====================== */
document.getElementById("profileForm")
?.addEventListener("submit", (e) => {

  e.preventDefault();

  const user = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    weight: document.getElementById("weight").value,
    height: document.getElementById("height").value,
    goal: document.getElementById("goal").value
  };

  saveUser(user);
  renderDashboard(user);
});


/* ======================
   LOAD USER
====================== */
const user = getUser();
if (user) renderDashboard(user);


/* ======================
   BMI
====================== */
function calculateBMI(weight, height) {
  const weightKg = weight * 0.453592;
  const heightM = height * 0.0254;
  return (weightKg / (heightM * heightM)).toFixed(1);
}


/* ======================
   DASHBOARD (UPDATED)
====================== */
function renderDashboard(user) {

  const bmi = calculateBMI(
    Number(user.weight),
    Number(user.height)
  );

  const macros = calculateDailyMacros(
    user.goal,
    Number(user.weight)
  );

  let recommendation = "";

  switch (user.goal) {

    case "lose_fat":
      recommendation = `
Fat Loss Program
• Cardio 4x week
• Walking daily
• High protein diet
• Calorie deficit
      `;
      break;

    case "lose_light":
      recommendation = `
Light Fat Loss
• Walking
• Yoga
• Light cardio
      `;
      break;

    case "maintain":
      recommendation = `
Maintenance Program
• Balanced training
• Active lifestyle
• Moderate diet
      `;
      break;

    case "lean_gain":
      recommendation = `
Lean Muscle Program
• Strength training
• High protein diet
• Progressive overload
      `;
      break;

    case "bulk":
      recommendation = `
Bulking Program
• Heavy lifting
• High calorie intake
• Compound lifts
      `;
      break;

    case "athletic":
      recommendation = `
Athletic Performance
• Speed training
• Agility drills
• Endurance work
      `;
      break;

    case "strength":
      recommendation = `
Strength Program
• Heavy lifts
• Low reps
• Power focus
      `;
      break;

    default:
      recommendation = `
General Fitness
• Active lifestyle
• Balanced training
      `;
  }

  document.getElementById("dashboardContent").innerHTML = `
    <div class="dashboard-card">

      <h3>Welcome ${user.name}</h3>

      <p><strong>Age:</strong> ${user.age}</p>
      <p><strong>Weight:</strong> ${user.weight} lbs</p>
      <p><strong>Height:</strong> ${user.height} inches</p>
      <p><strong>Goal:</strong> ${user.goal}</p>

      <p><strong>BMI:</strong> ${bmi}</p>

      <p><strong>Calories:</strong> ${Math.round(macros.calories)}</p>
      <p><strong>Protein:</strong> ${Math.round(macros.protein)} g</p>
      <p><strong>Carbs:</strong> ${Math.round(macros.carbs)} g</p>
      <p><strong>Fat:</strong> ${Math.round(macros.fat)} g</p>

      <p><strong>Workout Plan:</strong></p>
      <pre>${recommendation}</pre>

    </div>
  `;
}


/* ======================
   MEALS
====================== */
document.getElementById("mealBtn")
?.addEventListener("click", loadMeal);


/* ======================
   EXERCISES (READY FOR EXERCIDB)
====================== */

/* MAP GOAL → BODY PARTS */
function mapGoalToBodyParts(goal) {

  switch (goal) {

    case "lose_fat":
    case "lose_light":
      return ["cardio", "waist", "back"];

    case "maintain":
      return ["chest", "legs", "back"];

    case "lean_gain":
      return ["chest", "arms", "back"];

    case "bulk":
      return ["chest", "legs", "back"];

    case "athletic":
      return ["cardio", "full body"];

    case "strength":
      return ["back", "legs", "chest"];

    default:
      return ["chest", "legs"];
  }
}


/* LOAD EXERCISES */
document.getElementById("loadExercises")
?.addEventListener("click", async () => {

  const container = document.getElementById("exerciseContainer");
  const user = getUser();

  container.innerHTML = "<p>Loading exercises...</p>";

  try {

    const bodyParts = mapGoalToBodyParts(user?.goal);

    let all = [];

    for (let part of bodyParts) {

      const data = await getExercisesByBodyPart(part);

      if (Array.isArray(data)) {
        all = [...all, ...data];
      }
    }

    container.innerHTML = "";

    all.slice(0, 12).forEach(ex => {

      container.innerHTML += `
        <div class="card">

          <h3>${ex.name}</h3>

          <img src="${ex.gifUrl}" alt="${ex.name}" />

          <p><strong>Target:</strong> ${ex.target}</p>
          <p><strong>Equipment:</strong> ${ex.equipment}</p>

        </div>
      `;
    });

  } catch (error) {

    console.error(error);

    container.innerHTML = "<p>Unable to load exercises.</p>";
  }
});


/* CLOSE EXERCISES */
document.getElementById("closeExercises")
?.addEventListener("click", () => {
  document.getElementById("exerciseContainer").innerHTML =
    "<p>Exercises hidden.</p>";
});