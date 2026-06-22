// Variable para mantener la lista actualizada en la página actual
let currentBlockedUrls = [];

// Cargar la lista inicial al abrir la página
browser.storage.local.get({ blockedUrls: [] }).then((result) => {
  currentBlockedUrls = result.blockedUrls;
});

// Escuchar si el usuario añade o elimina URLs en el popup sin tener que recargar la página
browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.blockedUrls) {
    currentBlockedUrls = changes.blockedUrls.newValue;
  }
});

// Interceptar los clics en toda la página (Fase de captura)
document.addEventListener('click', (event) => {
  // Si la lista está vacía
  if (currentBlockedUrls.length === 0) return;

  // Buscar si el clic se hizo dentro de una etiqueta <a>
  const link = event.target.closest('a');
  
  // Si no es un enlace o no tiene href
  if (!link || !link.href) return;
  const hrefToCheck = link.href.toLowerCase();

  // Comprobar si la URL del enlace contiene alguna de las palabras bloqueadas
  const isBlocked = currentBlockedUrls.some(blockedUrl => {
    // blockedUrl
    return hrefToCheck.includes(blockedUrl.toLowerCase());
  });

  // Si coincide con nuestra lista negra, neutralizamos el clic
  if (isBlocked) {
    event.preventDefault();    // Evita que el navegador vaya a la URL
    event.stopPropagation();   // Evita que el JS de la página procese el clic

    // aviso en consola
    console.log(`[Get out of here] Enlace neutralizado: ${link.href}`);
  }
}, true); // El 'true' activa la fase de captura, asegurando que interceptamos antes que nadie