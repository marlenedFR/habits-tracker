// frontend/Modal.js
// Gère l'affichage et la fermeture de la modale

const SELECTORS = {
  closeButton: ".close",
  modalContent: ".modal-content",
};

class Modal {
  constructor(modalId, inputId) {
    this.modal = document.getElementById(modalId);
    this.input = document.getElementById(inputId);
    this.initModal();
  }

  initModal = () => {
    if (this.modal) {
      this.closeButton = this.modal.querySelector(SELECTORS.closeButton);
      if (this.closeButton) {
        this.closeButton.onclick = this.hide;
      }
      window.addEventListener("click", this.handleWindowClick);
    }
  };

  handleWindowClick = (event) => {
    if (event.target === this.modal) {
      this.hide();
    }
  };

  show = () => {
    if (this.modal) {
      this.modal.style.display = "block";
      if (this.input) {
        this.input.value = "";
      }
    }
  };

  hide = () => {
    if (this.modal) {
      this.modal.style.display = "none";
    }
  };

  getContentElement = () => {
    return this.modal ? this.modal.querySelector(SELECTORS.modalContent) : null;
  };
}

export { Modal };
