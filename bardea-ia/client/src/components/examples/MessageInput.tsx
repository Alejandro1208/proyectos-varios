import { useState } from "react";
import MessageInput from "../MessageInput";

export default function MessageInputExample() {
  const [message, setMessage] = useState("Linda remera, ¿no había de tu talle?");

  const handleMessageChange = (value: string) => {
    setMessage(value);
    console.log('Message updated:', value);
  };

  return (
    <div className="p-4 max-w-md">
      <MessageInput 
        value={message} 
        onChange={handleMessageChange}
        placeholder="Pega aquí el mensaje que recibiste..."
      />
    </div>
  );
}