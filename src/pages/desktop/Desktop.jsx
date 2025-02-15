import React, { useContext } from "react";
import Navigation from "../../components/navigation/Navigation";
import Wallpaper from "../../components/wallpaper/Wallpaper";
import WindowManager from "../../components/window-manager/WindowManager";
import "./Desktop.css";
import ApplicationBar from "../../components/application-bar/ApplicationBar";
import HowTo from "../../components/how-to/HowTo";
import { WindowManagerContext } from "../../contexts/WindowManagerContext";

const Desktop = () => {
  const { showHowTo, setShowHowTo } = useContext(WindowManagerContext);

  return (
    <div className="desktop-container">
      <Wallpaper />
      <div className="desktop-content">
        {/* Navigation */}
        <Navigation />
        <WindowManager />
        <div className="desktop-main-content"></div>
        <ApplicationBar />
        {showHowTo && <HowTo onClose={() => setShowHowTo(false)} />}
      </div>
    </div>
  );
};

export default Desktop;
