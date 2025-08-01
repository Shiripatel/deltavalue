import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// --- MOCK DATA --- //
const topAiStocks = [
  { name: 'Reliance Industries', symbol: 'RELIANCE.NS', aiScore: 9, change: 1.25, sector: 'Energy' },
  { name: 'Tata Consultancy', symbol: 'TCS.NS', aiScore: 8, change: -0.45, sector: 'IT' },
  { name: 'HDFC Bank', symbol: 'HDFCBANK.NS', aiScore: 8, change: 2.10, sector: 'Finance' },
  { name: 'Infosys', symbol: 'INFY.NS', aiScore: 7, change: 0.88, sector: 'IT' },
  { name: 'Hindustan Unilever', symbol: 'HINDUNILVR.NS', aiScore: 6, change: -0.15, sector: 'Consumer Goods' },
  { name: 'ICICI Bank', symbol: 'ICICIBANK.NS', aiScore: 9, change: 3.40, sector: 'Finance' },
];

const topEtfs = [
  { name: 'NIFTYBEES', symbol: 'NIFTYBEES.NS', aiScore: 8, change: 0.95, sector: 'Index' },
  { name: 'BANKBEES', symbol: 'BANKBEES.NS', aiScore: 9, change: 1.85, sector: 'Bank' },
  { name: 'ITBEES', symbol: 'ITBEES.NS', aiScore: 7, change: 0.70, sector: 'IT' },
  { name: 'GOLDBEES', symbol: 'GOLDBEES.NS', aiScore: 6, change: -0.50, sector: 'Commodity' },
];

// --- COMPONENTS --- //

const Logo = () => (
    <div className="logo">
        <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L100 50L50 100L0 50L50 0Z" fill="#2E7AFD"/>
            <path d="M50 15L85 50L50 85L15 50L50 15Z" fill="#0D1A3A"/>
            <path d="M50 25L75 50L50 75L25 50L50 25Z" fill="#4A90E2"/>
        </svg>
        <span>Deltavalue</span>
    </div>
);

const Header = () => (
    <header className="app-header">
        <div className="header-content">
            <Logo />
            <nav className="app-nav">
                <a href="#">Dashboard</a>
                <a href="#">Trade Ideas</a>
                <a href="#">Portfolios</a>
                <a href="#">Pricing</a>
            </nav>
            <div className="header-actions">
                <button className="btn btn-secondary">Log In</button>
                <button className="btn btn-primary">Start Trial</button>
            </div>
             <button className="menu-toggle" aria-label="Toggle menu">
                <span className="material-icons">menu</span>
            </button>
        </div>
    </header>
);

const Hero = () => (
    <section className="hero-section">
        <div className="hero-content">
            <h1>AI-Driven Insight for Indian Investors</h1>
            <p className="subtitle">Invest with confidence. Let our AI analyze thousands of data points to find your next winning stock.</p>
            <div className="search-bar">
                <span className="material-icons search-icon">search</span>
                <input type="text" placeholder="Search any Indian stock or ETF (e.g. RELIANCE.NS)" />
            </div>
        </div>
    </section>
);

const AiScoreIndicator = ({ score } : { score: number }) => {
    const getScoreColor = () => {
        if (score >= 8) return 'var(--success-green)';
        if (score >= 5) return 'var(--warning-yellow)';
        return 'var(--error-red)';
    };
    const circumference = 2 * Math.PI * 18; // 2 * pi * radius
    const strokeDashoffset = circumference - (score / 10) * circumference;

    return (
        <div className="ai-score-indicator" style={{ '--score-color': getScoreColor() } as React.CSSProperties}>
            <svg viewBox="0 0 40 40">
                <circle className="bg" cx="20" cy="20" r="18"></circle>
                <circle className="progress" cx="20" cy="20" r="18"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                ></circle>
            </svg>
            <div className="score-text">
                <span>{score}</span>
            </div>
        </div>
    );
};

const StockCard = ({ stock } : { stock: any }) => (
    <div className="stock-card" role="article">
        <div className="card-header">
            <div>
                <h3 className="stock-name">{stock.name}</h3>
                <p className="stock-symbol">{stock.symbol}</p>
            </div>
            <AiScoreIndicator score={stock.aiScore} />
        </div>
        <div className="card-footer">
            <p className="stock-sector">{stock.sector}</p>
            <p className={`stock-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
            </p>
        </div>
    </div>
);

const StockList = ({ title, stocks } : { title: string, stocks: any[] }) => (
    <section className="stock-list-section">
        <h2>{title}</h2>
        <div className="filters">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Large Cap</button>
            <button className="filter-btn">Mid Cap</button>
            <button className="filter-btn">Small Cap</button>
        </div>
        <div className="stock-grid">
            {stocks.map(stock => <StockCard key={stock.symbol} stock={stock} />)}
        </div>
    </section>
);

const Footer = () => (
    <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Deltavalue. All rights reserved.</p>
        <p className="disclaimer">Investing in stock markets is subject to market risks. Read all the related documents carefully before investing. Deltavalue is not a registered investment advisor.</p>
        <div className="footer-links">
            <a href="#">Disclaimer</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Us</a>
        </div>
    </footer>
);

const App = () => {
  return (
    <div className="app-container">
        <Header />
        <main>
            <Hero />
            <div className="main-content">
                <StockList title="Top AI Stocks" stocks={topAiStocks} />
                <StockList title="Top ETFs" stocks={topEtfs} />
            </div>
        </main>
        <Footer />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);