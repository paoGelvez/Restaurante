# 🚀 GUÍA PARA EJECUTAR EL SERVIDOR

## Pasos a seguir:

### 1️⃣ Instalar dependencias (primera vez)
```bash
npm install
```

### 2️⃣ Ejecutar el servidor
```bash
npm start
```

El servidor correrá en: **http://localhost:5000**

### 3️⃣ Para desarrollo con auto-reload
```bash
npm run dev
```
(Necesita nodemon instalado)

---

## ✅ Verificar que todo funciona

Una vez ejecutado el servidor, el formulario de reservas enviará automáticamente los datos a:
```
POST http://localhost:5000/api/reservas/crear
```

Los datos se guardarán en MongoDB Atlas.

---

## 📝 Variables de entorno

Asegúrate que el archivo `.env` tenga:
```
MONGO_URI=mongodb+srv://usuario:contraseña@micluster.mongodb.net/restaurante?retryWrites=true&w=majority
PORT=5000
```

---

## 🐛 Si hay problemas:

1. **Error de conexión a MongoDB**: Verifica que la URL en `.env` sea correcta
2. **Puerto 5000 ocupado**: Cambia en `.env` a otro puerto
3. **CORS error**: El servidor ya permite solicitudes from http://localhost
4. **El servidor no inicia**: Ejecuta `npm install` nuevamente

---

## 📊 Endpoints disponibles:

- `POST /api/reservas/crear` - Crear nueva reserva
- `GET /api/reservas/listar` - Ver todas las reservas
- `GET /api/reservas/obtener/:id` - Ver una reserva específica
- `PUT /api/reservas/actualizar/:id` - Actualizar estado de reserva
- `DELETE /api/reservas/eliminar/:id` - Eliminar una reserva

---

✨ **¡Tu sistema de reservas está listo para usar!** ✨
