import React, { useState, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import {
  FaSearch,
  FaStar,
  FaDownload,
  FaGithub,
  FaCompass,
  FaPencilAlt,
  FaBriefcase,
  FaGamepad,
  FaCode,
  FaThLarge,
  FaChevronLeft,
} from "react-icons/fa";
import "./AppStore.css";
import legalai1 from "../../../assets/apps/legalai-1.png";
import legalai2 from "../../../assets/apps/legalai-2.png";
import legalai3 from "../../../assets/apps/legalai-3.png";
import LegalAI from "../../../assets/apps/legalai-logo.png";
import legalaiPreview from "../../../assets/apps/legalai-preview.png";
import pumpRoyal1 from "../../../assets/apps/pump-royal-1.jpeg";
import pumpRoyal2 from "../../../assets/apps/pump-royal-2.jpeg";
import pumpRoyal from "../../../assets/apps/pump-royal-logo.png";
import mikeRoss from "../../../assets/apps/mike-ross-logo.png";
import mikeross1 from "../../../assets/apps/mike-ross-1.png";
import mikeross2 from "../../../assets/apps/mike-ross-2.png";
import mikeross3 from "../../../assets/apps/mike-ross-3.png";
const apps = [
  {
    id: 1,
    title: "LegalAI",
    developer: "Lakshay Garg",
    category: "Productivity",
    description:
      "AI platform for legal document analysis, empowering SMBs with contract insights. Built with advanced NLP models and secure document processing, LegalAI streamlines contract review and management for businesses of all sizes.",
    rating: 4.8,
    reviews: 128,
    price: "Free",
    size: "156 MB",
    language: "English",
    lastUpdated: "2 weeks ago",
    image: LegalAI,
    github: "https://github.com/LakGar/LegalAI",
    website: "https://legalai.dev",
    screenshots: [legalai1, legalai2, legalai3],
    features: [
      "AI-Powered Document Analysis",
      "Smart Contract Insights",
      "Real-time Processing Engine",
      "Enterprise-grade Security",
      "Cloud Document Storage",
      "Collaboration Tools",
    ],
    whatsnew: [
      "Enhanced document processing speed",
      "New collaboration features",
      "Improved UI/UX",
      "Bug fixes and performance improvements",
    ],
  },
  {
    id: 2,
    title: "PumpRoyale",
    developer: "Lakshay Garg",
    category: "Health & Fitness",
    description:
      "Web3 fitness app with daily push-up challenges and blockchain rewards.",
    rating: 4.9,
    reviews: 256,
    image: pumpRoyal,
    github: "https://github.com/LakGar/PumpRoyale",
    website: "https://ethglobal.com/showcase/pumproyale-vdz5o",
    screenshots: [pumpRoyal1, pumpRoyal2],
    features: [
      "Daily Challenges",
      "Blockchain Rewards",
      "Fitness Tracking",
      "Community Features",
    ],
    whatsnew: [
      "Initial Release",
      "Core features implementation",
      "Performance optimizations",
    ],
    size: "82 MB",
    language: "English",
    lastUpdated: "1 month ago",
    price: "Free",
  },
  {
    id: 3,
    title: "Mike Ross",
    developer: "Lakshay Garg",
    category: "Business",
    description: "AI-powered Legal Document Parser for small businesses.",
    rating: 4.7,
    reviews: 89,
    image: mikeRoss,
    github: "https://github.com/LakGar/MikeRoss",
    website: "https://github.com/LakGar/MikeRoss",
    screenshots: [mikeross1, mikeross2, mikeross3],
    features: [
      "Document Parsing",
      "Task Management",
      "Audit Trail",
      "Secure Storage",
    ],
    whatsnew: [
      "Initial Release",
      "Basic parsing functionality",
      "Security enhancements",
    ],
    size: "94 MB",
    language: "English",
    lastUpdated: "3 weeks ago",
    price: "Free",
  },
];

const categories = [
  {
    icon: <FaCompass color="var(--accent-color)" />,
    name: "Discover",
    count: 15,
  },
  {
    icon: <FaPencilAlt color="var(--accent-color)" />,
    name: "Create",
    count: 8,
  },
  {
    icon: <FaBriefcase color="var(--accent-color)" />,
    name: "Work",
    count: 12,
  },
  { icon: <FaGamepad color="var(--accent-color)" />, name: "Play", count: 6 },
  { icon: <FaCode color="var(--accent-color)" />, name: "Develop", count: 10 },
  {
    icon: <FaThLarge color="var(--accent-color)" />,
    name: "Categories",
    count: null,
  },
];

const AppStore = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Discover");
  const [searchQuery, setSearchQuery] = useState("");
  const { accentColor } = useContext(ThemeContext);

  const handleAppClick = (app) => {
    setSelectedApp(app);
  };

  const handleBack = () => {
    setSelectedApp(null);
  };

  const filteredApps = apps.filter(
    (app) =>
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ratingStyle = {
    color: accentColor,
  };

  const buttonStyle = {
    backgroundColor: accentColor,
  };

  return (
    <div className="appstore-container">
      <div className="appstore-sidebar">
        <div className="sidebar-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="sidebar-categories">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`category ${
                selectedCategory === category.name ? "selected" : ""
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.icon}
              <span>{category.name}</span>
              {category.count && (
                <span className="category-count">{category.count}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="appstore-content">
        {selectedApp ? (
          <div className="app-details">
            <button className="back-button" onClick={handleBack}>
              <FaChevronLeft /> Back
            </button>
            <div className="app-header">
              <div className="app-header-left">
                <img
                  src={selectedApp.image}
                  alt={selectedApp.title}
                  className="app-detail-icon"
                />
                <div className="app-header-info">
                  <h1>{selectedApp.title}</h1>
                  <p>{selectedApp.developer}</p>
                  <div className="app-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.floor(selectedApp.rating) ? "filled" : ""
                          }
                        />
                      ))}
                    </div>
                    <span>
                      {selectedApp.rating} • {selectedApp.reviews} Reviews
                    </span>
                  </div>
                </div>
              </div>
              <div className="app-header-right">
                <a
                  href={selectedApp.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="get-button"
                >
                  <FaGithub />
                  <span>View on GitHub</span>
                </a>
                {selectedApp.website && (
                  <a
                    href={selectedApp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="website-button"
                  >
                    <FaDownload />
                    <span>Visit Website</span>
                  </a>
                )}
              </div>
            </div>
            <div className="app-info-grid">
              {selectedApp.size && (
                <div className="info-item">
                  <span className="info-label">Size</span>
                  <span className="info-value">{selectedApp.size}</span>
                </div>
              )}
              {selectedApp.language && (
                <div className="info-item">
                  <span className="info-label">Language</span>
                  <span className="info-value">{selectedApp.language}</span>
                </div>
              )}
              {selectedApp.lastUpdated && (
                <div className="info-item">
                  <span className="info-label">Last Updated</span>
                  <span className="info-value">{selectedApp.lastUpdated}</span>
                </div>
              )}
              {selectedApp.price && (
                <div className="info-item">
                  <span className="info-label">Price</span>
                  <span className="info-value">{selectedApp.price}</span>
                </div>
              )}
            </div>
            {selectedApp.whatsnew && selectedApp.whatsnew.length > 0 && (
              <div className="whats-new">
                <h3>What's New</h3>
                <div className="version">Version 2.1.0</div>
                <ul>
                  {selectedApp.whatsnew.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="app-screenshots">
              {selectedApp.screenshots.map((screenshot, index) => (
                <div key={index} className="screenshot">
                  <img
                    src={screenshot}
                    alt={`${selectedApp.title} screenshot ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="app-description">
              <h2>About this app</h2>
              <p>{selectedApp.description}</p>
              <h3>Features</h3>
              <ul className="features-list">
                {selectedApp.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="featured-section">
              <h2>Featured Apps</h2>
              <div className="featured-grid">
                {filteredApps.slice(0, 2).map((app) => (
                  <div
                    key={app.id}
                    className="featured-card"
                    onClick={() => handleAppClick(app)}
                  >
                    <img src={app.image} alt={app.title} />
                    <div className="featured-info">
                      <h3>{app.title}</h3>
                      <p>{app.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="apps-section">
              <h2>All Apps</h2>
              <div className="apps-grid">
                {filteredApps.map((app) => (
                  <div
                    key={app.id}
                    className="app-card"
                    onClick={() => handleAppClick(app)}
                  >
                    <div className="app-icon">
                      <img src={app.image} alt={app.title} />
                    </div>
                    <div className="app-info">
                      <h3>{app.title}</h3>
                      <p className="app-category">{app.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AppStore;
