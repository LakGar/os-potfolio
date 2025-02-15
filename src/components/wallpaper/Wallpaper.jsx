import React from "react";
import backgroundImage from "../../assets/desktop-wp-2.png";
const Wallpaper = () => {
  return (
    <div
      className="desktop-background-image"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <img
        src={backgroundImage}
        alt="Background"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default Wallpaper;
