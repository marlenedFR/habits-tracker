// frontend/ToggleHabits.js
// Gère le toggle sur une tâche selon qu'elle soit true ou false

import { api } from "../utils/api.js";

const CLASS_NAMES = {
  habitDone: "habit-done",
  habitNotDone: "habit-not-done",
};

const ERROR_MESSAGES = {
  updateError: "Erreur lors de la mise à jour de l'habitude.",
};

class ToggleHabits {
  constructor(listElement) {
    this.listElement = listElement;
  }

  toggleHabit = (listItem, habitIsDone) => {
    listItem.classList.toggle(CLASS_NAMES.habitDone, habitIsDone);
    listItem.classList.toggle(CLASS_NAMES.habitNotDone, !habitIsDone);
  };

  updateHabit = async (habitId, habitIsDone) => {
    try {
      const response = await api.patch(`/habits/${habitId}`, { habitIsDone });
      if (response.status !== "success") {
        console.error(ERROR_MESSAGES.updateError);
      }
    } catch (err) {
      console.error(ERROR_MESSAGES.updateError, err);
    }
  };
}

export { ToggleHabits };
