import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface HistoryItem {
  id: string;
  response: string;
  timestamp: Date;
  originalMessage?: string;
}

interface HistoryListProps {
  history: HistoryItem[];
}

export default function HistoryList({ history }: HistoryListProps) {
  if (history.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">
          Aún no hay respuestas copiadas
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Tus respuestas copiadas aparecerán aquí
        </p>
      </div>
    );
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">
        Historial de respuestas ({history.length})
      </h2>
      <div className="space-y-3">
        {history.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="space-y-2">
              {item.originalMessage && (
                <p className="text-sm text-muted-foreground italic">
                  "{item.originalMessage}"
                </p>
              )}
              <p className="text-base" data-testid={`text-history-${item.id}`}>
                {item.response}
              </p>
              <p className="text-xs text-muted-foreground">
                Copiado a las {formatTime(item.timestamp)}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}