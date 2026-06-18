const API_KEY = "TU_RAPIDAPI_KEY";
const API_HOST = "exercisedb.p.rapidapi.com";

export async function getExercisesByBodyPart(bodyPart) {

  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_HOST
    }
  });

  if (!res.ok) {
    throw new Error("Error fetching exercises");
  }

  return await res.json();
}