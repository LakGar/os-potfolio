import React, { useState, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import {
  FaPlus,
  FaSearch,
  FaChevronRight,
  FaFolder,
  FaFilePdf,
} from "react-icons/fa";
import "./Notes.css";
import ResumePDF from "../../../assets/file/Resume Master.pdf";

const initialNotes = [
  {
    id: 1,
    title: "Resume",
    content: `Lakshay Garg
lakgarg2002@gmail.com | +1 (408) 455 8736 | Santa Clara, CA
linkedin.com/in/lakgarg/ | github.com/LakGar

PROFESSIONAL SUMMARY
Full Stack Developer with 3+ years of experience in AI-driven applications and Web3 solutions. Founder of a legal AI platform with an 83% profit margin and winner of multiple hackathon awards. Skilled in Python, React, Node.js, MongoDB, AWS, and PyTorch, with a focus on building scalable, user-focused products.

EDUCATION

De Anza-Winter 2024
Computer Science
Relevant Coursework: Data Structures & Algorithms, Operating Systems, Deep Learning, Database Systems, Artificial Intelligence, Natural Language Processing, Applied Machine Learning, Linear Algebra, Computer Systems

EXPERIENCE

LegalAI-Fall 2024 - Present
Founder/Developer - Python, React.js, Node.js, MongoDB, PyTorch, AWS, Docker
• Built an AI platform for legal document analysis, empowering SMBs with contract insights, using the MERN stack for efficient processing and AWS for secure document storage
• Integrated NLP models from Hugging Face and spaCy, achieving high accuracy in document parsing and enabling real-time contract analysis
• Created a subscription-based model, achieving an 83% profit margin and expanding the platform's user base

Cute Smiles-Summer 2021 - Fall 2023
FullStack Developer - React.js, Node.js, SQL, AWS, Docker, Github
• Developed a responsive website using React, increasing user engagement by 30% through enhanced UI/UX design and interactivity
• Reduced response times by 40% with a real-time notification system built using Socket.io
• Maintained CI/CD pipelines, delivering 99% uptime and improving deployment efficiency
• Enhanced monthly revenue by 50% by implementing targeted SEO strategies and online registration improvements
• Led a full website redesign during a transition phase, resulting in a 25% increase in new user inquiries

PROJECTS

PumpRoyale-Oct 2024
Full Stack Developer/Smart Contract Developer
• Developed a Web3 fitness app with daily push-up challenges, leveraging smart contracts for staking and rewards
• Integrated wallet and staking functionalities using Web3.js, enabling secure DeFi transactions
• Earned Top 10 and three sponsored prizes at EthGlobal for innovative use of blockchain in fitness
• Tools: React, Node.js, MongoDB, Thirdweb, Web3.js, AWS

Mike Ross-Sep 2024
Full Stack Developer
• Created an AI-powered Legal Document Parser for small businesses, awarded First Place at Ridge Ventures hackathon for excellence in legal tech innovation
• Built key features, including document upload, contract analysis, task management, and a secure audit trail, simplifying legal workflows for SMBs
• Tools: React.js, Node.js, MongoDB, PyTorch, AWS, Docker

SKILLS

Languages: Python, TypeScript, JavaScript ES6+, CSS3, HTML5, SQL
Databases: MongoDB, MySQL, NoSQL
Frameworks: React, Node.js, Express
Cloud & DevOps: AWS (S3, EC2, Lambda), Docker, CI/CD (Jenkins, GitHub Actions)
Web3: Web3.js, Smart Contracts, DeFi Protocols
AI/ML: PyTorch, Machine Learning, Natural Language Processing
Other: RESTful APIs, JWT Authentication, Git, GitHub`,
    lastModified: new Date(),
    pdfLink: ResumePDF,
  },
  {
    id: 2,
    title: "CV",
    content: `CURRICULUM VITAE

Lakshay Garg
Computer Science Student & Software Developer

Professional Summary:
Dedicated computer science student with a strong foundation in software development...



Who likes to write CVs? Please do it for me here`,
    lastModified: new Date(),
    pdfLink: ResumePDF,
  },
];

const Notes = () => {
  const { accentColor } = useContext(ThemeContext);
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Untitled Note",
      content: "",
      lastModified: new Date(),
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
    setIsEditing(true);
  };

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    setIsEditing(false);
  };

  const handleContentChange = (e) => {
    const updatedNote = {
      ...selectedNote,
      content: e.target.value,
      lastModified: new Date(),
    };
    setSelectedNote(updatedNote);
    setNotes(
      notes.map((note) => (note.id === selectedNote.id ? updatedNote : note))
    );
  };

  const handleTitleChange = (e) => {
    const updatedNote = {
      ...selectedNote,
      title: e.target.value,
      lastModified: new Date(),
    };
    setSelectedNote(updatedNote);
    setNotes(
      notes.map((note) => (note.id === selectedNote.id ? updatedNote : note))
    );
  };

  const handleOpenPDF = (pdfLink) => {
    window.open(pdfLink, "_blank");
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const buttonStyle = {
    backgroundColor: accentColor,
  };

  return (
    <div className="notes-container">
      <div className="notes-sidebar">
        <div className="notes-header">
          <button
            className="new-note-button"
            onClick={handleNewNote}
            style={{ color: accentColor }}
          >
            <FaPlus />
          </button>
          <div className="search-container">
            <FaSearch className="search-icon-notes" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className="notes-folders">
          <div className="folder-item">
            <FaChevronRight className="folder-icon" />
            <FaFolder />
            <span>iCloud</span>
            <span className="note-count">{notes.length}</span>
          </div>
        </div>
        <div className="notes-list">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`note-item ${
                selectedNote?.id === note.id ? "selected" : ""
              }`}
              onClick={() => handleNoteSelect(note)}
            >
              <div className="note-title">{note.title}</div>
              <div className="note-preview">
                {note.content.substring(0, 40)}...
              </div>
              <div className="note-date">{formatDate(note.lastModified)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="notes-editor">
        {selectedNote && (
          <>
            <div className="editor-header">
              <div className="editor-header-top">
                <input
                  type="text"
                  className="note-title-input"
                  value={selectedNote.title}
                  onChange={handleTitleChange}
                  onFocus={() => setIsEditing(true)}
                  style={{
                    "--focus-color": accentColor,
                  }}
                />
                {selectedNote.pdfLink && (
                  <button
                    className="view-pdf-button"
                    onClick={() => handleOpenPDF(selectedNote.pdfLink)}
                    style={buttonStyle}
                  >
                    <FaFilePdf />
                    <span>View PDF</span>
                  </button>
                )}
              </div>
              <div className="editor-date">
                {formatDate(selectedNote.lastModified)}
              </div>
            </div>
            <textarea
              className="note-content"
              value={selectedNote.content}
              onChange={handleContentChange}
              onFocus={() => setIsEditing(true)}
              placeholder="Type something..."
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Notes;
