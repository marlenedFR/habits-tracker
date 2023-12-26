// frontend/HabitsList.js
// Gère l'affichage des habitudes. La class se charge de récupèrer les habitudes via l'API et les afficher

import { HabitsToggle } from "./HabitsToggle.js";
import { api } from "./api.js";

class HabitsList {
  constructor(listElementId) {
    this.listElement = document.getElementById(listElementId);
    this.habitsToggle = new HabitsToggle(this.listElement);
  }

  displayHabits = async () => {
    try {
      const response = await api.get("/habits");
      const habits = response.habits;

      habits.forEach((habit) => {
        const listItem = document.createElement("li");
        listItem.textContent = habit.title;
        listItem.addEventListener("click", () => {
          const habitIsDone = !listItem.classList.contains("habit-done");
          this.habitsToggle.toggleHabit(listItem);
          this.habitsToggle.updateHabit(habit.id, habitIsDone);
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
}

export { HabitsList };
