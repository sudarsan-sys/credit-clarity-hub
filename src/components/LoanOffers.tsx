import { useState } from "react";
import { Loader2, Banknote, ArrowRight, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Offer {
    provider: string;
    amount: string;
    interest: string;
    tenure: string;
}

interface LoanOffersProps {
    score: number;
}

const LoanOffers = ({ score }: LoanOffersProps) => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const fetchOffers = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/offers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ score }),
            });
            const data = await response.json();
            setOffers(data.offers);
        } catch (error) {
            console.error("Failed to fetch offers", error);
        } finally {
            setLoading(false);
            setHasSearched(true);
        }
    };

    return (
        <Card className="card-shadow-lg border-border/50 bg-card">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                <Banknote className="h-4 w-4 text-primary" />
                            </div>
                            OCEN Loan Marketplace
                        </CardTitle>
                        <CardDescription>
                            Real-time offers from lenders based on your Credit Score ({score}/100)
                        </CardDescription>
                    </div>
                    {!hasSearched && (
                        <Button onClick={fetchOffers} disabled={loading || score === 0}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Fetch Offers"}
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {!hasSearched ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                        <Banknote className="h-10 w-10 mb-3 opacity-20" />
                        <p>Click "Fetch Offers" to share your AI analysis with the OCEN network.</p>
                    </div>
                ) : loading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : offers.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        {offers.map((offer, index) => (
                            <div key={index} className="flex flex-col justify-between rounded-xl border p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/50 bg-background">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg">{offer.provider}</h3>
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">98% Match</Badge>
                                    </div>
                                    <div className="space-y-1 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Amount:</span>
                                            <span className="font-semibold">{offer.amount}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Interest:</span>
                                            <span className="font-semibold text-green-600">{offer.interest}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Tenure:</span>
                                            <span className="font-medium">{offer.tenure}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full group">
                                    Apply Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center border rounded-lg bg-destructive/5 border-destructive/20">
                        <ShieldAlert className="h-10 w-10 text-destructive mb-2" />
                        <h3 className="font-semibold text-destructive">No Offers Found</h3>
                        <p className="text-sm text-muted-foreground max-w-xs mt-1">
                            Based on your current score ({score}), lenders are unable to provide offers at this time. Use the AI CFO chat to improve your score.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default LoanOffers;