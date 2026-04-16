let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    // Quitar clase active de todos
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Ajustar el índice si se pasa de los límites
    currentSlideIndex = (n + slides.length) % slides.length;
    
    // Activar el slide y el punto correspondiente
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function changeSlide(n) {
    showSlide(currentSlideIndex + n);
}

function currentSlide(n) {
    showSlide(n);
}

// Cambio automático cada 6 segundos
let autoSlide = setInterval(() => {
    changeSlide(1);
}, 6000);

// Detener el auto-cambio si el usuario interactúa
document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});


// 1. Definición de los objetos (Data)
const platos = [
    // ENTRADAS
    {
        id: 1,
        nombre: "Ceviche de la Casa",
        precio: 22000,
        categoria: "Entradas",
        descripcion: "Camarones frescos maridados en cítricos y cebolla morada.",
        imagen: "./imagenesRestaurante/ceviche.jpg"
    },
    {
        id: 2,
        nombre: "Tabla de Quesos y Embutidos",
        precio: 25000,
        categoria: "Entradas",
        descripcion: "Selección gourmet de quesos artesanales e ibéricos.",
        imagen: "./imagenesRestaurante/tablaQuesos.jpg"
    },
    {
        id: 3,
        nombre: "Camarones al Ajillo",
        precio: 20000,
        categoria: "Entradas",
        descripcion: "Camarones frescos salteados en mantequilla y ajo.",
        imagen: "./imagenesRestaurante/Camaronesss.jpg"
    },
    {
        id: 4,
        nombre: "Tabla de Jamón Serrano",
        precio: 18000,
        categoria: "Entradas",
        descripcion: "Jamón serrano 100% ibérico con pan tostado.",
        imagen: "./imagenesRestaurante/tablaJamonSerrano.jpg"
    },
    
    // PLATOS FUERTES
    {
        id: 5,
        nombre: "Hamburguesa Comelona",
        precio: 28000,
        categoria: "Platos Fuertes",
        descripcion: "Doble carne premium, queso fundido y pan artesanal.",
        imagen: "./imagenesRestaurante/hamburguesa.jpg"
    },
    {
        id: 6,
        nombre: "Parrillada Mixta",
        precio: 45000,
        categoria: "Platos Fuertes",
        descripcion: "Cortes de res, cerdo y pollo con papas rústicas.",
        imagen: "./imagenesRestaurante/parrilladaMixta.jpeg"
    },
    {
        id: 7,
        nombre: "Salmón a la Mantequilla",
        precio: 38000,
        categoria: "Platos Fuertes",
        descripcion: "Filete de salmón fresco con salsa de limón y hierbas.",
        imagen: "./imagenesRestaurante/salmon.jpeg"
    },
    {
        id: 8,
        nombre: "Costillas BBQ",
        precio: 35000,
        categoria: "Platos Fuertes",
        descripcion: "Costillas tiernas ahumadas con salsa BBQ caramelizada.",
        imagen: "./imagenesRestaurante/costillas.jpg"
    },
    {
        id: 9,
        nombre: "Filete Mignon",
        precio: 52000,
        categoria: "Platos Fuertes",
        descripcion: "Corte premium de res con champiñones y salsa de vino.",
        imagen: "./imagenesRestaurante/filete.jpeg"
    },
    
    // BEBIDAS
    {
        id: 10,
        nombre: "Limonada Imperial",
        precio: 10000,
        categoria: "Bebidas",
        descripcion: "Limonada natural con hierbabuena y un toque secreto.",
        imagen: "./imagenesRestaurante/limonada.jpeg"
    },
    {
        id: 11,
        nombre: "Vino Tinto Premium",
        precio: 55000,
        categoria: "Bebidas",
        descripcion: "Vino tinto de la región con cuerpo y sabor excepcional.",
        imagen: "./imagenesRestaurante/vino.jpeg"
    },
    {
        id: 12,
        nombre: "Ron blanco",
        precio: 18000,
        categoria: "Bebidas",
        descripcion: "Ron blanco",
        imagen: "./imagenesRestaurante/ron.jpeg"
    },
    
];

