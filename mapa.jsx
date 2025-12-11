import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Mapa() {
  return (
    <div className="h-screen w-full">
      <MapContainer center={[4.6097, -74.0817]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[4.6097, -74.0817]}>
          <Popup>Ejemplo de punto en Bogotá</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
