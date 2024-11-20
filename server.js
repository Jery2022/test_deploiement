import express from 'express';
import { createConnection } from 'mysql';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Définir __dirname pour les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Définir le middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

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

// Route pour obtenir et afficher les images
app.get('/', (req, res) => {
  db.query('SELECT url FROM images;', (err, rows) => {
    if (err) {
      res.status(500).send('Database error');
      return;
    }
    let imagesHtml = rows.map(row => `<img src="${row.url}" alt="Image">`).join('');
    res.sendFile(path.join(__dirname, 'index.html'), 'utf8', (err, html) => {
      if (err) {
        res.status(500).send('Error reading index.html');
        return;
      }
      res.send(html.replace('<!-- Placeholder for images -->', imagesHtml));
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
