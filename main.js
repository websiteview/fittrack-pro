document.getElementById("goalBtn").addEventListener("click", () => {

  const weight = prompt("Enter your weight in pounds:");

  if (!weight) return;

  const calories = Math.round(weight * 15);

  alert(
    `Estimated maintenance calories: ${calories} calories/day`
  );
});

const profileForm =
  document.getElementById("profileForm");

const dashboardContent =
  document.getElementById("dashboardContent");

profileForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const user = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    weight: document.getElementById("weight").value,
    height: document.getElementById("height").value,
    goal: document.getElementById("goal").value
  };

  localStorage.setItem(
    "fittrackUser",
    JSON.stringify(user)
  );

  renderDashboard(user);
});

function renderDashboard(user){

  let recommendation = "";

  if(user.goal === "lose"){
    recommendation =
      "Cardio Focus Program";
  }

  else if(user.goal === "gain"){
    recommendation =
      "Muscle Building Program";
  }

  else{
    recommendation =
      "Balanced Fitness Program";
  }

  const calories =
    Math.round(user.weight * 15);

  dashboardContent.innerHTML = `
    <div class="dashboard-card">

      <h3>Welcome ${user.name}</h3>

      <p><strong>Goal:</strong>
      ${user.goal}</p>

      <p><strong>Weight:</strong>
      ${user.weight} lbs</p>

      <p><strong>Recommended Calories:</strong>
      ${calories}</p>

      <p><strong>Workout Plan:</strong>
      ${recommendation}</p>

    </div>
  `;
}

const savedUser =
  JSON.parse(localStorage.getItem("fittrackUser"));

if(savedUser){
  renderDashboard(savedUser);
}