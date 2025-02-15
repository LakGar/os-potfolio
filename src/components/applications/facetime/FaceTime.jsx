import React, { useState, useRef, useEffect } from "react";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophone,
  FaMicrophoneSlash,
  FaPhone,
  FaSearch,
  FaPlus,
  FaLink,
  FaCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./FaceTime.css";
import Avatar from "../../../assets/avatars/mom-avatar.png";

const FaceTime = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [showError, setShowError] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const toggleCamera = async () => {
    try {
      if (!isCameraOn) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true);
      } else {
        streamRef.current.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
        setIsCameraOn(false);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleNewCall = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000); // Hide after 3 seconds
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="facetime-container">
      {showError && (
        <div className="error-message">
          <FaExclamationTriangle />
          <span>Your mom told you not to talk to strangers!</span>
        </div>
      )}
      <div className="facetime-content-left">
        <div className="facetime-actions">
          <button className="action-button secondary">
            <FaLink />
            <span>Create Link</span>
          </button>
          <button className="action-button primary" onClick={handleNewCall}>
            <FaVideo />
            <span>New FaceTime</span>
          </button>
        </div>

        <div className="facetime-history">
          <div className="history-section">
            <h3>Today</h3>
            <div className="call-list">
              <div className="call-item">
                <div className="caller-avatar">
                  <img src={Avatar} alt="Mom" />
                </div>
                <div className="call-info">
                  <span className="caller-name">Mom</span>
                  <div className="call-details">
                    <FaCircle className="status-dot" />
                    <span>home · 19:43</span>
                  </div>
                </div>
              </div>
              {/* Add more call items as needed */}
            </div>
          </div>
        </div>
      </div>
      <div className="facetime-content-right">
        <div className="camera-message">
          <span>To use FaceTime, connect a camera.</span>
        </div>
      </div>
    </div>
  );
};

export default FaceTime;
