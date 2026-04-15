const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

// POST - Crear nueva reserva
router.post('/crear', async (req, res) => {
  try {
    const { nombre, email, telefono, fecha, hora, personas, tipoMesa, ocasion, preferencias, autorizacion } = req.body;

    // Validar datos requeridos
    if (!nombre || !email || !telefono || !fecha || !hora || !personas) {
      return res.status(400).json({
        success: false,
        message: 'Por favor completa todos los campos requeridos'
      });
    }

    // Validar que el email sea válido
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Por favor ingresa un email válido'
      });
    }

    // Validar autorización
    if (!autorizacion) {
      return res.status(400).json({
        success: false,
        message: 'Debes autorizar el contacto para confirmar la reserva'
      });
    }

    // Crear nueva reserva
    const nuevaReserva = new Reserva({
      nombre,
      email,
      telefono,
      fecha: new Date(fecha),
      hora,
      personas,
      tipoMesa: tipoMesa || 'Cualquier mesa',
      ocasion: ocasion || '',
      preferencias: preferencias || '',
      autorizacion,
      estado: 'pendiente'
    });

    // Guardar en la base de datos
    await nuevaReserva.save();

    res.status(201).json({
      success: true,
      message: '¡Reserva realizada exitosamente! Te contactaremos en 2 horas para confirmar.',
      reserva: nuevaReserva
    });

  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({
      success: false,
      message: 'Error al procesar la reserva: ' + error.message
    });
  }
});

// GET - Obtener todas las reservas (opcional, para admin)
router.get('/listar', async (req, res) => {
  try {
    const reservas = await Reserva.find().sort({ fechaCreacion: -1 });
    res.status(200).json({
      success: true,
      total: reservas.length,
      reservas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener reservas: ' + error.message
    });
  }
});

// GET - Obtener una reserva por ID
router.get('/obtener/:id', async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada'
      });
    }
    res.status(200).json({
      success: true,
      reserva
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la reserva: ' + error.message
    });
  }
});

// PUT - Actualizar estado de reserva (opcional)
router.put('/actualizar/:id', async (req, res) => {
  try {
    const { estado } = req.body;
    const estados_validos = ['pendiente', 'confirmada', 'cancelada'];

    if (!estados_validos.includes(estado)) {
      return res.status(400).json({
        success: false,
        message: 'Estado inválido. Debe ser: pendiente, confirmada o cancelada'
      });
    }

    const reserva = await Reserva.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true, runValidators: true }
    );

    if (!reserva) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reserva actualizada correctamente',
      reserva
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la reserva: ' + error.message
    });
  }
});

// DELETE - Eliminar una reserva (opcional)
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);

    if (!reserva) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reserva eliminada correctamente',
      reserva
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la reserva: ' + error.message
    });
  }
});

module.exports = router;
