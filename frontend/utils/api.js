// frontend/api.js
// Gère la communication entre le front et le back. Contient les fonctions pour faire des requêtes HTTP vers le serveur
const BASE_URL = "http://localhost:3000";

const api = {
  get: async (path) => {
    const response = await fetch(`${BASE_URL}${path}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP. Statut : ${response.status}`);
    }
    return await response.json();
  },

  patch: async (path, data) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP. Statut : ${response.status}`);
    }
    return await response.json();
  },

  post: async (path, data) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP. Statut : ${response.status}`);
    }
    return await response.json();
  },

  delete: async (path) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP. Statut : ${response.status}`);
    }
    return await response.json();
  },
};

export { api };
