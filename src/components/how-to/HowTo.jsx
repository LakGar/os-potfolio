import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaFolder,
  FaMoon,
  FaPalette,
} from "react-icons/fa";
import { ThemeContext } from "../../contexts/ThemeContext";
import { WindowManagerContext } from "../../contexts/WindowManagerContext";

import "./HowTo.css";
import settings from "../../assets/settings-icon.webp";

const HowTo = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { accentColor, theme, setDockSize } = useContext(ThemeContext);
  const { openApplication, closeApplication } =
    useContext(WindowManagerContext);

  // Memoize the action functions to prevent infinite loops
  const openFinder = useCallback(() => {
    setDockSize(40);
    openApplication("finder");
  }, [openApplication]);

  const openSettings = useCallback(() => {
    openApplication("settings");
  }, [openApplication]);

  const changeDockSize = useCallback(() => {
    setDockSize(60);
  }, [setDockSize]);

  const tutorialSteps = [
    {
      title: "Welcome to LakOS",
      description:
        "This is your personal operating system interface. Let's take a quick tour of the features!",
      icon: FaCog,
      highlight: null,
      action: null,
    },
    {
      title: "The Dock",
      description:
        "At the bottom of your screen is the Dock. Click any app icon to launch it. Try opening Finder!",
      icon: FaFolder,
      highlight: ".application-bar",
      action: changeDockSize,
    },
    {
      title: "Window Management",
      description:
        "Windows can be moved, resized, minimized, and maximized. Try dragging a window's title bar or corners!",
      icon: FaFolder,
      highlight: ".window-controls",
      action: openFinder,
    },
    {
      title: "Dark Mode & Themes",
      description:
        "Open System Settings to customize your theme, accent colors, and more!",
      icon: FaMoon,
      highlight: "[data-app-id='settings']",
      action: openSettings,
    },
    {
      title: "Accent Colors",
      description:
        "Personalize your OS by choosing your favorite accent color in System Settings.",
      icon: FaPalette,
      highlight: ".accent-colors",
      action: openSettings,
    },
    {
      title: "All Set!",
      description:
        "You're ready to explore LakOS! Open System Settings anytime to customize your experience further.",
      icon: FaCog,
      highlight: null,
      action: onClose,
    },
  ];

  useEffect(() => {
    const currentTutorial = tutorialSteps[currentStep];
    let timeout;

    // Remove any existing highlights and overlays
    const cleanup = () => {
      const existingOverlay = document.querySelector(
        ".tutorial-highlight-overlay"
      );
      const existingBackdrop = document.querySelector(".tutorial-backdrop");
      if (existingOverlay) existingOverlay.remove();
      if (existingBackdrop) existingBackdrop.remove();
    };

    cleanup();

    if (currentTutorial.highlight) {
      const element = document.querySelector(currentTutorial.highlight);
      if (element) {
        // Create backdrop first (behind everything)
        const backdrop = document.createElement("div");
        backdrop.className = "tutorial-backdrop";
        document.body.appendChild(backdrop);

        // Create highlight overlay
        const overlay = document.createElement("div");
        overlay.className = "tutorial-highlight-overlay";

        const rect = element.getBoundingClientRect();
        overlay.style.top = `${rect.top - 8}px`;
        overlay.style.left = `${rect.left - 8}px`;
        overlay.style.width = `${rect.width + 16}px`;
        overlay.style.height = `${rect.height + 16}px`;

        // Add pulse animation
        const pulse = document.createElement("div");
        pulse.className = "tutorial-highlight-pulse";
        overlay.appendChild(pulse);

        document.body.appendChild(overlay);

        // Create a hole in the backdrop
        backdrop.style.setProperty("--highlight-top", `${rect.top}px`);
        backdrop.style.setProperty("--highlight-left", `${rect.left}px`);
        backdrop.style.setProperty("--highlight-width", `${rect.width}px`);
        backdrop.style.setProperty("--highlight-height", `${rect.height}px`);

        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }

    // Execute action after a short delay
    if (currentTutorial.action) {
      timeout = setTimeout(currentTutorial.action, 300);
    }

    return () => {
      cleanup();
      if (timeout) clearTimeout(timeout);
    };
  }, [currentStep, tutorialSteps]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTutorial = tutorialSteps[currentStep];
  const Icon = currentTutorial.icon;

  return (
    <div className="how-to-container">
      <div className={`how-to-card ${theme}`}>
        <div className="how-to-header">
          <div className="app-icon">
            <img src={settings} alt="settings" width={40} height={40} />
          </div>
          <div className="header-text">
            <h4>System Settings</h4>
            <span className="notification-time">now</span>
          </div>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="how-to-content">
          <h3>{tutorialSteps[currentStep].title}</h3>
          <p>{tutorialSteps[currentStep].description}</p>
        </div>

        <div className="how-to-navigation">
          <button
            className="nav-button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <FaChevronLeft />
            <span>Previous</span>
          </button>

          <div className="step-indicator">
            {currentStep + 1} / {tutorialSteps.length}
          </div>

          <button
            className="nav-button"
            onClick={handleNext}
            disabled={currentStep === tutorialSteps.length - 1}
          >
            <span>Next</span>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowTo;
