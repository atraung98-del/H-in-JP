import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function LeafletMap() {
  return (
    <MapContainer
      center={[35.6895, 139.6917]}
      zoom={12}
      style={{
        height: "300px",
        width: "100%",
        position:"relative",
      }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap &copy; CARTO'
  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <Marker position={[35.6895, 139.6917]}>
        <Popup>
          Tokyo
        </Popup>
      </Marker>
    </MapContainer>
  );
}