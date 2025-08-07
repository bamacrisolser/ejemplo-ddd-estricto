import sequelize from './sequelize.js';
import '../shared/models/index.js';
import '../shared/models/associations/index.js';

const syncDatabase = async () => {
  try {
    // Sync models with the database
    await sequelize.sync();
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
};

export default syncDatabase;
