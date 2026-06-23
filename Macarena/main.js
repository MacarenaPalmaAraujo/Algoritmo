
const urlAPI = "https://raw.githubusercontent.com/MacarenaPalmaAraujo/gossip/refs/heads/main/personajes.json";
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
      inputBusqueda.data = data; 
      
      contenedor.innerHTML = "";
      
      for (let i = 0; i < data.length; i++) {
        inyectarTarjetaEnGrilla(data[i]);
      }
    })
    .catch(error => {
      console.error("Error de Gossip Girl Intercept (Fetch):", error);
      contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #ff2a6d;">Gossip Girl está fuera de servicio temporalmente.</p>`;
    });
}

function inyectarTarjetaEnGrilla(p) {
  const contenedor = document.getElementById("ConteinerCard");
  
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
}

// 3. BUSCADOR POR ID: Usa XMLHttpRequest consultando los datos del input (IGUAL AL PROFE)
function buscarObjetivoLocal() {
  const tarjetas = document.getElementById("ConteinerCard");
  const inputBusqueda = document.getElementById("idObjetivo");
  
  const data = inputBusqueda.data;
  
  const busqueda = parseInt(inputBusqueda.value) - 1;

  if (busqueda >= 0 && busqueda < data.length) {
    tarjetas.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #ff2a6d; font-style: italic;">Rastreando objetivo con XMLHttpRequest...</p>`;

    const objXMLHttpRequest = new XMLHttpRequest();
    
    objXMLHttpRequest.onreadystatechange = function () {
      if (objXMLHttpRequest.readyState === 4) {
        if (objXMLHttpRequest.status === 200) {
          const datosCompletos = JSON.parse(objXMLHttpRequest.responseText);
          
          const victima = datosCompletos[busqueda];
        
          tarjetas.innerHTML = "";
          inyectarTarjetaEnGrilla(victima);
        } else {
          alert("Error Code: " + objXMLHttpRequest.status);
        }
      }
    };

    objXMLHttpRequest.open("GET", urlAPI, true);
    objXMLHttpRequest.send();
    
  } else {
    alert("Debe ingresar un número de ID de 1 a 60 para obtener un personaje válido de la elite.");
  }
}
