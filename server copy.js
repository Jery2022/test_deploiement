import express from 'express';
//import { static as serveStatic } from 'express';
import { createConnection } from 'mysql';
import { fileURLToPath } from 'url';
import  path from 'path';
import { static as expressStatic } from 'express';
import { static as serveStatic } from 'express';


const app = express();
const PORT = process.env.PORT || 3000;

// Définir __dirname pour les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Définir le middleware pour servir des fichiers statiques
app.use('/static', express.static(path.join(__dirname, 'public')));

// Configurer la connexion à la base de données MySQL
const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydatabase_deploy'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.use(expressStatic('public'));
app.use(serveStatic('public'));

// Route pour obtenir et afficher les images
app.get('/', (req, res) => {
  db.query('SELECT url FROM images;', (err, rows) => {
    if (err) {
      res.status(500).send('Database error');
      return;
    }
    //let imagesHtml = rows.map(row => `<img src="${row.url}" alt="Image">`).join('');
    const cardContainer = document.querySelector('.myContainer');
    cardContainer.innerHTML = ''; // Réinitialiser la grille

    rows.forEach(row => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `<img src="${row.url}" alt="Image">`;
      cardContainer.appendChild(card);
    });



    // Ajouter les images à la grille
    //res.send(`<html><body>${imagesHtml}</body></html>`);
    res.send(`cardContainer`);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
