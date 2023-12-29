// frontend/main.js
// Point d'entrée principal de l'application front qui utilise les autres modules pour démarrer l'application
import "./style.css";

import { listHabits } from "./scripts/listHabits";
import { Modal } from "./scripts/modal";
import { addHabit } from "./scripts/addHabit";
import { History } from "./scripts/history";

document.addEventListener("DOMContentLoaded", () => {
  const addHabitModal = new Modal("add-habit-modal", "habit-input");
  const historyModal = new Modal("history-modal", "history-input");
  const habitsList = new listHabits("listHabits");

  new addHabit(
    "habit-form",
    "add-habit-button",
    () => addHabitModal.hide(),
    () => habitsList.updateList()
  );

  new History("history-modal", "history-button", () => historyModal.hide());
});
