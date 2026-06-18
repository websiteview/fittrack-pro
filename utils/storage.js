export function saveUser(user) {
  localStorage.setItem("fittrackUser", JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem("fittrackUser"));
}