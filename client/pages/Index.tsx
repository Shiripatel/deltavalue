import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  SearchIcon,
  FilterIcon,
  BarChart3Icon,
  PieChartIcon,
  StarIcon,
  BrainIcon,
  IndianRupeeIcon,
  ShieldIcon,
} from "lucide-react";

// Mock data for demonstration
const topStocks = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    price: 2456.75,
    change: 2.3,
    aiScore: 8.9,
    sector: "Energy",
    mcap: "Large Cap",
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 3678.9,
    change: 1.8,
    aiScore: 8.7,
    sector: "IT",
    mcap: "Large Cap",
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    price: 1689.45,
    change: -0.5,
    aiScore: 8.5,
    sector: "Banking",
    mcap: "Large Cap",
  },
  {
    symbol: "INFY",
    name: "Infosys",
    price: 1523.3,
    change: 1.2,
    aiScore: 8.3,
    sector: "IT",
    mcap: "Large Cap",
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank",
    price: 1178.6,
    change: 0.8,
    aiScore: 8.1,
    sector: "Banking",
    mcap: "Large Cap",
  },
  {
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever",
    price: 2389.25,
    change: -1.1,
    aiScore: 7.9,
    sector: "FMCG",
    mcap: "Large Cap",
  },
  {
    symbol: "ITC",
    name: "ITC Limited",
    price: 456.8,
    change: 0.3,
    aiScore: 7.7,
    sector: "FMCG",
    mcap: "Large Cap",
  },
  {
    symbol: "KOTAKBANK",
    name: "Kotak Mahindra Bank",
    price: 1734.55,
    change: 1.5,
    aiScore: 7.5,
    sector: "Banking",
    mcap: "Large Cap",
  },
];

const topETFs = [
  {
    symbol: "NIFTYBEES",
    name: "Nippon India ETF Nifty BeES",
    price: 256.3,
    change: 1.4,
    aiScore: 8.2,
    aum: "₹8,942 Cr",
  },
  {
    symbol: "JUNIORBEES",
    name: "Nippon India ETF Junior BeES",
    price: 689.75,
    change: 2.1,
    aiScore: 7.8,
    aum: "₹1,234 Cr",
  },
  {
    symbol: "BANKBEES",
    name: "Nippon India ETF Bank BeES",
    price: 467.9,
    change: 0.7,
    aiScore: 7.6,
    aum: "₹2,156 Cr",
  },
  {
    symbol: "ICICIB22",
    name: "ICICI Prudential Nifty Next 50",
    price: 89.45,
    change: 1.9,
    aiScore: 7.4,
    aum: "₹567 Cr",
  },
];

const marketMetrics = [
  { label: "Nifty 50", value: "22,368.50", change: 0.85, trend: "up" },
  { label: "Sensex", value: "73,648.62", change: 0.92, trend: "up" },
  { label: "Bank Nifty", value: "48,567.30", change: -0.23, trend: "down" },
  { label: "Nifty IT", value: "34,789.45", change: 1.34, trend: "up" },
];

