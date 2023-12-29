// frontend/Modal.js
// Gère l'affichage et la fermeture de la modale

class Modal {
  constructor(modalId, inputId) {
    this.modal = document.getElementById(modalId);
    this.input = document.getElementById(inputId);
    this.closeButton = document.querySelector(".close");

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
    if (this.input) {
      this.input.value = "";
    }
  }

  hide() {
    this.modal.style.display = "none";
  }
}

export { Modal };
