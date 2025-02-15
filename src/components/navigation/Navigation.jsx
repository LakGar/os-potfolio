import React, { useState, useEffect, useRef, useContext } from "react";
import "./Navigation.css";
import appleLogo from "../../assets/logo-w.png";
import { WindowManagerContext } from "../../contexts/WindowManagerContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const Navigation = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isCharging, setIsCharging] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(75);
  const [wifiConnected, setWifiConnected] = useState(false);

  // Add ref for the dropdown container
  const dropdownRef = useRef(null);
  const { activeWindow } = useContext(WindowManagerContext);
  const { accentColor } = useContext(ThemeContext);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Get battery status if available
  useEffect(() => {
    if ("getBattery" in navigator) {
      const updateBatteryStatus = (battery) => {
        setBatteryLevel(Math.round(battery.level * 100));
        setIsCharging(battery.charging);

        // Listen for battery status changes
        battery.addEventListener("levelchange", () =>
          setBatteryLevel(Math.round(battery.level * 100))
        );
        battery.addEventListener("chargingchange", () =>
          setIsCharging(battery.charging)
        );
      };

      navigator.getBattery().then(updateBatteryStatus);
    }
  }, []);

  // Updated click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getActiveWindowName = () => {
    const windowNames = {
      finder: "Finder",
      safari: "Safari",
      messages: "Messages",
      mail: "Mail",
      maps: "Maps",
      facetime: "FaceTime",
      notes: "Notes",
      appstore: "App Store",
      settings: "System Settings",
      trash: "Trash",
    };

    return windowNames[activeWindow] || "Finder";
  };

  const handleIconClick = (dropdownName, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const getBatteryIcon = () => {
    if (!batteryLevel) return "fas fa-battery-full";

    if (batteryLevel > 75) return "fas fa-battery-full";
    if (batteryLevel > 50) return "fas fa-battery-three-quarters";
    if (batteryLevel > 25) return "fas fa-battery-half";
    if (batteryLevel > 10) return "fas fa-battery-quarter";
    return "fas fa-battery-empty";
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleSliderChange = (e, type) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.round((x / width) * 100);
    const clampedValue = Math.max(0, Math.min(100, percentage));

    if (type === "brightness") {
      setBrightness(clampedValue);
      // Update screen brightness overlay
      document.documentElement.style.setProperty(
        "--screen-brightness",
        `${(100 - clampedValue) * 0.8}%`
      );
    } else if (type === "volume") {
      setVolume(clampedValue);
    }
  };

  return (
    <>
      <div className="screen-brightness-overlay" />
      <div className="navigation-container">
        <div className="navigation-options">
          <img src={appleLogo} alt="Apple Logo" className="nav-logo" />
          <span className="nav-options-main">{getActiveWindowName()}</span>
          <span className="nav-options-sub-item">File</span>
          <span className="nav-options-sub-item">Edit</span>
          <span className="nav-options-sub-item">View</span>
          <span className="nav-options-sub-item">Go</span>
          <span className="nav-options-sub-item">Window</span>
          <span className="nav-options-sub-item">Help</span>
        </div>
        <div className="navigation-stats" ref={dropdownRef}>
          <div
            className="stats-item wifi-status"
            onClick={(e) => handleIconClick("wifi", e)}
          >
            <i
              className={`fas fa-wifi ${
                !wifiConnected ? "wifi-disconnected" : ""
              }`}
            ></i>
            {activeDropdown === "wifi" && (
              <div className="dropdown-menu wifi-dropdown">
                <div className="dropdown-header">Wi-Fi</div>
                <div className="dropdown-item">Wi-Fi: Off</div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item disabled">
                  No Networks Available
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item">Network Preferences...</div>
              </div>
            )}
          </div>
          <div
            className="stats-item"
            onClick={(e) => handleIconClick("search", e)}
          >
            <i className="fas fa-search"></i>
            {activeDropdown === "search" && (
              <div className="dropdown-menu search-dropdown">
                <div className="dropdown-header">Spotlight Search</div>
                <div className="dropdown-item">Search your device...</div>
              </div>
            )}
          </div>
          <div
            className="stats-item"
            onClick={(e) => handleIconClick("control", e)}
          >
            <i className="fas fa-sliders-h"></i>
            {activeDropdown === "control" && (
              <div className="dropdown-menu control-dropdown">
                <div className="control-grid">
                  {/* Top Row - Large Squares */}
                  <div className="control-item large">
                    <div className="control-header">
                      <i className="fas fa-wifi"></i>
                      <span>Wi-Fi</span>
                    </div>
                    <div className="control-status">Home Network</div>
                  </div>
                  <div className="control-item large">
                    <div className="control-header">
                      <i className="fab fa-bluetooth-b"></i>
                      <span>Bluetooth</span>
                    </div>
                    <div className="control-status">On</div>
                  </div>
                  <div className="control-item large">
                    <div className="control-header">
                      <i className="fas fa-broadcast-tower"></i>
                      <span>AirDrop</span>
                    </div>
                    <div className="control-status">Contacts Only</div>
                  </div>

                  {/* Middle Row - Small Squares */}
                  <div className="control-item">
                    <div className="control-header">
                      <i className="fas fa-moon"></i>
                      <span>Focus</span>
                    </div>
                  </div>
                  <div className="control-item">
                    <div className="control-header">
                      <i className="fas fa-expand-arrows-alt"></i>
                      <span>Stage Manager</span>
                    </div>
                  </div>
                  <div className="control-item">
                    <div className="control-header">
                      <i className="fas fa-mirror"></i>
                      <span>Screen Mirroring</span>
                    </div>
                  </div>

                  {/* Updated Brightness Slider */}
                  <div className="control-slider">
                    <div className="slider-header">
                      <i className="fas fa-sun"></i>
                      <span>Display</span>
                    </div>
                    <div
                      className="slider-bar"
                      onClick={(e) => handleSliderChange(e, "brightness")}
                    >
                      <div
                        className="slider-fill"
                        style={{ width: `${brightness}%` }}
                      />
                      <div
                        className="slider-knob"
                        style={{ left: `${brightness}%` }}
                      />
                    </div>
                  </div>

                  {/* Updated Volume Slider */}
                  <div className="control-slider">
                    <div className="slider-header">
                      <i className="fas fa-volume-up"></i>
                      <span>Sound</span>
                    </div>
                    <div
                      className="slider-bar"
                      onClick={(e) => handleSliderChange(e, "volume")}
                    >
                      <div
                        className="slider-fill"
                        style={{ width: `${volume}%` }}
                      />
                      <div
                        className="slider-knob"
                        style={{ left: `${volume}%` }}
                      />
                    </div>
                  </div>

                  {/* Additional Controls */}
                  <div className="control-footer">
                    <div className="footer-item">
                      <i className="fas fa-keyboard"></i>
                      <span>Keyboard Brightness</span>
                    </div>
                    <div className="footer-item">
                      <i className="fas fa-music"></i>
                      <span>Now Playing</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {batteryLevel !== null && (
            <div
              className="stats-item battery"
              onClick={(e) => handleIconClick("battery", e)}
            >
              <i className={getBatteryIcon()}></i>
              {activeDropdown === "battery" && (
                <div className="dropdown-menu battery-dropdown">
                  <div className="dropdown-header">Battery</div>
                  <div className="dropdown-item">Battery: {batteryLevel}%</div>
                  <div className="dropdown-item">Power Mode: Automatic</div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item">Battery Preferences...</div>
                </div>
              )}
            </div>
          )}
          <div
            className="stats-item date-time"
            onClick={(e) => handleIconClick("datetime", e)}
          >
            <span>{formatDate()}</span>
            <span>{formatTime()}</span>
            {activeDropdown === "datetime" && (
              <div className="dropdown-menu datetime-dropdown">
                <div className="dropdown-header">Calendar</div>
                <div className="dropdown-item current-date">
                  {currentTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item">Open Calendar...</div>
                <div className="dropdown-item">Date & Time Preferences...</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
