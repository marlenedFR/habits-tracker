// frontend/HabitsToggle.js
// Gère le toggle sur une tâche selon qu'elle soit true ou false

import { api } from "./api.js";

class HabitsToggle {
  constructor(listElement) {
    this.listElement = listElement;
  }

  toggleHabit = (listItem) => {
    listItem.classList.toggle("habit-done");
  };

  updateHabit = async (habitId, habitIsDone) => {
    console.log(
      "updateHabit appelée avec habitId:",
      habitId,
      "et habitIsDone :",
      habitIsDone
    );

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

export { HabitsToggle };
