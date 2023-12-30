// frontend/ListHabits.js
// Gère l'affichage des habitudes

import { ToggleHabits } from "./ToggleHabits.js";
import { api } from "../utils/api.js";

const SELECTORS = {
  habitContainer: "habit-container",
  deleteButton: "delete-button",
  habitDone: "habit-done",
  habitNotDone: "habit-not-done",
};

const ERROR_MESSAGES = {
  loadError: "Erreur lors du chargement de la liste des habitudes.",
  deleteError: "Erreur lors de la suppression de l'habitude.",
};

class ListHabits {
  constructor(listElementId) {
    this.listElement = document.getElementById(listElementId);
    this.toggleHabits = new ToggleHabits(this.listElement);
    this.displayHabits();
  }

  displayHabits = async () => {
    try {
      const response = await api.get("/habits");
      const activeHabits = response.habits.filter((habit) => habit.isActive);
      this.renderHabits(activeHabits);
    } catch (err) {
      console.error(ERROR_MESSAGES.loadError, err);
    }
  };

  renderHabits = (habits) => {
    const today = new Date().toISOString().split("T")[0];
    habits.forEach((habit) =>
      this.listElement.appendChild(this.createHabitItem(habit, today))
    );
  };

  createHabitItem = (habit, today) => {
    const habitContainer = document.createElement("div");
    habitContainer.classList.add(SELECTORS.habitContainer);

    const listItem = this.createListItem(habit, today);
    habitContainer.appendChild(listItem);
    habitContainer.appendChild(this.createDeleteButton(habit.id));

    return habitContainer;
  };

  createListItem = (habit, today) => {
    const listItem = document.createElement("li");
    listItem.textContent = habit.title;
    listItem.classList.add(
      habit.daysDone[today] ? SELECTORS.habitDone : SELECTORS.habitNotDone
    );
    listItem.addEventListener("click", () =>
      this.handleListItemClick(listItem, habit.id)
    );
    return listItem;
  };

  handleListItemClick = (listItem, habitId) => {
    const habitIsDone = !listItem.classList.contains(SELECTORS.habitDone);
    this.toggleHabits.toggleHabit(listItem, habitIsDone);
    this.toggleHabits.updateHabit(habitId, habitIsDone);
  };

  createDeleteButton = (habitId) => {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "⛔";
    deleteButton.classList.add(SELECTORS.deleteButton);
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      this.deleteHabit(habitId);
    });
    return deleteButton;
  };

  deleteHabit = async (habitId) => {
    try {
      await api.delete(`/habits/${habitId}`);
      this.updateList();
    } catch (err) {
      console.error(ERROR_MESSAGES.deleteError, err);
    }
  };

  updateList = () => {
    this.listElement.innerHTML = "";
    this.displayHabits();
  };
}

export { ListHabits };
