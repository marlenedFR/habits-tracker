// frontend/toggleHabits.js
// Gère le toggle sur une tâche selon qu'elle soit true ou false

import { api } from "../utils/api.js";

class toggleHabits {
  constructor(listElement) {
    this.listElement = listElement;
  }

  toggleHabit = (listItem, habitIsDone) => {
    if (habitIsDone) {
      listItem.classList.remove("habit-not-done");
      listItem.classList.add("habit-done");
    } else {
      listItem.classList.remove("habit-done");
      listItem.classList.add("habit-not-done");
    }
  };

  updateHabit = async (habitId, habitIsDone) => {
    try {
      const response = await api.patch(`/habits/${habitId}`, { habitIsDone });

      if (response.status === "success") {
        // console.log("Habitude mise à jour avec succès");
      } else {
        console.error("Erreur lors de la mise à jour de l'habitude.");
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'habitude :", err);
    }
  };
}

export { toggleHabits };
