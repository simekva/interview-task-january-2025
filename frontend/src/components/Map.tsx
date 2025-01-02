import React, { useRef, useEffect } from "react";
import mapboxgl, { Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapBoxProps {
  devices: { name: string; status: string; location: string }[];
  selectedDevice: { name: string; status: string; location: string } | null;
  showInactive: boolean;
}

export const MapBox: React.FC<MapBoxProps> = ({
  devices,
  selectedDevice,
  showInactive,
}) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  // Keep track of markers with device for easy removal.
  const markersRef = useRef<Map<string, Marker>>(new Map());

  // Map init.
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaHNqb2hhbnNlbiIsImEiOiJjbTVlOWQ1cDAyNnR4MmxyNzJtZmhvMmVmIn0.aRUwNHNNmYO7e0TrCs7Ksg";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      fadeDuration: 0,
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    // Remove all inactive markers if checkbox unchecked.
    if (!showInactive) {
      devices
        .filter((device) => device.status === "inactive")
        .forEach((device) => {
          const marker = markersRef.current.get(device.name);
          if (marker) {
            marker.remove();
            markersRef.current.delete(device.name);
          }
        });
    }

    // Draw all active markers, or all markers if showInactive is true.
    devices.forEach((device) => {
      const latitude = device.location.split(",")[0];
      const longitude = device.location.split(",")[1];

      if (showInactive || device.status == "active") {
        const marker = new mapboxgl.Marker()
          .setLngLat([parseFloat(longitude), parseFloat(latitude)])
          .addTo(mapRef.current);

        markersRef.current.set(device.name, marker);
      }
    });
  }, [showInactive]);

  // Functionality for flying to a clicked device.
  useEffect(() => {
    if (selectedDevice) {
      console.log("Clicked: ", selectedDevice);
      const latitude = selectedDevice.location.split(",")[0];
      const longitude = selectedDevice.location.split(",")[1];

      console.log("Flying to: ", longitude, latitude);
      mapRef.current.flyTo({
        center: [longitude, latitude],
        essential: true,
        speed: 1,
        zoom: 12,
      });
    }
  }, [selectedDevice]); // Called whenever selectedDevice changes, aka when the user clicks an entry in the list.

  return (
    <div className="h-full w-full" id="map-container" ref={mapContainerRef} />
  );
};
