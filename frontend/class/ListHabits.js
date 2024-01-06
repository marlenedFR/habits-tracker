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
    this.init();
  }

  // Initialisation et affichage des habitudes
  init = async () => {
    try {
      const habits = await this.fetchHabits();
      this.renderHabits(habits);
    } catch (err) {
      console.error(ERROR_MESSAGES.loadError, err);
    }
  };

  // Récupère les habitudes depuis l'API
  fetchHabits = async () => {
    const response = await api.get("/habits");
    return response.habits.filter((habit) => habit.isActive);
  };

  // Affiche les habitudes
  renderHabits = (habits) => {
    const today = new Date().toISOString().split("T")[0];
    habits.forEach((habit) =>
      this.listElement.appendChild(this.createHabitItem(habit, today))
    );
  };

  // Crée un élément d'habitude
  createHabitItem = (habit, today) => {
    const habitContainer = document.createElement("div");
    habitContainer.classList.add(SELECTORS.habitContainer);

    habitContainer.appendChild(this.createListItem(habit, today));
    habitContainer.appendChild(this.createDeleteButton(habit.id));

    return habitContainer;
  };

  // Crée un élément de liste pour une habitude
  createListItem = (habit, today) => {
    const listItem = document.createElement("li");
    listItem.textContent = habit.title;
    listItem.appendChild(this.createStatusIcon(habit, today));
    listItem.classList.add(
      habit.daysDone[today] ? SELECTORS.habitDone : SELECTORS.habitNotDone
    );
    listItem.addEventListener("click", () =>
      this.handleListItemClick(listItem, habit.id)
    );
    return listItem;
  };

  // Crée une icône de statut pour une habitude
  createStatusIcon = (habit, today) => {
    const icon = document.createElement("span");
    icon.classList.add(habit.daysDone[today] ? "icon-done" : "icon-not-done");
    icon.textContent = habit.daysDone[today] ? "✅" : "❌";
    return icon;
  };

  // Gère les clics sur les éléments de la liste
  handleListItemClick = (listItem, habitId) => {
    const habitIsDone = !listItem.classList.contains(SELECTORS.habitDone);
    this.toggleHabits.toggleHabit(listItem, habitIsDone);
    this.toggleHabits.updateHabit(habitId, habitIsDone);

    this.updateIcon(listItem, habitIsDone);
  };

  // Met à jour l'icône de statut
  updateIcon = (listItem, habitIsDone) => {
    const icon = listItem.querySelector("span");
    if (icon) {
      icon.textContent = habitIsDone ? "✅" : "❌";
      icon.classList.toggle("icon-done", habitIsDone);
      icon.classList.toggle("icon-not-done", !habitIsDone);
    }
  };

  // Crée un bouton de suppression pour une habitude
  createDeleteButton = (habitId) => {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "⛔";
    deleteButton.classList.add(SELECTORS.deleteButton);
    deleteButton.addEventListener("click", (event) =>
      this.handleDeleteClick(event, habitId)
    );
    return deleteButton;
  };

  // Gère les clics sur le bouton de suppression
  handleDeleteClick = async (event, habitId) => {
    event.stopPropagation();
    try {
      await this.deleteHabit(habitId);
      this.updateList();
    } catch (err) {
      console.error(ERROR_MESSAGES.deleteError, err);
    }
  };

  // Supprime une habitude via l'API
  deleteHabit = (habitId) => {
    return api.delete(`/habits/${habitId}`);
  };

  // Met à jour la liste des habitudes
  updateList = () => {
    this.listElement.innerHTML = "";
    this.init();
  };
}

export { ListHabits };
