import { Button } from "@/components/ui/button";

export type ToneType = 'picante' | 'sarcastico' | 'chistoso' | 'inteligente';

interface ToneSelectorProps {
  selectedTone: ToneType;
  onToneChange: (tone: ToneType) => void;
}

const tones: { id: ToneType; emoji: string; label: string; color: string }[] = [
  { id: 'picante', emoji: '🔥', label: 'Picante', color: 'bg-red-500 hover:bg-red-600' },
  { id: 'sarcastico', emoji: '😏', label: 'Sarcástico', color: 'bg-purple-500 hover:bg-purple-600' },
  { id: 'chistoso', emoji: '😂', label: 'Chistoso', color: 'bg-yellow-500 hover:bg-yellow-600' },
  { id: 'inteligente', emoji: '🤓', label: 'Inteligente', color: 'bg-blue-500 hover:bg-blue-600' },
];

export default function ToneSelector({ selectedTone, onToneChange }: ToneSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Tono de la respuesta
      </label>
      <div className="grid grid-cols-2 gap-3">
        {tones.map((tone) => (
          <Button
            key={tone.id}
            variant={selectedTone === tone.id ? "default" : "outline"}
            className="h-12 gap-2 text-sm font-medium"
            onClick={() => onToneChange(tone.id)}
            data-testid={`button-tone-${tone.id}`}
          >
            <span className="text-lg">{tone.emoji}</span>
            {tone.label}
          </Button>
        ))}
      </div>
    </div>
  );
}