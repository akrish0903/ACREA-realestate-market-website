import React, { useState } from 'react';
import Header from '../../components/Header';
import { Config } from '../../config/Config';
import SendIcon from '@mui/icons-material/Send';
import styles from './css/HelpCenter.module.css';

function HelpCenter() {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your ACREA assistant. I can help you with questions about our real estate platform. For example:\n• How do I list a property?\n• How can I schedule a visit?\n• What's the process to become an agent?\n• How do I contact an agent?",
      isBot: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { text: inputMessage, isBot: false }];
    setMessages(newMessages);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch(`${Config.apiBaseUrl}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setMessages([...newMessages, {
        text: data.message || "I'm sorry, I couldn't process that request. Please try asking in a different way.",
        isBot: true
      }]);
    } catch (error) {
      console.error('Chat API Error:', error);
      setMessages([...newMessages, {
        text: "I apologize, but I'm having trouble connecting right now. Please try again later or contact support if the issue persists.",
        isBot: true
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`screen ${styles.helpCenterContainer}`}>
      <Header />
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <h2>ACREA Help Center</h2>
          <p>Ask me anything about using the platform</p>
        </div>
        
        <div className={styles.messagesContainer}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${message.isBot ? styles.botMessage : styles.userMessage}`}
            >
              {message.text?.split('\n').map((line, i) => {
                if (line.startsWith('[TITLE]')) {
                  return <p key={i} className={styles.title}>{line.replace('[TITLE] ', '')}</p>;
                }
                if (line.startsWith('[SECTION]')) {
                  return <p key={i} className={styles.sectionTitle}>{line.replace('[SECTION] ', '')}</p>;
                }
                return <p key={i} style={{ margin: '0.2rem 0' }}>{line}</p>;
              }) || <p>Error: Invalid message</p>}
            </div>
          ))}
          {isTyping && (
            <div className={`${styles.message} ${styles.botMessage} ${styles.typing}`}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your question here..."
            className={styles.input}
          />
          <button 
            onClick={handleSendMessage}
            className={styles.sendButton}
            style={{ backgroundColor: Config.color.primaryColor900 }}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter; 