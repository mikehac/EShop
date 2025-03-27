import * as pgtools from 'pgtools';
import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  host: process.env.DB_HOST,
};

pgtools
  .createdb(config, process.env.DB_NAME)
  .then((res: any) => {
    console.log('Database created');
  })
  .catch((err: any) => {
    if (err.name === 'duplicate_database') {
      console.log('Database already exists.');
    } else {
      console.error('Error creating database:', err);
    }
  });
