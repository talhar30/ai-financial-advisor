import { FileText } from 'lucide-react';
import './Dashboard.css';

const news = [
    {
        id: 1,
        source: 'Research | IIF',
        title: 'Everything About Capital Markets & Their Types',
        summary: 'The Institute of International Finance (IIF) provides extensive research on global economic and financial trends, with a particular focus on emerging markets and international financial developments...'
    },
    {
        id: 2,
        source: 'Market Watch',
        title: 'Earnings report expected tomorrow; positive trading activity and price targets.',
        summary: 'Analysts predict a strong showing for tech sector amidst easing inflation concerns.'
    }
];

export function NewsWire() {
    return (
        <div className="news-wire glass-panel">
            <div className="widget-header">
                <div className="widget-title">
                    <FileText size={16} className="neon-text-green" /> NEWS WIRE
                </div>
                <span className="badge-neutral">NEUTRAL</span>
            </div>

            <div className="news-list">
                {news.map((item, i) => (
                    <div key={item.id} className="news-item">
                        <div className="news-number">0{i + 1}</div>
                        <div className="news-content">
                            <h5 className="news-source">{item.source}</h5>
                            <p className="news-title">{item.title}</p>
                            <button className="expand-btn">⌄ SHOW SUMMARY</button>
                            {i === 0 && (
                                <div className="news-summary text-secondary">
                                    {item.summary}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
