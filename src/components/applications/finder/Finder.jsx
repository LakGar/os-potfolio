import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHouse,
  FaCode,
  FaDownload,
  FaDesktop,
  FaMagnifyingGlass,
  FaList,
  FaTableCells,
  FaLaptopCode,
} from "react-icons/fa6";
import {
  FaAppStore,
  FaAddressCard,
  FaFolder,
  FaFile,
  FaGithub,
  FaLinkedin,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import {
  FaCode as FaCodeIcon,
  FaDatabase,
  FaCloud,
  FaRobot,
  FaLink,
  FaCubes,
  FaPython,
  FaJs,
  FaHtml5,
  FaCss3,
  FaDocker,
  FaAws,
  FaServer,
  FaKey,
  FaBrain,
  FaLanguage,
  FaEthereum,
  FaNetworkWired,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiMysql,
  SiExpress,
  SiJenkins,
  SiWeb3Dotjs,
  SiJsonwebtokens,
} from "react-icons/si";
import "./Finder.css";
import Folder from "/Users/lakshaygarg/Developer/Portfolio/os-portfolio/src/assets/folder-icon-macos.webp";
import { ThemeContext } from "../../../contexts/ThemeContext";
import {
  FaTools,
  FaProjectDiagram,
  FaShieldAlt,
  FaMobile,
  FaChartLine,
  FaUserCog,
  FaCodeBranch,
  FaBug,
  FaLayerGroup,
  FaFileCode,
  FaTerminal,
  FaRocket,
  FaLock,
} from "react-icons/fa";
import {
  SiKubernetes,
  SiGrafana,
  SiElasticsearch,
  SiRedis,
  SiPostgresql,
  SiFirebase,
  SiSwift,
  SiKotlin,
  SiTensorflow,
  SiPytest,
  SiJest,
  SiJira,
  SiConfluence,
  SiGraphql,
} from "react-icons/si";
import { GoLaw } from "react-icons/go";

import { FaInstagram, FaTwitter } from "react-icons/fa";

// Update icon colors
const BRAND_COLORS = {
  python: "#3776AB", // Python blue
  javascript: "#F7DF1E", // JavaScript yellow
  typescript: "#3178C6", // TypeScript blue
  rust: "#000000", // Rust black
  go: "#00ADD8", // Go blue
  cpp: "#00599C", // C++ blue
  java: "#007396", // Java blue
  csharp: "#239120", // C# green
  php: "#777BB4", // PHP purple
  html: "#E34F26", // HTML orange
  css: "#1572B6", // CSS blue
  ruby: "#CC342D", // Ruby red
  lua: "#2C2D72", // Lua dark blue
  scala: "#DC322F", // Scala red
  haskell: "#5D4F85", // Haskell purple
  elixir: "#4B275F", // Elixir purple
  swift: "#FA7343", // Swift orange
  kotlin: "#7F52FF", // Kotlin purple
  dart: "#0175C2", // Dart blue
  solidity: "#363636", // Solidity dark gray
  mongodb: "#47A248", // MongoDB green
  mysql: "#4479A1", // MySQL blue
  postgresql: "#336791", // PostgreSQL blue
  redis: "#DC382D", // Redis red
  aws: "#FF9900", // AWS orange
  docker: "#2496ED", // Docker blue
  kubernetes: "#326CE5", // Kubernetes blue
  react: "#61DAFB", // React light blue
  node: "#339933", // Node.js green
  express: "#000000", // Express black
  graphql: "#E10098", // GraphQL pink
  tensorflow: "#FF6F00", // TensorFlow orange
  git: "#F05032", // Git orange
  github: "limegreen", // GitHub green
  jenkins: "#D24939", // Jenkins red
  jira: "#0052CC", // Jira blue
  elasticsearch: "#005571", // Elasticsearch blue
  firebase: "#FFCA28", // Firebase yellow
  encryption: "purple", // Encryption wine red
  oauth: "darkred", // OAuth green
  rest: "lightbllue", // REST green
  integration: "hotpink", // Integration green
  automation: "orange", // Automation green
  unittest: "limegreen", // Unit Test green
  linkedin: "#2366c2", // LinkedIn blue
  instagram: "gradient(to bottom,rgb(124, 59, 220), #f091e7)", // Instagram purple
  twitter: "skyblue", // Twitter blue
  law: "red", // Law red
};

// File system structure
const fileSystem = {
  root: {
    type: "folder",
    name: "Root",
    children: {
      projects: {
        type: "folder",
        name: "Projects",
        children: {
          webDev: {
            type: "folder",
            name: "Web Development",
            children: {
              project1: {
                type: "file",
                name: "Mike Ross",
                icon: GoLaw,
                iconColor: BRAND_COLORS.law,
                link: "https://github.com/LakGar/MikeRoss",
              },
              project2: {
                type: "file",
                name: "Instagram Clone",
                icon: FaInstagram,
                iconColor: BRAND_COLORS.instagram,
                link: "https://github.com/LakGar/Instagram-Clone",
              },
            },
          },
          web3: {
            type: "folder",
            name: "Web3",
            children: {
              project3: {
                type: "file",
                name: "PumpRoyal",
                icon: FaEthereum,
                iconColor: BRAND_COLORS.web3,
                link: "https://github.com/LakGar/pump-royal",
              },
              project4: {
                type: "file",
                name: "Web3 Payment",
                icon: FaEthereum,
                iconColor: BRAND_COLORS.ml,
                link: "https://github.com/LakGar/web3-payment",
              },
            },
          },
          ml: {
            type: "folder",
            name: "Machine Learning",
            children: {
              project5: {
                type: "file",
                name: "Groovr",
                icon: FaBrain,
                iconColor: BRAND_COLORS.ml,
                link: "https://github.com/LakGar/Groovr-ML",
              },
              project6: {
                type: "file",
                name: "Crowdfunding ETL",
                icon: FaBrain,
                iconColor: BRAND_COLORS.ml,
                link: "https://github.com/LakGar/Crowdfunding_ETL",
              },
              project7: {
                type: "file",
                name: "Microbes in Naval",
                icon: FaBrain,
                iconColor: BRAND_COLORS.ml,
                link: "https://github.com/LakGar/belly_button_challenge",
              },
              project8: {
                type: "file",
                name: "Sentiment Analysis",
                icon: FaBrain,
                iconColor: BRAND_COLORS.ml,
                link: "https://github.com/LakGar/Sentiment-Analysis",
              },
            },
          },
          mobile: {
            type: "folder",
            name: "Mobile Development",
            children: {
              project9: {
                type: "file",
                name: "Cognia",
                icon: FaMobile,
                iconColor: BRAND_COLORS.mobile,
                link: "https://github.com/LakGar/Cognia",
              },
              project10: {
                type: "file",
                name: "Yummy Curry",
                icon: FaMobile,
                iconColor: BRAND_COLORS.mobile,
                link: "https://github.com/LakGar/yummycurry",
              },
            },
          },
        },
      },
      skills: {
        type: "folder",
        name: "Skills",
        children: {
          programming: {
            type: "folder",
            name: "Programming Languages",
            children: {
              python: {
                type: "file",
                name: "Python",
                icon: FaPython,
                iconColor: BRAND_COLORS.python,
                description: "Advanced proficiency in Python, Django, FastAPI",
              },
              typescript: {
                type: "file",
                name: "TypeScript",
                icon: SiTypescript,
                iconColor: BRAND_COLORS.typescript,
                description: "Strong TypeScript development",
              },
              javascript: {
                type: "file",
                name: "JavaScript ES6+",
                icon: FaJs,
                iconColor: BRAND_COLORS.javascript,
                description:
                  "Expert in modern JavaScript, Async/Await, Promises",
              },
              html: {
                type: "file",
                name: "HTML5",
                icon: FaHtml5,
                iconColor: BRAND_COLORS.html,
                description: "Advanced HTML5 development",
              },
              css: {
                type: "file",
                name: "CSS3",
                icon: FaCss3,
                iconColor: BRAND_COLORS.css,
                description: "Expert in CSS3 and animations",
              },
            },
          },
          databases: {
            type: "folder",
            name: "Databases",
            children: {
              sql: {
                type: "file",
                name: "SQL",
                icon: FaDatabase,
                iconColor: BRAND_COLORS.sql,
                description: "Proficient in SQL query optimization",
              },
              nosql: {
                type: "file",
                name: "NoSQL",
                icon: FaDatabase,
                iconColor: BRAND_COLORS.nosql,
                description: "Experience with NoSQL databases",
              },
              mongodb: {
                type: "file",
                name: "MongoDB",
                icon: SiMongodb,
                iconColor: BRAND_COLORS.mongodb,
                description: "MongoDB database management",
              },
              mysql: {
                type: "file",
                name: "MySQL",
                icon: SiMysql,
                iconColor: BRAND_COLORS.mysql,
                description: "MySQL database administration",
              },
            },
          },
          webDev: {
            type: "folder",
            name: "Web Development",
            children: {
              react: {
                type: "file",
                name: "React",
                icon: FaReact,
                iconColor: BRAND_COLORS.react,
                description: "Advanced React development",
              },
              node: {
                type: "file",
                name: "Node.js",
                icon: FaNodeJs,
                iconColor: BRAND_COLORS.node,
                description: "Node.js backend development",
              },
              express: {
                type: "file",
                name: "Express",
                icon: SiExpress,
                iconColor: BRAND_COLORS.express,
                description: "Express.js framework expertise",
              },
            },
          },
          devOps: {
            type: "folder",
            name: "DevOps & Cloud",
            children: {
              github: {
                type: "file",
                name: "GitHub",
                icon: FaGithub,
                iconColor: BRAND_COLORS.github,
                description: "Version control and collaboration",
              },
              docker: {
                type: "file",
                name: "Docker",
                icon: FaDocker,
                iconColor: BRAND_COLORS.docker,
                description: "Container orchestration",
              },
              aws: {
                type: "file",
                name: "AWS",
                icon: FaAws,
                iconColor: BRAND_COLORS.aws,
                description: "AWS (S3, EC2, Lambda) services",
              },
              cicd: {
                type: "file",
                name: "CI/CD",
                icon: SiJenkins,
                iconColor: BRAND_COLORS.jenkins,
                description: "Jenkins, GitHub Actions",
              },
            },
          },
          api: {
            type: "folder",
            name: "API & Authentication",
            children: {
              rest: {
                type: "file",
                name: "RESTful APIs",
                icon: FaServer,
                iconColor: BRAND_COLORS.rest,
                description: "REST API development",
              },
              jwt: {
                type: "file",
                name: "JWT Authentication",
                icon: SiJsonwebtokens,
                iconColor: BRAND_COLORS.jwt,
                description: "JWT-based Authentication",
              },
            },
          },
          ai: {
            type: "folder",
            name: "Artificial Intelligence",
            children: {
              ml: {
                type: "file",
                name: "Machine Learning",
                icon: FaBrain,
                iconColor: BRAND_COLORS.ml,
                description: "ML algorithms and implementations",
              },
              nlp: {
                type: "file",
                name: "Natural Language Processing",
                icon: FaLanguage,
                iconColor: BRAND_COLORS.nlp,
                description: "NLP and text processing",
              },
            },
          },
          blockchain: {
            type: "folder",
            name: "Blockchain",
            children: {
              web3: {
                type: "file",
                name: "Web3.js",
                icon: SiWeb3Dotjs,
                iconColor: BRAND_COLORS.web3,
                description: "Web3 development",
              },
              smartContracts: {
                type: "file",
                name: "Smart Contracts",
                icon: FaEthereum,
                iconColor: BRAND_COLORS.smartContracts,
                description: "Smart contract development",
              },
              defi: {
                type: "file",
                name: "DeFi Protocols",
                icon: FaLink,
                iconColor: BRAND_COLORS.defi,
                description: "Decentralized Finance protocols",
              },
            },
          },
          systemDesign: {
            type: "folder",
            name: "System Design",
            children: {
              architecture: {
                type: "file",
                name: "System Architecture",
                icon: FaProjectDiagram,
                iconColor: BRAND_COLORS.architecture,
                description: "Microservices, Distributed Systems, Scalability",
              },
              infrastructure: {
                type: "file",
                name: "Infrastructure",
                icon: FaLayerGroup,
                iconColor: BRAND_COLORS.infrastructure,
                description: "Load Balancing, Caching, Message Queues",
              },
              kubernetes: {
                type: "file",
                name: "Kubernetes",
                icon: SiKubernetes,
                iconColor: BRAND_COLORS.kubernetes,
                description: "Container Orchestration, Cluster Management",
              },
              monitoring: {
                type: "file",
                name: "Monitoring & Logging",
                icon: SiGrafana,
                iconColor: BRAND_COLORS.monitoring,
                description: "Grafana, ELK Stack, Prometheus",
              },
            },
          },
          dataEngineering: {
            type: "folder",
            name: "Data Engineering",
            children: {
              elasticsearch: {
                type: "file",
                name: "Elasticsearch",
                icon: SiElasticsearch,
                iconColor: BRAND_COLORS.elasticsearch,
                description: "Search Engine, Data Indexing",
              },
              redis: {
                type: "file",
                name: "Redis",
                icon: SiRedis,
                iconColor: BRAND_COLORS.redis,
                description: "In-Memory Database, Caching",
              },
              postgresql: {
                type: "file",
                name: "PostgreSQL",
                icon: SiPostgresql,
                iconColor: BRAND_COLORS.postgresql,
                description: "Advanced SQL, Performance Tuning",
              },
            },
          },
          mobileDev: {
            type: "folder",
            name: "Mobile Development",
            children: {
              reactNative: {
                type: "file",
                name: "React Native",
                icon: FaMobile,
                iconColor: BRAND_COLORS.reactNative,
                description: "Cross-platform Mobile Development",
              },
              ios: {
                type: "file",
                name: "iOS Development",
                icon: SiSwift,
                iconColor: BRAND_COLORS.ios,
                description: "Swift, iOS Architecture",
              },
              android: {
                type: "file",
                name: "Android Development",
                icon: SiKotlin,
                iconColor: BRAND_COLORS.android,
                description: "Kotlin, Android Architecture",
              },
            },
          },
          testing: {
            type: "folder",
            name: "Testing & Quality",
            children: {
              unittest: {
                type: "file",
                name: "Unit Testing",
                icon: FaBug,
                iconColor: BRAND_COLORS.unittest,
                description: "PyTest, Jest, JUnit",
              },
              integration: {
                type: "file",
                name: "Integration Testing",
                icon: FaCodeBranch,
                iconColor: BRAND_COLORS.integration,
                description: "API Testing, E2E Testing",
              },
              automation: {
                type: "file",
                name: "Test Automation",
                icon: FaRocket,
                iconColor: BRAND_COLORS.automation,
                description: "Selenium, Cypress, TestNG",
              },
            },
          },
          security: {
            type: "folder",
            name: "Security",
            children: {
              oauth: {
                type: "file",
                name: "OAuth & OpenID",
                icon: FaLock,
                iconColor: BRAND_COLORS.oauth,
                description: "Authentication Protocols",
              },
              encryption: {
                type: "file",
                name: "Encryption",
                icon: FaShieldAlt,
                iconColor: BRAND_COLORS.encryption,
                description: "Data Security, SSL/TLS",
              },
            },
          },
          tools: {
            type: "folder",
            name: "Development Tools",
            children: {
              git: {
                type: "file",
                name: "Git Advanced",
                icon: FaCodeBranch,
                iconColor: BRAND_COLORS.git,
                description: "Version Control, Git Flow",
              },
              jira: {
                type: "file",
                name: "JIRA",
                icon: SiJira,
                iconColor: BRAND_COLORS.jira,
                description: "Project Management, Agile",
              },
              terminal: {
                type: "file",
                name: "Command Line",
                icon: FaTerminal,
                iconColor: BRAND_COLORS.terminal,
                description: "Bash, Shell Scripting",
              },
            },
          },
          aiMl: {
            type: "folder",
            name: "AI & ML Tools",
            children: {
              tensorflow: {
                type: "file",
                name: "TensorFlow",
                icon: SiTensorflow,
                iconColor: BRAND_COLORS.tensorflow,
                description: "Deep Learning Framework",
              },
              dataAnalysis: {
                type: "file",
                name: "Data Analysis",
                icon: FaChartLine,
                iconColor: BRAND_COLORS.dataAnalysis,
                description: "Pandas, NumPy, Scikit-learn",
              },
            },
          },
        },
      },
      contact: {
        type: "folder",
        name: "Contact",
        children: {
          github: {
            type: "file",
            name: "GitHub",
            icon: FaGithub,
            iconColor: BRAND_COLORS.github,
            link: "https://github.com/LakGar",
          },
          linkedin: {
            type: "file",
            name: "LinkedIn",
            icon: FaLinkedin,
            iconColor: BRAND_COLORS.linkedin,
            link: "https://linkedin.com/in/lakgarg",
          },
          instagram: {
            type: "file",
            name: "Instagram",
            icon: FaInstagram,
            iconColor: BRAND_COLORS.instagram,
            link: "https://www.instagram.com/bigshlak/",
          },
          twitter: {
            type: "file",
            name: "Twitter",
            icon: FaTwitter,
            iconColor: BRAND_COLORS.twitter,
            link: "https://x.com/lakgarg02",
          },
        },
      },
    },
  },
};

const Finder = () => {
  const [selectedItem, setSelectedItem] = useState("home");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPath, setCurrentPath] = useState(["root"]);
  const [navigationHistory, setNavigationHistory] = useState([["root"]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const sidebarItems = [
    {
      id: "favorites",
      label: "Favorites",
      items: [
        {
          id: "applications",
          label: "Applications",
          icon: FaAppStore,
          path: ["root", "applications"],
        },
        {
          id: "documents",
          label: "Documents",
          icon: FaFolder,
          path: ["root", "documents"],
        },
        {
          id: "downloads",
          label: "Downloads",
          icon: FaDownload,
          path: ["root", "downloads"],
        },
        {
          id: "desktop",
          label: "Desktop",
          icon: FaDesktop,
          path: ["root", "desktop"],
        },
      ],
    },
    {
      id: "locations",
      label: "Locations",
      items: [
        { id: "home", label: "Home", icon: FaHouse, path: ["root"] },
        {
          id: "projects",
          label: "Projects",
          icon: FaCode,
          path: ["root", "projects"],
        },
        {
          id: "skills",
          label: "Skills",
          icon: FaLaptopCode,
          path: ["root", "skills"],
        },
        {
          id: "contact",
          label: "Contact",
          icon: FaAddressCard,
          path: ["root", "contact"],
        },
      ],
    },
  ];

  const handleSidebarClick = (item) => {
    setSelectedItem(item.id);
    navigateToPath(item.path);
  };

  const navigateToPath = (path) => {
    setCurrentPath(path);
    const newHistory = [...navigationHistory.slice(0, historyIndex + 1), path];
    setNavigationHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Get current folder contents
  const getCurrentFolder = () => {
    let current = fileSystem;
    for (const pathPart of currentPath) {
      current = current[pathPart]?.children || current[pathPart];
    }
    return current;
  };

  // Navigate to a folder
  const navigateToFolder = (folderId) => {
    const newPath = [...currentPath, folderId];
    setCurrentPath(newPath);
    // Add to history
    const newHistory = [
      ...navigationHistory.slice(0, historyIndex + 1),
      newPath,
    ];
    setNavigationHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Handle navigation buttons
  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(navigationHistory[historyIndex - 1]);
    }
  };

  const handleForward = () => {
    if (historyIndex < navigationHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(navigationHistory[historyIndex + 1]);
    }
  };

  // Handle file click
  const handleFileClick = (file) => {
    if (file.link) {
      window.open(file.link, "_blank");
    }
  };

  // Render current folder contents
  const renderContents = () => {
    const currentFolder = getCurrentFolder();
    if (!currentFolder) return null;

    return Object.entries(currentFolder).map(([id, item]) => (
      <div
        key={id}
        className="finder-item"
        onClick={() => {
          if (item.type === "folder") {
            navigateToFolder(id);
          } else {
            handleFileClick(item);
          }
        }}
      >
        {item.icon ? (
          <item.icon
            className="finder-item-icon"
            style={{ color: item.iconColor || "inherit" }}
          />
        ) : item.type === "folder" ? (
          <img src={Folder} alt="Folder" className="finder-item-folder" />
        ) : (
          <FaFile className="finder-item-icon" />
        )}
        <span>{item.name}</span>
      </div>
    ));
  };

  return (
    <div className="finder-container">
      <div className="finder-sidenav">
        {sidebarItems.map((section) => (
          <div key={section.id} className="finder-nav-section">
            <p className="finder-nav-section-label">{section.label}</p>
            {section.items.map((item) => (
              <div
                key={item.id}
                className={`finder-nav-item ${
                  selectedItem === item.id ? "selected" : ""
                }`}
                onClick={() => handleSidebarClick(item)}
              >
                <item.icon className="finder-nav-icon" />
                <span className="finder-nav-item-label">{item.label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="finder-content">
        <div className="finder-header">
          <div className="finder-toolbar">
            <div className="finder-navigation">
              <button
                className="finder-nav-button"
                onClick={handleBack}
                disabled={historyIndex <= 0}
              >
                <FaChevronLeft />
              </button>
              <button
                className="finder-nav-button"
                onClick={handleForward}
                disabled={historyIndex >= navigationHistory.length - 1}
              >
                <FaChevronRight />
              </button>
            </div>
            <div className="finder-breadcrumb">
              {currentPath.map((path, index) => (
                <span key={path}>
                  {index > 0 && " > "}
                  {fileSystem[path]?.name || path}
                </span>
              ))}
            </div>
            <div className="finder-view-options">
              <button
                className={`finder-view-button ${
                  viewMode === "grid" ? "active" : ""
                }`}
                onClick={() => setViewMode("grid")}
              >
                <FaTableCells />
              </button>
              <button
                className={`finder-view-button ${
                  viewMode === "list" ? "active" : ""
                }`}
                onClick={() => setViewMode("list")}
              >
                <FaList />
              </button>
            </div>
            <div className="finder-search">
              <FaMagnifyingGlass
                className="search-icon1"
                stlye={{ left: 90 }}
              />
              <input type="text" placeholder="Search" />
            </div>
          </div>
        </div>
        <div className="finder-content-area">
          <div className={`finder-items ${viewMode}`}>{renderContents()}</div>
        </div>
      </div>
    </div>
  );
};

export default Finder;
