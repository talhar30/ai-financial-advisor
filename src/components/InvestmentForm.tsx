import React, { useState } from 'react';
import { Target, Shield, Clock, Droplets, MapPin, DollarSign, Activity, FileText } from 'lucide-react';
import './InvestmentForm.css';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ProfilerProps {
    onGenerateReport: (prompt: string) => Promise<string>;
    isLoading: boolean;
}

export function InvestmentForm({ onGenerateReport, isLoading }: ProfilerProps) {
    const [formData, setFormData] = useState({
        capital: '$1,200',
        holdings: 'None',
        risk: 'Low (first time investor, nervous about losses)',
        horizon: 'Not sure - maybe long term?',
        liquidity: 'Might need this money if job situation changes',
        constraints: 'No idea - whatever is safest'
    });

    const [report, setReport] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const prompt = `
Please provide a comprehensive investment intelligence report based on the following financial position:

Total available capital: ${formData.capital}
Current portfolio holdings: ${formData.holdings}
Risk tolerance: ${formData.risk}
Investment time horizon: ${formData.horizon}
Liquidity needs: ${formData.liquidity}
Geographic/sector constraints: ${formData.constraints}

Respond with a strictly structured Markdown report containing headings, bullet lists, and a clear actionable summary. Avoid conversational filler. Ensure the tone is that of a premium Nexus Alpha Financial Terminal AI.
    `.trim();

        setReport(''); // clear old report
        try {
            // we assume onGenerateReport handles streaming and returns the full string or we can just let it stream into a global state.
            // But for a custom view, let's just let it return the whole string directly
            const result = await onGenerateReport(prompt);
            setReport(result);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="profiler-container animate-float-up">
            <div className="profiler-header">
                <Target size={24} className="neon-text-cyan" />
                <h2>Intelligence Profiler <span className="version-tag">Module Active</span></h2>
                <p className="text-secondary">Input client parameters to generate a custom macro-economic alignment report.</p>
            </div>

            <div className="profiler-content">
                <form className="profiler-form glass-panel" onSubmit={handleSubmit}>
                    <div className="form-grid">

                        <div className="form-group">
                            <label><DollarSign size={14} className="text-muted" /> Total Available Capital</label>
                            <input type="text" name="capital" value={formData.capital} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label><Activity size={14} className="text-muted" /> Current Holdings</label>
                            <input type="text" name="holdings" value={formData.holdings} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label><Shield size={14} className="text-muted" /> Risk Tolerance</label>
                            <input type="text" name="risk" value={formData.risk} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label><Clock size={14} className="text-muted" /> Time Horizon</label>
                            <input type="text" name="horizon" value={formData.horizon} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label><Droplets size={14} className="text-muted" /> Liquidity Needs</label>
                            <input type="text" name="liquidity" value={formData.liquidity} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label><MapPin size={14} className="text-muted" /> Constraints</label>
                            <input type="text" name="constraints" value={formData.constraints} onChange={handleChange} required />
                        </div>

                    </div>

                    <button type="submit" className="generate-btn" disabled={isLoading}>
                        {isLoading ? <div className="loader"></div> : <><FileText size={18} /> GENERATE REPORT</>}
                    </button>
                </form>

                {/* Visual Report Output */}
                <div className={`report-output glass-panel ${report || isLoading ? 'active' : ''}`}>
                    {isLoading && !report && (
                        <div className="analyzing-state pulse-anim">
                            <Activity size={32} className="neon-text-green" />
                            <h4>Synthesizing Market Data...</h4>
                        </div>
                    )}

                    {report && (
                        <div className="markdown-report">
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                className="markdown-content"
                                components={{
                                    h1: ({ node, ...props }) => <h2 className="md-h1" {...props} />,
                                    h2: ({ node, ...props }) => <h3 className="md-h2" {...props} />,
                                    h3: ({ node, ...props }) => <h4 className="md-h3" {...props} />,
                                    p: ({ node, ...props }) => <p className="md-p" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="md-ul" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="md-ol" {...props} />,
                                    blockquote: ({ node, ...props }) => <blockquote className="md-blockquote" {...props} />
                                }}
                            >
                                {report}
                            </Markdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
