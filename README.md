# Tienda-libreria
📚 Tienda Librería API/WebUna aplicación web completa y escalable, construida con Node.js, diseñada para la gestión y venta de productos de una librería (libros, autores, categorías, etc.).✨ Características PrincipalesArquitectura Modular: Uso de controllers, models y routes para una clara separación de preocupaciones (MVC).API RESTful: Endpoints bien definidos para operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de recursos.Autenticación y Autorización: Implementación de middlewares de seguridad. (Inferencia basada en la carpeta middlewares).Gestión de Base de Datos: Configuración de modelos y seeders (datos de prueba).💻 Tecnologías UtilizadasLas siguientes tecnologías y herramientas se han utilizado para construir el proyecto:CategoríaTecnologíaDescripciónBackendNode.jsEntorno de ejecución de JavaScript del lado del servidor.FrameworkExpress.jsFramework minimalista y flexible para Node.js (Inferencia).Base de DatosMongoDB / PostgreSQL / MySQL[Añadir la base de datos específica que utilizas]ORM/ODMMongoose / Sequelize[Añadir el ORM/ODM específico que utilizas]Frontend(Vistas EJS, Pug, Handlebars, etc.)Renderizado de las vistas (Inferencia basada en la carpeta views).Gestión de PaquetesnpmAdministrador de paquetes de Node.js.⚙️ Estructura del ProyectoLa estructura del proyecto sigue un patrón modular y organizado:├── config/             # Archivos de configuración de la aplicación y base de datos.
├── controllers/        # Lógica de negocio, manejadores de peticiones.
├── middlewares/        # Funciones que se ejecutan antes de que la ruta llegue al controller (ej: autenticación).
├── models/             # Esquemas y modelos de la Base de Datos.
├── node_modules/       # Dependencias del proyecto (IGNORADAS por Git).
├── public/             # Archivos estáticos (CSS, JS del cliente, imágenes).
├── routes/             # Definición de las rutas de la API.
├── seeders/            # Scripts para poblar la base de datos con datos de prueba.
├── utils/              # Funciones de utilidad auxiliares.
├── views/              # Archivos de la interfaz de usuario (HTML/EJS/etc).
├── .env                # Variables de entorno (IGNORADO por seguridad).
├── package.json        # Metadatos y lista de dependencias.
└── server.js           # Punto de entrada principal de la aplicación.
🛠️ Instalación y EjecuciónSigue estos pasos para tener el proyecto funcionando en tu entorno local.PrerrequisitosAsegúrate de tener instalado lo siguiente:Node.js (versión 14 o superior recomendada)GitPasosClonar el RepositorioBashgit clone https://github.com/JeanLhuissier/Tienda.git
cd Tienda
Instalar DependenciasBashnpm install
Configurar Variables de EntornoCrea un archivo llamado .env en la raíz del proyecto. Copia el contenido del archivo de ejemplo (si existe) o añade las siguientes variables necesarias:Fragmento de códigoNODE_ENV=development
PORT=5000
MONGO_URI= # O la cadena de conexión de tu base de datos
JWT_SECRET=tuclaveultra_secreta # Solo si usas autenticación
Asegúrate de reemplazar los valores de ejemplo con tus configuraciones.Ejecutar el ServidorPara ejecutar el servidor en modo desarrollo (usando nodemon, si está instalado):Bashnpm run dev 
# O si no tienes script dev en package.json:
# node server.js
El servidor debería estar corriendo en http://localhost:5000 (o el puerto que configuraste).
