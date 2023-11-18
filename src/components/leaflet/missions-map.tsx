import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { FaMapPin } from "react-icons/fa";

const mapZoom = 14;
export function ChangeView({ coords }: any) {
  const map = useMap();
  if (map) {
    map.setView(coords, mapZoom);
  }
  return null;
}
const MissionsMap = () => {
  const [position, setPosition] = useState<any>([9.509167, -13.712222]);

  useEffect(() => {
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 1000);

    const logo = document.querySelector(".leaflet-control-attribution");
    if (logo) {
      logo.remove();
    }
  }, []);
  if (typeof window !== "undefined")
    return (
      <MapContainer
        center={position}
        zoom={mapZoom}
        scrollWheelZoom={true}
        zoomControl={true}
        style={{
          position: "fixed",
          // top: 0,
          // left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <TileLayer url="https://mt1.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" />
        <Marker position={position}></Marker>
        <ChangeView coords={position} />
      </MapContainer>
    );
  return null;
};

export default MissionsMap;
