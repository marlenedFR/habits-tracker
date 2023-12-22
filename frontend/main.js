// frontend/main.js
// Point d'entrée principal de l'application front qui utilise les autres modules pour démarrer l'application
import "./style.css";

import { HabitsList } from "./HabitsList.js";

document.addEventListener("DOMContentLoaded", () => {
  const habitsList = new HabitsList("habitsList");
  habitsList.displayHabits();
});
