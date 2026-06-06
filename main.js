document.getElementById("goalBtn").addEventListener("click", () => {

  const weight = prompt("Enter your weight in pounds:");

  if(!weight) return;

  const calories = Math.round(weight * 15);

  alert(
    `Estimated maintenance calories: ${calories} calories/day`
  );

});