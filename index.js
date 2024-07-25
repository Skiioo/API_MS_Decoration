const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const db = require("./bdd/connexion_MSD.js");

 


const app = express();

app.use(express.json());

app.use(cors({
  origin: `http://localhost:4200`, 
  optionsSuccessStatus: 200
}));





const coordonnees = require('./routes/coordonnees')
app.use("/coordonnees",coordonnees);

const devis = require('./routes/devis')
app.use("/devis",devis);


const admin = require('./routes/admin')
app.use("/admin", admin)





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});