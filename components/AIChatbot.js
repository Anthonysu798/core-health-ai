import { useState, useEffect, useRef } from 'react';
import OpenAI from "openai";
import Link from 'next/link';
import { useRouter } from 'next/router';

let openai;

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [size, setSize] = useState({ width: 320, height: 480 });
  const [isTyping, setIsTyping] = useState(false);
  const [promptCount, setPromptCount] = useState(0);
  const chatWindowRef = useRef(null);
  const messagesEndRef = useRef(null);
  const router = useRouter();

  const DEEPSEEK_API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || '';
  const DEEPSEEK_API_ENDPOINT = process.env.NEXT_PUBLIC_DEEPSEEK_API_ENDPOINT || 'https://api.deepseek.com';

  useEffect(() => {
    if (!DEEPSEEK_API_KEY) {
      console.error("DeepSeek API key is missing");
      return;
    }
    
    openai = new OpenAI({
      baseURL: DEEPSEEK_API_ENDPOINT,
      apiKey: DEEPSEEK_API_KEY,
      dangerouslyAllowBrowser: true // Note: This is not recommended for production
    });

    // Load prompt count from localStorage
    const storedPromptCount = localStorage.getItem('promptCount');
    if (storedPromptCount) {
      setPromptCount(parseInt(storedPromptCount, 10));
    }
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

    if (promptCount >= 3) {
      setMessages(prevMessages => [...prevMessages, 
        { text: inputMessage, sender: 'user' },
        { text: "You've reached the limit of free prompts. Please sign in to continue using the AI assistant.", sender: 'ai' }
      ]);
      setInputMessage('');
      return;
    }

    setMessages(prevMessages => [...prevMessages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');
    setIsTyping(true);
    
    try {
      const aiResponse = await streamResponse(inputMessage);
      if (aiResponse.trim() !== '') {
        const newPromptCount = promptCount + 1;
        setPromptCount(newPromptCount);
        localStorage.setItem('promptCount', newPromptCount.toString());
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setMessages(prevMessages => [...prevMessages, { text: `Error: ${error.message}`, sender: 'ai' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const streamResponse = async (message) => {
    let fullResponse = '';
    try {
      const stream = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are an AI assistant specialized in fitness, health, real-time progress tracking, fitness wearables, fitness goals, fitness routines, and diet. Only respond to queries related to these topics. If asked about anything else, politely redirect the user to ask about fitness-related topics." },
          { role: "user", content: message }
        ],
        model: "deepseek-chat",
        stream: true,
      });

      setMessages(prevMessages => [...prevMessages, { text: '', sender: 'ai' }]);

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullResponse += content;
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1].text = processResponse(fullResponse);
          return newMessages;
        });
      }

      if (!isRelevantTopic(fullResponse)) {
        fullResponse = "I apologize, but I can only assist with topics related to fitness, health, real-time progress tracking, fitness wearables, fitness goals, fitness routines, and diet. Could you please ask a question related to these areas?";
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1].text = fullResponse;
          return newMessages;
        });
      }

    } catch (error) {
      console.error('Error in streamResponse:', error);
      throw error;
    }
    return fullResponse;
  };

  const isRelevantTopic = (response) => {
    const relevantKeywords = ['fitness', 'health', 'workout', 'exercise', 'diet', 'nutrition', 'wearable', 'progress', 'routine', 'goal', 'weight', 'muscle', 'cardio', 'strength'];
    const lowercaseResponse = response.toLowerCase();
    return relevantKeywords.some(keyword => lowercaseResponse.includes(keyword));
  };

  const processResponse = (response) => {
    return response
      .replace(/### (.*?)\n/g, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/#### (.*?)\n/g, '<h4 class="text-base font-semibold mt-3 mb-1 text-purple-700">$1</h4>')
      .replace(/- (.*?)\n/g, '<li class="ml-4">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>')
      .trim();
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

  const handleSignUp = () => {
    router.push('/signup');
  };

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
                <span 
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-white text-purple-900 border border-purple-200'
                  }`}
                >
                  {message.sender === 'user' ? (
                    message.text
                  ) : (
                    <div className="ai-response" dangerouslySetInnerHTML={{ __html: message.text }} />
                  )}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="text-left">
                <span className="inline-block p-2 rounded-lg bg-white text-purple-900 border border-purple-200">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </span>
              </div>
            )}
            {promptCount >= 3 && (
              <div className="text-center mt-4">
                <button 
                  onClick={handleSignUp}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
                >
                  Sign up to continue
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-purple-100 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder={promptCount >= 3 ? "Sign up to continue..." : "Type your message..."}
                className="flex-grow px-3 py-2 border border-purple-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900"
                disabled={promptCount >= 3}
              />
              <button
                type="submit"
                className={`bg-purple-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-300 ${
                  promptCount >= 3 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
                }`}
                disabled={promptCount >= 3}
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


