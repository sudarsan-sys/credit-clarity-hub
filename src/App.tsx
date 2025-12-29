import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index"; // Dashboard
import Landing from "./pages/Landing"; // New Landing Page
import NotFound from "./pages/NotFound";
// AICFOChat is already imported inside Index.tsx, so we don't strictly need it here globally
// unless you want it on the landing page too.
// If it's already in Index.tsx, you can remove it from here to avoid duplicates on the dashboard.

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page is now the default Home */}
          <Route path="/" element={<Landing />} />

          {/* Dashboard is moved to /dashboard */}
          <Route path="/dashboard" element={<Index />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;