import { useState, useEffect, useRef, useCallback } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import OpenAI from "openai";

let openai;

const AIIntegrations = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  const DEEPSEEK_API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || '';
  const DEEPSEEK_API_ENDPOINT = process.env.NEXT_PUBLIC_DEEPSEEK_API_ENDPOINT || 'https://api.deepseek.com';

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (!DEEPSEEK_API_KEY) {
      console.error("DeepSeek API key is missing");
      return;
    }
    
    openai = new OpenAI({
      baseURL: DEEPSEEK_API_ENDPOINT,
      apiKey: DEEPSEEK_API_KEY,
      dangerouslyAllowBrowser: true // Note: This is not recommended for production
    });

    loadConversations();
  }, [status, router, DEEPSEEK_API_KEY, DEEPSEEK_API_ENDPOINT]);

  const loadConversations = useCallback(() => {
    const storedConversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const filteredConversations = storedConversations.filter(conv => new Date(conv.lastUpdated) > threeDaysAgo);
    setConversations(filteredConversations);
    if (filteredConversations.length > 0) {
      setCurrentConversation(filteredConversations[0].id);
      setMessages(filteredConversations[0].messages);
    }
    localStorage.setItem('conversations', JSON.stringify(filteredConversations));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
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
        await new Promise(resolve => setTimeout(resolve, 50)); // Small delay for typing effect
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      await streamResponse(inputMessage);
      updateConversation([...messages, userMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [...prevMessages, { text: 'Sorry, I encountered an error. Please try again.', sender: 'ai' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const updateConversation = useCallback((newMessages) => {
    const updatedConversations = conversations.map(conv => 
      conv.id === currentConversation ? { ...conv, messages: newMessages, lastUpdated: new Date().toISOString() } : conv
    );
    setConversations(updatedConversations);
    localStorage.setItem('conversations', JSON.stringify(updatedConversations));
  }, [conversations, currentConversation]);

  const startNewConversation = useCallback(() => {
    const newConversation = {
      id: Date.now(),
      title: `Conversation ${conversations.length + 1}`,
      messages: [],
      lastUpdated: new Date().toISOString()
    };
    setConversations(prevConversations => [newConversation, ...prevConversations]);
    setCurrentConversation(newConversation.id);
    setMessages([]);
    localStorage.setItem('conversations', JSON.stringify([newConversation, ...conversations]));
  }, [conversations]);

  const switchConversation = useCallback((conversationId) => {
    setCurrentConversation(conversationId);
    const conversation = conversations.find(conv => conv.id === conversationId);
    setMessages(conversation.messages);
  }, [conversations]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Disable scrolling when this component mounts
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Head>
        <title>AI Assistant - Core Health Fitness</title>
      </Head>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden flex flex-col`}>
          <div className="p-4 flex flex-col h-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Chat History</h2>
            <button 
              onClick={startNewConversation}
              className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg mb-2 hover:bg-purple-700 transition-colors duration-300 text-sm"
            >
              New Chat
            </button>
            <div className="flex-1 overflow-y-auto">
              {conversations.map(conv => (
                <div 
                  key={conv.id} 
                  onClick={() => switchConversation(conv.id)}
                  className={`p-2 rounded-lg cursor-pointer text-sm ${currentConversation === conv.id ? 'bg-purple-100' : 'hover:bg-gray-100'}`}
                >
                  {conv.title}
                  <div className="text-xs text-gray-500">
                    {new Date(conv.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main chat area */}
        <div className="flex-1 flex flex-col bg-white">
          <header className="bg-white shadow-sm p-2 flex items-center">
            <button 
              onClick={toggleSidebar}
              className="mr-4 text-purple-600 hover:text-purple-800 transition-colors duration-300"
            >
              {isSidebarOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <h1 className="text-xl font-bold text-gray-800">AI Assistant</h1>
          </header>
          
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xl px-4 py-2 rounded-lg ${
                  message.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-900'
                }`}>
                  {message.sender === 'user' ? (
                    message.text
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: message.text }} />
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
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
          
          {/* Input area */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// Custom layout for AIIntegrations page
AIIntegrations.getLayout = function getLayout(page) {
  return (
    <div className="h-screen flex flex-col">
      {page}
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session }
  };
}

export default AIIntegrations;
