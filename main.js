// ======================
// CALORIE CALCULATOR
// ======================

const goalBtn =
  document.getElementById("goalBtn");

if(goalBtn){

  goalBtn.addEventListener("click", () => {

    const weight =
      prompt(
        "Enter your weight in pounds:"
      );

    if(!weight) return;

    const calories =
      Math.round(weight * 15);

    alert(
      `Estimated maintenance calories: ${calories} calories/day`
    );

  });

}

// ======================
// PROFILE + DASHBOARD
// ======================

const profileForm =
  document.getElementById("profileForm");

const dashboardContent =
  document.getElementById(
    "dashboardContent"
  );

function calculateBMI(
  weight,
  height
){

  const weightKg =
    weight * 0.453592;

  const heightM =
    height * 0.0254;

  return (
    weightKg /
    (heightM * heightM)
  ).toFixed(1);

}

function renderDashboard(user){

  const bmi =
    calculateBMI(
      Number(user.weight),
      Number(user.height)
    );

  let recommendation = "";

  if(user.goal === "lose"){

    if(bmi >= 30){

      recommendation = `
Weight Loss Program

• Walking 45 minutes
• Cycling 30 minutes
• Full Body Circuit
• Daily Calorie Deficit
• Drink More Water
`;

    } else {

      recommendation = `
Fat Reduction Program

• Walking 30 minutes
• Plank 3 Sets
• Bodyweight Squats
• Moderate Calorie Deficit
• Stretching Routine
`;

    }

  }

  else if(user.goal === "gain"){

    if(Number(user.age) < 30){

      recommendation = `
Muscle Growth Program

• Bench Press
• Squats
• Deadlifts
• High Protein Diet
• Progressive Overload
`;

    } else {

      recommendation = `
Strength Program

• Resistance Training
• Dumbbell Press
• Lunges
• Recovery Focus
• Protein Rich Meals
`;

    }

  }

  else{

    recommendation = `
Maintenance Program

• Walking
• Push Ups
• Stretching
• Balanced Nutrition
• Active Lifestyle
`;

  }

  const calories =
    Math.round(user.weight * 15);

  dashboardContent.innerHTML = `

    <div class="dashboard-card">

      <h3>
        Welcome ${user.name}
      </h3>

      <p>
        <strong>Age:</strong>
        ${user.age}
      </p>

      <p>
        <strong>Weight:</strong>
        ${user.weight} lbs
      </p>

      <p>
        <strong>Height:</strong>
        ${user.height} inches
      </p>

      <p>
        <strong>Goal:</strong>
        ${user.goal}
      </p>

      <p>
        <strong>BMI:</strong>
        ${bmi}
      </p>

      <p>
        <strong>Recommended Calories:</strong>
        ${calories}
      </p>

      <p>
        <strong>Recommended Workout:</strong>
      </p>

      <pre>${recommendation}</pre>

    </div>

  `;

}

if(profileForm){

  profileForm.addEventListener(
    "submit",
    (e) => {

      e.preventDefault();

      const user = {

        name:
          document.getElementById(
            "name"
          ).value,

        age:
          document.getElementById(
            "age"
          ).value,

        weight:
          document.getElementById(
            "weight"
          ).value,

        height:
          document.getElementById(
            "height"
          ).value,

        goal:
          document.getElementById(
            "goal"
          ).value

      };

      localStorage.setItem(
        "fittrackUser",
        JSON.stringify(user)
      );

      renderDashboard(user);

    }
  );

}

const savedUser =
  JSON.parse(
    localStorage.getItem(
      "fittrackUser"
    )
  );

if(savedUser){
  renderDashboard(savedUser);
}

// ======================
// EXERCISE EXPLORER
// ======================

const sampleExercises = [

  {
    name:"Push Ups",
    bodyPart:"Chest",
    equipment:"Body Weight"
  },

  {
    name:"Squats",
    bodyPart:"Legs",
    equipment:"Body Weight"
  },

  {
    name:"Plank",
    bodyPart:"Core",
    equipment:"Body Weight"
  },

  {
    name:"Dumbbell Curl",
    bodyPart:"Biceps",
    equipment:"Dumbbell"
  },

  {
    name:"Lunges",
    bodyPart:"Legs",
    equipment:"Body Weight"
  },

  {
    name:"Shoulder Press",
    bodyPart:"Shoulders",
    equipment:"Dumbbell"
  }

];

const loadExercisesBtn =
  document.getElementById(
    "loadExercises"
  );

if(loadExercisesBtn){

  loadExercisesBtn.addEventListener(
    "click",
    () => {

      const container =
        document.getElementById(
          "exerciseContainer"
        );

      container.innerHTML = "";

      sampleExercises.forEach(
        exercise => {

          container.innerHTML += `

            <div class="card">

              <h3>
                ${exercise.name}
              </h3>

              <p>
                <strong>Body Part:</strong>
                ${exercise.bodyPart}
              </p>

              <p>
                <strong>Equipment:</strong>
                ${exercise.equipment}
              </p>

            </div>

          `;

        }
      );

    }
  );

}

// ======================
// CLOSE EXERCISES
// ======================

const closeExercisesBtn =
  document.getElementById(
    "closeExercises"
  );

if(closeExercisesBtn){

  closeExercisesBtn.addEventListener(
    "click",
    () => {

      const container =
        document.getElementById(
          "exerciseContainer"
        );

      container.innerHTML = `
        <p>
          Exercises hidden.
        </p>
      `;

    }
  );

}

// ======================
// MEAL PLANNER API
// ======================

const mealBtn =
  document.getElementById(
    "mealBtn"
  );

const mealContainer =
  document.getElementById(
    "mealContainer"
  );

if(mealBtn){

  mealBtn.addEventListener(
    "click",
    loadMeal
  );

}

async function loadMeal(){

  mealContainer.innerHTML =
    "<p>Loading meal...</p>";

  try{

    const response =
      await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );

    const data =
      await response.json();

    const meal =
      data.meals[0];

    mealContainer.innerHTML = `

      <div class="meal-card">

        <h3>
          ${meal.strMeal}
        </h3>

        <img
          src="${meal.strMealThumb}"
          alt="${meal.strMeal}"
        >

        <p>
          <strong>Category:</strong>
          ${meal.strCategory}
        </p>

        <p>
          <strong>Origin:</strong>
          ${meal.strArea}
        </p>

        <p>
          <strong>Instructions:</strong>
          ${meal.strInstructions.substring(
            0,
            300
          )}...
        </p>

      </div>

    `;

  }

  catch(error){

    mealContainer.innerHTML = `

      <p>
        Unable to load meal data.
      </p>

    `;

    console.error(error);

  }

}