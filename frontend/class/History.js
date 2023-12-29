//frontend/history.js
// Affiche l'historique des habitudes

import { api } from "../utils/api.js";
import { Modal } from "./Modal.js";

class History {
  constructor(modalId) {
    this.modal = new Modal(modalId);
  }

  showModal() {
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  fetchData = async () => {
    try {
      const response = await api.get("/habits");

      if (!response || !Array.isArray(response.habits)) {
        throw new Error("La réponse de l'API n'est pas un tableau");
      }
      return response.habits;
    } catch (err) {
      console.error("Erreur lors de la récupération des habitudes :", err);
      throw err;
    }
  };

  buildAndShowHistory = async () => {
    try {
      const habits = await this.fetchData();

      const closeButton = document.createElement("span");
      closeButton.className = "close";
      closeButton.innerHTML = "&times;";

      const historyTitle = document.createElement("div");
      historyTitle.textContent = "Historique des habitudes";
      historyTitle.className = "history-title";

      // Créez le tableau et ajoutez-le à .modal-content
      const table = this.createHistoryTable(habits);
      const modalContent = this.modal.getContentElement();
      modalContent.innerHTML = ""; // Sécurisé car nous contrôlons le contenu qui est ajouté ensuite.
      modalContent.appendChild(historyTitle);
      modalContent.appendChild(table);

      modalContent.appendChild(closeButton);

      modalContent.appendChild(historyTitle);
      modalContent.appendChild(table);

      closeButton.onclick = () => {
        this.hideModal();
      };

      this.showModal();
    } catch (err) {
      console.error("Erreur lors de la construction de l'historique :", err);
    }
  };

  createHistoryTable(habits) {
    const table = document.createElement("table");
    table.classList.add("history-table");
    table.appendChild(this.createHeaderRow(habits));
    table.appendChild(this.createTableBody(habits));
    return table;
  }

  createHeaderRow(habits) {
    const headerRow = document.createElement("tr");
    headerRow.appendChild(this.createTableCell("th", "Habitude"));
    this.getUniqueSortedDates(habits).forEach((date) => {
      headerRow.appendChild(this.createTableCell("th", date));
    });
    return headerRow;
  }

  createTableBody(habits) {
    const tbody = document.createElement("tbody");
    habits.forEach((habit) => {
      const row = document.createElement("tr");
      row.appendChild(this.createTableCell("td", habit.title));
      this.getUniqueSortedDates(habits).forEach((date) => {
        const status = habit.daysDone[date] ? "✅" : "❌";
        row.appendChild(
          this.createTableCell(
            "td",
            status,
            habit.daysDone[date] ? "check-mark" : "cross-mark"
          )
        );
      });
      tbody.appendChild(row);
    });
    return tbody;
  }

  createTableCell(type, text, className) {
    const cell = document.createElement(type);
    cell.textContent = text;
    if (className) cell.classList.add(className);
    return cell;
  }

  getUniqueSortedDates(habits) {
    const dates = new Set();
    habits.forEach((habit) => {
      Object.keys(habit.daysDone).forEach((date) => dates.add(date));
    });
    return Array.from(dates).sort((a, b) => new Date(a) - new Date(b));
  }
}

export { History };
