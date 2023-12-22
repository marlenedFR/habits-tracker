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
};

export { api };
