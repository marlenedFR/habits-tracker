import { loadData, addHabit, updateHabit, getDailyHabits } from "./data.js";

const routes = async (fastify) => {
  fastify.get("/habits", async (request, reply) => {
    try {
      const data = await loadData();

      reply.send(data);
    } catch (err) {
      reply.code(500).send("Erreur lors de la récupération des habitudes.");
    }
  });

  fastify.post("/habits", async (request, reply) => {
    try {
      const newHabit = request.body;
      const addedHabit = await addHabit(newHabit);

      reply.send({
        status: "success",
        message: "Habitude ajoutée avec succès.",
        habit: addedHabit,
      });
    } catch (err) {
      reply.code(500).send("Erreur lors de l'ajout de la nouvelle habitude.");
    }
  });

  fastify.patch("/habits/:id", async (request, reply) => {
    try {
      const updatedResult = await updateHabit(request, reply);

      reply.code(200).send({
        status: "success",
        message: "Statut de l'habitude mis à jour.",
        data: updatedResult,
      });
    } catch (err) {
      reply.code(500).send("Erreur lors de la mise à jour de l'habitude.");
    }
  });

  fastify.get("/habits/today", async (request, reply) => {
    try {
      const dailyHabits = await getDailyHabits();

      reply.code(200).send({
        status: "success",
        message: "Habitudes du jour bien récupérées.",
        data: dailyHabits,
      });
    } catch (err) {
      console.error(err);
      reply.status(500).send("Erreur lors de la récupération des habitudes.");
    }
  });
};

export default routes;
