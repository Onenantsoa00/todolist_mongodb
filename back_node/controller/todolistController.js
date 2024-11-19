import { getDB } from "../config/mongoDB.js";
import { ObjectId } from "mongodb";

const read = async (req, res) => {
  try {
    const db = getDB(); // Accède à l'instance de la base de données
    const tasks = await db.collection("tasks").find({}).toArray();
    res.json(tasks); // Retourne les données en JSON
  } catch (error) {
    console.error("Erreur lors de la lecture:", error);
    res.status(500).json({ message: "Erreur de serveur" });
  }
};

const create = async (req, res) => {
  try {
    const db = getDB();
    const { nom, description, status } = req.body;

    const result = await db.collection("tasks").insertOne({
      nom,
      description,
      status,
      createdAt: new Date(),
    });
    res
      .status(201)
      .json({ message: "Tâche ajoutée", taskId: result.insertedId });
  } catch (error) {
    console.error("Erreur lors de la création:", error);
  }
};

const update_by_id = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params; // Récupère l'ID de la tâche via les paramètres de l'URL
    const { nom, description, status } = req.body; // Récupère les données mises à jour

    const result = await db.collection("tasks").updateOne(
      { _id: new ObjectId(id) }, // Recherche de la tâche par ID
      {
        $set: {
          nom,
          description,
          status,
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        message: "Tâche non trouvée ou aucune modification effectuée",
      });
    }

    res.json({ message: "Tâche mise à jour" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    res.status(500).json({ message: "Erreur de serveur" });
  }
};

const update_by_name = async (req, res) => {
  try {
    const db = getDB();
    const { nom } = req.body; // Critère de recherche pour identifier la tâche à mettre à jour
    const { description, status } = req.body; // Champs à mettre à jour

    const result = await db.collection("tasks").updateOne(
      { nom }, // Critère de recherche
      {
        $set: {
          description,
          status,
        },
      }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ message: "Aucune tâche trouvée avec ce nom" });
    } else {
      res.status(200).json({ message: "Tâche mise à jour avec succès" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    res.status(500).json({ message: "Erreur de serveur" });
  }
};

const delet_by_id = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params; // Récupère l'ID de la tâche via les paramètres de l'URL

    const result = await db
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    res.json({ message: "Tâche supprimée" });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    res.status(500).json({ message: "Erreur de serveur" });
  }
};

const delet_by_name = async (req, res) => {
  try {
    const db = getDB();
    const { nom } = req.body;

    if (!nom) {
      return res
        .status(400)
        .json({ message: "Le nom est requis pour la suppression." });
    }

    const result = await db.collection("tasks").deleteOne({ nom });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Aucune tâche trouvée avec ce nom" });
    } else {
      res.status(200).json({ message: "Tâche supprimée avec succès" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    res.status(500).json({ message: "Erreur de serveur" });
  }
};

const get_element_by_status = async (req, res) => {
  try {
    const db = getDB();

    // Compter le nombre total de tâches
    const tout_les_tasks = await db.collection("tasks").countDocuments();

    // Compter le nombre de tâches terminées
    const task_terminer = await db
      .collection("tasks")
      .countDocuments({ status: "Terminer" });

    // Compter le nombre de tâches non terminées
    const task_en_cour = await db.collection("tasks").countDocuments({
      $or: [{ status: "Non Terminer" }, { status: "En Cours" }],
    });

    res.status(200).json({
      tout_les_tasks,
      task_terminer,
      task_en_cour,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    res.status(500).json({ message: "Erreur de serveur" });
  }
};

const filtrage_par_status = async (req, res) => {
  try {
    const db = getDB();
    const tasks = await db
      .collection("tasks")
      .find()
      .sort({ status: 1 })
      .toArray();

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Erreur lors du filtrage par statut:", error);
    res.status(500).json({ message: "Erreur de serveur" });
  }
};

const filtrage_par_status_decroissant = async (req, res) => {
  try {
    const db = getDB();
    const tasks = await db
      .collection("tasks")
      .find()
      .sort({ status: -1 })
      .toArray();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Erreur lors du filtrage par statut:", error);
    res.status(500).json({ message: "Erreur de serveur" });
  }
};

const triage_par_nom = async (req, res) => {
  try {
    const db = getDB();
    const tasks = await db
      .collection("tasks")
      .find()
      .sort({ nom: 1 })
      .toArray();

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Erreur lors du triage par nom:", error);
    res.status(500).json({ message: "Erreur de serveur" });
  }
};

const triage_par_nom_decroissant = async (req, res) => {
  try {
    const db = getDB();
    const tasks = await db
      .collection("tasks")
      .find()
      .sort({ nom: -1 })
      .toArray();

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Erreur lors du triage par nom:", error);
    res.status(500).json({ message: "Erreur de serveur" });
  }
};

export default {
  read,
  create,
  update_by_id,
  delet_by_id,
  update_by_name,
  delet_by_name,
  get_element_by_status,
  filtrage_par_status,
  triage_par_nom,
  triage_par_nom_decroissant,
  filtrage_par_status_decroissant,
};
