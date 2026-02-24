import { useState } from 'react';
import { Header } from './components/Header';
import { DashboardGrid } from './components/DashboardGrid';
import { ChatInterface, ChatMessage } from './components/ChatInterface';
import { ChatInput } from './components/ChatInput';
import { InvestmentForm } from './components/InvestmentForm';

const TOOLHOUSE_URL = 'https://agents.toolhouse.ai/5ff731e2-e7c5-402b-be17-e1053e719c4f';

function App() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'profiler'>('dashboard');

    // Toolhouse Chat State
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [runId, setRunId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Common Toolhouse API logic
    const streamFromToolhouse = async (text: string, onStart: (id: string) => void, onChunk: (chunk: string) => void) => {
        try {
            setIsLoading(true);

            const method = runId ? 'PUT' : 'POST';
            const url = runId ? `${TOOLHOUSE_URL}/${runId}` : TOOLHOUSE_URL;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }),
            });

            if (!response.ok) throw new Error(`Toolhouse API error: ${response.statusText}`);

            const returnedRunId = response.headers.get('X-Toolhouse-Run-ID');
            if (returnedRunId && !runId) setRunId(returnedRunId);

            const reader = response.body?.getReader();
            const decoder = new TextDecoder('utf-8');

            if (!reader) return;

            const msgId = Date.now().toString() + '_ai';
            onStart(msgId);
            setIsLoading(false); // Enable UI while streaming

            let isDone = false;
            while (!isDone) {
                const { value, done } = await reader.read();
                isDone = done;
                if (value) {
                    const chunk = decoder.decode(value, { stream: true });
                    onChunk(chunk);
                }
            }
        } catch (error) {
            console.error('Failed to stream:', error);
            setIsLoading(false);
        }
    };

    const sendMessageToToolhouse = async (text: string) => {
        if (isLoading) return;
        const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);

        await streamFromToolhouse(
            text,
            (id) => setMessages(prev => [...prev, { id, role: 'assistant', content: '' }]),
            (chunk) => {
                setMessages(prev => {
                    const updated = [...prev];
                    const lastIdx = updated.length - 1;
                    if (lastIdx >= 0) {
                        updated[lastIdx].content += chunk;
                    }
                    return updated;
                });
            }
        );
    };

    // We can also let the form handle streaming by passing the streamer
    // But to keep it simple, we'll implement a custom streamer just for the Profiler in App.
    const [isProfilerLoading, setIsProfilerLoading] = useState(false);

    const handleGenerateProfilerReport = async (prompt: string): Promise<string> => {
        setIsProfilerLoading(true);
        let finalStr = '';
        await streamFromToolhouse(
            prompt,
            () => setIsProfilerLoading(false),
            (chunk) => {
                finalStr += chunk;
            }
        );
        return finalStr;
    };

    const renderActiveView = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardGrid />;
            case 'chat': return (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                    <ChatInterface messages={messages} isLoading={isLoading} />
                    <div style={{ paddingBottom: '24px' }}>
                        <ChatInput onSendMessage={sendMessageToToolhouse} isLoading={isLoading} />
                    </div>
                </div>
            );
            case 'profiler': return (
                <InvestmentForm onGenerateReport={handleGenerateProfilerReport} isLoading={isProfilerLoading} />
            );
        }
    };

    return (
        <div className="nexus-layout">
            {/* Sidebar with simulated navigation */}
            <div className="nexus-sidebar" style={{ zIndex: 100 }}>
                <div className="sidebar-logo">
                    <div className="logo-orb"></div>
                </div>
                <nav className="sidebar-nav">
                    <button className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')} title="Dashboard">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                    </button>
                    <button className={`nav-btn ${activeTab === 'profiler' ? 'active' : ''}`} onClick={() => setActiveTab('profiler')} title="Investment Profiler">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                    </button>
                    <button className={`nav-btn ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')} title="AI Analyst Chat">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                    </button>
                </nav>
            </div>

            <div className="nexus-main">
                <Header />
                <div className="nexus-content-area flex flex-col items-center">
                    {renderActiveView()}
                </div>
            </div>
        </div>
    );
}

export default App;
