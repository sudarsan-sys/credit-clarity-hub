import { CheckCircle, AlertTriangle, Info, Lightbulb, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Interface matches the one in Index.tsx
export interface Insight {
  type: "success" | "warning" | "info" | "recommendation" | "positive" | "tip"; // Added variations to be safe
  title: string;
  description?: string; // Made optional to handle backend variations
  text?: string;        // Added 'text' because your backend server code used 'text' instead of 'description'
}

interface AIInsightsCardProps {
  insights: Insight[];
}

const getInsightIcon = (type: string) => {
  // Normalize type to lowercase to avoid mismatches
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes("success") || normalizedType.includes("positive"))
    return <CheckCircle className="h-5 w-5 text-success" />;
  if (normalizedType.includes("warning"))
    return <AlertTriangle className="h-5 w-5 text-warning" />;
  if (normalizedType.includes("info"))
    return <Info className="h-5 w-5 text-info" />;
  if (normalizedType.includes("recommendation") || normalizedType.includes("tip"))
    return <Lightbulb className="h-5 w-5 text-primary" />;

  return <Info className="h-5 w-5 text-info" />;
};

const getInsightStyles = (type: string) => {
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes("success") || normalizedType.includes("positive"))
    return "bg-success/5 border-success/20";
  if (normalizedType.includes("warning"))
    return "bg-warning/5 border-warning/20";
  if (normalizedType.includes("info"))
    return "bg-info/5 border-info/20";
  if (normalizedType.includes("recommendation") || normalizedType.includes("tip"))
    return "bg-primary/5 border-primary/20";

  return "bg-muted/5 border-muted/20";
};

const AIInsightsCard = ({ insights = [] }: AIInsightsCardProps) => {
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
        {insights.length === 0 ? (
          <p className="text-sm text-muted-foreground">No insights available yet.</p>
        ) : (
          insights.map((insight, index) => (
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
                  {/* Handle both 'description' and 'text' fields to be safe */}
                  {insight.description || insight.text}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsightsCard;