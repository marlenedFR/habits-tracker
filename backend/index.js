// backend/index.js
// Enregistre les routes dans le serveur Fastify.

import cors from "@fastify/cors";
import Fastify from "fastify";

import routes from "./routes.js";

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

// Enregistrer les routes
fastify.register(routes);

// Test si le serveur fonctionne
fastify.get("/", async () => {
  return { HabitsTracker: "Serveur fonctionnel 😎" };
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
