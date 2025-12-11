// === Inicializar el mapa en Bogotá ===
const map = L.map('map').setView([4.7110, -74.0721], 12);

// Capa base OSM
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// === Cargar perros desde GeoJSON externo (con cache busting) ===
fetch('perros.geojson?t=' + new Date().getTime()) // Se agrega timestamp para evitar caché
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: (feature, latlng) => L.marker(latlng, {
        icon: L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
          iconSize: [32,32],
          iconAnchor: [16,32],
          popupAnchor: [0,-32]
        })
      }),
      onEachFeature: (feature, layer) => {
        const p = feature.properties;
        // Ajuste para soportar foto_url o foto
        const fotoSrc = p.foto_url || p.foto || "https://cdn-icons-png.flaticon.com/512/616/616408.png";
        const popupContent = `
          <div style="text-align:center; max-width:200px;">
            <h3 style="margin:5px 0; color:#007a7a;">🐾 ${p.nombre}</h3>
            <img src="${fotoSrc}" alt="Foto de ${p.nombre}" style="width:100%; border-radius:8px; margin-bottom:5px;">
            <p><b>Descripción:</b> ${p.descripcion}</p>
            <p><b>Contacto:</b> ${p.contacto}</p>
          </div>
        `;
        layer.bindPopup(popupContent);
      }
    }).addTo(map);
  })
  .catch(err => console.error("Error cargando GeoJSON:", err));


  // Icono personalizado
var perroIcon = L.icon({
    iconUrl: 'imagenes/icono.jpg', // icono para el marcador
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -30]
  });
  
  // Cargar la capa desde WFS de GeoServer
  fetch("http://localhost:8080/geoserver/geopets/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geopets:perros_perdidos&outputFormat=application/json")
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng){
        return L.marker(latlng, { icon: perroIcon });
      },
      onEachFeature: function(feature, layer){
        const props = feature.properties;
        layer.bindPopup(`
          <div style="font-family: Arial; font-size: 14px;">
            <h3>${props.nombre}</h3>
            <p><b>Descripción:</b> ${props.descripcion}</p>
            <p><b>Teléfono:</b> ${props.telefono}</p>
            <img src="perro_perdidos/${props.img}" 
                 alt="${props.nombre}" 
                 style="width:150px; border-radius:8px;">
          </div>
        `);
      }
    }).addTo(map);
  });

  
  var perroIcon = L.icon({
    iconUrl: 'imagenes/icono.jpg', // icono del marcador
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -30]
  });
  