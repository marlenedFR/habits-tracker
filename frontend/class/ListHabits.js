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

        // Ajouter un bouton de suppression à côté de chaque habitude
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", (event) => {
          event.stopPropagation(); // Empêche l'event "click" de se propager au listItem
          this.deleteHabit(habit.id);
        });
        habitContainer.appendChild(deleteButton); // Ajoute le bouton en tant qu'élément frère du listItem

        this.listElement.appendChild(habitContainer); // Ajoute le conteneur dans la liste
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
