import { useState } from "react";
import { Button } from "@/components/ui/button";
import MessageInput from "@/components/MessageInput";
import ContextInput from "@/components/ContextInput";
import ToneSelector, { ToneType } from "@/components/ToneSelector";
import { Zap } from "lucide-react";

interface HomePageProps {
  onGenerateResponses: (message: string, context: string, tone: ToneType) => void;
  isGenerating?: boolean;
}

export default function HomePage({ onGenerateResponses, isGenerating = false }: HomePageProps) {
  const [message, setMessage] = useState("");
  const [context, setContext] = useState("");
  const [selectedTone, setSelectedTone] = useState<ToneType>('sarcastico');

  const handleGenerate = () => {
    if (message.trim()) {
      onGenerateResponses(message.trim(), context.trim(), selectedTone);
    }
  };

  const isDisabled = !message.trim() || isGenerating;

  return (
    <div className="px-4 py-6 space-y-6 max-w-md mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          ¿Qué te dijeron?
        </h2>
        <p className="text-muted-foreground">
          Pega el mensaje y generemos una respuesta letal
        </p>
      </div>

      <MessageInput 
        value={message}
        onChange={setMessage}
        placeholder="Ej: Linda remera, ¿no había de tu talle?"
      />

      <ContextInput 
        value={context}
        onChange={setContext}
      />

      <ToneSelector 
        selectedTone={selectedTone}
        onToneChange={setSelectedTone}
      />

      <Button
        onClick={handleGenerate}
        disabled={isDisabled}
        className="w-full h-12 text-base font-semibold gap-2"
        data-testid="button-generate-responses"
      >
        <Zap className="h-5 w-5" />
        {isGenerating ? "Generando..." : "Generar Bardeo"}
      </Button>

      {/* Tips section */}
      <div className="mt-8 p-4 bg-muted/30 rounded-lg">
        <h3 className="font-medium text-foreground mb-2">💡 Tips para mejores respuestas:</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Agrega contexto para respuestas más precisas</li>
          <li>• Elegí el tono según la situación</li>
          <li>• Recordá que es humor, no agresión</li>
        </ul>
      </div>
    </div>
  );
}