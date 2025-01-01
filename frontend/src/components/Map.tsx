import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiaHNqb2hhbnNlbiIsImEiOiJjbTVlOWQ1cDAyNnR4MmxyNzJtZmhvMmVmIn0.aRUwNHNNmYO7e0TrCs7Ksg";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return <div className="h-full w-full" id="map-container" ref={mapContainerRef} />;
}
