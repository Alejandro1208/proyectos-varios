import { useState } from "react";
import ToneSelector, { ToneType } from "../ToneSelector";

export default function ToneSelectorExample() {
  const [selectedTone, setSelectedTone] = useState<ToneType>('sarcastico');

  const handleToneChange = (tone: ToneType) => {
    setSelectedTone(tone);
    console.log('Tone selected:', tone);
  };

  return (
    <div className="p-4 max-w-sm">
      <ToneSelector 
        selectedTone={selectedTone} 
        onToneChange={handleToneChange} 
      />
    </div>
  );
}