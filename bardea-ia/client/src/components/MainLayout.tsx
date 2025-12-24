import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, History, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

type Page = 'home' | 'results' | 'history';

interface MainLayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export default function MainLayout({ children, currentPage, onPageChange }: MainLayoutProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navigation = [
    { id: 'home' as Page, icon: Home, label: 'Inicio' },
    { id: 'results' as Page, icon: MessageSquare, label: 'Respuestas' },
    { id: 'history' as Page, icon: History, label: 'Historial' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🔥</div>
            <div>
              <h1 className="text-lg font-bold text-foreground">BardeaIA</h1>
              <p className="text-xs text-muted-foreground">Tu copiloto en el bardeo</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 min-h-[calc(100vh-80px)]">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t">
        <div className="flex items-center justify-around px-4 py-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`flex flex-col gap-1 h-14 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => onPageChange(item.id)}
                data-testid={`nav-${item.id}`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}