const aiInsights = [
  {
    title: "High Conviction Buy",
    stocks: 23,
    avgScore: 8.5,
    description: "Stocks with AI scores above 8.0 showing strong fundamentals",
  },
  {
    title: "Value Opportunities",
    stocks: 47,
    avgScore: 7.2,
    description: "Undervalued stocks with improving AI metrics",
  },
  {
    title: "Momentum Plays",
    stocks: 31,
    avgScore: 7.8,
    description: "Stocks with strong technical and sentiment scores",
  },
  {
    title: "Defensive Picks",
    stocks: 18,
    avgScore: 8.1,
    description: "Low-risk stocks with stable AI scores",
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

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedMcap, setSelectedMcap] = useState("all");
  const [filteredStocks, setFilteredStocks] = useState(topStocks);

  useEffect(() => {
    let filtered = topStocks;

    if (searchQuery) {
      filtered = filtered.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedSector !== "all") {
      filtered = filtered.filter((stock) => stock.sector === selectedSector);
    }

    if (selectedMcap !== "all") {
      filtered = filtered.filter((stock) => stock.mcap === selectedMcap);
    }

    setFilteredStocks(filtered);
  }, [searchQuery, selectedSector, selectedMcap]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <BrainIcon className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Deltavalue
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    AI-Driven Insight for Indian Investors
                  </p>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost">Dashboard</Button>
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

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            AI-Powered Stock Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover top-performing Indian stocks with our proprietary AI
            scoring system analyzing 900+ daily indicators across NSE & BSE
            markets.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
            <div className="flex items-center space-x-2 text-success">
              <TrendingUpIcon className="h-5 w-5" />
              <span className="font-semibold">94.7% Win Rate</span>
            </div>
            <Separator orientation="vertical" className="h-6 hidden md:block" />
            <div className="flex items-center space-x-2 text-info">
              <BarChart3Icon className="h-5 w-5" />
              <span className="font-semibold">10,000+ Features</span>
            </div>
            <Separator orientation="vertical" className="h-6 hidden md:block" />
            <div className="flex items-center space-x-2 text-warning">
              <ShieldIcon className="h-5 w-5" />
              <span className="font-semibold">Since 2017</span>
            </div>
          </div>
        </section>

        {/* Market Overview */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {marketMetrics.map((metric, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {metric.value}
                  </p>
                  <div
                    className={`flex items-center space-x-1 ${metric.trend === "up" ? "text-success" : "text-destructive"}`}
                  >
                    {metric.trend === "up" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">
                      {Math.abs(metric.change)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* AI Insights */}
        <section>
          <h3 className="text-2xl font-bold text-foreground mb-6">
            AI Market Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiInsights.map((insight, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                  <CardDescription>{insight.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {insight.stocks}
                      </p>
                      <p className="text-sm text-muted-foreground">stocks</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${getScoreTextColor(insight.avgScore)}`}
                      >
                        {insight.avgScore}
                      </p>
                      <p className="text-sm text-muted-foreground">avg score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Content Tabs */}
        <section>
          <Tabs defaultValue="stocks" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="stocks">Top Stocks</TabsTrigger>
              <TabsTrigger value="etfs">Top ETFs</TabsTrigger>
            </TabsList>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search stocks or companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Banking">Banking</SelectItem>
                  <SelectItem value="Energy">Energy</SelectItem>
                  <SelectItem value="FMCG">FMCG</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedMcap} onValueChange={setSelectedMcap}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Market Cap" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Caps</SelectItem>
                  <SelectItem value="Large Cap">Large Cap</SelectItem>
                  <SelectItem value="Mid Cap">Mid Cap</SelectItem>
                  <SelectItem value="Small Cap">Small Cap</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="stocks" className="space-y-4">
              <div className="grid gap-4">
                {filteredStocks.map((stock, index) => (
                  <Link key={index} to={`/stock/${stock.symbol}`}>
                    <Card className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div>
                                <h4 className="text-lg font-semibold text-foreground">
                                  {stock.symbol}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {stock.name}
                                </p>
                              </div>
                              <Badge variant="secondary">{stock.sector}</Badge>
                              <Badge variant="outline">{stock.mcap}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6">
                            <div className="text-right">
                              <p className="text-lg font-bold text-foreground">
                                ₹
                                {stock.price.toLocaleString("en-IN", {
                                  minimumFractionDigits: 2,
                                })}
                              </p>
                              <div
                                className={`flex items-center space-x-1 ${stock.change >= 0 ? "text-success" : "text-destructive"}`}
                              >
                                {stock.change >= 0 ? (
                                  <ArrowUpIcon className="h-4 w-4" />
                                ) : (
                                  <ArrowDownIcon className="h-4 w-4" />
                                )}
                                <span className="text-sm font-medium">
                                  {Math.abs(stock.change)}%
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                              <div
                                className={`w-12 h-12 rounded-full ${getScoreColor(stock.aiScore)} flex items-center justify-center`}
                              >
                                <span className="text-white font-bold">
                                  {stock.aiScore}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                AI Score
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="etfs" className="space-y-4">
              <div className="grid gap-4">
                {topETFs.map((etf, index) => (
                  <Card
                    key={index}
                    className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div>
                              <h4 className="text-lg font-semibold text-foreground">
                                {etf.symbol}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {etf.name}
                              </p>
                            </div>
                            <Badge variant="secondary">ETF</Badge>
                            <Badge variant="outline">{etf.aum}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <p className="text-lg font-bold text-foreground">
                              ₹
                              {etf.price.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                              })}
                            </p>
                            <div
                              className={`flex items-center space-x-1 ${etf.change >= 0 ? "text-success" : "text-destructive"}`}
                            >
                              {etf.change >= 0 ? (
                                <ArrowUpIcon className="h-4 w-4" />
                              ) : (
                                <ArrowDownIcon className="h-4 w-4" />
                              )}
                              <span className="text-sm font-medium">
                                {Math.abs(etf.change)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <div
                              className={`w-12 h-12 rounded-full ${getScoreColor(etf.aiScore)} flex items-center justify-center`}
                            >
                              <span className="text-white font-bold">
                                {etf.aiScore}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              AI Score
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Start Your AI-Powered Investment Journey
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of investors using AI to make smarter decisions in
            Indian markets
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary">
              Create Free Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              View Demo Portfolio
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-100 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BrainIcon className="h-6 w-6 text-primary" />
                <h4 className="text-lg font-bold">Deltavalue</h4>
              </div>
              <p className="text-slate-400">
                AI-driven insight for Indian investors. Make smarter investment
                decisions with our proprietary scoring system.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-slate-400">
                <li>AI Scores</li>
                <li>Stock Analysis</li>
                <li>Portfolio Tools</li>
                <li>Trade Ideas</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-slate-400">
                <li>Education</li>
                <li>API Documentation</li>
                <li>Blog</li>
                <li>Help Center</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-slate-400">
                <li>About</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-slate-700" />
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400">
              &copy; 2024 Deltavalue. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm">
              Data provided by NSE & BSE. Not investment advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
