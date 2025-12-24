import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MessageInput({ value, onChange, placeholder }: MessageInputProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor="message-input" className="text-sm font-medium text-foreground">
        Mensaje a responder *
      </Label>
      <Textarea
        id="message-input"
        placeholder={placeholder || "Pega aquí el mensaje que recibiste..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[80px] text-base resize-none"
        data-testid="input-message"
      />
    </div>
  );
}