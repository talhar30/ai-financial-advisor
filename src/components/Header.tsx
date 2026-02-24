import { Activity, Bell, Search, Terminal } from 'lucide-react';
import './Header.css';

export function Header() {
    return (
        <header className="nexus-header">
            <div className="header-left">
                <Terminal size={20} className="neon-text-green" />
                <h2 className="header-title">Nexus Alpha Terminal <span className="version-tag">v2.0.4</span></h2>
            </div>

            <div className="header-center">
                <div className="search-bar glass-panel">
                    <Search size={16} className="text-muted" />
                    <input type="text" placeholder="Search ticker, news, or ask AI..." />
                </div>
            </div>

            <div className="header-right">
                <div className="system-status">
                    <span className="status-dot pulsing"></span>
                    <span className="status-text mono">SYSTEM ONLINE</span>
                    <span className="latency mono">14ms</span>
                </div>
                <button className="icon-btn">
                    <Bell size={18} />
                    <span className="badge">3</span>
                </button>
                <button className="icon-btn">
                    <Activity size={18} />
                </button>
            </div>
        </header>
    );
}
