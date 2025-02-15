import React, { useState } from "react";
import {
  FaWifi,
  FaRedoAlt,
  FaChevronLeft,
  FaChevronRight,
  FaShareSquare,
  FaCog,
  FaSearch,
} from "react-icons/fa";
import { ThemeContext } from "../../../contexts/ThemeContext";
import "./Safari.css";

const Safari = () => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [url, setUrl] = useState("https://www.google.com");

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
    }, 1500);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className="safari-container">
      <div className="safari-header">
        <div className="safari-toolbar">
          <div className="safari-controls">
            <button className="safari-nav-button" disabled>
              <FaChevronLeft />
            </button>
            <button className="safari-nav-button" disabled>
              <FaChevronRight />
            </button>
            <button
              className="safari-nav-button"
              onClick={handleRetry}
              disabled={isRetrying}
            >
              <FaRedoAlt className={isRetrying ? "spinning" : ""} />
            </button>
            <button className="safari-nav-button" disabled>
              <FaShareSquare />
            </button>
          </div>
          <div className="safari-search-wrapper">
            <div className="safari-search-bar">
              <FaSearch className="search-icon2" />
              <input
                type="text"
                className="safari-url-input"
                value={url}
                onChange={handleUrlChange}
                readOnly
                style={{ color: "white", marginLeft: "20px" }}
              />
            </div>
          </div>
          <div className="safari-controls right">
            <button className="safari-nav-button">
              <FaCog />
            </button>
          </div>
        </div>
      </div>
      <div className="safari-content">
        <div className="no-connection">
          <FaWifi className="wifi-icon" />
          <h1>You Are Not Connected to the Internet</h1>
          <p>
            This page can't be displayed because your computer is currently
            offline.
          </p>
          <div className="connection-help">
            <button
              className={`help-button ${isRetrying ? "retrying" : ""}`}
              onClick={handleRetry}
              disabled={isRetrying}
            >
              <FaRedoAlt
                className={`refresh-icon ${isRetrying ? "spinning" : ""}`}
              />
              {isRetrying ? "Trying..." : "Try Again"}
            </button>
            <button className="help-button secondary">
              Network Settings...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safari;
