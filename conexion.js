
//importamos la librería Mongoose para usarla.
const mongoose = require('mongoose');
require('dotenv').config();

const conectarDB = async () => {
  try {
    // Intenta conectar usando la URL del archivo .env
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('¡Conexión exitosa a MongoDB Atlas!');
    
    // Una vez conectado, cerramos la conexión para terminar el proceso
    mongoose.connection.close();
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    process.exit(1); //detiene la app
  }
};

conectarDB();