import express from 'express';
import { connectDB } from './config/mongoDB.js';
import dotenv from 'dotenv';
import cors from 'cors';
import todolistRouter from './routes/todolistRoute.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/todolistRouter',todolistRouter)

const port = process.env.PORT || 1000;

// Appel de la fonction connectDB pour se connecter à MongoDB
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Serveur en écoute sur le port ${port}`);
    });
}).catch(error => {
    console.error("Erreur lors du démarrage du serveur :", error);
});
