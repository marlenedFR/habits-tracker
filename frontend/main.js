// frontend/main.js
// Point d'entrée principal de l'application front qui utilise les autres modules pour démarrer l'application
import "./style.css";

import { listHabits } from "./scripts/listHabits";
import { Modal } from "./scripts/modal";

document.addEventListener("DOMContentLoaded", () => {
  new listHabits("listHabits");
  new Modal("add-habit-modal", "habit-input");
});
