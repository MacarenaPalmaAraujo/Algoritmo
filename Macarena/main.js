// Tu URL real de GitHub conectada mediante AJAX
const urlAPI = "https://raw.githubusercontent.com/MacarenaPalmaAraujo/gossip/refs/heads/main/personajes.json";

// Esta variable global guardará los personajes descargados de internet
let basePersonajes = [];

// Función para renderizar el array de personajes en la grilla premium
function renderizarTarjetas(lista) {
  const contenedor = document.getElementById("ConteinerCard");
  contenedor.innerHTML = ""; // Limpiamos la grilla anterior

  if (lista.length === 0) {
    contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #8e8e8e; font-style: italic;">No hay registros de ningún escándalo que coincida con ese ID...</p>`;
    return;
  }

  lista.forEach(p => {
    const tarjetaHTML = `
      <div class="gossip-post-card">
        <div class="card-img-container">
          <img src="${p.img}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=500'">
          <span class="spotted-badge"> SPOTTED: ${p.spotted || 'Desconocido'}</span>
        </div>
        <div class="card-body">
          <h2 class="card-alias">${p.name} (${p.alias || 'S/A'})</h2>
          
          <p style="color: #dfb743; font-size: 0.9rem; margin-top: 5px; font-weight: 300;">
            Interpretado por: <strong>${p.actor || 'Desconocido'}</strong>
          </p>

          <span class="scandal-status">STATUS: ${p.status}</span>
          <p class="scandal-text">"${p.scandal}"</p>
          <div class="tech-intercept">
            <p><strong> Interceptación Tecnológica:</strong></p>
            <p> Email: ${p.email || 'No disponible'}</p>
            <p> Web: ${p.website || 'No disponible'}</p>
            <p> Ciudad: ${p.city || 'Manhattan'}</p>
          </div>
        </div>
      </div>
    `;
    contenedor.innerHTML += tarjetaHTML;
  });
}

// 1. PETICIÓN CON FETCH: Carga todo el elenco al iniciar
function cargarPersonajesLocales() {
  const contenedor = document.getElementById("ConteinerCard");
  contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #dfb743; font-style: italic;">Interceptando base de datos de la elite con Fetch...</p>`;
  
  const inputBusqueda = document.getElementById("idObjetivo");
  if (inputBusqueda) inputBusqueda.value = "";

  fetch(urlAPI)
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo obtener el reporte confidencial");
      }
      return response.json();
    })
    .then(data => {
      basePersonajes = data; 
      renderizarTarjetas(basePersonajes); 
    })
    .catch(error => {
      console.error("Error de Gossip Girl Intercept (Fetch):", error);
      contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #ff2a6d;">Gossip Girl está fuera de servicio temporalmente. Intentalo más tarde.</p>`;
    });
}

// 2. PETICIÓN CON XMLHTTPREQUEST: Busca el objetivo por ID de forma asincrónica tradicional
function buscarObjetivoLocal() {
  const idBuscado = parseInt(document.getElementById("idObjetivo").value);
  const contenedor = document.getElementById("ConteinerCard");

  if (isNaN(idBuscado)) {
    alert("Por favor, ingresá un número de ID válido.");
    return;
  }

  contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #ff2a6d; font-style: italic;">Rastreando ID con XMLHttpRequest...</p>`;

  // Instanciamos el objeto clásico de AJAX
  const xhr = new XMLHttpRequest();
  
  xhr.open("GET", urlAPI, true);

  xhr.onreadystatechange = function () {
    // Si la petición terminó (4) y fue exitosa (200)
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const datos = JSON.parse(xhr.responseText);
        
        // Filtramos el personaje que tenga el ID solicitado
        const resultado = datos.filter(p => p.id === idBuscado);
        
        // Renderizamos la tarjeta encontrada
        renderizarTarjetas(resultado);
      } else {
        console.error("Error de Gossip Girl Intercept (XHR):", xhr.statusText);
        contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #ff2a6d;">Error al espiar por ID.</p>`;
      }
    }
  };

  xhr.send();
}