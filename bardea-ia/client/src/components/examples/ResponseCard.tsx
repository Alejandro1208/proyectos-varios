import ResponseCard from "../ResponseCard";

export default function ResponseCardExample() {
  const handleCopy = () => {
    console.log('Response copied to clipboard');
  };

  return (
    <div className="p-4 max-w-md space-y-4">
      <ResponseCard 
        response="No me digas... ¿tampoco había de tu inteligencia?"
        onCopy={handleCopy}
      />
      <ResponseCard 
        response="Che, por lo menos mi remera no tiene que compensar por mi personalidad"
        onCopy={handleCopy}
      />
    </div>
  );
}