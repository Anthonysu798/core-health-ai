import { useState, useEffect, useRef } from 'react';
import OpenAI from "openai";

let openai;

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [size, setSize] = useState({ width: 320, height: 480 });
  const chatWindowRef = useRef(null);

  const DEEPSEEK_API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || '';
  const DEEPSEEK_API_ENDPOINT = process.env.NEXT_PUBLIC_DEEPSEEK_API_ENDPOINT || 'https://api.deepseek.com';

  useEffect(() => {
    console.log("API Key:", DEEPSEEK_API_KEY);
    console.log("API Endpoint:", DEEPSEEK_API_ENDPOINT);
    if (!DEEPSEEK_API_KEY) {
      console.error("DeepSeek API key is missing");
      return;
    }
    
    openai = new OpenAI({
      baseURL: DEEPSEEK_API_ENDPOINT,
      apiKey: DEEPSEEK_API_KEY,
      dangerouslyAllowBrowser: true // Note: This is not recommended for production
    });
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    // Add user message to chat
    setMessages(prevMessages => [...prevMessages, { text: inputMessage, sender: 'user' }]);
    
    // Clear the input field immediately after sending
    setInputMessage('');
    
    try {
      // Call AI API here
      const aiResponse = await callAIAPI(inputMessage);
      
      // Process the AI response
      const processedResponse = processResponse(aiResponse);
      
      // Add processed AI response to chat
      setMessages(prevMessages => [...prevMessages, { text: processedResponse, sender: 'ai' }]);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setMessages(prevMessages => [...prevMessages, { text: `Error: ${error.message}`, sender: 'ai' }]);
    }
  };

  // Function to call the AI API
  const callAIAPI = async (message) => {
    try {
      console.log("Calling API with message:", message);
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a specialized fitness assistant. Provide advice and information ONLY related to gym activities, fitness routines, and workout plans. Do not engage with any other topics, including health, medical advice, nutrition, or any non-fitness subjects. If asked about anything outside this scope, politely redirect the user to ask about fitness-specific topics." },
          { role: "user", content: message }
        ],
        model: "deepseek-chat",
      });
      console.log("API response:", completion);
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error calling AI API:', error.message, error.response?.data);
      throw error;
    }
  };

  // Function to process and customize the AI response
  const processResponse = (response) => {
    const allowedTopics = ['gym', 'fitness', 'workout', 'exercise', 'training', 'muscle', 'cardio', 'strength'];
    const userQuery = response.toLowerCase();

    // Check if the response contains allowed topics
    if (allowedTopics.some(topic => userQuery.includes(topic))) {
      // Additional check to ensure the response is fitness-related
      if (response.length > 200 || /\b(sex|money|trade|assignment|homework|health|medical|disease|condition|symptom|diagnosis)\b/i.test(userQuery)) {
        return "I apologize, but I can only provide information directly related to gym activities, fitness routines, and workout plans. Could you please rephrase your question to focus specifically on these topics?";
      }
      return response;
    }

    // Default response for topics outside the chatbot's scope
    return "I'm sorry, but I can only assist with questions directly related to gym activities, fitness routines, and workout plans. I don't provide information or assistance on other topics. Could you please ask a question specifically about fitness or exercise?";
  };

  const [isDragging, setIsDragging] = useState(false);

  const handleResizeStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    console.log("Resize started");
  };

  const handleResize = (e) => {
    if (!isDragging || !chatWindowRef.current) return;

    const chatWindow = chatWindowRef.current;
    const newWidth = Math.max(280, chatWindow.offsetWidth - e.movementX);
    const newHeight = Math.max(320, chatWindow.offsetHeight - e.movementY);

    setSize({ width: newWidth, height: newHeight });
    console.log("Resizing:", newWidth, newHeight);
  };

  const handleResizeEnd = () => {
    setIsDragging(false);
    console.log("Resize ended");
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', handleResizeEnd);
    } else {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isDragging]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
      {isOpen && (
        <div 
          ref={chatWindowRef}
          className="bg-white rounded-lg shadow-xl flex flex-col relative"
          style={{ width: `${size.width}px`, height: `${size.height}px`, minWidth: '280px', minHeight: '320px' }}
        >
          {/* Resize handle in the top-left corner */}
          <div 
            className="absolute top-0 left-0 w-6 h-6 cursor-nw-resize z-10"
            onMouseDown={handleResizeStart}
          >
            <svg viewBox="0 0 20 20" className="w-full h-full text-gray-400 transform rotate-180">
              <path d="M0 20 L20 20 L20 0 Z" fill="currentColor" />
            </svg>
          </div>
          
          <div className="bg-purple-200 text-purple-900 p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">AI Assistant</h3>
            <button onClick={toggleChat} className="text-purple-900 hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4 bg-purple-50">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-white text-purple-900 border border-purple-200'}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-purple-100 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-grow px-3 py-2 border border-purple-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;


