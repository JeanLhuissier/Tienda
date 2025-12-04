const path = require('path');
const express = require('express');
const sequelize = require('./config/database');
const inicializarLibros = require('./seeders/libros.seeders');
const routerUsuarios = require('./routes/usuarios.router');
const routerLibros = require('./routes/libros.routers');
const { errorAutenticacionMdw } = require('./middlewares/seguridad.middleware');
const erroresMdw = require('./middlewares/errores.middleware');
const ErrorExtendido = require('./utils/ErrorExtendido');

const PORT = 8080;

const app = express();
const { engine } = require('express-handlebars');

// Configuración como Motor de Plantillas
app.engine('hbs', engine({
    extname: '.hbs',           // Define la extensión de los archivos de plantilla
    defaultLayout: 'main',     // Define el layout principal (contenedor de todas las vistas)
    layoutsDir: path.join(__dirname, 'views', 'layouts'), // Directorio de layouts
    partialsDir: path.join(__dirname, 'views', 'partials')  // Directorio de partials (componentes reutilizables)
}));

// Establece Handlebars como el motor de vistas de Express
app.set('view engine', 'hbs'); 

// Definir dónde están los archivos de vistas
app.set('views', path.join(__dirname, 'views'));

// Middleware contenido estático
app.use(express.static("public"));

// Middleware recibir JSON en req
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.render("home", { title: "Bienvenido a la Librería de Jean" });
});

// Rutas de Autenticación
app.use('/usuarios', routerUsuarios);

// Rutas de Libros y Compras
app.use('/libros', routerLibros);

app.all("/{*ruta}", (req, res, next) => {
  const ruta = req.originalUrl;
  const error = new ErrorExtendido(`Recurso (${req.method})${ruta} no encontrado`,'Error 404 Not Found', 404);
  return res.status(error.statusCode).render("error", { title: 'Error', error: error });
});

// Middleware de manejo de errores de JWT
app.use(errorAutenticacionMdw);

// Middleware de manejo de errores
app.use(erroresMdw);

async function iniciarServidor() {
    try {
        // { force: true } elimina y recrear las tablas.
        // { force: false } para no eliminar datos existentes.
        const force = true;

        await sequelize.authenticate();
        console.log('\nConexión exitosa a la Base de Datos.');
        
        // Crear las tablas (si no existen)

        await sequelize.sync({ force: force }); 
        console.log('Sincronización Modelo/BD realizada');
        
        if (force === true)
            await inicializarLibros(); // Cargar Libros en base de datos

        // Iniciar servidor para escuchar peticiones del puerto definido en PORT
        app.listen(PORT, () => {
            console.log(`Servidor iniciado en http://localhost:${PORT}`);
        });

    } catch (error) {
        // Manejo de errores críticos de la DB que impiden el inicio
        console.error('Error al iniciar la aplicación:', error.message);
        process.exit(1); 
    }
}

// Ejecutar la función de inicio
iniciarServidor();