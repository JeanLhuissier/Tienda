# Tienda-libreria
# 📚 Tienda Librería – API / Web

Aplicación web completa y escalable construida con **Node.js**, diseñada para la gestión y venta de productos de una librería: libros, autores, categorías y más.

---

## ✨ Características Principales

### 🔹 Arquitectura Modular (MVC)
Separación clara en **controllers**, **models**, **routes**, **middlewares**, etc.

### 🔹 API RESTful
Endpoints bien estructurados para operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar).

### 🔹 Autenticación y Autorización
Uso de middlewares personalizados para proteger rutas y validar accesos.

### 🔹 Gestión de Base de Datos
Modelos y **seeders** incluidos para poblar la base de datos con datos reales o de prueba.

---

## 💻 Tecnologías Utilizadas

| Categoría          | Tecnología / Herramienta                       | Descripción |
|--------------------|------------------------------------------------|-------------|
| Backend            | Node.js                                        | Entorno de ejecución de JS |
| Framework          | Express.js *(inferido)*                        | Framework minimalista para construir la API |
| Base de Datos      | MongoDB / PostgreSQL / MySQL                   | **(Completar según tu proyecto real)** |
| ORM / ODM          | Mongoose / Sequelize                           | **(Completar según tu proyecto real)** |
| Frontend           | EJS / Pug / Handlebars *(inferido por /views)* | Motor de plantillas para renderizar vistas |
| Gestión de Paquetes| npm                                            | Administrador de dependencias |

> 🔧 **Nota:** Completa la base de datos y ORM/ODM que realmente uses.

---

## ⚙️ Estructura del Proyecto

```bash
├── config/             # Archivos de configuración
├── controllers/        # Lógica de negocio / Controladores de rutas
├── middlewares/        # Autenticación, validaciones, etc.
├── models/             # Modelos y esquemas de la BD
├── node_modules/       # Dependencias (IGNORADO en Git)
├── public/             # Archivos estáticos (CSS, JS, imágenes)
├── routes/             # Definición de rutas
├── seeders/            # Scripts para poblar la BD con datos de prueba
├── utils/              # Funciones auxiliares y helpers
├── views/              # Templates del frontend
├── .env                # Variables de entorno (IGNORADO por Git)
├── package.json        # Dependencias y configuración del proyecto
└── server.js           # Punto de entrada de la aplicación


# 🛠️ Instalación y Ejecución

## ✅ Prerrequisitos

Asegúrate de tener instalado:

Node.js (versión 14 o superior)
Git

## 📥 1. Clonar el Repositorio

git clone https://github.com/JeanLhuissier/Tienda.git
cd Tienda

## 📦 2. Instalar Dependencias

npm install

## 🔐 3. Configurar Variables de Entorno

Crea un archivo .env en la raíz del proyecto con:

NODE_ENV=development
PORT=5000
MONGO_URI=    # O la cadena de tu base de datos
JWT_SECRET=tuclave_ultrasecreta

Reemplaza los valores según tu configuración real.

## ▶️ 4. Ejecutar el Servidor

Modo desarrollo (si usas nodemon):
npm run dev

Modo normal:
node server.js

Servidor corriendo en:

👉 http://localhost:5000
(o el puerto configurado en tu .env)
