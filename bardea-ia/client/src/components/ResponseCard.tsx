import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResponseCardProps {
  response: string;
  onCopy?: () => void;
}

export default function ResponseCard({ response, onCopy }: ResponseCardProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.();
      toast({
        description: "Respuesta copiada al portapapeles",
      });
    } catch (err) {
      toast({
        description: "Error al copiar",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4 hover-elevate">
      <div className="flex items-start justify-between gap-3">
        <p className="text-base leading-relaxed flex-1" data-testid={`text-response`}>
          {response}
        </p>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleCopy}
          className="shrink-0"
          data-testid="button-copy-response"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </Card>
  );
}