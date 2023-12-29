import { api } from "../utils/api.js";

class History {
  constructor(modalId, modalButtonId, onClodeModal) {
    this.modal = document.getElementById(modalId);
    this.modalButton = document.getElementById(modalButtonId);
    this.onCloseModal = onClodeModal;

    this.modalButton.onclick = () => {
      if (this.onCloseModal) {
        this.onCloseModal();
      }
      this.showModal();
    };
  }

  showModal() {
    this.modal.style.display = "block";
    // const response = api.get("/habits");
    // const habits = response.data;
    // console.log(habits);
    // const history = document.getElementById("history");
    // history.innerHTML = "";
    // habits.forEach((habit) => {
    //   history.innerHTML += `
    //     <div class="habit">
    //       <h3>${habit.title}</h3>
    //       <ul>
    //         ${Object.keys(habit.daysDone)
    //           .map((day) => {
    //             return `<li>${day}</li>`;
    //           })
    //           .join("")}
    //       </ul>
    //     </div>
    //   `;
    // });
  }

  hideModal() {
    this.modal.style.display = "none";
  }
}

export { History };
