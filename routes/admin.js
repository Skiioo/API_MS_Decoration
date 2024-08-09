const mysql = require("mysql");
const express = require('express');
const router = express.Router();

const db = require("../bdd/connexion_MSD");

const bcrypt = require('bcrypt');
const saltRounds = 5; 

db.connect(function(err) {   
    if (err) {
        console.error('Erreur lors de la connexion à la base de données MySQL:', err);
        return;
    } else{
        console.log("Connecté à la base de données MySQL!"); 
    }
    
});



router.post('/', (req, res) => {
    const id = req.body.id;
    
    const password = req.body.password;

    const query = 'SELECT * FROM admin WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des données:', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des données' });
            return;
        }

        if (result.length > 0) {
            const admin = result[0];
            bcrypt.compare(password, admin.password, (err, isMatch) => {
                if (err) {
                    console.error('Erreur lors de la comparaison des mots de passe:', err);
                    res.status(500).json({ error: 'Erreur technique' });
                    return;
                }

                if (isMatch) {
                    
                    res.json({ valid: true });
                } else {
                    res.json({ valid: false });
                }
            });
        } else {
            res.json({ valid: false });
        }
    });
});

  router.post('/add', (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
  
    // Hacher le mot de passe avant de l'insérer
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error('Erreur lors du hachage du mot de passe:', err);
        res.status(500).json({ error: 'Erreur technique lors du hachage du mot de passe' });
        return;
      }
  
      const query = 'INSERT INTO admin (id, password) VALUES (?, ?)';
      db.query(query, [id, hash], (err, result) => { 
        if (err) {
          console.error('Erreur lors de l\'insertion des données:', err);
          res.status(500).json({ error: 'Erreur lors de l\'insertion des données' });
          return;
        }
  
        res.json({ success: true });
      });
    });
  });


  router.put('/', (req, res) => {
    const id = req.body.id;
    const password = req.body.password;

    const query = 'UPDATE admin SET password = ? WHERE id = ?';

    db.query(query, [password, id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour des données:', err);
            res.status(500).json({ error: 'Erreur lors de la mise à jour des données' });
            return;
        }

        res.json({ success: true });
    });
  });

  router.get('/', (req, res) => {
    db.query('SELECT * FROM `admin`', (err, rows) => {
        if(err) {
            console.error('Erreur lors de la récupération des données:', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des données' });
            return;
        }
        res.status(200).json(rows);
    });
});


  
module.exports = router;

