import React, { useContext } from "react";
import { WindowManagerContext } from "../../contexts/WindowManagerContext";
import Window from "../window/Window";
import Messages from "../applications/messages/Messages";
import "./WindowManager.css";
import Finder from "../applications/finder/Finder";
import Safari from "../applications/safari/Safari";
import Mail from "../applications/mail/Mail";
import Maps from "../applications/maps/Maps";
// import Photos from "../applications/photos/Photos";
import FaceTime from "../applications/facetime/FaceTime";
import Notes from "../applications/notes/Notes";
import AppStore from "../applications/appstore/AppStore";
import Settings from "../applications/settings/Settings";
import Trash from "../applications/trash/Trash";

const WindowManager = () => {
  const {
    openWindows,
    activeWindow,
    windowStates,
    bringToFront,
    handleWindowControl,
  } = useContext(WindowManagerContext);

  const components = {
    messages: Messages,
    finder: Finder,
    safari: Safari,
    mail: Mail,
    maps: Maps,
    facetime: FaceTime,
    notes: Notes,
    appstore: AppStore,
    settings: Settings,
    trash: Trash,
    // Add other components here as needed
  };

  const renderApplication = (appId) => {
    const Component = components[appId];
    return Component ? <Component /> : null;
  };

  return (
    <div className="window-manager">
      {openWindows.map((appId) => (
        <Window
          key={appId}
          appId={appId}
          windowState={windowStates[appId]}
          isActive={activeWindow === appId}
          onBringToFront={() => bringToFront(appId)}
          onWindowControl={(action) => handleWindowControl(appId, action)}
        >
          {renderApplication(appId)}
        </Window>
      ))}
    </div>
  );
};

export default WindowManager;
