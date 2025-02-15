import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import {
  FaRegPaperPlane,
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaAlignLeft,
  FaFont,
  FaTextHeight,
  FaPaperclip,
} from "react-icons/fa";
import "./Mail.css";
import { ThemeContext } from "../../../contexts/ThemeContext";

const Mail = () => {
  const [formData, setFormData] = useState({
    to: "lakgarg2002@gmail.com", // Your email address
    subject: "",
    message: "",
    name: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [textFormat, setTextFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    list: false,
    align: "left",
  });

  const textareaRef = useRef(null);
  const formRef = useRef(null);

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!formData.subject.trim()) {
      toast.error("Please enter a subject");
      return false;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter a message");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        "service_vw2f1h9", //  EmailJS service ID
        "template_by1fzyo", //  EmailJS template ID
        formRef.current,
        "MELwnHLaKYqtkfB-I" //  EmailJS public key
      );

      if (result.status === 200) {
        toast.success("Message sent successfully!");
        // Reset form
        setFormData({
          to: "lakgarg2002@gmail.com",
          subject: "",
          message: "",
          name: "",
          email: "",
        });
        setTextFormat({
          bold: false,
          italic: false,
          underline: false,
          list: false,
          align: "left",
        });
      }
    } catch (error) {
      console.error("Email error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const applyFormat = (format) => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Toggle the format state
    setTextFormat((prev) => ({
      ...prev,
      [format]: !prev[format],
    }));

    // Apply the style to the textarea
    let style = "";
    if (textFormat.bold) style += "font-weight: bold;";
    if (textFormat.italic) style += "font-style: italic;";
    if (textFormat.underline) style += "text-decoration: underline;";

    textarea.style.cssText = style;
  };

  const handleList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = formData.message;

    // Add bullet point to new line
    const newText = currentText + "\n• ";

    setFormData((prev) => ({
      ...prev,
      message: newText,
    }));

    // Set cursor position after the bullet point
    setTimeout(() => {
      textarea.selectionStart = newText.length;
      textarea.selectionEnd = newText.length;
      textarea.focus();
    }, 0);
  };

  return (
    <div className="mail-container">
      <Toaster position="top-right" />
      <form ref={formRef} onSubmit={handleSubmit} className="mail-compose">
        <div className="mail-header">
          <div className="mail-header-top">
            <div className="mail-title">New Message</div>
            <button
              type="submit"
              className={`send-button ${isSubmitting ? "submitting" : ""}`}
              disabled={isSubmitting}
            >
              <FaRegPaperPlane className={isSubmitting ? "spinning" : ""} />
              <span>{isSubmitting ? "Sending..." : "Send"}</span>
            </button>
          </div>
          <div className="mail-fields">
            <div className="mail-field">
              <label>From:</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mail-field">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mail-field">
              <label>To:</label>
              <input
                type="text"
                name="to"
                value={formData.to}
                readOnly
                className="readonly-field"
              />
            </div>
            <div className="mail-field">
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mail-toolbar">
          <div className="toolbar-group">
            <button
              type="button"
              className={`toolbar-button ${textFormat.bold ? "active" : ""}`}
              onClick={() => applyFormat("bold")}
            >
              <FaBold />
            </button>
            <button
              type="button"
              className={`toolbar-button ${textFormat.italic ? "active" : ""}`}
              onClick={() => applyFormat("italic")}
            >
              <FaItalic />
            </button>
            <button
              type="button"
              className={`toolbar-button ${
                textFormat.underline ? "active" : ""
              }`}
              onClick={() => applyFormat("underline")}
            >
              <FaUnderline />
            </button>
          </div>
          <div className="toolbar-divider"></div>
          <div className="toolbar-group">
            <button
              type="button"
              className={`toolbar-button ${textFormat.list ? "active" : ""}`}
              onClick={handleList}
            >
              <FaListUl />
            </button>
            <button type="button" className="toolbar-button">
              <FaAlignLeft />
            </button>
          </div>
          <div className="toolbar-divider"></div>
          <div className="toolbar-group">
            <button type="button" className="toolbar-button">
              <FaFont />
            </button>
            <button type="button" className="toolbar-button">
              <FaTextHeight />
            </button>
          </div>
          <div className="toolbar-divider"></div>
          <div className="toolbar-group">
            <button type="button" className="toolbar-button" disabled>
              <FaPaperclip />
            </button>
          </div>
        </div>

        <div className="mail-content">
          <textarea
            ref={textareaRef}
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            className={`
              ${textFormat.bold ? "text-bold" : ""}
              ${textFormat.italic ? "text-italic" : ""}
              ${textFormat.underline ? "text-underline" : ""}
            `}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Mail;
