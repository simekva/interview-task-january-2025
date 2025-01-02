import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  devices: {name: string, status: string, location: string}[];
}

export const Map: React.FC<MapProps> = ({ devices }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiaHNqb2hhbnNlbiIsImEiOiJjbTVlOWQ1cDAyNnR4MmxyNzJtZmhvMmVmIn0.aRUwNHNNmYO7e0TrCs7Ksg";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    devices.forEach((device) => {
      const longitude = device.location.split(",")[1]
      const latitude = device.location.split(",")[0]
      
      const marker = new mapboxgl.Marker().setLngLat([parseFloat(longitude), parseFloat(latitude)]).addTo(mapRef.current)
    })

    return () => {
      mapRef.current.remove();
    };
  }, devices);

  return <div className="h-full w-full" id="map-container" ref={mapContainerRef} />;
}