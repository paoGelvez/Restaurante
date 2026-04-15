const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Servir archivos estáticos

// Conectar a MongoDB
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

conectarDB();

// Importar rutas
const rutasReservas = require('./routes/reservas');
const rutasResenas = require('./routes/resenas');

// Usar rutas
app.use('/api/reservas', rutasReservas);
app.use('/api/resenas', rutasResenas);

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ mensaje: '✅ Servidor funcionando correctamente' });
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});
