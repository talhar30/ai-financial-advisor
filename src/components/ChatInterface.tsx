import { useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './ChatInterface.css';

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

interface ChatInterfaceProps {
    messages: ChatMessage[];
    isLoading: boolean;
}

export function ChatInterface({ messages, isLoading }: ChatInterfaceProps) {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="chat-interface">
            <div className="chat-history">
                {messages.length === 0 && (
                    <div className="empty-chat-state">
                        <div className="logo-orb large"></div>
                        <h3>How can I assist your portfolio today?</h3>
                        <p className="text-muted">Type a query below or use the Investment Profiler.</p>
                    </div>
                )}

                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-message-row ${msg.role}`}>
                        <div className={`chat-avatar ${msg.role}`}>
                            {msg.role === 'assistant' ? 'AI' : 'U'}
                        </div>
                        <div className={`chat-bubble glass-panel ${msg.role}`}>
                            {msg.role === 'user' ? (
                                <p>{msg.content}</p>
                            ) : (
                                <Markdown
                                    remarkPlugins={[remarkGfm]}
                                    className="markdown-content"
                                    components={{
                                        h1: ({ node, ...props }) => <h3 className="md-h1" {...props} />,
                                        h2: ({ node, ...props }) => <h4 className="md-h2" {...props} />,
                                        h3: ({ node, ...props }) => <h5 className="md-h3" {...props} />,
                                        p: ({ node, ...props }) => <p className="md-p" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="md-ul" {...props} />,
                                        ol: ({ node, ...props }) => <ol className="md-ol" {...props} />,
                                        li: ({ node, ...props }) => <li className="md-li" {...props} />,
                                        code: ({ node, className, children, ...props }) => {
                                            const match = /language-(\w+)/.exec(className || '');
                                            const isInline = !match && !className?.includes('language-');
                                            return isInline ? (
                                                <code className="md-code-inline mono" {...props}>
                                                    {children}
                                                </code>
                                            ) : (
                                                <div className="md-code-block glass-panel mono">
                                                    <code className={className} {...props}>{children}</code>
                                                </div>
                                            );
                                        },
                                        blockquote: ({ node, ...props }) => <blockquote className="md-blockquote" {...props} />
                                    }}
                                >
                                    {msg.content}
                                </Markdown>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="chat-message-row assistant pulse-anim">
                        <div className="chat-avatar assistant">AI</div>
                        <div className="chat-bubble glass-panel assistant typing-indicator">
                            Preparing deep analysis...
                        </div>
                    </div>
                )}
                <div ref={endOfMessagesRef} />
            </div>
        </div>
    );
}
