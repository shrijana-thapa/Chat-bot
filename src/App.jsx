import { useState } from 'react';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css';

function App() {
  const [chatMessages, setChatMessages] = useState([
    {
      message: 'Chatbot',
      sender: 'user',
      id: 'id1',
    },
    {
      message: 'Hello! How can I help you?',
      sender: 'robert',
      id: 'id2',
    },
  ]);
  return (
    <div className="container">
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      <ChatMessages chatMessages={chatMessages} />
    </div>
  );
}

export default App;
