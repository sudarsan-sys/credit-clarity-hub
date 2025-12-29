import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CreditScoreGauge from "@/components/CreditScoreGauge";
import AIInsightsCard from "@/components/AIInsightsCard";
import TransactionTable from "@/components/TransactionTable";
// Changed: Imported LoanOffers and AICFOChat
import LoanOffers from "@/components/LoanOffers";
import AICFOChat from "@/components/AICFOChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define types for our data to keep TypeScript happy
interface Transaction {
  date: string;
  narrative: string;
  type: "CREDIT" | "DEBIT";
  amount: number;
  balance: number;
}

interface Insight {
  type: "positive" | "warning" | "info" | "tip";
  title: string;
  text: string;
}

interface AnalysisData {
  score: number;
  status: string;
  insights: Insight[];
}

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Transactions
        const txRes = await fetch("http://localhost:5000/api/transactions");
        if (!txRes.ok) throw new Error("Failed to fetch transactions");
        const txData = await txRes.json();
        setTransactions(txData);

        // 2. Fetch AI Analysis
        const aiRes = await fetch("http://localhost:5000/api/analyze");
        if (!aiRes.ok) throw new Error("Failed to fetch analysis");
        const aiData = await aiRes.json();
        setAnalysis(aiData);

      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Connection Error",
          description: "Could not connect to the backend server. Is it running?",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Analyzing Financial Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Header />

      <main className="container mx-auto px-4 py-8 md:px-6">
        {/* Page Title */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Your Financial Health Overview
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                AI-powered analysis of your business financials for loan eligibility
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid - Credit Score & AI Insights */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Credit Score Gauge Card */}
          <Card className="card-shadow-lg border-border/50 bg-card animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-lg font-semibold text-foreground">
                Generated Credit Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Pass the dynamic score from backend */}
              <CreditScoreGauge
                score={analysis?.score || 0}
                maxScore={100}
              />
            </CardContent>
          </Card>

          {/* AI Insights Card */}
          <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            {/* Pass the dynamic insights from backend */}
            <AIInsightsCard insights={analysis?.insights || []} />
          </div>
        </div>

        {/* Transaction Table */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          {/* Pass the dynamic transactions from backend */}
          <TransactionTable transactions={transactions} />
        </div>

        {/* CHANGED: Replaced OCENCta with LoanOffers */}
        <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <LoanOffers score={analysis?.score || 0} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <span className="font-display text-sm font-bold text-primary-foreground">M</span>
              </div>
              <span className="text-sm text-muted-foreground">
                © 2025 MSME Credit Hub. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="transition-colors hover:text-foreground">Privacy Policy</a>
              <a href="#" className="transition-colors hover:text-foreground">Terms of Service</a>
              <a href="#" className="transition-colors hover:text-foreground">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>

      {/* NEW: Added AI CFO Chatbot */}
      <AICFOChat />
    </div>
  );
};

export default Index;