import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import MainLayout from "@/components/MainLayout";
import HomePage from "@/pages/HomePage";
import ResultsPage from "@/pages/ResultsPage";
import HistoryPage from "@/pages/HistoryPage";
import { ToneType } from "@/components/ToneSelector";
import { apiRequest } from "@/lib/queryClient";

type Page = 'home' | 'results' | 'history';

interface Response {
  id: string;
  text: string;
}

interface HistoryItem {
  id: string;
  response: string;
  timestamp: Date;
  originalMessage?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [responses, setResponses] = useState<Response[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedMessage, setLastGeneratedMessage] = useState<string>("");

  const handleGenerateResponses = async (message: string, context: string, tone: ToneType) => {
    setIsGenerating(true);
    setLastGeneratedMessage(message);
    
    try {
      const response = await apiRequest("POST", "/api/generate", {
        message,
        context: context || undefined,
        tone
      });

      const data = await response.json();
      
      if (data.success) {

        const responsesFromApi = data.responses;

        const formattedResponses = responsesFromApi.map((text: string, index: number) => ({
          id: `response-${index}`,
          text: text,
        }));


        setResponses(formattedResponses);
        setCurrentPage('results');
      } else {
        console.error("API Error:", data.error);

      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResponseCopy = async (response: Response) => {
    try {
      const apiResponse = await apiRequest("POST", "/api/history", {
        responseText: response.text,
        originalMessage: lastGeneratedMessage || undefined
      });

      const data = await apiResponse.json();
      
      if (data.success) {
        const historyItem: HistoryItem = {
          id: data.historyItem.id,
          response: data.historyItem.response,
          timestamp: new Date(data.historyItem.timestamp),
          originalMessage: data.historyItem.originalMessage
        };
        
        setHistory(prev => [historyItem, ...prev.slice(0, 49)]); 
        console.log('Response copied to history:', response.text);
      }
    } catch (error) {
      console.error("Error saving to history:", error);
      const historyItem: HistoryItem = {
        id: response.id + '_history',
        response: response.text,
        timestamp: new Date(),
        originalMessage: lastGeneratedMessage
      };
      setHistory(prev => [historyItem, ...prev.slice(0, 49)]);
    }
  };

  const handleRegenerate = () => {
    if (lastGeneratedMessage) {
      const lastContext = ""; 
      const lastTone: ToneType = "sarcastico"; 
      handleGenerateResponses(lastGeneratedMessage, lastContext, lastTone);
    }
  };

  const handleClearHistory = async () => {
    try {
      const response = await apiRequest("DELETE", "/api/history");

      const data = await response.json();
      
      if (data.success) {
        setHistory([]);
        console.log('History cleared');
      }
    } catch (error) {
      console.error("Error clearing history:", error);
      setHistory([]);
    }
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onGenerateResponses={handleGenerateResponses}
            isGenerating={isGenerating}
          />
        );
      case 'results':
        return (
          <ResultsPage
            responses={responses}
            isLoading={isGenerating}
            onBack={handleBackToHome}
            onResponseCopy={handleResponseCopy}
            onRegenerate={handleRegenerate}
            originalMessage={lastGeneratedMessage}
          />
        );
      case 'history':
        return (
          <HistoryPage
            history={history}
            onClearHistory={handleClearHistory}
          />
        );
      default:
        return null;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="bardea-theme">
        <TooltipProvider>
          <MainLayout 
            currentPage={currentPage} 
            onPageChange={setCurrentPage}
          >
            {renderCurrentPage()}
          </MainLayout>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}