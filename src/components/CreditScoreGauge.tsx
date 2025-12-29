import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface CreditScoreGaugeProps {
  score: number;
  maxScore: number;
}

const CreditScoreGauge = ({ score, maxScore }: CreditScoreGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = (score / maxScore) * 100;
  
  // Semicircle calculations
  const radius = 90;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    // Animate the score number
    const duration = 1500;
    const steps = 60;
    const stepValue = score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const getScoreLabel = () => {
    if (percentage >= 80) return { text: "HEALTHY", color: "text-success" };
    if (percentage >= 60) return { text: "GOOD", color: "text-info" };
    if (percentage >= 40) return { text: "FAIR", color: "text-warning" };
    return { text: "NEEDS IMPROVEMENT", color: "text-destructive" };
  };

  const scoreLabel = getScoreLabel();

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative">
        {/* Background arc */}
        <svg width="220" height="130" viewBox="0 0 220 130" className="overflow-visible">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background track */}
          <path
            d="M 20 110 A 90 90 0 0 1 200 110"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Animated progress arc */}
          <path
            d="M 20 110 A 90 90 0 0 1 200 110"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            filter="url(#glow)"
            className="transition-all duration-1000 ease-out"
            style={{
              animation: "gaugeAnim 1.5s ease-out forwards",
            }}
          />
          
          {/* Score indicator dot */}
          <circle
            cx="110"
            cy="20"
            r="6"
            fill="hsl(var(--primary))"
            className="drop-shadow-lg"
            style={{
              transformOrigin: "110px 110px",
              transform: `rotate(${(percentage / 100) * 180 - 180}deg)`,
              transition: "transform 1.5s ease-out",
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <div className="text-center">
            <span className="font-display text-5xl font-bold text-foreground">
              {animatedScore}
            </span>
            <span className="font-display text-2xl font-medium text-muted-foreground">
              /{maxScore}
            </span>
          </div>
          <span className={`mt-1 font-display text-sm font-semibold tracking-wide ${scoreLabel.color}`}>
            {scoreLabel.text}
          </span>
        </div>
      </div>

      {/* AI Badge */}
      <div className="mt-4 flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1.5">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-medium text-primary">Powered by GenAI analysis</span>
      </div>

      {/* Score breakdown labels */}
      <div className="mt-6 flex w-full justify-between px-2 text-xs text-muted-foreground">
        <span>Poor</span>
        <span>Fair</span>
        <span>Good</span>
        <span>Excellent</span>
      </div>
    </div>
  );
};

export default CreditScoreGauge;
