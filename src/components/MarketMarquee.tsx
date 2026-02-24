import { useState, useEffect } from 'react';
import './MarketMarquee.css';

interface TickerData {
    symbol: string;
    price: string;
    change: string;
    isPositive: boolean;
}

const initialTickers: TickerData[] = [
    { symbol: 'BTC', price: '63,499.00', change: '+1.2%', isPositive: true },
    { symbol: 'AAPL', price: '174.02', change: '-0.5%', isPositive: false },
    { symbol: 'TSLA', price: '402.58', change: '+2.1%', isPositive: true },
    { symbol: 'ETH', price: '3,835.11', change: '+0.8%', isPositive: true },
    { symbol: 'NVDA', price: '889.66', change: '+3.4%', isPositive: true },
    { symbol: 'SPY', price: '512.16', change: '-0.1%', isPositive: false },
    { symbol: 'AMZN', price: '175.41', change: '+1.1%', isPositive: true },
    { symbol: 'SOL', price: '146.99', change: '-2.3%', isPositive: false },
    { symbol: 'MSFT', price: '415.35', change: '+0.4%', isPositive: true },
    { symbol: 'GOOGL', price: '148.04', change: '-0.8%', isPositive: false },
];

export function MarketMarquee() {
    const [tickers, setTickers] = useState<TickerData[]>(initialTickers);

    // Simulate dynamically updating rates on startup
    useEffect(() => {
        // A quick fake network fetch simulation
        const timer = setTimeout(() => {
            setTickers(prev => prev.map(t => {
                // Randomly modify price by small margin
                const priceNum = parseFloat(t.price.replace(/,/g, ''));
                const variation = priceNum * (Math.random() * 0.02 - 0.01); // +/- 1%
                const newPrice = priceNum + variation;

                // Randomly modify change %
                const changeNum = parseFloat(t.change) + (Math.random() * 1 - 0.5);
                const isPositive = changeNum >= 0;

                return {
                    ...t,
                    price: newPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    change: `${isPositive ? '+' : ''}${changeNum.toFixed(2)}%`,
                    isPositive
                };
            }));
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="marquee-container">
            <div className="marquee-content">
                {/* Render twice for continuous scrolling effect */}
                {[...tickers, ...tickers].map((ticker, index) => (
                    <div key={index} className="marquee-item">
                        <span className="marquee-symbol">{ticker.symbol}</span>
                        <span className="marquee-price">${ticker.price}</span>
                        <span className={`marquee-change ${ticker.isPositive ? 'positive' : 'negative'}`}>
                            {ticker.isPositive ? '▲' : '▼'} {ticker.change}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
