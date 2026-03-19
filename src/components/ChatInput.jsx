import { useState } from 'react';
import { Chatbot } from 'supersimpledev';

export function ChatInput({ setChatMessages, chatMessages }) {
  const [inputText, setInputText] = useState('');
  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function SendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
      },
    ];

    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robert',
        id: crypto.randomUUID(),
      },
    ]);

    setInputText('');
  }

  return (
    <>
      <input
        onChange={saveInputText}
        value={inputText}
        placeholder="send a message to Chatbot"
        size="30"
      />
      <button onClick={SendMessage}> Send </button>
    </>
  );
}
