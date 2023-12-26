// backend/data.js
import fs from "fs/promises";

const filePath = "./database.json";

// Fonctions utilitaires
const formatDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const loadData = async () => {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
};

const saveData = async (data) => {
  const dataJSON = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, dataJSON, "utf8");
};

const addHabit = async (newHabit) => {
  const data = await loadData();
  const maxId = data.habits.reduce(
    (max, habit) => (habit.id > max ? habit.id : max),
    0
  );
  newHabit.id = maxId + 1;
  data.habits.push(newHabit);
  await saveData(data);
  return newHabit;
};

const updateHabit = async (request, reply) => {
  const habitId = parseInt(request.params.id);
  const { habitIsDone } = request.body;
  const data = await loadData();

  const today = formatDate(new Date());
  const habit = data.habits.find((h) => h.id === habitId);

  if (!habit) {
    reply.code(404).send("Habitude non trouvée.");
    return;
  }
  habit.daysDone[today] = habitIsDone;
  await saveData(data);
};

const getDailyHabits = async () => {
  const data = await loadData();
  const today = formatDate(new Date());

  const todayHabits = data.habits.filter((habit) => habit.daysDone[today]);

  return todayHabits;
};

export { loadData, saveData, addHabit, updateHabit, getDailyHabits };
