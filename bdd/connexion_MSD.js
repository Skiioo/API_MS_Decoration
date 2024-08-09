const mysql = require('mysql');


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "msd",
}); 

db.connect(function(err) {
  if (err) {
      console.error('Erreur lors de la connexion à la base de données MySQL:', err);
      return;
  } else {
      console.log("Connecté à la base de données MySQL!"); 
  }
});

module.exports = db;



