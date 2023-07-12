import React, { useRef, useEffect, useState } from "react";

import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import * as Style from "./Style";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHVuazYyMzMiLCJhIjoiY2sxMWp5a2h1MGhnazNiczd5ZTllcmJncyJ9.NnnOxXKm_rBXH4AeZ32xcA";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(120.3089429);
  const [lat, setLat] = useState(22.6497724);
  const [zoom, setZoom] = useState(15);

  //   const successHandler = (position: any) => {
  //     console.log(position.coords);
  //     setLng(position.coords.longitude);
  //     setLat(position.coords.latitude);
  //   };

  //   const errorHandler = (err: any) => {
  //     console.log(err);
  //   };

  //   useEffect(() => {
  //     if ("geolocation" in navigator) {
  //       console.log(navigator.geolocation);
  //       navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
  //         enableHighAccuracy: true,
  //         timeout: 5000,
  //         maximumAge: 0,
  //       });
  //     } else {
  //       alert("你的裝置或瀏覽器不支援定位功能");
  //     }
  //   }, []);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <div>
      <Style.MapDiv ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
