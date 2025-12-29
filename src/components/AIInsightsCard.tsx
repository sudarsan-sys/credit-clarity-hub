import { CheckCircle, AlertTriangle, Info, Lightbulb, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Insight {
  type: "success" | "warning" | "info" | "recommendation";
  title: string;
  description: string;
}

const insights: Insight[] = [
  {
    type: "success",
    title: "Steady Cash Flow",
    description: "Monthly revenue shows consistency over the last 6 months.",
  },
  {
    type: "warning",
    title: "High Burn Rate",
    description: "March debit volume was 30% higher than average due to inventory purchase.",
  },
  {
    type: "info",
    title: "Loan Serviceability",
    description: "Current cash flow can comfortably support an EMI of ₹50,000/month.",
  },
  {
    type: "recommendation",
    title: "Recommendation",
    description: "You are highly likely to get approved for working capital loans under the CGTMSE scheme.",
  },
];

const getInsightIcon = (type: Insight["type"]) => {
  switch (type) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-success" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    case "info":
      return <Info className="h-5 w-5 text-info" />;
    case "recommendation":
      return <Lightbulb className="h-5 w-5 text-primary" />;
  }
};

const getInsightStyles = (type: Insight["type"]) => {
  switch (type) {
    case "success":
      return "bg-success/5 border-success/20";
    case "warning":
      return "bg-warning/5 border-warning/20";
    case "info":
      return "bg-info/5 border-info/20";
    case "recommendation":
      return "bg-primary/5 border-primary/20";
  }
};

const AIInsightsCard = () => {
  return (
    <Card className="h-full card-shadow-lg border-border/50 bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            AI CFO Insights & Analysis
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 rounded-lg border p-3.5 transition-all duration-300 hover:shadow-sm ${getInsightStyles(insight.type)}`}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="mt-0.5 flex-shrink-0">{getInsightIcon(insight.type)}</div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-foreground">{insight.title}</h4>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                {insight.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AIInsightsCard;
