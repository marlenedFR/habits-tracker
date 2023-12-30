// frontend/ListHabits.js
// Gère l'affichage des habitudes. La class se charge de récupèrer les habitudes via l'API et les afficher

import { ToggleHabits } from "./ToggleHabits.js";
import { api } from "../utils/api.js";

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
      const today = new Date().toISOString().split("T")[0];

      activeHabits.forEach((habit) => {
        const habitContainer = document.createElement("div");
        habitContainer.classList.add("habit-container");

        const listItem = document.createElement("li");
        listItem.textContent = habit.title;
        habitContainer.appendChild(listItem);

        if (habit.daysDone[today]) {
          listItem.classList.add("habit-done");
        } else {
          listItem.classList.add("habit-not-done");
        }

        listItem.addEventListener("click", () => {
          const habitIsDone = !listItem.classList.contains("habit-done");
          this.toggleHabits.toggleHabit(listItem, habitIsDone);
          this.toggleHabits.updateHabit(habit.id, habitIsDone);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "⛔";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", (event) => {
          event.stopPropagation();
          this.deleteHabit(habit.id);
        });
        habitContainer.appendChild(deleteButton);

        this.listElement.appendChild(habitContainer);
      });
    } catch (err) {
      console.error(
        "Erreur lors du chargement de la liste des habitudes :",
        err
      );
    }
  };

  deleteHabit = async (habitId) => {
    try {
      await api.patch(`/habits/${habitId}`, { isActive: false });
      this.updateList();
    } catch (err) {
      console.error("Erreur lors de la suppression de l'habitude :", err);
    }
  };

  updateList = () => {
    this.listElement.innerHTML = "";
    this.displayHabits();
  };
}

export { ListHabits };
