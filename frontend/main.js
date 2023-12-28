// frontend/main.js
// Point d'entrée principal de l'application front qui utilise les autres modules pour démarrer l'application
import "./style.css";

import { HabitsList } from "./scripts/listHabits.js";
import { Modal } from "./scripts/Modal";

document.addEventListener("DOMContentLoaded", () => {
  new HabitsList("habitsList");
  new Modal("add-habit-modal", "habit-input");
});
