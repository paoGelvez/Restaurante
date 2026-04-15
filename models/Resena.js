const mongoose = require('mongoose');

const resenaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    comentario: {
        type: String,
        required: true
    },
    calificacion: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    creadaEn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resena', resenaSchema);
