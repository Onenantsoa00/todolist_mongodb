import { MongoClient } from "mongodb";

// Configuration de la connexion
const url = "mongodb://127.0.0.1:27017";
const dbName = "todolist";

const client = new MongoClient(url);

// Connexion à la base de données et export de l'instance de la DB
let db;

async function connectDB() {
  try {
    // Connexion au client MongoDB
    await client.connect();
    console.log("Connexion réussie à MongoDB");

    // Sélection de la base de données
    db = client.db(dbName);
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    process.exit(1); // Arrête l'application si la connexion échoue
  }
}

// Fonction pour obtenir l'instance de la base de données
function getDB() {
  if (!db) {
    throw new Error("La base de données n'est pas encore connectée.");
  }
  return db;
}

export { connectDB, getDB };
