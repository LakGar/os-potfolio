import React, { useState, useContext } from "react";
import {
  FaUser,
  FaPalette,
  FaDesktop,
  FaKeyboard,
  FaMouse,
  FaBell,
  FaLock,
  FaWifi,
  FaBluetoothB,
  FaCog,
  FaVolumeUp,
  FaMoon,
  FaSearch,
} from "react-icons/fa";
import { ThemeContext } from "../../../contexts/ThemeContext";
import "./Settings.css";

const menuItems = [
  { icon: <FaUser />, label: "Apple ID", color: "#0078D7" },
  { icon: <FaWifi />, label: "Network", color: "#34C759" },
  { icon: <FaBluetoothB />, label: "Bluetooth", color: "#007AFF" },
  { icon: <FaPalette />, label: "Appearance", color: "#AF52DE" },
  { icon: <FaDesktop />, label: "Desktop & Dock", color: "#FF9500" },
  { icon: <FaKeyboard />, label: "Keyboard", color: "#5856D6" },
  { icon: <FaMouse />, label: "Mouse", color: "#FF2D55" },
  { icon: <FaBell />, label: "Notifications", color: "#FF3B30" },
  { icon: <FaLock />, label: "Privacy & Security", color: "#32ADE6" },
  { icon: <FaVolumeUp />, label: "Sound", color: "#4CD964" },
  { icon: <FaMoon />, label: "Focus", color: "#9B59B6" },
  { icon: <FaCog />, label: "General", color: "#8E8E93" },
];

const Settings = () => {
  const [selectedMenu, setSelectedMenu] = useState("Appearance");
  const [searchQuery, setSearchQuery] = useState("");
  const {
    theme,
    setTheme,
    accentColor,
    setAccentColor,
    dockSize,
    setDockSize,
    dockMagnification,
    setDockMagnification,
  } = useContext(ThemeContext);
  const [notificationSound, setNotificationSound] = useState(true);
  const [autoHideDock, setAutoHideDock] = useState(false);

  const accentColors = [
    "#0078D7",
    "#FF3B30",
    "#4CD964",
    "#FF9500",
    "#5856D6",
    "#FF2D55",
    "#32ADE6",
    "#AF52DE",
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case "Appearance":
        return (
          <div className="settings-content">
            <h2>Appearance</h2>

            <div className="settings-section">
              <h3>Theme</h3>
              <div className="theme-options">
                <div
                  className={`theme-option ${
                    theme === "light" ? "selected" : ""
                  }`}
                  onClick={() => setTheme("light")}
                >
                  <div className="theme-preview light"></div>
                  <span>Light</span>
                </div>
                <div
                  className={`theme-option ${
                    theme === "dark" ? "selected" : ""
                  }`}
                  onClick={() => setTheme("dark")}
                >
                  <div className="theme-preview dark"></div>
                  <span>Dark</span>
                </div>
                <div
                  className={`theme-option ${
                    theme === "auto" ? "selected" : ""
                  }`}
                  onClick={() => setTheme("auto")}
                >
                  <div className="theme-preview auto"></div>
                  <span>Auto</span>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>Accent Color</h3>
              <div className="accent-colors">
                {accentColors.map((color) => (
                  <div
                    key={color}
                    className={`accent-color ${
                      accentColor === color ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setAccentColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case "Desktop & Dock":
        return (
          <div className="settings-content">
            <h2>Desktop & Dock</h2>

            <div className="settings-section">
              <h3>Dock</h3>
              <div className="setting-item">
                <label>Size</label>
                <input
                  type="range"
                  min="40"
                  max="70"
                  value={dockSize}
                  onChange={(e) => setDockSize(parseInt(e.target.value))}
                />
                <span>{dockSize}px</span>
              </div>

              <div className="setting-item">
                <label>Magnification</label>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={dockMagnification}
                    onChange={() => setDockMagnification(!dockMagnification)}
                  />
                  <span className="slider"></span>
                </div>
              </div>

              <div className="setting-item">
                <label>Automatically hide and show the Dock</label>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={autoHideDock}
                    onChange={() => setAutoHideDock(!autoHideDock)}
                  />
                  <span className="slider"></span>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>Accent Color</h3>
              <div className="accent-colors">
                {accentColors.map((color) => (
                  <div
                    key={color}
                    className={`accent-color ${
                      color === accentColor ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setAccentColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case "Notifications":
        return (
          <div className="settings-content">
            <h2>Notifications</h2>

            <div className="settings-section">
              <h3>Sound</h3>
              <div className="setting-item">
                <label>Play sound for notifications</label>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notificationSound}
                    onChange={() => setNotificationSound(!notificationSound)}
                  />
                  <span className="slider"></span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="settings-content">
            <h2>{selectedMenu}</h2>
            <p>Settings for {selectedMenu} will be available soon.</p>
          </div>
        );
    }
  };

  const filteredMenuItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const menuItemStyle = (item) => ({
    color: selectedMenu === item.label ? "#fff" : item.color,
    backgroundColor: selectedMenu === item.label ? accentColor : "transparent",
  });

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <div className="settings-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="menu-items">
          {filteredMenuItems.map((item) => (
            <div
              key={item.label}
              className={`menu-item ${
                selectedMenu === item.label ? "selected" : ""
              }`}
              style={menuItemStyle(item)}
              onClick={() => setSelectedMenu(item.label)}
            >
              <div className="menu-icon" style={{ color: item.color }}>
                {item.icon}
              </div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="settings-main">{renderContent()}</div>
    </div>
  );
};

export default Settings;
