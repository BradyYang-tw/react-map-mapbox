import React, { useRef, useEffect, useState } from "react";

import mapboxgl, { Map } from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import * as Style from "./Style";

// eslint-disable-next-line operator-linebreak
mapboxgl.accessToken =
  "pk.eyJ1IjoicHVuazYyMzMiLCJhIjoiY2sxMWp5a2h1MGhnazNiczd5ZTllcmJncyJ9.NnnOxXKm_rBXH4AeZ32xcA";

const TrafficMap = () => {
  const mapContainer = useRef(null);
  const map = useRef<Map | null>(null);
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
      zoom,
    });

    // Add some controls to the map
    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.addControl(new mapboxgl.FullscreenControl());

    // Create a new marker.
    new mapboxgl.Marker({
      color: "red",
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(map.current);
  });

  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on("move", () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  // });

  return (
    <Style.Container>
      <Style.sidebar>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </Style.sidebar>
      <Style.MapDiv ref={mapContainer} className="map-container" />
    </Style.Container>
  );
};

export default TrafficMap;
