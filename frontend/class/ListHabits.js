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
      const habits = response.habits;
      const today = new Date().toISOString().split("T")[0];

      habits.forEach((habit) => {
        const listItem = document.createElement("li");
        listItem.textContent = habit.title;

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

        this.listElement.appendChild(listItem);
      });
    } catch (err) {
      console.error(
        "Erreur lors du chargement de la liste des habitudes :",
        err
      );
    }
  };

  updateList = () => {
    this.listElement.innerHTML = "";
    this.displayHabits();
  };
}

export { ListHabits };
