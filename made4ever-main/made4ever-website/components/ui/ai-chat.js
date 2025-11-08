'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: "Hello! I'm here to help you with Made4Ever. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    if (input.includes('price') || input.includes('cost') || input.includes('plan')) {
      return 'Our plans start from ₹2,999/month for Basic, ₹7,999 for Premium (3 months), and ₹19,999 for Enterprise (yearly). Would you like to know more about any specific plan?';
    }
    if (input.includes('register') || input.includes('sign up') || input.includes('join')) {
      return 'Great! You can register your marriage bureau by clicking the "Register Bureau" button. It\'s free to get started and you\'ll get access to our network of 15,000+ bureaus.';
    }
    if (input.includes('match') || input.includes('profile')) {
      return 'Our AI-powered matching system helps you find compatible matches for your profiles. With 22+ years of experience, we\'ve successfully matched thousands of couples across India.';
    }
    if (input.includes('support') || input.includes('help') || input.includes('contact')) {
      return 'You can reach our support team at +91 9911126001 or email support@made4ever.com. We\'re here to help you grow your marriage bureau business!';
    }
    return 'Thank you for your question! For more info, please contact +91 9911126001 or visit our registration page.';
  };

  if (!isOpen) {
    return React.createElement(
      Button,
      {
        onClick: () => setIsOpen(true),
        className:
          'fixed bottom-6 right-6 h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 shadow-lg z-50',
        size: 'icon'
      },
      React.createElement(MessageCircle, { className: 'h-6 w-6' })
    );
  }

  return React.createElement(
    Card,
    { className: 'fixed bottom-6 right-6 w-80 h-96 shadow-2xl z-50 flex flex-col' },
    React.createElement(
      CardHeader,
      { className: 'flex flex-row items-center justify-between space-y-0 pb-2 bg-red-600 text-white rounded-t-lg' },
      React.createElement(
        CardTitle,
        { className: 'text-sm font-medium flex items-center' },
        React.createElement(Bot, { className: 'h-4 w-4 mr-2' }),
        'Made4Ever Assistant'
      ),
      React.createElement(
        Button,
        {
          variant: 'ghost',
          size: 'icon',
          onClick: () => setIsOpen(false),
          className: 'h-6 w-6 text-white hover:bg-red-700'
        },
        React.createElement(X, { className: 'h-4 w-4' })
      )
    ),
    React.createElement(
      CardContent,
      { className: 'flex-1 flex flex-col p-0' },
      React.createElement(
        'div',
        { className: 'flex-1 overflow-y-auto p-4 space-y-4' },
        messages.map((message) =>
          React.createElement(
            'div',
            {
              key: message.id,
              className: cn(
                'flex items-start space-x-2',
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )
            },
            message.sender === 'bot'
              ? React.createElement(
                  'div',
                  {
                    className:
                      'w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0'
                  },
                  React.createElement(Bot, { className: 'h-3 w-3 text-red-600' })
                )
              : null,
            React.createElement(
              'div',
              {
                className: cn(
                  'max-w-[70%] p-2 rounded-lg text-sm',
                  message.sender === 'user'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                )
              },
              message.content
            ),
            message.sender === 'user'
              ? React.createElement(
                  'div',
                  {
                    className:
                      'w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0'
                  },
                  React.createElement(User, { className: 'h-3 w-3 text-gray-600' })
                )
              : null
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'p-4 border-t' },
        React.createElement(
          'div',
          { className: 'flex space-x-2' },
          React.createElement(Input, {
            value: inputValue,
            onChange: (e) => setInputValue(e.target.value),
            placeholder: 'Type your message...',
            onKeyPress: (e) => e.key === 'Enter' && handleSendMessage(),
            className: 'flex-1'
          }),
          React.createElement(
            Button,
            {
              onClick: handleSendMessage,
              size: 'icon',
              className: 'bg-red-600 hover:bg-red-700'
            },
            React.createElement(Send, { className: 'h-4 w-4' })
          )
        )
      )
    )
  );
}
