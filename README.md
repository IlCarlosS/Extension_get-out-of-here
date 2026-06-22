# Get out of here — Link Neutralizer

**Get out of here** es un complemento ligero para Mozilla Firefox diseñado para mejorar la productividad y mitigar las distracciones en la web. Permite a los usuarios definir una lista personalizada de palabras clave o dominios para neutralizar instantáneamente cualquier enlace (`<a>`) que coincida con ellos, impidiendo la navegación accidental o forzada hacia esos sitios.

## El Problema que Resuelve

Durante la navegación diaria o el desarrollo, es común encontrarse con entornos web saturados de enlaces engañosos, redirecciones molestas o ganchos de distracción masiva (redes sociales, secciones de noticias intrusivas, etc.). 

Esta extensión intercepta activamente los clics del usuario en la fase de captura del DOM. Si la dirección de destino del enlace contiene alguna de las cadenas registradas en la lista negra, el comportamiento por defecto y la propagación del evento se detienen por completo. El enlace se vuelve inofensivo sin necesidad de alterar visualmente la estructura de la página.

## Características Principales

- **Neutralización dinámica:** Bloquea enlaces estáticos y dinámicos (ideal para *Single Page Applications* con scroll infinito).
- **Coincidencia por subdirecciones:** Al ingresar un término (ej. `youtube.com`), se bloquea tanto el dominio principal como cualquier subruta interna (ej. `youtube.com/watch?...`).
- **Persistencia local:** Utiliza la API de almacenamiento nativa del navegador para recordar tus preferencias entre sesiones.
- **Sin intermediarios externos:** Todo el procesamiento ocurre de manera local y en tiempo real.
- **Diseño minimalista:** Interfaz fluida con un esquema visual oscuro enfocado en la usabilidad.

## Estructura del Proyecto

El proyecto está construido bajo el estándar moderno **Manifest V3**, utilizando tecnologías web nativas y prescindiendo de dependencias o preprocesadores pesados:

```t
get-out-of-here/
│
├── manifest.json     # Archivo de configuración y definición de permisos de la extensión.
├── popup.html        # Estructura de la interfaz de usuario del menú desplegable.
├── popup.css         # Estilos UI basados en CSS vanilla estructurado.
├── popup.js          # Lógica de la interfaz e interacción con el almacenamiento local.
└── content.js        # Script inyectado en el DOM encargado de interceptar y neutralizar eventos.

```

## Tecnologías Utilizadas
- JavaScript Vanilla (ES6+)
- HTML5 & CSS3 Puro
- WebExtensions API (browser.storage, browser.tabs)