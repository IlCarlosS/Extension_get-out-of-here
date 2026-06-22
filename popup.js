document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('url-input');
  const addBtn = document.getElementById('add-btn');
  const urlList = document.getElementById('url-list');

  // Cargar la lista guardada al abrir el popup
  loadUrls();

  // Eventos para añadir elementos
  addBtn.addEventListener('click', addUrl);
  urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addUrl();
  });

  function loadUrls() {
    browser.storage.local.get({ blockedUrls: [] }).then((result) => {
      renderList(result.blockedUrls);
    });
  }

  function addUrl() {
    const value = urlInput.value.trim().toLowerCase();
    if (!value) return;

    browser.storage.local.get({ blockedUrls: [] }).then((result) => {
      const currentList = result.blockedUrls;
      // Evitar duplicados
      if (!currentList.includes(value)) {
        currentList.push(value);
        browser.storage.local.set({ blockedUrls: currentList }).then(() => {
          renderList(currentList);
          urlInput.value = ''; // Limpiar input
        });
      }
    });
  }

  function deleteUrl(urlToDelete) {
    browser.storage.local.get({ blockedUrls: [] }).then((result) => {
      const updatedList = result.blockedUrls.filter(url => url !== urlToDelete);
      browser.storage.local.set({ blockedUrls: updatedList }).then(() => {
        renderList(updatedList);
      });
    });
  }

  function renderList(list) {
    urlList.innerHTML = '';
    
    if (list.length === 0) {
      urlList.innerHTML = '<li class="list-item" style="color: #6b7280; font-style: italic;">Ningún enlace bloqueado</li>';
      return;
    }

    list.forEach((url) => {
      const li = document.createElement('li');
      li.className = 'list-item';
      
      const textSpan = document.createElement('span');
      textSpan.textContent = url;
      
      const delBtn = document.createElement('button');
      delBtn.className = 'delete-btn';
      delBtn.textContent = '✕';
      delBtn.title = 'Eliminar';
      delBtn.addEventListener('click', () => deleteUrl(url));

      li.appendChild(textSpan);
      li.appendChild(delBtn);
      urlList.appendChild(li);
    });
  }
});