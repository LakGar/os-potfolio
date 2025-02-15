import React, { useState, useContext } from "react";
import { WindowManagerContext } from "../../contexts/WindowManagerContext";
import "./ApplicationBar.css";
import finder from "../../assets/finder-app.png";
import safari from "../../assets/safari-icon.png";
import messages from "../../assets/messages-icon.webp";
import mail from "../../assets/mail-icon.png";
import maps from "../../assets/maps-icon.png";
import photos from "../../assets/photos-icon.png";
import facetime from "../../assets/facetime-icon.png";
import notes from "../../assets/notes-icon.png";
import appstore from "../../assets/appstore-icon.png";
import settings from "../../assets/settings-icon.webp";
import trash from "../../assets/trash-icon.png";

const ApplicationBar = () => {
  const [hoveredApp, setHoveredApp] = useState(null);
  const { openApplication } = useContext(WindowManagerContext);

  const apps = [
    { id: "finder", name: "Finder", icon: finder },
    { id: "safari", name: "Safari", icon: safari },
    { id: "messages", name: "Messages", icon: messages },
    { id: "mail", name: "Mail", icon: mail },
    { id: "maps", name: "Maps", icon: maps },
    { id: "facetime", name: "FaceTime", icon: facetime },
    { id: "notes", name: "Notes", icon: notes },
    { id: "appstore", name: "App Store", icon: appstore },
    { id: "settings", name: "System Settings", icon: settings },
    { id: "trash", name: "Trash", icon: trash },
  ];

  return (
    <div className="application-bar-container">
      <div className="application-bar-content">
        {apps.map((app) => (
          <div
            key={app.id}
            className={`app-icon-wrapper ${
              hoveredApp === app.id ? "hovered" : ""
            }`}
            onMouseEnter={() => setHoveredApp(app.id)}
            onMouseLeave={() => setHoveredApp(null)}
            onClick={() => openApplication(app.id)}
          >
            <img
              className={`app-icon ${app.icon}`}
              src={app.icon}
              alt={app.name}
            />
            {hoveredApp === app.id && (
              <div className="app-tooltip">{app.name}</div>
            )}
            <div className="app-dot"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationBar;
