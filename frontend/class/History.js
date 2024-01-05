//frontend/history.js
// Affiche l'historique des habitudes

import { api } from "../utils/api.js";
import { Modal } from "./Modal.js";

const SELECTORS = {
  closeButton: ".close",
  historyTitle: "history-title",
  historyTable: "history-table",
};

const ERROR_MESSAGES = {
  fetchError: "Erreur lors de la récupération des habitudes.",
  buildError: "Erreur lors de la construction de l'historique.",
};

class History {
  constructor(modalId) {
    this.modal = new Modal(modalId);
  }

  showModal = () => {
    this.modal.show();
  };

  hideModal = () => {
    this.modal.hide();
  };

  fetchData = async () => {
    try {
      const response = await api.get("/habits");
      if (!response || !Array.isArray(response.habits)) {
        throw new Error(ERROR_MESSAGES.fetchError);
      }
      return response.habits;
    } catch (err) {
      console.error(ERROR_MESSAGES.fetchError, err);
      throw err;
    }
  };

  buildAndShowHistory = async () => {
    try {
      const habits = await this.fetchData();
      const modalContent = this.modal.getContentElement();
      modalContent.innerHTML = "";
      modalContent.appendChild(this.createHistoryTitle());
      modalContent.appendChild(this.createHistoryTable(habits));
      this.setupCloseButton(modalContent);
      this.showModal();
    } catch (err) {
      console.error(ERROR_MESSAGES.buildError, err);
    }
  };

  createHistoryTitle = () => {
    const historyTitle = document.createElement("div");
    historyTitle.textContent = "Historique des habitudes";
    historyTitle.className = SELECTORS.historyTitle;
    return historyTitle;
  };

  createHistoryTable = (habits) => {
    const table = document.createElement("table");
    table.className = SELECTORS.historyTable;
    table.appendChild(this.createHeaderRow(habits));
    table.appendChild(this.createTableBody(habits));
    return table;
  };

  setupCloseButton = (modalContent) => {
    const closeButton = document.createElement("span");
    closeButton.className = SELECTORS.closeButton.slice(1);
    closeButton.innerHTML = "&times;";
    closeButton.onclick = this.hideModal;
    modalContent.appendChild(closeButton);
  };

  createHeaderRow = (habits) => {
    const headerRow = document.createElement("tr");
    headerRow.appendChild(this.createTableCell("th", "Habitude"));
    this.getUniqueSortedDates(habits).forEach((date) => {
      headerRow.appendChild(this.createTableCell("th", date));
    });
    return headerRow;
  };

  createTableBody = (habits) => {
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
  };

  createTableCell = (type, text, className) => {
    const cell = document.createElement(type);
    cell.textContent = text;
    if (className) {
      cell.classList.add(className);
    }
    return cell;
  };

  getUniqueSortedDates = (habits) => {
    const dates = new Set();
    habits.forEach((habit) => {
      Object.keys(habit.daysDone).forEach((date) => dates.add(date));
    });
    return Array.from(dates).sort((a, b) => new Date(a) - new Date(b));
  };
}

export { History };
