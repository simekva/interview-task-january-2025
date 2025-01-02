import React, { useRef, useEffect, useMemo } from "react";
import mapboxgl, { Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  devices: {name: string, status: string, location: string}[];
  selectedDevice: { name: string; status: string; location: string } | null;
  showInactive: boolean;
}

const markers: Marker[] = [] 

export const Map: React.FC<MapProps> = ({ devices, selectedDevice, showInactive }) => {

  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const markersRef = useRef<Marker[]>([]);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiaHNqb2hhbnNlbiIsImEiOiJjbTVlOWQ1cDAyNnR4MmxyNzJtZmhvMmVmIn0.aRUwNHNNmYO7e0TrCs7Ksg";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    markersRef.current.forEach((marker) => {
      marker.remove();
    })

    markersRef.current = []

    const filteredDevices = showInactive ? devices : devices.filter((device) => device.status === "active")

    filteredDevices.forEach((device) => {
      const latitude = device.location.split(",")[0];
      const longitude = device.location.split(",")[1];

      const marker = new mapboxgl.Marker().setLngLat([parseFloat(longitude), parseFloat(latitude)]).addTo(mapRef.current);
      markersRef.current.push(marker);
    });
    console.log(markersRef.current.length)
  }, [showInactive])

  // Functionality for flying to a clicked device.
  useEffect(() => {
    if (selectedDevice) {
      console.log("Clicked: ", selectedDevice)
      const latitude = selectedDevice.location.split(",")[0]
      const longitude = selectedDevice.location.split(",")[1]

      console.log("Flying to: ", longitude, latitude)
      mapRef.current.flyTo({
        center: [longitude, latitude],
        essential: true,
        speed: 1,
        zoom: 12
      })
    }
  },  [selectedDevice]) // Called whenever selectedDevice changes, aka when the user clicks an entry in the list.

  return <div className="h-full w-full" id="map-container" ref={mapContainerRef} />;
}