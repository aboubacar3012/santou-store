"use client";
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
const ClientPosition = () => {
  const [position, setPosition] = useState<any>([43.300, 5.400]);

  useEffect(() => {
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 1000);

    const logo = document.querySelector(".leaflet-control-attribution");
    if (logo) {
      logo.remove();
    }
  }, []);
  if (window && typeof window !== "undefined")
    return (
      <MapContainer
        center={position}
        zoom={mapZoom}
        scrollWheelZoom={false}
        zoomControl={false}
        // style={{
        //   // position: "fixed",
        //   // top: 0,
        //   // left: 0,
        //   // width: "10%",
        //   // height: "10%",
        //   // zIndex: -1,
        //   width:"300px",
        //   height:"300px"
        // }}
        className="w-full h-32"
      >
        <TileLayer url="https://mt1.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" />
        <Marker position={position} >
        <Popup>
        Ma Position
      </Popup>
        </Marker>
        <ChangeView coords={position} />
      </MapContainer>
    );
  return null;
};

export default ClientPosition;
