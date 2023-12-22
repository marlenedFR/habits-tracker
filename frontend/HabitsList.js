// frontend/HabitsList.js
// Gère l'affichage des habitudes. La class se charge de récupèrer les habitudes via l'API et les afficher

import { api } from "./api.js";

class HabitsList {
  constructor(listElementId) {
    this.listElement = document.getElementById(listElementId);
  }

  displayHabits = async () => {
    try {
      const response = await api.get("/habits");
      const habits = response.habits;

      habits.forEach((habit) => {
        const listItem = document.createElement("ul");
        listItem.textContent = habit.title;
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
