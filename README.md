# Esteban Medina Full Frontend

Este es un proyecto frontend construido con React, TypeScript y Vite, que integra la API de Spotify para buscar artistas, ver detalles y administrar álbumes guardados.

## 🚀 Tecnologías Utilizadas

- **Framework:** React con TypeScript
- **Herramienta de Construcción:** Vite
- **API:** Spotify Web API
- **Estilos:** Tailwind CSS
- **Pruebas:** Jest y React Testing Library
- **Routing:** React Router

## 📋 Requisitos Previos

- **Node.js:** Asegúrate de tener instalada la versión 16 o superior. Puedes descargarla desde [aquí](https://nodejs.org/).
- **Cuenta de Spotify:** Necesaria para la autenticación y uso de la API.

## 🔧 Instalación

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/men7ar31/men7ar31-esteban_medina_full-frontend.git
cd men7ar31-esteban_medina_full-frontend
```

### 2️⃣ Instalar Dependencias

```bash
npm install
```

### 3️⃣ Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_SPOTIFY_CLIENT_ID=tu_client_id
VITE_SPOTIFY_CLIENT_SECRET=tu_client_secret
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/callback
```

## 🚀 Ejecución del Proyecto

Para iniciar la aplicación en modo desarrollo:

```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:5173/`.

## ✅ Pruebas

Para ejecutar los tests:

```bash
npm run test
```

Los tests se encuentran en la carpeta `tests` y usan `Jest` + `React Testing Library`.
 
📌 **Código relacionado**: [Test de búsqueda](src/tests/Search.test.tsx)  

### 📌 Tecnologías usadas en los tests  
- **React Testing Library** para renderizado y eventos.  
- **Jest** para mocks y validación de errores.  
- **Simulación de Fetch** para manejar respuestas de la API. 

## Manejo de Errores  
El proyecto maneja errores de red y estado offline de la siguiente manera:  
- **Detección de conexión**: Se usa un custom hook `useOffline` para verificar si el usuario está sin conexión.  
- **Errores de API**: Se captura y maneja errores HTTP como respuestas vacías, `404`, o fallos de red.  
- **Mensajes de error**: Se notifica al usuario en caso de fallos mediante alertas o mensajes en pantalla.  

📌 **Código relacionado**: [Hook useOffline](src/hooks/useOffline.ts)  

---

## 📦 Construcción y Despliegue

Para generar la versión de producción:

```bash
npm run build
```

Para desplegar en [Vercel](https://vercel.com/) o [Netlify](https://www.netlify.com/):

```bash
npm run deploy
```

## 🌐 Despliegue

El proyecto ha sido desplegado en **Vercel** o **Netlify**.  
URL de la demo: [🔗 Próximamente](#)

## 👤 Contacto

- **Autor:** Esteban Nicolás Medina
- **Correo:** [medinanico93@gmail.com](mailto:medinanico93@gmail.com)
- **LinkedIn:** [Perfil](https://www.linkedin.com/in/esteban-nicolas-medina-men/)