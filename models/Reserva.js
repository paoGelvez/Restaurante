const mongoose = require('mongoose');

//aca lo que estamos haaciendo es definir el esquema de la reserva, es decir, los campos que va a tener cada reserva y sus tipos de datos, ademas de algunas validaciones como que el nombre, email, telefono, fecha, hora, personas y autorizacion sean obligatorios. Tambien se definen algunos campos con valores por defecto como tipoMesa, ocasion, preferencias y estado. Finalmente se exporta el modelo para poder usarlo en otras partes de la aplicacion.

const reservaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor ingresa un email válido'
    ]
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es obligatorio']
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es obligatoria']
  },
  hora: {
    type: String,
    required: [true, 'La hora es obligatoria']
  },
  personas: {
    type: String,
    required: [true, 'Número de personas es obligatorio']
  },
  tipoMesa: {
    type: String,
    default: 'Cualquier mesa'
  },
  ocasion: {
    type: String,
    default: ''
  },
  preferencias: {
    type: String,
    default: ''
  },
  autorizacion: {
    type: Boolean,
    required: [true, 'Debes autorizar el contacto']
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'cancelada'],
    default: 'pendiente'
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
    }
});

module.exports = mongoose.model('Reserva', reservaSchema);
