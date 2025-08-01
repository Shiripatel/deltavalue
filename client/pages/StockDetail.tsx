import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  BrainIcon,
  BarChart3Icon,
  NewspaperIcon,
  CalendarIcon,
  ArrowLeftIcon,
  StarIcon,
  AlertTriangleIcon,
} from "lucide-react";

// Mock stock data - in real app this would come from API
const stockData = {
  RELIANCE: {
    symbol: "RELIANCE",
    name: "Reliance Industries Limited",
    price: 2456.75,
    change: 2.3,
    changeAmount: 55.2,
    aiScore: 8.9,
    sector: "Energy",
    mcap: "Large Cap",
    marketCap: "₹16,62,345 Cr",
    pe: 24.5,
    pb: 2.1,
    roe: 12.4,
    fundamentalScore: 8.7,
    technicalScore: 9.2,
    sentimentScore: 8.5,
    riskScore: 9.1,
    volume: "2,34,567",
    avgVolume: "1,89,234",
    high52w: 2856.3,
    low52w: 2123.45,
    description:
      "Reliance Industries Limited is an Indian multinational conglomerate company, engaged in energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles.",
  },
};

const newsItems = [
  {
    title: "Reliance Q3 Results: Revenue beats estimates, profit up 15%",
    source: "Economic Times",
    time: "2 hours ago",
    sentiment: "positive",
  },
  {
    title: "Jio Platforms announces new 5G expansion in rural markets",
    source: "Business Standard",
    time: "4 hours ago",
    sentiment: "positive",
  },
  {
    title: "Oil refining margins under pressure due to global oversupply",
    source: "Mint",
    time: "6 hours ago",
    sentiment: "neutral",
  },
  {
    title: "RIL board to consider dividend announcement next week",
    source: "Moneycontrol",
    time: "1 day ago",
    sentiment: "positive",
  },
];

const tradeSignals = [
  {
    date: "2024-01-15",
    action: "BUY",
    price: 2234.5,
    result: "WIN",
    return: "+8.9%",
  },
  {
    date: "2024-01-08",
    action: "HOLD",
    price: 2189.3,
    result: "WIN",
    return: "+3.2%",
  },
  {
    date: "2023-12-22",
    action: "BUY",
    price: 2045.6,
    result: "WIN",
    return: "+12.4%",
  },
  {
    date: "2023-12-15",
    action: "SELL",
    price: 2367.8,
    result: "WIN",
    return: "+7.8%",
  },
];

const keyIndicators = [
  {
    category: "Fundamental",
    indicators: [
      "Revenue Growth",
      "Profit Margins",
      "Debt-to-Equity",
      "ROE",
      "Cash Flow",
    ],
  },
  {
    category: "Technical",
    indicators: [
      "Price Momentum",
      "Volume Trends",
      "Support/Resistance",
      "RSI",
      "MACD",
    ],
  },
  {
    category: "Sentiment",
    indicators: [
      "News Sentiment",
      "Analyst Ratings",
      "Social Media",
      "Insider Trading",
      "FII/DII Activity",
    ],
  },
  {
    category: "Risk",
    indicators: [
      "Volatility",
      "Beta",
      "Correlation",
      "Sector Risk",
      "Liquidity",
    ],
  },
];

const getScoreColor = (score: number) => {
  if (score >= 8) return "bg-ai-score-high";
  if (score >= 6) return "bg-ai-score-medium";
  return "bg-ai-score-low";
};

const getScoreTextColor = (score: number) => {
  if (score >= 8) return "text-ai-score-high";
  if (score >= 6) return "text-ai-score-medium";
  return "text-ai-score-low";
};

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return "text-success";
    case "negative":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
};

