/* eslint-disable @typescript-eslint/indent */
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
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

  const [allTrafficData, setAllTrafficData] = useState<
    {
      CityName: string;
      RegionName: string;
      Address: string;
      DeptNm: string;
      BranchNm: string;
      Longitude: string;
      Latitude: string;
      direct: string;
      limit: string;
    }[]
  >([]);

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
  const getTrafficData = () => {
    axios
      .get("http://localhost:3000/rest/datastore/A01010000C-000674-011")
      .then((response) => {
        // handle success
        // console.log(response.data.result.records);
        const test = response.data.result.records;
        test.shift();
        console.log("test", test);
        setAllTrafficData(test);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  };
  useEffect(() => {
    getTrafficData();
  }, []);

  const createAllMarker = (f: Map) => {
    // show All Traffic Marker
    console.log("allTrafficData", allTrafficData);
    if (allTrafficData.length > 0) {
      allTrafficData.forEach((items) => {
        new mapboxgl.Marker({
          color: "red",
          draggable: true,
        })
          .setLngLat([parseFloat(items.Latitude), parseFloat(items.Longitude)])
          .addTo(f);
      });
    }
  };
  useEffect(() => {
    console.log("allTrafficData", allTrafficData);
    // if (map.current) return; // initialize map only once
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
      // color: "red",
      draggable: true,
    })
      .setLngLat([lng, lat])
      .setPopup(
        new mapboxgl.Popup({ closeOnClick: false, closeButton: false })
        // .setHTML("<h1>Current Location</h1>")
      )
      .addTo(map.current);
    // .togglePopup();

    // createAllMarker(map.current);
    if (allTrafficData.length > 0) {
      allTrafficData.forEach((items) => {
        new mapboxgl.Marker({
          color: "red",
          draggable: true,
        })
          .setLngLat([parseFloat(items.Longitude), parseFloat(items.Latitude)])
          .setPopup(
            new mapboxgl.Popup({
              closeOnClick: false,
              closeButton: false,
            }).setHTML(`<h1>測速照相
            <h2>方向: ${items.direct}</h2>
            <h2>限速: ${items.limit}</h2>  
            </h1>`)
          )
          .addTo(map.current!);
      });
    }
  }, [allTrafficData]);

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
