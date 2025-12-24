import { Button } from "@/components/ui/button";
import ResponseList from "@/components/ResponseList";
import LoadingState from "@/components/LoadingState";
import { ArrowLeft, RotateCcw } from "lucide-react";

interface Response {
  id: string;
  text: string;
}

interface ResultsPageProps {
  responses: Response[];
  isLoading: boolean;
  onBack: () => void;
  onResponseCopy?: (response: Response) => void;
  onRegenerate?: () => void;
  originalMessage?: string;
}

export default function ResultsPage({ 
  responses, 
  isLoading, 
  onBack, 
  onResponseCopy,
  onRegenerate,
  originalMessage 
}: ResultsPageProps) {
  return (
    <div className="px-4 py-6 space-y-6 max-w-md mx-auto">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          data-testid="button-back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-foreground">Respuestas</h2>
          {originalMessage && (
            <p className="text-sm text-muted-foreground italic">
              "{originalMessage}"
            </p>
          )}
        </div>
        {!isLoading && responses.length > 0 && onRegenerate && (
          <Button
            variant="outline"
            size="icon"
            onClick={onRegenerate}
            data-testid="button-regenerate"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isLoading ? (
        <LoadingState />
      ) : (
        <ResponseList 
          responses={responses}
          onResponseCopy={onResponseCopy}
        />
      )}

      {!isLoading && responses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No se generaron respuestas
          </p>
          <Button
            variant="outline"
            onClick={onBack}
            className="mt-4"
          >
            Volver al inicio
          </Button>
        </div>
      )}
    </div>
  );
}