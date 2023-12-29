// frontend/main.js
// Point d'entrée principal de l'application front qui utilise les autres modules pour démarrer l'application
import "./style.css";

import { Modal } from "./scripts/modal";
import { addHabit } from "./scripts/addHabit";
import { listHabits } from "./scripts/listHabits";
import { History } from "./scripts/history";

document.addEventListener("DOMContentLoaded", () => {
  const addHabitModal = new Modal("add-habit-modal", "habit-input");
  const history = new History("history-modal", "history-button", () =>
    addHabitModal.hide()
  );
  const habitsList = new listHabits("listHabits");

  new addHabit(
    "habit-form",
    "add-habit-button",
    () => addHabitModal.hide(),
    () => habitsList.updateList()
  );

  document.getElementById("history-button").addEventListener("click", () => {
    history.buildAndShowHistory();
  });
});
