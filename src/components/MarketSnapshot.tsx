import './Dashboard.css';

const equities = [
    { symbol: 'AAPL', price: '274.02', change: '+2.95%' },
    { symbol: 'MSFT', price: '385.35', change: '+0.23%' },
    { symbol: 'GOOGL', price: '308.04', change: '-1.11%' },
    { symbol: 'NVDA', price: '189.66', change: '-0.99%' },
    { symbol: 'AMZN', price: '205.41', change: '+0.07%' },
];

const crypto = [
    { symbol: 'BTC', price: '63,499.00', change: '-3.75%' },
    { symbol: 'ETH', price: '1,835.11', change: '-3.72%' },
    { symbol: 'SOL', price: '76.99', change: '-3.97%' },
    { symbol: 'BNB', price: '582.50', change: '-4.32%' },
];

export function MarketSnapshot() {
    return (
        <div className="market-snapshot glass-panel">
            <div className="widget-header">
                <div className="widget-title">
                    <span className="status-dot pulsing"></span>
                    MARKET SNAPSHOT <span className="badge-live">LIVE</span>
                </div>
            </div>

            <div className="snapshot-section">
                <h4 className="section-title">STOCKS & ETFS</h4>
                <div className="ticker-grid">
                    {equities.map((item) => (
                        <div key={item.symbol} className={`ticker-card ${item.change.startsWith('+') ? 'positive' : 'negative'}`}>
                            <span className="ticker-symbol">{item.symbol}</span>
                            <span className="ticker-price">${item.price}</span>
                            <span className="ticker-change">
                                {item.change.startsWith('+') ? '↗' : '↘'} {item.change}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="snapshot-section">
                <h4 className="section-title">CRYPTO</h4>
                <div className="ticker-grid">
                    {crypto.map((item) => (
                        <div key={item.symbol} className={`ticker-card ${item.change.startsWith('+') ? 'positive' : 'negative'}`}>
                            <span className="ticker-symbol">{item.symbol}</span>
                            <span className="ticker-price">${item.price}</span>
                            <span className="ticker-change">
                                {item.change.startsWith('+') ? '↗' : '↘'} {item.change}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