export default function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const stock =
    stockData[symbol as keyof typeof stockData] || stockData.RELIANCE;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2">
                <BrainIcon className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Deltavalue
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    AI-Driven Insight for Indian Investors
                  </p>
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="ghost">Stocks</Button>
              <Button variant="ghost">ETFs</Button>
              <Button variant="ghost">Portfolio</Button>
              <Button variant="ghost">Trade Ideas</Button>
              <Button variant="ghost">Learn</Button>
              <Button>Sign In</Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6">
          <Link
            to="/"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Dashboard
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{stock.symbol}</span>
        </div>

        {/* Stock Header */}
        <section className="mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">
                      {stock.symbol}
                    </h1>
                    <Badge variant="secondary">{stock.sector}</Badge>
                    <Badge variant="outline">{stock.mcap}</Badge>
                  </div>
                  <h2 className="text-lg text-muted-foreground mb-4">
                    {stock.name}
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-2xl">
                    {stock.description}
                  </p>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="text-right">
                    <p className="text-3xl font-bold text-foreground">
                      ₹
                      {stock.price.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <div
                      className={`flex items-center space-x-1 ${stock.change >= 0 ? "text-success" : "text-destructive"}`}
                    >
                      {stock.change >= 0 ? (
                        <ArrowUpIcon className="h-5 w-5" />
                      ) : (
                        <ArrowDownIcon className="h-5 w-5" />
                      )}
                      <span className="text-lg font-medium">
                        ₹{stock.changeAmount} ({stock.change}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className={`w-16 h-16 rounded-full ${getScoreColor(stock.aiScore)} flex items-center justify-center`}
                    >
                      <span className="text-white text-xl font-bold">
                        {stock.aiScore}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">AI Score</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Score Breakdown */}
            <section>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                AI Score Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <BarChart3Icon className="h-5 w-5" />
                      <span>Fundamental</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-2xl font-bold ${getScoreTextColor(stock.fundamentalScore)}`}
                      >
                        {stock.fundamentalScore}
                      </span>
                      <Progress
                        value={stock.fundamentalScore * 10}
                        className="w-20"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Strong financials with consistent growth
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <TrendingUpIcon className="h-5 w-5" />
                      <span>Technical</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-2xl font-bold ${getScoreTextColor(stock.technicalScore)}`}
                      >
                        {stock.technicalScore}
                      </span>
                      <Progress
                        value={stock.technicalScore * 10}
                        className="w-20"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Bullish momentum with strong volume
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <NewspaperIcon className="h-5 w-5" />
                      <span>Sentiment</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-2xl font-bold ${getScoreTextColor(stock.sentimentScore)}`}
                      >
                        {stock.sentimentScore}
                      </span>
                      <Progress
                        value={stock.sentimentScore * 10}
                        className="w-20"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Positive news flow and analyst ratings
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <AlertTriangleIcon className="h-5 w-5" />
                      <span>Risk</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-2xl font-bold ${getScoreTextColor(stock.riskScore)}`}
                      >
                        {stock.riskScore}
                      </span>
                      <Progress value={stock.riskScore * 10} className="w-20" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Low volatility and stable business model
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Key Indicators */}
            <section>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Key Indicators (Explainable AI)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keyIndicators.map((category, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.indicators.map((indicator, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm text-muted-foreground">
                              {indicator}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Historical Trade Signals */}
            <section>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Historical AI Signals
              </h3>
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {tradeSignals.map((signal, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {signal.date}
                          </span>
                          <Badge
                            variant={
                              signal.action === "BUY"
                                ? "default"
                                : signal.action === "SELL"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {signal.action}
                          </Badge>
                          <span className="text-sm text-foreground">
                            ₹{signal.price}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              signal.result === "WIN"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {signal.result}
                          </Badge>
                          <span
                            className={`text-sm font-medium ${signal.result === "WIN" ? "text-success" : "text-destructive"}`}
                          >
                            {signal.return}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Stats */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Key Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-medium">{stock.marketCap}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">P/E Ratio</span>
                  <span className="font-medium">{stock.pe}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">P/B Ratio</span>
                  <span className="font-medium">{stock.pb}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ROE</span>
                  <span className="font-medium">{stock.roe}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Volume</span>
                  <span className="font-medium">{stock.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Volume</span>
                  <span className="font-medium">{stock.avgVolume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">52W High</span>
                  <span className="font-medium">₹{stock.high52w}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">52W Low</span>
                  <span className="font-medium">₹{stock.low52w}</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent News */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <NewspaperIcon className="h-5 w-5" />
                  <span>Recent News</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {newsItems.map((news, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground leading-tight">
                      {news.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {news.source}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {news.time}
                      </span>
                    </div>
                    <div
                      className={`text-xs font-medium ${getSentimentColor(news.sentiment)}`}
                    >
                      {news.sentiment.toUpperCase()}
                    </div>
                    {index < newsItems.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                Add to Portfolio
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                Set Price Alert
              </Button>
              <Button variant="secondary" className="w-full" size="lg">
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
