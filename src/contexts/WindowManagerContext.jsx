import React, { createContext, useState } from "react";

export const WindowManagerContext = createContext();

export const WindowManagerProvider = ({ children }) => {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [windowStates, setWindowStates] = useState({});
  const [nextZIndex, setNextZIndex] = useState(1);
  const [showHowTo, setShowHowTo] = useState(true);

  const getCenterPosition = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const windowWidth = 800;
    const windowHeight = 600;

    return {
      x: Math.max(0, (screenWidth - windowWidth) / 2),
      y: Math.max(0, (screenHeight - windowHeight) / 2),
    };
  };

  const openApplication = (appId) => {
    // If window exists but is minimized, restore it in center
    if (windowStates[appId]?.isMinimized) {
      setWindowStates((prev) => ({
        ...prev,
        [appId]: {
          ...prev[appId],
          isMinimized: false,
          zIndex: nextZIndex,
          position: getCenterPosition(),
        },
      }));
      setNextZIndex((prev) => prev + 1);
      setActiveWindow(appId);
      return;
    }

    // If window doesn't exist, create it in center
    if (!windowStates[appId]) {
      const newWindow = {
        id: appId,
        zIndex: nextZIndex,
        position: getCenterPosition(),
        size: { width: 800, height: 600 },
        isMinimized: false,
        isMaximized: false,
      };

      setWindowStates((prev) => ({
        ...prev,
        [appId]: newWindow,
      }));
      setOpenWindows((prev) => [...prev, appId]);
      setNextZIndex((prev) => prev + 1);
      setActiveWindow(appId);
    } else {
      // If window exists and isn't minimized, bring it to front
      bringToFront(appId);
    }
  };

  const bringToFront = (appId) => {
    if (!windowStates[appId]) {
      console.log("Window not found");
      return;
    }

    setWindowStates((prev) => {
      // Sort windows by zIndex
      const sortedWindows = Object.entries(prev)
        .map(([id, state]) => ({ id, ...state }))
        .sort((a, b) => a.zIndex - b.zIndex); // Sort by lowest to highest zIndex

      // Assign new z-index values (1-11)
      const updatedWindows = sortedWindows.map((win, index) => ({
        ...win,
        zIndex: win.id === appId ? 11 : index + 1, // Bring clicked window to top
      }));

      return Object.fromEntries(updatedWindows.map((win) => [win.id, win]));
    });

    setActiveWindow(appId);
  };

  const handleWindowControl = (appId, action, params = {}) => {
    setWindowStates((prev) => {
      const window = prev[appId];
      switch (action) {
        case "close":
          const { [appId]: _, ...rest } = prev;
          setOpenWindows((current) => current.filter((id) => id !== appId));
          if (activeWindow === appId) {
            const remainingWindows = Object.entries(rest)
              .filter(([_, state]) => !state.isMinimized)
              .sort((a, b) => b[1].zIndex - a[1].zIndex);
            if (remainingWindows.length > 0) {
              setActiveWindow(remainingWindows[0][0]);
            } else {
              setActiveWindow(null);
            }
          }
          return rest;

        case "minimize":
          return {
            ...prev,
            [appId]: { ...window, isMinimized: true },
          };

        case "maximize":
          return {
            ...prev,
            [appId]: {
              ...window,
              isMaximized: !window.isMaximized,
              position: !window.isMaximized
                ? { x: 0, y: 0 }
                : getCenterPosition(),
              size: !window.isMaximized
                ? { width: window.innerWidth, height: window.innerHeight }
                : { width: 800, height: 600 },
            },
          };

        default:
          return prev;
      }
    });
  };

  const updateWindowPosition = (appId, position) => {
    setWindowStates((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        position,
      },
    }));
  };

  const updateWindowSize = (appId, size) => {
    setWindowStates((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        size,
      },
    }));
  };

  return (
    <WindowManagerContext.Provider
      value={{
        openWindows,
        activeWindow,
        windowStates,
        openApplication,
        bringToFront,
        handleWindowControl,
        updateWindowPosition,
        updateWindowSize,
        showHowTo,
        setShowHowTo,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
};
