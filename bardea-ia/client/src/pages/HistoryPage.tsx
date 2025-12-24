import { Button } from "@/components/ui/button";
import HistoryList from "@/components/HistoryList";
import { Trash2 } from "lucide-react";

interface HistoryItem {
  id: string;
  response: string;
  timestamp: Date;
  originalMessage?: string;
}

interface HistoryPageProps {
  history: HistoryItem[];
  onClearHistory?: () => void;
}

export default function HistoryPage({ history, onClearHistory }: HistoryPageProps) {
  return (
    <div className="px-4 py-6 space-y-6 max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Historial</h2>
        {history.length > 0 && onClearHistory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className="text-destructive hover:text-destructive"
            data-testid="button-clear-history"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      <HistoryList history={history} />
    </div>
  );
}