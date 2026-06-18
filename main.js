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

  /* ======================
      BMI STATUS
  ====================== */

  let bmiStatus = "";
  let progress = 50;

  if (bmi < 18.5) {
    bmiStatus = "Underweight";
    progress = 25;
  }

  else if (bmi < 25) {
    bmiStatus = "Healthy";
    progress = 100;
  }

  else if (bmi < 30) {
    bmiStatus = "Overweight";
    progress = 65;
  }

  else {
    bmiStatus = "Obese";
    progress = 35;
  }

  /* ======================
      GOAL NAME
  ====================== */

  let goalName = "";

  switch (user.goal) {

    case "lose_fat":
      goalName = "Lose Fat";
      break;

    case "lose_light":
      goalName = "Lose Weight";
      break;

    case "maintain":
      goalName = "Maintain Weight";
      break;

    case "lean_gain":
      goalName = "Lean Muscle Gain";
      break;

    case "bulk":
      goalName = "Bulking";
      break;

    case "athletic":
      goalName = "Athletic Performance";
      break;

    case "strength":
      goalName = "Strength Training";
      break;

    default:
      goalName = "General Fitness";
  }

  /* ======================
      WORKOUT PLAN
  ====================== */

  let recommendation = "";

  switch (user.goal) {

    case "lose_fat":

      recommendation = `
Monday      • Cardio (45 min)

Tuesday     • Full Body

Wednesday   • HIIT

Thursday    • Walking

Friday      • Cardio

Saturday    • Core Workout

Sunday      • Recovery
`;

      break;

    case "lose_light":

      recommendation = `
Monday      • Walking

Tuesday     • Yoga

Wednesday   • Cycling

Thursday    • Core

Friday      • Jogging

Saturday    • Stretching

Sunday      • Rest
`;

      break;

    case "maintain":

      recommendation = `
Monday      • Chest

Tuesday     • Legs

Wednesday   • Cardio

Thursday    • Back

Friday      • Shoulders

Saturday    • Core

Sunday      • Recovery
`;

      break;

    case "lean_gain":

      recommendation = `
Monday      • Chest

Tuesday     • Back

Wednesday   • Legs

Thursday    • Arms

Friday      • Shoulders

Saturday    • Core

Sunday      • Rest
`;

      break;

    case "bulk":

      recommendation = `
Monday      • Heavy Chest

Tuesday     • Heavy Legs

Wednesday   • Heavy Back

Thursday    • Arms

Friday      • Shoulders

Saturday    • Deadlifts

Sunday      • Recovery
`;

      break;

    case "athletic":

      recommendation = `
Monday      • Sprint Training

Tuesday     • Agility

Wednesday   • Plyometrics

Thursday    • Endurance

Friday      • Speed

Saturday    • Mobility

Sunday      • Recovery
`;

      break;

    case "strength":

      recommendation = `
Monday      • Squats

Tuesday     • Bench Press

Wednesday   • Deadlifts

Thursday    • Pull Ups

Friday      • Overhead Press

Saturday    • Core

Sunday      • Recovery
`;

      break;

    default:

      recommendation = `
General Activity

30 minutes daily

Stay active.
`;

  }

  document.getElementById("dashboardContent").innerHTML = `

    <div class="dashboard-card">

      <h2>Welcome, ${user.name}</h2>

      <hr>

      <p><strong>Age:</strong> ${user.age}</p>

      <p><strong>Weight:</strong> ${user.weight} lbs</p>

      <p><strong>Height:</strong> ${user.height} in</p>

      <p><strong>Goal:</strong> ${goalName}</p>

      <br>

      <h3>Health Summary</h3>

      <p><strong>BMI:</strong> ${bmi}</p>

      <p><strong>Status:</strong> ${bmiStatus}</p>

      <div
        style="
          width:100%;
          height:18px;
          background:#E5E7EB;
          border-radius:20px;
          overflow:hidden;
          margin:15px 0;
      ">

        <div
          style="
            width:${progress}%;
            height:100%;
            background:linear-gradient(90deg,#247A7A,#5B9A95);
          ">
        </div>

      </div>

      <h3>Daily Nutrition Target</h3>

      <p>🔥 Calories: <strong>${Math.round(macros.calories)}</strong></p>

      <p>🥩 Protein: <strong>${Math.round(macros.protein)} g</strong></p>

      <p>🍚 Carbs: <strong>${Math.round(macros.carbs)} g</strong></p>

      <p>🥑 Fat: <strong>${Math.round(macros.fat)} g</strong></p>

      <br>

      <h3>Weekly Workout Planner</h3>

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