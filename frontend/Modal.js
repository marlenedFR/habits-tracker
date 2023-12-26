// frontend/Modal.js
// Gère l'affichage de la modale pour ajouter une habitude

class Modal {
  constructor(modalId, inputId) {
    this.modal = document.getElementById(modalId);
    this.input = document.getElementById(inputId);
    this.closeButton = document.querySelector(".close");
    this.initModal();
  }

  initModal() {
    const modalButton = document.getElementById("add-habit-button");

    modalButton.onclick = () => {
      this.show();
    };

    this.closeButton.onclick = () => {
      this.hide();
    };

    window.onclick = (event) => {
      if (event.target === this.modal) {
        this.hide();
      }
    };
  }

  show() {
    this.modal.style.display = "block";
    this.input.value = "";
  }

  hide() {
    this.modal.style.display = "none";
  }
}

export { Modal };
