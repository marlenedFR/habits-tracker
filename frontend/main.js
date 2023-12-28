// frontend/main.js
// Point d'entrée principal de l'application front qui utilise les autres modules pour démarrer l'application
import "./style.css";

import { listHabits } from "./scripts/listHabits";
import { Modal } from "./scripts/modal";
import { addHabit } from "./scripts/addHabit";

document.addEventListener("DOMContentLoaded", () => {
  const modal = new Modal("add-habit-modal", "habit-input");
  const habitsList = new listHabits("listHabits");

  new addHabit(
    "habit-form",
    () => modal.hide(),
    () => habitsList.updateList()
  );
});
