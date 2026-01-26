import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane, faUser, faRobot, faPlus, faComments, faTrash, faList } from '@fortawesome/free-solid-svg-icons';

// Backend API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Chatbot = ({ isOpen, setIsOpen, adminUser }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm Ankit's portfolio assistant. Ask me anything about Ankit, his skills, projects, or experience! 😊"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [questionInput, setQuestionInput] = useState('');
  const [answerInput, setAnswerInput] = useState('');
  const [customQAs, setCustomQAs] = useState([]);
  const [showQAList, setShowQAList] = useState(false);
  const [addStatus, setAddStatus] = useState({ show: false, success: false, message: '' });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Fetch custom Q&As when admin opens the chatbot
  useEffect(() => {
    if (adminUser && isOpen) {
      fetchCustomQAs();
    }
  }, [adminUser, isOpen]);

  const fetchCustomQAs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chatbot/qa`);
      const data = await response.json();
      if (data.success) {
        setCustomQAs(data.data);
      }
    } catch (error) {
      console.error('Error fetching custom Q&As:', error);
    }
  };

  const sendMessageToBackend = async (userMessage) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (data.success) {
        return data.response;
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error calling chatbot API:', error);
      return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later!";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      text: userMessage
    };
    setMessages(prev => [...prev, newUserMessage]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Get response from Python backend
      const botResponse = await sendMessageToBackend(userMessage);

      // Add bot response
      const newBotMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponse
      };
      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: "Sorry, I'm having trouble connecting right now. Please try again!"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAddQA = async () => {
    if (!questionInput.trim() || !answerInput.trim()) {
      setAddStatus({ show: true, success: false, message: 'Both question and answer are required!' });
      setTimeout(() => setAddStatus({ show: false, success: false, message: '' }), 3000);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/chatbot/qa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          question: questionInput.trim(),
          answer: answerInput.trim()
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAddStatus({ show: true, success: true, message: 'Q&A added successfully!' });
        setQuestionInput('');
        setAnswerInput('');
        fetchCustomQAs(); // Refresh the list
        setTimeout(() => setAddStatus({ show: false, success: false, message: '' }), 3000);
      } else {
        setAddStatus({ show: true, success: false, message: data.error || 'Failed to add Q&A' });
        setTimeout(() => setAddStatus({ show: false, success: false, message: '' }), 3000);
      }
    } catch (error) {
      console.error('Error adding Q&A:', error);
      setAddStatus({ show: true, success: false, message: 'Failed to connect to server' });
      setTimeout(() => setAddStatus({ show: false, success: false, message: '' }), 3000);
    }
  };

  const handleDeleteQA = async (qaId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/chatbot/qa/${qaId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setCustomQAs(prev => prev.filter(qa => qa._id !== qaId));
      } else if (data.code === 'INVALID_TOKEN') {
        setAddStatus({ show: true, success: false, message: 'Session expired. Please login again.' });
        setTimeout(() => setAddStatus({ show: false, success: false, message: '' }), 3000);
      }
    } catch (error) {
      console.error('Error deleting Q&A:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isAddMode) {
        // Don't submit on Enter in add mode (user might want to type multiline answer)
      } else {
        handleSendMessage();
      }
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chatbot Interface */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <FontAwesomeIcon icon={faRobot} className="chatbot-icon" />
              <span>{isAddMode ? 'Add Q&A' : 'Portfolio Assistant'}</span>
              {adminUser && (
                <span className="admin-badge">Admin</span>
              )}
            </div>
            <div className="chatbot-header-actions">
              {adminUser && (
                <>
                  <button
                    className="chatbot-mode-toggle"
                    onClick={() => { setIsAddMode(!isAddMode); setShowQAList(false); }}
                    title={isAddMode ? 'Switch to Chat' : 'Add Q&A'}
                  >
                    <FontAwesomeIcon icon={isAddMode ? faComments : faPlus} />
                  </button>
                  <button
                    className="chatbot-mode-toggle"
                    onClick={() => setShowQAList(!showQAList)}
                    title="View Q&A List"
                  >
                    <FontAwesomeIcon icon={faList} />
                  </button>
                </>
              )}
              <button
                className="chatbot-close"
                onClick={toggleChatbot}
                aria-label="Close chatbot"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>

          {/* Q&A List Panel */}
          {showQAList && adminUser && (
            <div className="qa-list-panel">
              <h4>Custom Q&A List ({customQAs.length})</h4>
              {customQAs.length === 0 ? (
                <p className="qa-empty">No custom Q&As added yet.</p>
              ) : (
                <div className="qa-list">
                  {customQAs.map((qa) => (
                    <div key={qa._id} className="qa-item">
                      <div className="qa-content">
                        <strong>Q:</strong> {qa.question}
                        <br />
                        <strong>A:</strong> {qa.answer.substring(0, 50)}{qa.answer.length > 50 ? '...' : ''}
                      </div>
                      <button
                        className="qa-delete-btn"
                        onClick={() => handleDeleteQA(qa._id)}
                        title="Delete Q&A"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Add Q&A Mode */}
          {isAddMode && adminUser ? (
            <div className="add-qa-container">
              <div className="add-qa-form">
                <div className="add-qa-field">
                  <label>Question Keywords</label>
                  <input
                    type="text"
                    value={questionInput}
                    onChange={(e) => setQuestionInput(e.target.value)}
                    placeholder="e.g., favorite programming language"
                  />
                  <small>Enter keywords that trigger this answer</small>
                </div>
                <div className="add-qa-field">
                  <label>Answer</label>
                  <textarea
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    placeholder="e.g., My favorite programming language is Python because..."
                    rows={4}
                  />
                </div>
                {addStatus.show && (
                  <div className={`add-status ${addStatus.success ? 'success' : 'error'}`}>
                    {addStatus.message}
                  </div>
                )}
                <button
                  className="add-qa-submit"
                  onClick={handleAddQA}
                  disabled={!questionInput.trim() || !answerInput.trim()}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Add Q&A
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Messages */}
              <div className="chatbot-messages">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`chatbot-message ${message.type}`}
                  >
                    <div className="message-avatar">
                      <FontAwesomeIcon
                        icon={message.type === 'user' ? faUser : faRobot}
                      />
                    </div>
                    <div className="message-content">
                      <p>{message.text}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="chatbot-message bot">
                    <div className="message-avatar">
                      <FontAwesomeIcon icon={faRobot} />
                    </div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="chatbot-input">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Ankit's skills, projects, or experience..."
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="send-button"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;

