import { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
};

const AICFOChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date(),
        };

        // Add user message to chat
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Send message to backend
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputValue }),
            });

            if (!response.ok) throw new Error('Failed to get response');

            const data = await response.json();

            // Add AI response to chat
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                // FIXED: Changed 'data.response' to 'data.reply' to match your Backend
                text: data.reply || "I'm sorry, I couldn't process your request.",
                sender: 'ai',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble connecting to the server. Please check if your backend is running.",
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
            {isOpen && (
                <div className="flex h-[500px] w-[350px] flex-col rounded-lg border bg-card shadow-xl overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b bg-primary p-4 text-primary-foreground">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            <h3 className="text-lg font-semibold">AI CFO Assistant</h3>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-primary-foreground hover:bg-primary/90"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4 bg-muted/20">
                        <div className="space-y-4">
                            {messages.length === 0 ? (
                                <div className="flex h-[350px] flex-col items-center justify-center text-center text-muted-foreground p-4">
                                    <div className="bg-primary/10 p-3 rounded-full mb-3">
                                        <MessageSquare className="h-8 w-8 text-primary" />
                                    </div>
                                    <p className="font-medium text-foreground mb-1">Hello!</p>
                                    <p className="text-sm">I've analyzed your bank statement. Ask me about your cash flow, bounced checks, or how to improve your score.</p>
                                </div>
                            ) : (
                                messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm ${message.sender === 'user'
                                                ? 'bg-primary text-primary-foreground rounded-br-none'
                                                : 'bg-white border text-foreground rounded-bl-none'
                                                }`}
                                        >
                                            <p className="text-sm leading-relaxed">{message.text}</p>
                                            <p className={`mt-1 text-[10px] ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="border-t bg-background p-3">
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Ask a financial question..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="flex-1"
                                disabled={isLoading}
                            />
                            <Button type="submit" size="icon" disabled={!inputValue.trim() || isLoading}>
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 bg-primary text-primary-foreground"
                size="icon"
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <MessageSquare className="h-6 w-6" />
                )}
            </Button>
        </div>
    );
};

export default AICFOChat;