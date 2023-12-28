// frontend/addHabit.js
// Gère l'ajout d'une habitude via le formulaire

import { api } from "../utils/api.js";

class addHabit {
  constructor(formElementId, onCloseModal, onUpdateList) {
    this.formElement = document.getElementById(formElementId);
    this.onCloseModal = onCloseModal;
    this.onUpdateList = onUpdateList;
    this.formElement.addEventListener("submit", this.handleSubmit);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(this.formElement);
    const habitTitle = formData.get("habit-title");

    const today = new Date().toISOString().split("T")[0];
    const daysDone = {
      [today]: true,
    };

    try {
      const response = await api.post("/habits", {
        id: "",
        title: habitTitle,
        daysDone: daysDone,
      });

      if (response.status === "success") {
        console.log("Habitude ajoutée avec succès");
        this.onCloseModal();
        this.onUpdateList();
      } else {
        console.error("Erreur lors de l'ajout de l'habitude.");
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'habitude :", err);
    }
  };
}

export { addHabit };
