import { useState } from "react";
import ContextInput from "../ContextInput";

export default function ContextInputExample() {
  const [context, setContext] = useState("Estamos en la oficina");

  const handleContextChange = (value: string) => {
    setContext(value);
    console.log('Context updated:', value);
  };

  return (
    <div className="p-4 max-w-md">
      <ContextInput 
        value={context} 
        onChange={handleContextChange}
      />
    </div>
  );
}