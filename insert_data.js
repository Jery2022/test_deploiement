import { createConnection } from 'mysql';

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydatabase_deploy'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  const insertData = `
    INSERT INTO images (url) VALUES
    ('assets/animals/image-dauphin-1.png'),
    ('assets/animals/image-lions-1.jpeg'),
    ('assets/animals/image-ours.png'),
    ('assets/animals/image-lions-2.jpeg'),
    ('assets/animals/image-tigre-1.jpeg'),
    ('assets/animals/image-vautours-1.jpg');
  `;
  connection.query(insertData, err => {
    if (err) {
      console.error('Error inserting data:', err);
      return;
    }
    console.log('Data inserted');
    connection.end();
  });
});
