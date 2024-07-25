const mysql = require("mysql");
const express = require('express');
const router = express.Router();

const db = require("../bdd/connexion_MSD");



db.connect(function(err) {   
    if (err) {
        console.error('Erreur lors de la connexion à la base de données MySQL:', err);
        return;
    } else{
        console.log("Connecté à la base de données MySQL!"); 
    }
    
});

router.get('/', (req, res) => {
    db.query('SELECT * FROM `info`', (err, rows) => {
        if(err) {
            console.error('Erreur lors de la récupération des données:', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des données' });
            return;
        }
        res.status(200).json(rows);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM `info` WHERE id = ?', [id], (err, rows) => {
        if(err) {
            console.error('Erreur lors de la récupération des données:', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des données' });
            return;
        }
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ error: 'Aucune entrée trouvée avec cet ID' });
        }
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM info WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
        if(err) {
            console.error('Erreur lors de la suppression des données:', err);
            res.status(500).json({ error: 'Erreur lors de la suppression des données' });
            return;
        }
        res.status(200).json({ message: 'Données supprimées avec succès' });
    });
});

router.post('/', (req, res) => {
    const { nom, prenom, email, num, description } = req.body;
    const sqlInsert = "INSERT INTO info (nom, prenom, email, num, description) VALUES (?, ?, ?, ?, ?)";

    db.query(sqlInsert, [nom, prenom, email, num, description], (err, result) => {
        if(err) {
            console.error("Erreur lors de l'insertion des données:", err);
            res.status(500).json({ error: "Erreur lors de l'insertion des données" });
            return;
        }
        res.status(201).json({ message: 'Données insérées avec succès', id: result.insertId });
    });
});





router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { nom, prenom, email, num, description } = req.body;
    const sqlUpdate = "UPDATE info SET nom = ?, prenom = ?, email = ?, num = ?, description = ? WHERE id = ?";

    db.query(sqlUpdate, [nom, prenom, email, num, description, id], (err, result) => {
        if(err) {
            console.error('Erreur lors de la mise à jour des données:', err);
            res.status(500).json({ error: 'Erreur lors de la mise à jour des données' });
            return;
        }
        res.status(200).json({ message: 'Données mises à jour avec succès' });
    });
});





module.exports = router;