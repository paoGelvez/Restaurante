const express = require('express');
const router = express.Router();
const Resena = require('../models/Resena');

// POST - Crear nueva reseña
router.post('/', async (req, res) => {
    try {
        const { nombre, email, comentario, calificacion } = req.body;

        // Validar campos requeridos
        if (!nombre || !comentario || !calificacion) {
            return res.status(400).json({ 
                error: 'Por favor completa todos los campos requeridos' 
            });
        }

        // Validar calificación
        if (calificacion < 1 || calificacion > 5) {
            return res.status(400).json({ 
                error: 'La calificación debe estar entre 1 y 5' 
            });
        }

        // Crear nueva reseña
        const nuevaResena = new Resena({
            nombre,
            email,
            comentario,
            calificacion
        });

        // Guardar en la base de datos
        await nuevaResena.save();

        res.status(201).json({ 
            mensaje: '✅ Reseña guardada correctamente',
            resena: nuevaResena 
        });
    } catch (error) {
        console.error('Error al guardar reseña:', error);
        res.status(500).json({ 
            error: 'Error al guardar la reseña',
            detalles: error.message 
        });
    }
});

// GET - Obtener todas las reseñas
router.get('/', async (req, res) => {
    try {
        const resenas = await Resena.find().sort({ creadaEn: -1 });
        res.json(resenas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener reseñas' });
    }
});

// GET - Obtener reseña por ID
router.get('/:id', async (req, res) => {
    try {
        const resena = await Resena.findById(req.params.id);
        if (!resena) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        res.json(resena);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la reseña' });
    }
});

// DELETE - Eliminar reseña
router.delete('/:id', async (req, res) => {
    try {
        const resena = await Resena.findByIdAndDelete(req.params.id);
        if (!resena) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        res.json({ 
            mensaje: '✅ Reseña eliminada correctamente',
            resena 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la reseña' });
    }
});

module.exports = router;
