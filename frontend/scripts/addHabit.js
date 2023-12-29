// frontend/addHabit.js
// Gère l'ajout d'une habitude via le formulaire

import { api } from "../utils/api.js";

class addHabit {
  constructor(formElementId, modalButtonId, onCloseModal, onUpdateList) {
    this.formElement = document.getElementById(formElementId);
    this.modalButton = document.getElementById(modalButtonId);
    this.onCloseModal = onCloseModal;
    this.onUpdateList = onUpdateList;
    this.formElement.addEventListener("submit", this.handleSubmit);

    this.modalButton.onclick = () => {
      if (this.onCloseModal) {
        this.onCloseModal();
      }
      this.showModal();
    };
  }

  showModal() {
    const modal = this.formElement.closest(".modal");
    if (modal) {
      modal.style.display = "block";
    }
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
