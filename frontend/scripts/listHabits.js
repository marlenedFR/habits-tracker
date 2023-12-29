// frontend/listHabits.js
// Gère l'affichage des habitudes. La class se charge de récupèrer les habitudes via l'API et les afficher

import { toggleHabits } from "./toggleHabits.js";
import { api } from "../utils/api.js";

class listHabits {
  constructor(listElementId) {
    this.listElement = document.getElementById(listElementId);
    this.toggleHabits = new toggleHabits(this.listElement);
    this.displayHabits();
  }

  displayHabits = async () => {
    try {
      const response = await api.get("/habits");
      const habits = response.habits;

      habits.forEach((habit) => {
        const listItem = document.createElement("li");
        listItem.textContent = habit.title;
        listItem.classList.add("habit-not-done");
        listItem.addEventListener("click", () => {
          const habitIsDone = !listItem.classList.contains("habit-done");
          this.toggleHabits.toggleHabit(listItem);
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

export { listHabits };
