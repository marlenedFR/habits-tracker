// frontend/main.js
// Point d'entrée principal de l'application front qui utilise les autres modules pour démarrer l'application
import "./style.css";

import { HabitsList } from "./HabitsList.js";
import { Modal } from "./Modal";

document.addEventListener("DOMContentLoaded", () => {
  new HabitsList("habitsList");
  new Modal("add-habit-modal", "habit-input");
});
