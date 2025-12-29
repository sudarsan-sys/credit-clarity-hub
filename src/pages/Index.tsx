import Header from "@/components/Header";
import CreditScoreGauge from "@/components/CreditScoreGauge";
import AIInsightsCard from "@/components/AIInsightsCard";
import TransactionTable from "@/components/TransactionTable";
import OCENCta from "@/components/OCENCta";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
              <CreditScoreGauge score={82} maxScore={100} />
            </CardContent>
          </Card>

          {/* AI Insights Card */}
          <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <AIInsightsCard />
          </div>
        </div>

        {/* Transaction Table */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <TransactionTable />
        </div>

        {/* OCEN CTA */}
        <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <OCENCta />
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
    </div>
  );
};

export default Index;
