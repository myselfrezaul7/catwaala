import * as React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import type { ChatMessage } from '../types';
import { getVetAssistantResponseStream } from '../services/geminiService';
import { PawIcon, SendIcon, CloseIcon, WarningIcon, TrashIcon } from '../components/icons';
import { useCookieConsent } from '../contexts/CookieConsentContext';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

const CHAT_HISTORY_STORAGE_KEY = 'catwaala_ai_chat_history';

const AIAssistantPage: React.FC = () => {
  const { hasConsent } = useCookieConsent();
  const { t, language } = useLanguage();

  const getInitialChatHistory = useCallback((): ChatMessage[] => {
    if (hasConsent('functional')) {
      try {
        const storedHistory = window.localStorage.getItem(CHAT_HISTORY_STORAGE_KEY);
        if (storedHistory) {
          const parsedHistory = JSON.parse(storedHistory);
          if (Array.isArray(parsedHistory)) {
            return parsedHistory;
          }
        }
      } catch (error) {
        console.error("Error reading chat history from localStorage:", error);
        try {
          window.localStorage.removeItem(CHAT_HISTORY_STORAGE_KEY);
        } catch (removeError) {
          console.error("Failed to remove corrupted chat history:", removeError);
        }
      }
    }
    return [];
  }, [hasConsent]);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(getInitialChatHistory);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const FULL_DISCLAIMER_TEXT = language === 'bn'
    ? `***দাবিত্যাগ: আমি একজন AI Vet এবং পেশাদার ভেটেরিনারি পরামর্শের বিকল্প নই। এই তথ্য শুধুমাত্র সাধারণ নির্দেশনা এবং প্রাথমিক চিকিৎসার উদ্দেশ্যে। যেকোনো স্বাস্থ্য উদ্বেগ বা জরুরি অবস্থার জন্য সর্বদা একজন লাইসেন্সপ্রাপ্ত, ব্যক্তিগত পশুচিকিৎসকের সাথে পরামর্শ করুন।***`
    : `***Disclaimer: I am an AI Vet and not a substitute for professional veterinary advice. This information is for general guidance and first-aid purposes only. ALWAYS consult a licensed, in-person veterinarian for any health concerns or emergencies.***`;

  useEffect(() => {
    if (hasConsent('functional')) {
      try {
        window.localStorage.setItem(CHAT_HISTORY_STORAGE_KEY, JSON.stringify(chatHistory));
      } catch (error) {
        console.error("Error writing chat history to localStorage:", error);
      }
    }
  }, [chatHistory, hasConsent]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  useEffect(() => {
    try {
      const warningDismissed = sessionStorage.getItem('catwaala_ai_warning_dismissed');
      if (warningDismissed !== 'true') {
        setIsWarningVisible(true);
      }
    } catch (error) {
      console.error("Could not read from sessionStorage", error);
      setIsWarningVisible(true);
    }
  }, []);

  const handleDismissWarning = useCallback(() => {
    setIsWarningVisible(false);
    try {
      sessionStorage.setItem('catwaala_ai_warning_dismissed', 'true');
    } catch (error) {
      console.error("Could not write to sessionStorage", error);
    }
  }, []);

  const handleSendMessage = useCallback(async (messageText: string, isRetry = false) => {
    if (!messageText.trim() || isLoading) return;

    let historyForApi = chatHistory;

    if (!isRetry) {
      const newUserMessage: ChatMessage = { sender: 'user', text: messageText };
      historyForApi = [...chatHistory, newUserMessage];
      setChatHistory(historyForApi);
      setUserInput('');
    } else {
      historyForApi = chatHistory;
    }

    setIsLoading(true);

    try {
      const placeholderMessage: ChatMessage = { sender: 'ai', text: '' };
      setChatHistory(prev => [...prev, placeholderMessage]);

      const stream = getVetAssistantResponseStream(historyForApi, language);

      let fullResponse = "";

      for await (const chunk of stream) {
        if (chunk) {
          fullResponse += chunk;
          setChatHistory(prev => {
            const newHistory = [...prev];
            const lastIdx = newHistory.length - 1;
            newHistory[lastIdx] = { ...newHistory[lastIdx], text: fullResponse };
            return newHistory;
          });
        }
      }
    } catch (error) {
      setChatHistory(prev => {
        const newHistory = prev.slice(0, -1);
        return [...newHistory, { sender: 'ai', text: t('generic.error.api'), isError: true }];
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, chatHistory, language, t]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(userInput);
  }, [handleSendMessage, userInput]);

  const handleRetry = useCallback(async () => {
    const historyToRetry = chatHistory.filter(m => !m.isError);
    setChatHistory(historyToRetry);

    if (historyToRetry.length > 0 && historyToRetry[historyToRetry.length - 1].sender === 'user') {
      setIsLoading(true);
      try {
        const placeholderMessage: ChatMessage = { sender: 'ai', text: '' };
        setChatHistory(prev => [...prev, placeholderMessage]);

        const stream = getVetAssistantResponseStream(historyToRetry, language);
        let fullResponse = "";

        for await (const chunk of stream) {
          if (chunk) {
            fullResponse += chunk;
            setChatHistory(prev => {
              const newHistory = [...prev];
              const lastIdx = newHistory.length - 1;
              newHistory[lastIdx] = { ...newHistory[lastIdx], text: fullResponse };
              return newHistory;
            });
          }
        }
      } catch (error) {
        setChatHistory(prev => {
          const newHistory = prev.slice(0, -1);
          return [...newHistory, { sender: 'ai', text: t('generic.error.api'), isError: true }];
        });
      } finally {
        setIsLoading(false);
      }
    }
  }, [chatHistory, language, t]);

  const handleClearChat = useCallback(() => {
    if (window.confirm(t('aiAssistantPage.clearChat.confirm'))) {
      setChatHistory([]);
    }
  }, [t]);

  return (
    <div className="flex flex-col flex-grow container mx-auto p-4 sm:p-6 max-w-3xl h-[calc(100vh-80px)]">
      <SEO
        title="AI Vet Assistant"
        description="Chat with our AI Vet Assistant for general pet health guidance."
        canonical="/ai-assistant"
      />
      <div className="text-center mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center">
          {t('aiAssistantPage.title')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{t('aiAssistantPage.subtitle')}</p>

        {isWarningVisible && (
          <div className="relative mt-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100 px-4 py-3 rounded-lg text-sm transition-all duration-300" role="alert">
            <button
              onClick={handleDismissWarning}
              className="absolute top-2 right-2 p-1 rounded-full text-amber-800/60 dark:text-amber-200/60 hover:bg-amber-100 dark:hover:bg-amber-800/40 transition-colors"
              aria-label={t('aiAssistantPage.warning.dismiss')}
            >
              <CloseIcon className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <WarningIcon className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div className="text-left">
                <p className="font-bold">{t('aiAssistantPage.warning.title')}</p>
                <p className="opacity-90">{t('aiAssistantPage.warning.subtitle')}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-grow bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-3 px-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex-shrink-0">
          <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('aiAssistantPage.conversation')}</h2>
          <button
            onClick={handleClearChat}
            disabled={chatHistory.length === 0}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label={t('aiAssistantPage.clearChat.button')}
          >
            <TrashIcon className="w-3 h-3" />
            {t('aiAssistantPage.clearChat.button')}
          </button>
        </div>

        <div className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-6 scroll-smooth bg-white dark:bg-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <PawIcon className="w-5 h-5" />
            </div>
            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg rounded-tl-none max-w-[90%] text-slate-800 dark:text-slate-100 leading-relaxed text-sm sm:text-base">
              <p>{t('aiAssistantPage.initialGreeting')}</p>
            </div>
          </div>

          {chatHistory.map((message, index) => {
            if (message.isError) {
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <WarningIcon className="w-5 h-5" />
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-4 rounded-lg rounded-tl-none max-w-[90%] text-sm sm:text-base">
                    <p className="text-red-800 dark:text-red-200 font-medium">{message.text}</p>
                    <button
                      onClick={handleRetry}
                      className="mt-3 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-100 font-bold py-1.5 px-4 rounded text-xs hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
                      disabled={isLoading}
                    >
                      {t('aiAssistantPage.retry')}
                    </button>
                  </div>
                </div>
              )
            }

            const isDisclaimer = message.sender === 'ai' && message.text.startsWith(FULL_DISCLAIMER_TEXT);

            if (isDisclaimer) {
              const restOfMessage = message.text.substring(FULL_DISCLAIMER_TEXT.length).trim();
              return (
                <div key={index} className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <PawIcon className="w-5 h-5" />
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50 p-4 rounded-lg rounded-tl-none max-w-[90%] flex items-start gap-3">
                      <WarningIcon className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <div className="text-amber-900 dark:text-amber-100 text-xs">
                        <p className="font-bold mb-1">{t('aiAssistantPage.disclaimer.title')}</p>
                        <p className="opacity-90 leading-normal">{t('aiAssistantPage.disclaimer.body')}</p>
                      </div>
                    </div>
                  </div>
                  {restOfMessage && (
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 flex-shrink-0 invisible"></div> {/* Spacer */}
                      <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg rounded-tl-none max-w-[90%] text-slate-800 dark:text-slate-100 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                        <p>{restOfMessage}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={index} className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <PawIcon className="w-5 h-5" />
                  </div>
                )}
                <div className={`p-4 rounded-lg max-w-[90%] leading-relaxed whitespace-pre-wrap text-sm sm:text-base ${message.sender === 'user'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-tr-none'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-none'
                  }`}>
                  {message.text ? (
                    <p>{message.text}</p>
                  ) : (
                    <div className="flex space-x-1.5 h-5 items-center px-2">
                      <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={t('aiAssistantPage.input.placeholder')}
              className="w-full pl-4 pr-12 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="absolute right-2 p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;