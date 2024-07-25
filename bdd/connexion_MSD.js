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


/*
const mysql = require('mysql');

let db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "msd",
  });

  db.connect(function(err) {
    if (err) {
      console.error('Erreur lors de la connexion à la base de données MySQL:', err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("Connecté à la base de données MySQL!");
    }
  });

  db.on('error', function(err) {
    console.log('Erreur de la base de données', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = db;
*/