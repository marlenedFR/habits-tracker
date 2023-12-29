// frontend/main.js
// Point d'entrée principal de l'application front qui utilise les autres modules pour démarrer l'application
import "./style.css";

import { AddHabit } from "./class/AddHabit";
import { ListHabits } from "./class/ListHabits";
import { History } from "./class/History";

document.addEventListener("DOMContentLoaded", () => {
  const habitsList = new ListHabits("listHabits");
  const AddHabitInstance = new AddHabit("habit-form", "add-habit-modal", () =>
    habitsList.updateList()
  );
  const HistoryInstance = new History("history-modal");

  document.getElementById("add-habit-button").addEventListener("click", () => {
    AddHabitInstance.modal.show();
  });

  document.getElementById("history-button").addEventListener("click", () => {
    HistoryInstance.buildAndShowHistory();
  });
});
