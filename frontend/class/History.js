//frontend/history.js
// Gère l'affichage de l'historique des habitudes

import { api } from "../utils/api.js";
import { Modal } from "./Modal.js";

// Sélecteurs CSS
const SELECTORS = {
  closeButton: ".close",
  historyTitle: "history-title",
  historyTable: "history-table",
};

// Messages d'erreur
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

  // Récupère les données depuis l'API
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

  // Construit et affiche l'historique
  buildAndShowHistory = async () => {
    try {
      const habits = await this.fetchData();
      const modalContent = this.modal.getContentElement();
      modalContent.innerHTML = "";

      // Crée le titre et le tableau de l'historique
      modalContent.appendChild(this.createHistoryTitle());
      modalContent.appendChild(this.createHistoryTable(habits));
      this.setupCloseButton(modalContent);

      this.showModal();
    } catch (err) {
      console.error(ERROR_MESSAGES.buildError, err);
    }
  };

  // Crée le titre de l'historique
  createHistoryTitle = () => {
    const historyTitle = document.createElement("div");
    historyTitle.textContent = "Historique des habitudes";
    historyTitle.className = SELECTORS.historyTitle;
    return historyTitle;
  };

  // Crée le tableau de l'historique
  createHistoryTable = (habits) => {
    const table = document.createElement("table");
    table.className = SELECTORS.historyTable;
    const uniqueDates = this.getUniqueSortedDates(habits);
    table.appendChild(this.createHeaderRow(uniqueDates));
    table.appendChild(this.createTableBody(habits, uniqueDates));
    return table;
  };

  // Crée le bouton de fermeture de la modale
  setupCloseButton = (modalContent) => {
    const closeButton = document.createElement("span");
    closeButton.className = SELECTORS.closeButton.slice(1);
    closeButton.innerHTML = "&times;";

    closeButton.onclick = this.hideModal;
    modalContent.appendChild(closeButton);
  };

  // Crée la ligne d'en-tête du tableau
  createHeaderRow = (uniqueDates) => {
    const headerRow = document.createElement("tr");
    headerRow.appendChild(this.createTableCell("th", "Habitude"));
    uniqueDates.forEach((date) => {
      headerRow.appendChild(this.createTableCell("th", date));
    });
    return headerRow;
  };

  // Crée le corps du tableau
  createTableBody = (habits, uniqueDates) => {
    const tbody = document.createElement("tbody");
    // Pour chaque habitude
    habits.forEach((habit) => {
      // Crée une ligne
      const row = document.createElement("tr");
      // Ajoute une cellule avec le titre de l'habitude
      row.appendChild(this.createTableCell("td", habit.title));
      // Pour chaque date unique
      uniqueDates.forEach((date) => {
        // Ajoute une cellule avec le statut de l'habitude pour cette date
        const status = habit.daysDone[date] ? "✅" : "❌";
        row.appendChild(this.createTableCell("td", status));
      });
      // Ajoute la ligne au tableau
      tbody.appendChild(row);
    });
    return tbody;
  };

  // Crée une cellule du tableau
  createTableCell = (type, text) => {
    // Crée une cellule de type `type` avec le contenu `text`
    const cell = document.createElement(type);
    // Ajoute le contenu `text` à la cellule
    cell.textContent = text;
    return cell;
  };

  // Récupère les dates uniques et les trie
  getUniqueSortedDates = (habits) => {
    const dates = new Set();
    habits.forEach((habit) => {
      Object.keys(habit.daysDone).forEach((date) => dates.add(date));
    });
    return Array.from(dates).sort((a, b) => new Date(a) - new Date(b));
  };
}

export { History };
