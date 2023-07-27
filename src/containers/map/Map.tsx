/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/indent */
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import mapboxgl, { Map } from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import { faS, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import * as Style from "./Style";

library.add(faHouse);
// eslint-disable-next-line operator-linebreak
mapboxgl.accessToken =
  "pk.eyJ1IjoicHVuazYyMzMiLCJhIjoiY2sxMWp5a2h1MGhnazNiczd5ZTllcmJncyJ9.NnnOxXKm_rBXH4AeZ32xcA";

const TrafficMap = () => {
  const mapContainer = useRef(null);
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState<number>(12);
  const [lat, setLat] = useState<number>(12);
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

  const successHandler = (position: any) => {
    setLng(position.coords.longitude);
    setLat(position.coords.latitude);
  };

  const errorHandler = (err: any) => {
    console.log(err);
  };

  // 取得當前位置
  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    } else {
      alert("你的裝置或瀏覽器不支援定位功能");
    }
  }, []);

  const getTrafficData = () => {
    axios
      .get("http://localhost:3000/rest/datastore/A01010000C-000674-011")
      .then((response) => {
        // handle success
        // console.log(response.data.result.records);
        const allData = response.data.result.records;
        allData.shift();

        // clean data
        const filterData = allData.filter(
          (items: { Latitude: string; Longitude: string }) => {
            console.log(parseFloat(items.Latitude) - lat);
            return (
              parseFloat(items.Latitude) - lat < 0.5 &&
              parseFloat(items.Longitude) - lng < 0.5
            );
          }
        );
        console.log("filterData", filterData);
        setAllTrafficData(allData);
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
  }, [lat, lng]);

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
      <Style.settingGroup>
        <Style.changeLanBtn
          onClick={() => {
            // map.current?.setLayoutProperty("country-label", "text-field", [
            //   "get",
            //   `name_ru`,
            // ]);
            map.current?.flyTo({
              center: [lng, lat], // 初始中心点的经纬度
              zoom: 15, // 初始缩放级别
              bearing: 0, // 初始方位角
              pitch: 0, // 初始俯仰角
              speed: 1.2, // 动画速度，数值越大动画越快
            });
          }}
        >
          <FontAwesomeIcon icon={faHouse} />
        </Style.changeLanBtn>
      </Style.settingGroup>
      <Style.MapDiv ref={mapContainer} className="map-container" />
    </Style.Container>
  );
};

export default TrafficMap;
