import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContextInputProps {
  value: string;
  onChange: (value: string) => void;
}

const contextExamples = [
  "Estamos en un asado con amigos",
  "Es hincha de Boca y yo de River", 
  "Me lo dijo en la oficina",
  "En un grupo de WhatsApp de amigos del fútbol",
  "Me lo dijo mi cuñado en una cena familiar"
];

export default function ContextInput({ value, onChange }: ContextInputProps) {
  const randomExample = contextExamples[Math.floor(Math.random() * contextExamples.length)];

  return (
    <div className="space-y-3">
      <Label htmlFor="context-input" className="text-sm font-medium text-muted-foreground">
        Contexto de la situación (opcional)
      </Label>
      <Textarea
        id="context-input"
        placeholder={`Ej: ${randomExample}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[60px] text-base resize-none"
        data-testid="input-context"
      />
    </div>
  );
}