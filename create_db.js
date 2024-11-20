import { createConnection } from 'mysql';

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL'); 

  connection.query('CREATE DATABASE IF NOT EXISTS mydatabase_deploy;', err => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created');

    connection.query('USE mydatabase_deploy;', err => {
      if (err) {
        console.error('Error switching to database:', err);
        return;
      }

      const createTable = `
        CREATE TABLE IF NOT EXISTS images (
          id INT AUTO_INCREMENT PRIMARY KEY,
          url VARCHAR(255)
        );
      `;
      connection.query(createTable, err => {
        if (err) {
          console.error('Error creating table:', err);
          return;
        }
        console.log('Table created');
        connection.end();
      });
    });
  });
});
