import { Home, LineChart, MessageSquareText, FileText, Settings, User } from 'lucide-react';
import './Sidebar.css';

export function Sidebar() {
    return (
        <aside className="nexus-sidebar">
            <div className="sidebar-logo">
                <div className="logo-orb"></div>
            </div>

            <nav className="sidebar-nav">
                <button className="nav-btn active" title="Dashboard">
                    <Home size={22} />
                </button>
                <button className="nav-btn" title="Market Pulse">
                    <LineChart size={22} />
                </button>
                <button className="nav-btn" title="AI Analyst Chat">
                    <MessageSquareText size={22} />
                </button>
                <button className="nav-btn" title="Investment Profiler">
                    <FileText size={22} />
                </button>
            </nav>

            <div className="sidebar-bottom">
                <button className="nav-btn" title="Settings">
                    <Settings size={22} />
                </button>
                <button className="nav-btn" title="Profile">
                    <User size={22} />
                </button>
            </div>
        </aside>
    );
}
