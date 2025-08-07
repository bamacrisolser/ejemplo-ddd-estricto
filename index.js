import app from './src/app.js';
import dotenv from 'dotenv';
import syncDatabase from './src/config/sync.js';
dotenv.config();

const Puerto = process.env.APPPORT || 5001;
const main = () => {
  app.listen(Puerto, () => {
    console.log(`Servidor corriendo en el puerto ${Puerto}`);
  });
};

syncDatabase();
main();