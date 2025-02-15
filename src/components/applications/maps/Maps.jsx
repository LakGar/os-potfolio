import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import {
  FaLocationArrow,
  FaSearch,
  FaExpandAlt,
  FaCompressAlt,
} from "react-icons/fa";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Maps.css";
import Avatar from "../../../assets/avatars/me-avatar.png";
import { ThemeContext } from "../../../contexts/ThemeContext";

// Disable tracking
mapboxgl.config.SEND_EVENTS_DEFAULT = false;

// Access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const SANTA_CLARA_COORDINATES = {
  lng: -121.9552356,
  lat: 37.3541079,
  zoom: 13,
};

const Maps = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Check if WebGL is supported
    if (!mapboxgl.supported()) {
      setError("Your browser does not support Mapbox GL");
      return;
    }

    // Initialize map
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [SANTA_CLARA_COORDINATES.lng, SANTA_CLARA_COORDINATES.lat],
        zoom: SANTA_CLARA_COORDINATES.zoom,
        trackResize: true,
        attributionControl: false,
        collectResourceTiming: false,
        trackUserLocation: false,
        enableFreeCameraControls: false,
      });

      map.current.on("load", () => {
        console.log("Map loaded successfully");
        setMapLoaded(true);

        // Create custom marker element
        const markerEl = document.createElement("div");
        markerEl.className = "custom-marker";

        // Add avatar image with imported source
        const avatar = document.createElement("img");
        avatar.src = Avatar;
        avatar.alt = "Location";
        avatar.className = "marker-avatar";
        markerEl.appendChild(avatar);

        // Add custom marker
        new mapboxgl.Marker({
          element: markerEl,
          anchor: "bottom",
        })
          .setLngLat([SANTA_CLARA_COORDINATES.lng, SANTA_CLARA_COORDINATES.lat])
          .addTo(map.current);

        // Add controls after map is loaded
        map.current.addControl(
          new mapboxgl.NavigationControl({
            showCompass: true,
            showZoom: true,
            visualizePitch: true,
          }),
          "bottom-right"
        );
      });

      map.current.on("error", (e) => {
        console.error("Map error:", e);
        setError(e.error?.message || "An error occurred loading the map");
      });
    } catch (err) {
      console.error("Map initialization error:", err);
      setError(err.message);
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Handle resize
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    const handleResize = () => {
      if (map.current) {
        map.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mapLoaded]);

  const handleRecenter = () => {
    if (!map.current) return;
    map.current.flyTo({
      center: [SANTA_CLARA_COORDINATES.lng, SANTA_CLARA_COORDINATES.lat],
      zoom: SANTA_CLARA_COORDINATES.zoom,
      essential: true,
      duration: 1000,
    });
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.() ||
        document.documentElement.webkitRequestFullscreen?.() ||
        document.documentElement.msRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() ||
        document.webkitExitFullscreen?.() ||
        document.msExitFullscreen?.();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        Boolean(
          document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
        )
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div className="maps-container">
      <div className="maps-header">
        <div className="maps-search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Maps"
            readOnly
            value="Santa Clara, CA"
          />
        </div>
        <div className="maps-controls">
          <button
            className="maps-control-button accent"
            onClick={handleRecenter}
            title="Return to Santa Clara"
          >
            <FaLocationArrow />
          </button>
          <button
            className="maps-control-button"
            onClick={toggleFullscreen}
            title="Toggle fullscreen"
          >
            {isFullscreen ? <FaCompressAlt /> : <FaExpandAlt />}
          </button>
        </div>
      </div>
      <div ref={mapContainer} className="map-view" />
      {!mapLoaded && !error && (
        <div className="map-loading">
          <div className="loading-spinner" />
          <span>Loading map...</span>
        </div>
      )}
      {error && (
        <div className="map-error">
          <span>Error loading map: {error}</span>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}
    </div>
  );
};

export default Maps;
