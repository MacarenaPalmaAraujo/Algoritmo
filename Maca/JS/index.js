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

// Función principal conectada al body (onload) que hace el fetch AJAX
function cargarPersonajesLocales() {
  const contenedor = document.getElementById("ConteinerCard");
  contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #dfb743; font-style: italic;">Interceptando base de datos de la elite...</p>`;
  
  // Limpiamos el input de búsqueda por comodidad
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
      basePersonajes = data; // Guardamos los datos de GitHub en nuestra variable
      renderizarTarjetas(basePersonajes); // Dibujamos todo el elenco
    })
    .catch(error => {
      console.error("Error de Gossip Girl Intercept:", error);
      contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #ff2a6d;">Gossip Girl está fuera de servicio temporalmente. Intentalo más tarde.</p>`;
    });
}

// Función adecuada para buscar por ID
function buscarObjetivoLocal() {
  const idBuscado = parseInt(document.getElementById("idObjetivo").value);

  if (isNaN(idBuscado)) {
    alert("Por favor, ingresá un número de ID válido.");
    return;
  }

  // Filtramos los personajes descargados para ver si coincide el ID
  const resultado = basePersonajes.filter(p => p.id === idBuscado);
  
  // Renderizamos solo la tarjeta que coincida
  renderizarTarjetas(resultado);
}