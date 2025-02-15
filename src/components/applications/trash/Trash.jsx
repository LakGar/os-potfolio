import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { FaTrashAlt } from "react-icons/fa";
import "./Trash.css";

const Trash = () => {
  const { accentColor } = useContext(ThemeContext);

  return (
    <div className="trash-container">
      <div className="trash-content">
        <div className="trash-icon">
          <FaTrashAlt />
        </div>
        <h2 className="trash-title">Trash</h2>
        <p className="trash-message">The Trash is Empty</p>
        <button
          className="empty-trash-button"
          style={{ backgroundColor: accentColor }}
          disabled
        >
          Empty Trash
        </button>
      </div>
    </div>
  );
};

export default Trash;
