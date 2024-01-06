// frontend/api.js
// Gère la communication entre le front et le back. Contient les fonctions pour faire des requêtes HTTP vers le serveur

import { BASE_URL } from "./config.js";

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Erreur HTTP. Statut : ${response.status}`);
  }
  return await response.json();
};

const api = {
  get: async (path) => {
    const response = await fetch(`${BASE_URL}${path}`);
    return handleResponse(response);
  },

  patch: async (path, data) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  post: async (path, data) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (path) => {
    const response = await fetch(`${BASE_URL}${path}`, { method: "DELETE" });
    return handleResponse(response);
  },
};

export { api };
