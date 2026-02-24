import { TrendingUp, TrendingDown } from 'lucide-react';
import './Dashboard.css';

interface AssetCardProps {
    symbol: string;
    name: string;
    price: string;
    change: string;
    changePercent: string;
    volume: string;
    isBullish: boolean;
    insight: string;
}

export function AssetCard({ symbol, name, price, change, changePercent, volume, isBullish, insight }: AssetCardProps) {
    return (
        <div className="asset-card glass-panel">
            <div className="asset-header">
                <div className="asset-id">
                    <span className="asset-trend">
                        {isBullish ? <TrendingUp size={16} className="neon-text-green" /> : <TrendingDown size={16} className="neon-text-red" />}
                    </span>
                    <h3>${symbol}</h3>
                    <span className="asset-type">{name}</span>
                </div>
                <div className={`sentiment-badge ${isBullish ? 'bullish' : 'bearish'}`}>
                    {isBullish ? 'BULLISH' : 'BEARISH'}
                </div>
            </div>

            <div className="asset-price-section">
                <h1 className="main-price">${price}</h1>
                <div className="price-details">
                    <span className={`price-change ${isBullish ? 'neon-text-green' : 'neon-text-red'}`}>
                        {isBullish ? '+' : ''}{change} ({changePercent})
                    </span>
                    <span className="volume text-muted">Vol {volume}</span>
                </div>
            </div>

            <div className="asset-range">
                <div className="range-bar">
                    <div className="range-fill" style={{ width: '65%', background: isBullish ? 'var(--nexus-green)' : 'var(--nexus-red)' }}></div>
                </div>
            </div>

            <div className="asset-insight">
                <p>{insight}</p>
            </div>
        </div>
    );
}
