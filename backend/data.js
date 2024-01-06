// backend/data.js
// Interagis avec le fichier database.json pour récupérer et sauvegarder les données.
// Ce fichier a été modifié pour utiliser Supabase.

// import fs from "fs/promises";
// const filePath = "./database.json";

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config(); // Charge les variables d'environnement

// Configuration du client Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const formatDate = (date) => {
  return date.toISOString().slice(0, 10);
};

// const loadData = async () => {
//   const data = await fs.readFile(filePath, "utf8");
//   return JSON.parse(data);
// };

// const saveData = async (data) => {
//   const dataJSON = JSON.stringify(data, null, 2);
//   await fs.writeFile(filePath, dataJSON, "utf8");
// };

const loadData = async () => {
  try {
    const { data, error } = await supabase.from("habits").select("*");
    console.log("/data.js - Données chargées :", data);

    if (error) {
      console.log("Erreur lors du chargement des données :", error);
      return null;
    }

    console.log("Données chargées :", data);
    return data;
  } catch (err) {
    console.log("Exception lors du chargement des données :", err);
  }
};

const saveData = async (newData) => {
  const { data, error } = await supabase.from("habits").insert([newData]);

  if (error) throw error;

  return data;
};

// const addHabit = async (newHabit) => {
//   const data = await loadData();
//   // Vérifier si l'habitude existe déjà (pour ne pas avoir de doublons dans l'historique)
//   const habitExists = data.habits.findIndex((h) => h.title === newHabit.title);

//   if (habitExists !== -1) {
//     // Fusionner les données de l'habitude existante avec les nouvelles données
//     data.habits[habitExists].daysDone = {
//       ...data.habits[habitExists].daysDone,
//       ...newHabit.daysDone,
//     };
//     // Mettre à jour le statut de l'habitude
//     data.habits[habitExists].isActive = newHabit.isActive;
//   } else {
//     // Ajouter une nouvelle habitude
//     data.habits.push(newHabit);
//   }

//   await saveData(data);
//   return newHabit;
// };

const addHabit = async (newHabit) => {
  console.log(
    "data.js - Avant l'insertion de la nouvelle habitude :",
    newHabit
  );
  const { data, error } = await supabase
    .from("habits")
    .insert([
      {
        title: newHabit.title,
        is_active: true,
      },
    ])
    .select();

  if (error) {
    console.log(
      "data.js - Erreur lors de l'insertion de la nouvelle habitude :",
      error
    );
    throw new Error(
      `Erreur lors de l'ajout de la nouvelle habitude: ${error.message}`
    );
  }
  console.log(
    "data.js - Après l'insertion de la nouvelle habitude, données retournées :",
    data[0]
  );

  // Retourne les données de la nouvelle habitude
  return data[0];
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

const deleteHabit = async (habitId) => {
  const data = await loadData();
  data.habits = data.habits.filter((habit) => habit.id !== parseInt(habitId));
  await saveData(data);
};

export {
  loadData,
  saveData,
  addHabit,
  updateHabit,
  getDailyHabits,
  deleteHabit,
};
