import React, { useEffect, useState, useContext } from "react";
import "./Messages.css";
import momAvatar from "../../../assets/avatars/mom-avatar.png";
import dadAvatar from "../../../assets/avatars/dad-avatar.png";
import katieAvatar from "../../../assets/avatars/katie-avatar.png";
import johnAvatar from "../../../assets/avatars/john-testimonial.png";
import sarahAvatar from "../../../assets/avatars/sarah-testimonial.png";
import meAvatar from "../../../assets/avatars/me-avatar.png";
import { ThemeContext } from "../../../contexts/ThemeContext";
import {
  FaSearch,
  FaVideo,
  FaArrowUp,
  FaQuestionCircle,
  FaExclamationCircle,
  FaComments,
} from "react-icons/fa";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputError, setInputError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const { accentColor } = useContext(ThemeContext);

  const chats = [
    {
      id: 1,
      name: "Mom",
      avatar: momAvatar,
      isPinned: true,
      lastMessage: "So proud of your work, honey! 💕",
      time: "2:30 PM",
      unread: 2,
    },
    {
      id: 2,
      name: "Dad",
      avatar: dadAvatar,
      isPinned: true,
      lastMessage: "That latest project looks great",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "Katie 🩷",
      avatar: katieAvatar,
      isPinned: true,
      lastMessage: "Coffee next week?",
      time: "Tue",
      unread: 1,
    },
    {
      id: 4,
      name: "John (Client)",
      avatar: johnAvatar,
      isPinned: false,
      lastMessage: "Working with you was...",
      time: "Mon",
      testimonial: true,
      unread: 0,
    },
    {
      id: 5,
      name: "Sarah (Tech Lead)",
      avatar: sarahAvatar,
      isPinned: false,
      lastMessage: "Great attention to detail",
      time: "Sun",
      testimonial: true,
      unread: 0,
    },
    {
      id: 6,
      name: "Chat with Me",
      avatar: meAvatar,
      isPinned: false,
      lastMessage: "Click to start a conversation",
      time: "Now",
      isInteractive: true,
      unread: 0,
    },
  ];

  const messageHistory = {
    1: [
      // Mom's messages
      {
        id: 1,
        content: "Hey sweetie! Just checked out your portfolio website 😊",
        time: "2:28 PM",
        type: "received",
      },
      {
        id: 2,
        content: "Thanks Mom! What do you think?",
        time: "2:29 PM",
        type: "sent",
      },
      {
        id: 3,
        content:
          "It's amazing! Love how you made it look like a Mac! So creative 💕",
        time: "2:30 PM",
        type: "received",
      },
      {
        id: 4,
        content: "So proud of your work, honey! 💕",
        time: "2:30 PM",
        type: "received",
      },
    ],
    2: [
      // Dad's messages
      {
        id: 1,
        content: "Hey, saw your new website",
        time: "Yesterday",
        type: "received",
      },
      {
        id: 2,
        content: "That latest project looks great",
        time: "Yesterday",
        type: "received",
      },
      {
        id: 3,
        content: "Thanks Dad! Been working hard on it",
        time: "Yesterday",
        type: "sent",
      },
      {
        id: 4,
        content: "Keep it up 👍",
        time: "Yesterday",
        type: "received",
      },
    ],
    3: [
      // Katie's messages
      {
        id: 1,
        content: "Your portfolio site is so cool! 😍",
        time: "Tue",
        type: "received",
      },
      {
        id: 2,
        content: "Thanks Katie! Took a while to get it right",
        time: "Tue",
        type: "sent",
      },
      {
        id: 3,
        content: "Coffee next week? Can tell me all about how you built it!",
        time: "Tue",
        type: "received",
      },
    ],
    4: [
      // John's messages
      {
        id: 1,
        content:
          "Working with you was fantastic! Your attention to detail really shows in the final product.",
        time: "Mon",
        type: "received",
      },
      {
        id: 2,
        content: "Thank you for the kind words, John!",
        time: "Mon",
        type: "sent",
      },
      {
        id: 3,
        content:
          "The project exceeded our expectations. Would love to work together again!",
        time: "Mon",
        type: "received",
      },
    ],
    5: [
      // Sarah's messages
      {
        id: 1,
        content:
          "Great attention to detail on that last feature implementation.",
        time: "Sun",
        type: "received",
      },
      {
        id: 2,
        content: "Thanks Sarah! Really enjoyed working on that project",
        time: "Sun",
        type: "sent",
      },
      {
        id: 3,
        content: "The team really appreciated your thorough documentation.",
        time: "Sun",
        type: "received",
      },
      {
        id: 4,
        content: "Documentation is key! 📚",
        time: "Sun",
        type: "sent",
      },
    ],
    6: [
      // Chat with Me
      {
        id: 1,
        content: "👋 Hi! I'm Lakshay Garg, a Full Stack Developer.",
        time: "Now",
        type: "received",
      },
      {
        id: 2,
        content: "Feel free to ask me anything about my work or experience!",
        time: "Now",
        type: "received",
      },
    ],
  };

  //open chat with me on load
  useEffect(() => {
    setSelectedChat(chats[5]);
  }, []);

  const handleMessageInput = (e) => {
    if (selectedChat?.isInteractive) {
      setMessageInput(e.target.value);
    } else {
      setInputError(true);
      setShowAlert(true);
      setTimeout(() => setInputError(false), 500);
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (selectedChat?.isInteractive && messageInput.trim()) {
      // TODO: Add OpenAI integration here
      console.log("Message sent:", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="messages-container">
      {/* Sidebar */}
      <div className="messages-sidebar">
        <div className="messages-header">
          <button className="compose-button">
            <i className="fas fa-edit"></i>
          </button>
          <div className="search-container">
            <FaSearch className="search-icon3" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              placeholderTextColor="white"
            />
          </div>
        </div>

        {/* Pinned Messages */}
        <div className="messages-section">
          {/* <div className="section-title">Pinned</div> */}
          <div className="pinned-messages-container">
            {chats
              .filter((chat) => chat.isPinned)
              .map((chat) => (
                <div
                  key={chat.id}
                  className={`chat-item-pinned ${
                    selectedChat?.id === chat.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="chat-avatar-pinned"
                  />
                  <div className="pinned-message-name">
                    <span className="chat-name">{chat.name}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Regular Messages */}
        <div className="messages-section">
          {/* <div className="section-title">Messages</div> */}
          {chats
            .filter((chat) => !chat.isPinned)
            .map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${
                  selectedChat?.id === chat.id ? "selected" : ""
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="chat-avatar"
                />
                <div className="chat-details">
                  <div className="chat-header">
                    <span className="chat-name">{chat.name}</span>
                    <span className="chat-time">{chat.time}</span>
                  </div>
                  <div className="chat-message">
                    <span className="message-preview">{chat.lastMessage}</span>
                    {chat.unread > 0 && (
                      <span className="unread-badge">{chat.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="messages-main">
        {selectedChat ? (
          <>
            <div className="main-chat-header">
              <div className="header-info">
                <p className="to">To: </p>
                <h2>{selectedChat.name}</h2>
              </div>
              <div className="chat-header-actions">
                <button className="action-button">
                  <FaVideo />
                </button>
              </div>
            </div>
            <div className="chat-messages">
              {messageHistory[selectedChat.id]?.map((message) => (
                <div
                  key={message.id}
                  className={`message-group ${message.type}`}
                >
                  <div className="message-time">{message.time}</div>
                  <div className={`message-bubble ${message.type}`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="message-input-container">
              <input
                type="text"
                placeholder="iMessage"
                className={`message-input ${inputError ? "error" : ""}`}
                value={messageInput}
                onChange={handleMessageInput}
                onClick={() => {
                  if (!selectedChat.isInteractive) {
                    setInputError(true);
                    setShowAlert(true);
                    setTimeout(() => setInputError(false), 500);
                  }
                }}
              />
              <button
                className="send-button-messages"
                onClick={handleMessageSubmit}
                style={{ backgroundColor: accentColor }}
              >
                <FaArrowUp />
              </button>
            </div>

            {showAlert && (
              <div className="macos-alert">
                <FaQuestionCircle className="question-icon" />
                <FaExclamationCircle className="alert-icon" />
                <h3 className="alert-title">Cannot Send Message</h3>
                <p className="alert-message">
                  Didn't your mom tell you to not talk to strangers on the
                  internet "Chat with Me" option.
                </p>
                <button
                  className="alert-button"
                  onClick={() => setShowAlert(false)}
                  style={{ backgroundColor: accentColor }}
                >
                  Done
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-chat-selected">
            <FaComments />
            <p>Select a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
