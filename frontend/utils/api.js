// frontend/api.js
// Gère la communication entre le front et le back. Contient les fonctions pour faire des requêtes HTTP vers le serveur

import { BASE_URL } from "./config.js";

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Erreur HTTP. Statut : ${response.status}`);
  }
  return await response.json();
};

const fetchWithConfig = async (path, config) => {
  const response = await fetch(`${BASE_URL}${path}`, config);
  return handleResponse(response);
};

const api = {
  get: async (path) => {
    return fetchWithConfig(path, {});
  },

  patch: async (path, data) => {
    return fetchWithConfig(path, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  post: async (path, data) => {
    return fetchWithConfig(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  delete: async (path) => {
    return fetchWithConfig(path, { method: "DELETE" });
  },
};

export { api };
