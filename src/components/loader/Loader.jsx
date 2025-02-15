import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loader.css";
import logo from "../../assets/logo-w.png";
const Loader = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate("/desktop");
          return 100;
        }
        return prev + 1;
      });
    }, 40); // 4000ms (4 seconds) / 100 steps = 40ms per step

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="loader-content">
      <img src={logo} alt="Logo" className="pineapple-logo" />

      {/* Loading bar */}
      <div className="loader-bar-container">
        <div className="loader-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default Loader;
