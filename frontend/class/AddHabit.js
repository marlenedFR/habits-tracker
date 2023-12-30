//frontend/AddHabit.js
// Ajouter une habitude via une modale

import { api } from "../utils/api.js";
import { Modal } from "./Modal.js";

const SELECTORS = {
  habitTitle: "[name='habit-title']",
};

const ERROR_MESSAGES = {
  habitTitleEmpty: "Ce champ ne peut pas être vide.",
};

class AddHabit {
  constructor(formElementId, modalId, onUpdateList) {
    this.formElement = document.getElementById(formElementId);
    this.habitInput = this.formElement.querySelector(SELECTORS.habitTitle);
    this.modal = new Modal(modalId);
    this.onUpdateList = onUpdateList;
    this.bindEvents();
  }

  bindEvents = () => {
    this.formElement.addEventListener("submit", this.handleSubmit);
    this.habitInput.addEventListener("input", this.resetInputStyle);
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const habitTitle = this.getHabitTitle();

    if (!habitTitle) {
      this.showInputError("Ce champ ne peut pas être vide.");
      return;
    }

    try {
      const daysDone = this.createDaysDone();
      const response = await api.post("/habits", {
        title: habitTitle,
        daysDone: daysDone,
        isActive: true,
      });

      this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
    }
  };

  handleResponse = (response) => {
    if (response.status === "success") {
      this.modal.hide();
      this.onUpdateList();
    } else {
      console.error("Erreur lors de l'ajout de l'habitude.");
    }
  };

  handleError = (err) => {
    console.error("Erreur lors de l'ajout de l'habitude.", err);
  };

  handleInput = () => {
    this.resetInputStyle();
  };

  showInputError = () => {
    this.habitInput.placeholder = ERROR_MESSAGES.habitTitleEmpty;
    this.habitInput.classList.add("input-error");
  };

  resetInputStyle = () => {
    if (this.habitInput.classList.contains("input-error")) {
      this.habitInput.placeholder = "Nom de l'habitude";
      this.habitInput.classList.remove("input-error");
    }
  };

  getHabitTitle = () => {
    return this.habitInput.value.trim();
  };

  createDaysDone = (date = new Date().toISOString().split("T")[0]) => {
    return { [date]: false };
  };
}

export { AddHabit };
