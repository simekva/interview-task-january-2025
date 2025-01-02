import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  devices: {name: string, status: string, location: string}[];
  selectedDevice: { name: string; status: string; location: string } | null;
}

export const Map: React.FC<MapProps> = ({ devices, selectedDevice }) => {

  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);


  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiaHNqb2hhbnNlbiIsImEiOiJjbTVlOWQ1cDAyNnR4MmxyNzJtZmhvMmVmIn0.aRUwNHNNmYO7e0TrCs7Ksg";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    devices.forEach((device) => {
      const latitude = device.location.split(",")[0]
      const longitude = device.location.split(",")[1]


      const marker = new mapboxgl.Marker().setLngLat([parseFloat(longitude), parseFloat(latitude)]).addTo(mapRef.current)
    })

    return () => {
      mapRef.current.remove();
    };
  }, devices);

  useEffect(() => {
    if (selectedDevice) {
      console.log("Clicked: ", selectedDevice)
      const latitude = selectedDevice.location.split(",")[0]
      const longitude = selectedDevice.location.split(",")[1]

      console.log("Flying to: ", longitude, latitude)
      mapRef.current.flyTo({
        center: [longitude, latitude],
        essential: true
      })
    }
  },  [selectedDevice])

  return <div className="h-full w-full" id="map-container" ref={mapContainerRef} />;
}