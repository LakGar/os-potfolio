import React, { useState, useRef, useEffect, useContext } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { WindowManagerContext } from "../../contexts/WindowManagerContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Window.css";

const Window = ({
  appId,
  windowState,
  isActive,
  children,
  onBringToFront, // expects a function that accepts appId
  onWindowControl,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const nodeRef = useRef(null);
  const previousPosition = useRef(windowState.position);
  const previousSize = useRef(windowState.size);
  const { updateWindowPosition, updateWindowSize } =
    useContext(WindowManagerContext);
  const { accentColor } = useContext(ThemeContext);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!windowState.isMaximized) {
      previousPosition.current = windowState.position;
      previousSize.current = windowState.size;
    }
  }, [windowState.isMaximized, windowState.position, windowState.size]);

  const handleDragStop = (e, data) => {
    setIsDragging(false);
    updateWindowPosition(appId, { x: data.x, y: data.y });
  };

  const handleResize = (e, direction, ref, d) => {
    updateWindowSize(appId, {
      width: windowState.size.width + d.width,
      height: windowState.size.height + d.height,
    });
  };

  const handleMaximize = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    onWindowControl("maximize", {
      position: windowState.isMaximized
        ? previousPosition.current
        : { x: 0, y: 0 },
      size: windowState.isMaximized
        ? previousSize.current
        : { width: screenWidth, height: screenHeight },
    });
  };

  const activeStyle = {
    boxShadow: `0 0 0 2px ${accentColor}40`,
  };

  if (windowState.isMinimized || !mounted) return null;

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-header"
      position={windowState.position}
      onStart={() => setIsDragging(true)}
      onStop={handleDragStop}
      onDrag={() => onBringToFront(appId)}
      disabled={windowState.isMaximized}
    >
      <div ref={nodeRef} onMouseDown={() => onBringToFront(appId)}>
        {" "}
        {/* Ensure this is here */}
        <Resizable
          size={windowState.size}
          onResizeStop={handleResize}
          enable={{
            top: !windowState.isMaximized,
            right: !windowState.isMaximized,
            bottom: !windowState.isMaximized,
            left: !windowState.isMaximized,
            topRight: !windowState.isMaximized,
            bottomRight: !windowState.isMaximized,
            bottomLeft: !windowState.isMaximized,
            topLeft: !windowState.isMaximized,
          }}
          className={`window ${isActive ? "active" : ""} ${
            windowState.isMaximized ? "maximized" : ""
          }`}
          style={isActive ? activeStyle : { zIndex: windowState.zIndex }}
        >
          <div
            className="window-header"
            onMouseDown={() => onBringToFront(appId)}
          >
            <div className="window-controls">
              <button
                className="control close"
                onClick={() => onWindowControl("close")}
              />
              <button
                className="control minimize"
                onClick={() => onWindowControl("minimize")}
              />
              <button className="control maximize" onClick={handleMaximize} />
            </div>
            <div className="window-title">{appId}</div>
          </div>
          <div className="window-content">{children}</div>
        </Resizable>
      </div>
    </Draggable>
  );
};

export default Window;
