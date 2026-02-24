import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, MoreHorizontal } from 'lucide-react';
import './ChatInterface.css';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [input]);

    const handleSend = () => {
        if (!input.trim() || isLoading) return;
        onSendMessage(input);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-input-container">
            <div className="quick-actions">
                <button className="quick-action-btn">Analyze $TSLA</button>
                <button className="quick-action-btn">Crypto Outlook</button>
                <button className="quick-action-btn">Macro News</button>
            </div>
            <div className="chat-input-wrapper glass-panel">
                <button className="icon-btn" title="Add Attachment">
                    <Paperclip size={18} />
                </button>
                <textarea
                    ref={textareaRef}
                    className="chat-textarea"
                    placeholder="Ask the AI Analyst..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                />
                <button
                    className={`send-btn ${input.trim() ? 'active' : ''} ${isLoading ? 'loading' : ''}`}
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                >
                    {isLoading ? <MoreHorizontal size={18} className="spin" /> : <Send size={18} />}
                </button>
            </div>
        </div>
    );
}
