import { ArrowRight, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OCENCta = () => {
  return (
    <Card className="card-shadow-lg border-border/50 bg-card overflow-hidden">
      <CardContent className="relative p-0">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        
        <div className="relative flex flex-col items-center justify-center px-6 py-10 text-center md:py-12">
          {/* Badge */}
          <div className="mb-4 flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Next Steps</span>
          </div>

          {/* Title */}
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Ready to Get Funded?
          </h2>
          
          <p className="mt-2 max-w-md text-muted-foreground">
            Connect with India's top lenders instantly through the OCEN framework
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="mt-6 h-14 gap-3 rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Real-time Loan Offers
            <div className="flex items-center gap-1 rounded-full bg-primary-foreground/20 px-2 py-0.5 text-xs">
              via OCEN Registry
              <ArrowRight className="h-4 w-4" />
            </div>
          </Button>

          {/* Subtitle */}
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-success" />
            <span>Your AI-analyzed profile will be shared with approved lenders securely.</span>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-success" />
              RBI Regulated
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-success" />
              256-bit Encryption
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-success" />
              CGTMSE Eligible
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OCENCta;
