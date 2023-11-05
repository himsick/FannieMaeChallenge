import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';
import avatar from '../assets/user-avatar.png';
// Import an AI avatar image if available
// import AIAvatar from '../assets/ai-avatar.png';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        const userMessage = input.trim();
        if (!userMessage) return;
        
        // Update messages state with user message
        setMessages([...messages, { text: userMessage, sender: 'user' }]);
        setInput('');

        try {
            const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
                prompt: userMessage,
                max_tokens: 150,
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            });

            // Update messages state with AI response
            setMessages(prev => [...prev, { text: response.data.choices[0].text.trim(), sender: 'ai' }]);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <>
            {/* Title container */}
            <div className="title-container" id = "Chatbot">
                Proportunity Chatbot
            </div>
            
            {/* Chat container */}
            <div className="chat-container mx-auto my-8 p-6 rounded-2xl shadow-lg max-w-2xl">
                {/* Messages display area */}
                <div className="messages flex flex-col space-y-2 p-3 max-h-96 overflow-y-auto">
                    {messages.map((message, index) => (
                        <div key={index} className={`message flex items-end ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {message.sender === 'ai' && (
                                // Placeholder for AI avatar
                                <div className="avatar mr-2">
                                    <img src={AIAvatar} alt="AI" />
                                </div>
                            )}
                            <div className={`bubble p-3 rounded-xl ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                {message.text}
                            </div>
                            {message.sender === 'user' && (
                                // User avatar
                                <div className="avatar ml-2">
                                    <img src={avatar} alt="User" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* Input area */}
                <form onSubmit={sendMessage} className="input-area mt-6 flex border rounded-xl overflow-hidden bg-gray-100">
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                        className="input-field flex-grow p-4 bg-transparent outline-none"
                    />
                    <button type="submit" className="send-button bg-green-500 hover:bg-green-600 text-white p-4">
                        Send
                    </button>
                </form>
            </div>
        </>
    );
};

export default Chatbot;
