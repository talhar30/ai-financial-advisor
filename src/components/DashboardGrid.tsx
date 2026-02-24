import { MarketSnapshot } from './MarketSnapshot';
import { AssetCard } from './AssetCard';
import { NewsWire } from './NewsWire';
import './Dashboard.css';
import { Terminal } from 'lucide-react';

export function DashboardGrid() {
    return (
        <div className="dashboard-grid animate-float-up">
            {/* Top Briefing section */}
            <div className="briefing-panel glass-panel">
                <div className="widget-header">
                    <div className="widget-title">
                        <Terminal size={14} className="neon-text-green" /> AI ANALYST BRIEFING
                    </div>
                </div>
                <div className="briefing-content">
                    <div className="briefing-column border-right">
                        <h6 className="text-muted">PRIMARY MARKET DRIVER</h6>
                        <p>Bitcoin price volatility and critical support warnings dominate crypto sentiment; Nvidia earnings anticipation drives equities.</p>
                    </div>
                    <div className="briefing-column">
                        <h6 className="text-muted">NOTABLE ANOMALY</h6>
                        <p>Unusually strong bearish sentiment in crypto due to cascading liquidation fears, despite neutral-to-bullish equity sentiment.</p>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="main-grid">
                <div className="left-column">
                    <h4 className="column-title text-muted">EQUITIES</h4>
                    <AssetCard
                        symbol="NVDA"
                        name="EQUITY"
                        price="189.91"
                        change="-1.64"
                        changePercent="-0.86%"
                        volume="36.38M"
                        isBullish={true}
                        insight="Earnings report expected tomorrow; positive trading activity and price targets."
                    />

                    <h4 className="column-title text-muted mt-4">CRYPTOCURRENCIES</h4>
                    <AssetCard
                        symbol="BTC"
                        name="CRYPTO"
                        price="63,461.00"
                        change="-2416.34"
                        changePercent="-3.81%"
                        volume="46.86B"
                        isBullish={false}
                        insight="Goldman Sachs and traders warn of critical price crash if Bitcoin falls below $60,000; cascading liquidations possible."
                    />
                </div>
                <div className="right-column">
                    <NewsWire />
                </div>
            </div>

            <MarketSnapshot />
        </div>
    );
}