// 2. Selección de elementos del DOM
const contenedor = document.getElementById('contenedor-menu');

// 3. Función principal para renderizar el menú
function renderizarMenu(listaPlatos) {
    // Limpiamos el contenedor
    contenedor.innerHTML = "";

    // Mapeamos los objetos para crear el HTML
    listaPlatos.forEach(plato => {
        const card = document.createElement('div');
        card.className = 'card-plato';
        
        card.innerHTML = `
            <div class="imagen-container">
                <img src="${plato.imagen}" alt="${plato.nombre}">
                <span class="tag-categoria">${plato.categoria}</span>
            </div>
            <div class="info-plato">
                <h3>${plato.nombre}</h3>
                <p class="descripcion">${plato.descripcion}</p>
                <div class="footer-card">
                    <span class="precio">$${plato.precio.toLocaleString()}</span>
                    
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// 4. Función para filtrar por categoría
function filtrarMenu(categoria) {
    if (categoria === 'Todos') {
        renderizarMenu(platos);
    } else {
        const filtrados = platos.filter(p => p.categoria === categoria);
        renderizarMenu(filtrados);
    }
    
    // Feedback visual en botones
    actualizarBotones(categoria);
    
    // Scroll suave a la sección de menú
    document.getElementById('contenedor-menu').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function actualizarBotones(categoriaActiva) {
    const botones = document.querySelectorAll('.btn-filtro');
    botones.forEach(btn => {
        const esActivo = btn.innerText === categoriaActiva || 
                        (categoriaActiva === 'Todos' && btn.innerText === 'Todos');
        btn.classList.toggle('active', esActivo);
    });
}

// 5. Inicializar la página mostrando todo
document.addEventListener('DOMContentLoaded', () => renderizarMenu(platos));

// 6. Función para descargar el menú como TXT
function descargarMenu() {
    // Crear contenido del menú
    let contenido = 'COMELONES\n';
    contenido += 'Restaurante Gourmet\n';
    contenido += '='.repeat(50) + '\n\n';
    contenido += 'Calle Gastronómica #123, Bucaramanga\n';
    contenido += 'Teléfono: +57 123 456 7890\n';
    contenido += 'Email: info@comelones.com\n';
    contenido += '\n' + '='.repeat(50) + '\n\n';

    // Agrupar platos por categoría
    const categorias = ['Entradas', 'Platos Fuertes', 'Bebidas'];
    
    categorias.forEach(categoria => {
        const platosPorCategoria = platos.filter(p => p.categoria === categoria);
        if (platosPorCategoria.length > 0) {
            contenido += `\n${categoria.toUpperCase()}\n`;
            contenido += '-'.repeat(50) + '\n\n';
            platosPorCategoria.forEach(plato => {
                contenido += `${plato.nombre}\n`;
                contenido += `${plato.descripcion}\n`;
                contenido += `Precio: $${plato.precio.toLocaleString()}\n\n`;
            });
        }
    });

    // Crear blob y descargar
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const enlace = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    enlace.setAttribute('href', url);
    enlace.setAttribute('download', 'Menu_Comelones.txt');
    enlace.style.visibility = 'hidden';
    
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    
    // Mostrar mensaje de confirmación
    alert('¡Menú descargado exitosamente!\n\nArchivo: Menu_Comelones.txt');
}

// ===== CARRUSEL DE EVENTOS (Nuestra Cocina) =====
let currentEventoIndex = 0;
const slidesEventos = document.querySelectorAll('.slide-evento');
const dotsEventos = document.querySelectorAll('.dot-evento');

function mostrarSlideEvento(n) {
    if (slidesEventos.length === 0) return;
    
    // Quitar clase active de todos
    slidesEventos.forEach(slide => slide.classList.remove('active'));
    dotsEventos.forEach(dot => dot.classList.remove('active'));
    
    // Ajustar índice
    currentEventoIndex = (n + slidesEventos.length) % slidesEventos.length;
    
    // Activar slide y dot
    slidesEventos[currentEventoIndex].classList.add('active');
    dotsEventos[currentEventoIndex].classList.add('active');
}

function cambiarSlideEvento(n) {
    mostrarSlideEvento(currentEventoIndex + n);
}

function seleccionarSlideEvento(n) {
    mostrarSlideEvento(n);
}

// Auto-cambio cada 7 segundos
let autoSlideEvento = setInterval(() => {
    cambiarSlideEvento(1);
}, 7000);

// Pausar auto-cambio si el usuario interactúa
const carruselEventos = document.querySelector('.carrusel-eventos');
if (carruselEventos) {
    carruselEventos.addEventListener('mouseenter', () => {
        clearInterval(autoSlideEvento);
    });
    
    carruselEventos.addEventListener('mouseleave', () => {
        autoSlideEvento = setInterval(() => {
            cambiarSlideEvento(1);
        }, 7000);
    });
}
// ===== SISTEMA DE RESEÑAS =====
// Array para almacenar las reseñas
let resenas = [];

// Inicializar el sistema de reseñas
document.addEventListener('DOMContentLoaded', function() {
    // Cargar reseñas desde el servidor
    cargarResenas();
    
    // Inicializar formulario si existe
    if (document.getElementById('form-nueva-resena')) {
        inicializarSistemaResenas();
    }
});

// Función para cargar reseñas desde el servidor
async function cargarResenas() {
    try {
        const response = await fetch('http://localhost:5000/api/resenas');
        const data = await response.json();
        resenas = data || [];
        renderizarResenas();
        actualizarEstadisticas();
    } catch (error) {
        console.error('Error al cargar reseñas:', error);
        alert('No se pudieron cargar las reseñas. Asegúrate que el servidor esté corriendo.');
    }
}

// Función para inicializar el sistema
function inicializarSistemaResenas() {
    // Event listeners para las estrellas
    const estrellas = document.querySelectorAll('.stars-input .star');
    const inputCalificacion = document.querySelector('.calificacion-input');
    const textoCalificacion = document.querySelector('.calificacion-texto');
    
    estrellas.forEach(estrella => {
        // Al hacer hover
        estrella.addEventListener('mouseenter', function() {
            const valor = this.getAttribute('data-value');
            estrellas.forEach((e, index) => {
                if (index < valor) {
                    e.classList.add('activa');
                } else {
                    e.classList.remove('activa');
                }
            });
        });
        
        // Al hacer click
        estrella.addEventListener('click', function() {
            const valor = this.getAttribute('data-value');
            inputCalificacion.value = valor;
            textoCalificacion.textContent = `Excelente (${valor}/5)`;
            textoCalificacion.style.color = '#D4AF37';
            
            estrellas.forEach((e, index) => {
                if (index < valor) {
                    e.classList.add('activa');
                } else {
                    e.classList.remove('activa');
                }
            });
        });
    });
    
    // Reset de estrellas al salir del contenedor
    const starsContainer = document.querySelector('.stars-input-container');
    starsContainer.addEventListener('mouseleave', function() {
        const valorGuardado = inputCalificacion.value;
        estrellas.forEach((e, index) => {
            if (index < valorGuardado) {
                e.classList.add('activa');
            } else {
                e.classList.remove('activa');
            }
        });
    });
    
    // Manejador para enviar la reseña
    const formulario = document.getElementById('form-nueva-resena');
    formulario.addEventListener('submit', agregarResena);
    
    // Cargar reseñas desde la base de datos
    cargarResenasDelServidor();
}

// Función para cargar reseñas del servidor
async function cargarResenasDelServidor() {
    try {
        const response = await fetch('http://localhost:5000/api/resenas');
        const datos = await response.json();
        
        if (response.ok && datos.resenas) {
            // El servidor devuelve un objeto con array de reseñas
            if (Array.isArray(datos.resenas) && datos.resenas.length > 0) {
                resenas = datos.resenas.map(resena => ({
                    id: resena._id,
                    nombre: resena.nombre,
                    email: resena.email,
                    comentario: resena.comentario,
                    calificacion: resena.calificacion,
                    fecha: new Date(resena.creadaEn)
                }));
                
                console.log('✅ Reseñas cargadas del servidor:', resenas.length);
            } else {
                console.log('No hay reseñas en la base de datos aún');
                resenas = [];
            }
            
            // Renderizar reseñas y actualizar estadísticas
            renderizarResenas();
            actualizarEstadisticas();
        } else {
            console.log('Error al cargar reseñas del servidor');
            renderizarResenas();
            actualizarEstadisticas();
        }
    } catch (error) {
        console.warn('Advertencia: No se pudieron cargar las reseñas del servidor. Usando reseñas locales.');
        console.error('Error:', error);
        // Usar reseñas locales si el servidor no está disponible
        renderizarResenas();
        actualizarEstadisticas();
    }
}

// Función para agregar una nueva reseña
async function agregarResena(e) {
    e.preventDefault();
    
    const nombre = document.querySelector('.input-nombre').value.trim();
    const email = document.querySelector('.input-email').value.trim();
    const comentario = document.querySelector('.textarea-comentario').value.trim();
    const calificacion = parseInt(document.querySelector('.calificacion-input').value);
    
    // Validar que se haya seleccionado una calificación
    if (calificacion === 0) {
        alert('Por favor, selecciona una calificación con las estrellas.');
        return;
    }
    
    // Validar que haya nombre y comentario
    if (!nombre || !comentario) {
        alert('Por favor completa todos los campos requeridos.');
        return;
    }
    
    // Crear objeto de reseña
    const nuevaResena = {
        id: resenas.length + 1,
        nombre: nombre,
        comentario: comentario,
        calificacion: calificacion,
        fecha: new Date()
    };
    
    // Agregar a la lista
    resenas.unshift(nuevaResena);
    
    // Limpiar el formulario
    document.querySelector('.input-nombre').value = '';
    document.querySelector('.input-email').value = '';
    document.querySelector('.textarea-comentario').value = '';
    document.querySelector('.calificacion-input').value = '0';
    
    // Resetear estrellas
    document.querySelectorAll('.stars-input .star').forEach(e => e.classList.remove('activa'));
    document.querySelector('.calificacion-texto').textContent = 'Selecciona tu experiencia';
    document.querySelector('.calificacion-texto').style.color = '#888';
    
    // Mostrar animación de éxito
    const boton = e.target.querySelector('.btn-publicar-resena');
    const textoOriginal = boton.innerHTML;
    boton.innerHTML = '<i class="fas fa-check"></i> ¡Reseña Publicada!';
    boton.style.background = 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)';
    
    setTimeout(() => {
        boton.innerHTML = textoOriginal;
        boton.style.background = '';
        // Renderizar reseñas y actualizar estadísticas
        renderizarResenas();
        actualizarEstadisticas();
    }, 2000);
}

// Función para renderizar todas las reseñas
function renderizarResenas() {
    const contenedor = document.getElementById('contenedor-resenas');
    
    if (resenas.length === 0) {
        contenedor.innerHTML = `
            <div class="sin-resenas">
                <i class="fas fa-comments"></i>
                <p>Aún no hay reseñas. ¡Sé el primero en compartir tu experiencia!</p>
            </div>
        `;
        return;
    }
    
    // Limpiar contenedor
    contenedor.innerHTML = '';
    
    // Renderizar cada reseña
    resenas.forEach(resena => {
        const estrellas = '★'.repeat(resena.calificacion) + '☆'.repeat(5 - resena.calificacion);
        const fecha = formatearFecha(resena.creadaEn || resena.fecha);
        
        const tarjetaResena = document.createElement('div');
        tarjetaResena.className = 'resena-card';
        tarjetaResena.innerHTML = `
            <div class="resena-header">
                <span class="resena-nombre">${resena.nombre}</span>
                <span class="resena-estrellas">${estrellas}</span>
            </div>
            <p class="resena-comentario">${resena.comentario}</p>
            <span class="resena-fecha">${fecha}</span>
        `;
        contenedor.appendChild(tarjetaResena);
    });
}

// Función para actualizar estadísticas
function actualizarEstadisticas() {
    const totalResenas = resenas.length;
    const sumaCalificaciones = resenas.reduce((sum, r) => sum + r.calificacion, 0);
    const promedioCalificacion = totalResenas > 0 ? (sumaCalificaciones / totalResenas).toFixed(1) : 0;
    
    const elementoTotal = document.getElementById('total-resenas');
    const elementoPromedio = document.getElementById('promedio-calificacion');
    
    if (elementoTotal) {
        elementoTotal.textContent = totalResenas;
    }
    if (elementoPromedio) {
        elementoPromedio.textContent = promedioCalificacion;
    }
}

// Función para formatear la fecha
function formatearFecha(fecha) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
}

// ===== SISTEMA DE RESERVAS =====
// Inicializar el formulario de reserva
document.addEventListener('DOMContentLoaded', function() {
    const formularioReserva = document.querySelector('.form-reserva');
    if (formularioReserva) {
        formularioReserva.addEventListener('submit', enviarReserva);
    }
});

// Función para enviar la reserva al servidor
async function enviarReserva(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = document.querySelector('.form-reserva input[type="text"]').value.trim();
    const email = document.querySelector('.form-reserva input[type="email"]').value.trim();
    const telefono = document.querySelector('.form-reserva input[type="tel"]').value.trim();
    const inputs = document.querySelectorAll('.form-reserva input[type="date"]');
    const fecha = inputs[0].value;
    const hora = document.querySelectorAll('.form-reserva input[type="time"]')[0].value;
    
    const selects = document.querySelectorAll('.form-reserva select');
    const personas = selects[0].value;
    const tipoMesa = selects[1].value;
    const ocasion = selects[2].value;
    
    const preferencias = document.querySelector('.form-reserva textarea').value.trim();
    const autorizacion = document.querySelector('.form-reserva input[type="checkbox"]').checked;

    // Validar campos requeridos
    if (!nombre || !email || !telefono || !fecha || !hora || !personas) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }

    if (!autorizacion) {
        alert('Debes autorizar el contacto para confirmar la reserva');
        return;
    }

    // Mostrar cargando
    const boton = e.target.querySelector('button[type="submit"]');
    const textoOriginal = boton.textContent;
    boton.textContent = 'Enviando...';
    boton.disabled = true;

    try {
        // Enviar datos al servidor
        const response = await fetch('http://localhost:5000/api/reservas/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                email,
                telefono,
                fecha,
                hora,
                personas,
                tipoMesa,
                ocasion,
                preferencias,
                autorizacion
            })
        });

        const datos = await response.json();

        if (datos.success) {
            // Mostrar mensaje de éxito
            boton.textContent = '✅ ¡Reserva Confirmada!';
            boton.style.background = 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)';
            
            // Limpiar formulario
            document.querySelector('.form-reserva').reset();

            // Volver al estado normal después de 3 segundos
            setTimeout(() => {
                boton.textContent = textoOriginal;
                boton.style.background = '';
                boton.disabled = false;
            }, 3000);

            alert(datos.message || '¡Reserva realizada exitosamente!');
        } else {
            alert(datos.message || 'Error al procesar la reserva');
            boton.textContent = textoOriginal;
            boton.disabled = false;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor. Asegúrate de que esté corriendo (npm start)');
        boton.textContent = textoOriginal;
        boton.disabled = false;
    }
}
