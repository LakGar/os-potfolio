import React, { createContext, useState, useEffect } from "react";
import lightBg from "../assets/desktop-wp-1.png"; // Monterey light wallpaper
import lightBg2 from "../assets/desktop-wp-2.png"; // Monterey light wallpaper
import darkBg from "../assets/desktop-wp-3.jpg"; // Monterey dark wallpaper

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const [accentColor, setAccentColor] = useState(
    () => localStorage.getItem("accentColor") || "#0078D7"
  );
  const [dockSize, setDockSize] = useState(
    () => parseInt(localStorage.getItem("dockSize")) || 50
  );
  const [dockMagnification, setDockMagnification] = useState(
    () => localStorage.getItem("dockMagnification") === "true"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("accentColor", accentColor);
    localStorage.setItem("dockSize", dockSize);
    localStorage.setItem("dockMagnification", dockMagnification);

    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.setProperty("--accent-color", accentColor);
    document.documentElement.style.setProperty("--dock-size", `${dockSize}px`);

    // Update document theme
    document.documentElement.setAttribute("data-theme", theme);

    // Set background image based on theme
    const bgImage = theme === "dark" ? darkBg : lightBg;
    document.body.style.backgroundImage = `url(${bgImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // Handle 'auto' theme
    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e) => {
        document.documentElement.setAttribute(
          "data-theme",
          e.matches ? "dark" : "light"
        );
        const autoBg = lightBg2;
        document.body.style.backgroundImage = `url(${autoBg})`;
      };

      mediaQuery.addEventListener("change", handleChange);
      // Set initial value
      handleChange(mediaQuery);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, accentColor, dockSize, dockMagnification]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      switch (prevTheme) {
        case "light":
          return "dark";
        case "dark":
          return "auto";
        default:
          return "light";
      }
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        accentColor,
        setAccentColor,
        dockSize,
        setDockSize,
        dockMagnification,
        setDockMagnification,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
