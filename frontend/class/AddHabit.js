//frontend/AddHabit.js
// Ajouter une habitude via une modale

import { api } from "../utils/api.js";
import { Modal } from "./Modal.js";

class AddHabit {
  constructor(formElementId, modalId, onUpdateList) {
    this.formElement = document.getElementById(formElementId);
    this.modal = new Modal(modalId);
    this.onUpdateList = onUpdateList;
    this.formElement.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(this.formElement);
    const habitTitle = formData.get("habit-title");

    const today = new Date().toISOString().split("T")[0];
    const daysDone = {
      [today]: false,
    };

    try {
      const response = await api.post("/habits", {
        id: "",
        title: habitTitle,
        daysDone: daysDone,
        isActive: true,
      });

      if (response.status === "success") {
        console.log("Habitude ajoutée avec succès");
      } else {
        console.error("Erreur lors de l'ajout de l'habitude.");
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'habitude :", err);
    }

    this.modal.hide();
    this.onUpdateList();
  };
}

export { AddHabit };
