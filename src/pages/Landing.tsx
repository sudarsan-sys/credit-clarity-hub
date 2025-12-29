import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, Building2, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Landing = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = async () => {
        setIsConnecting(true);

        try {
            // 1. Call your backend to start the Real Setu Flow
            const response = await fetch('http://localhost:5000/api/create-consent', {
                method: 'POST'
            });
            const data = await response.json();

            if (data.redirectUrl) {
                toast({
                    title: "Redirecting to Account Aggregator",
                    description: "Please approve the consent on the Setu secure page.",
                });

                // 2. THE REAL REDIRECT
                // This takes the user away from your app to the Bank's login page
                window.location.href = data.redirectUrl;
            } else {
                // Fallback for demo if keys aren't set
                console.warn("No redirect URL returned (Check backend keys)");
                navigate("/dashboard");
            }

        } catch (error) {
            console.error("Connection Error", error);
            toast({
                title: "Connection Error",
                description: "Using simulation mode due to API error.",
                variant: "destructive"
            });
            // Fallback for safety
            setTimeout(() => navigate("/dashboard"), 1000);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Navigation */}
            <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl text-primary">
                        <Building2 className="h-6 w-6" />
                        <span>MSME Credit Hub</span>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="ghost">For Lenders</Button>
                        <Button onClick={handleConnect} disabled={isConnecting}>
                            {isConnecting ? "Connecting..." : "Login"}
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1">
                <section className="py-20 px-4">
                    <div className="container mx-auto text-center max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fade-in">
                            <Zap className="h-4 w-4" />
                            <span>Powered by OCEN 4.0 & GenAI</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Instant Working Capital for Indian MSMEs
                        </h1>

                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            Connect your bank account via Account Aggregator. Let our AI analyze your cash flow. Get loan offers from top banks in <span className="text-foreground font-semibold">minutes, not weeks.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all"
                                onClick={handleConnect}
                                disabled={isConnecting}
                            >
                                {isConnecting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Connecting to Setu AA...
                                    </>
                                ) : (
                                    <>
                                        Check Eligibility Now <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                            <p className="text-xs text-muted-foreground mt-2 sm:mt-0">
                                <Lock className="inline h-3 w-3 mr-1" />
                                100% Secure & Consent-Based
                            </p>
                        </div>
                    </div>
                </section>

                {/* Feature Grid */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<ShieldCheck className="h-8 w-8 text-green-500" />}
                                title="Paperless & Secure"
                                description="No PDF uploads needed. We fetch tamper-proof data directly from your bank via Account Aggregator."
                            />
                            <FeatureCard
                                icon={<Zap className="h-8 w-8 text-blue-500" />}
                                title="AI Underwriting"
                                description="Our Gemini AI analyzes daily cash flows, not just year-end balance sheets, giving you a fairer score."
                            />
                            <FeatureCard
                                icon={<Building2 className="h-8 w-8 text-purple-500" />}
                                title="OCEN Network"
                                description="One application reaches multiple lenders (HDFC, SBI, Bajaj) instantly through the Open Credit Enablement Network."
                            />
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-8 border-t text-center text-muted-foreground text-sm">
                © 2025 MSME Credit Hub. Built for India Stack.
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: any, title: string, description: string }) => (
    <Card className="border-none shadow-none bg-background/50 backdrop-blur">
        <CardContent className="pt-6 text-center">
            <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-muted">
                {icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);

export default Landing;