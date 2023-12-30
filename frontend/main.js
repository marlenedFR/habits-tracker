// frontend/main.js
// Point d'entrée principal de l'application front qui utilise les autres modules pour démarrer l'application

import "./style.css";

import { AddHabit } from "./class/AddHabit";
import { ListHabits } from "./class/ListHabits";
import { History } from "./class/History";

const DOM_IDS = {
  listHabits: "listHabits",
  habitForm: "habit-form",
  addHabitModal: "add-habit-modal",
  historyModal: "history-modal",
  habitButton: "habit-button",
  historyButton: "history-button",
};

document.addEventListener("DOMContentLoaded", () => {
  const habitsList = new ListHabits(DOM_IDS.listHabits);
  const addHabitInstance = new AddHabit(
    DOM_IDS.habitForm,
    DOM_IDS.addHabitModal,
    habitsList.updateList
  );
  const historyInstance = new History(DOM_IDS.historyModal);

  setUpEventListeners(addHabitInstance, historyInstance);
});

const setUpEventListeners = (addHabitInstance, historyInstance) => {
  document.getElementById(DOM_IDS.habitButton).addEventListener("click", () => {
    addHabitInstance.modal.show();
  });

  document
    .getElementById(DOM_IDS.historyButton)
    .addEventListener("click", () => {
      historyInstance.buildAndShowHistory();
    });
};
