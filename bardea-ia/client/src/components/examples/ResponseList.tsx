import ResponseList from "../ResponseList";

const mockResponses = [
  {
    id: "1",
    text: "No me digas... ¿tampoco había de tu inteligencia?"
  },
  {
    id: "2", 
    text: "Che, por lo menos mi remera no tiene que compensar por mi personalidad"
  },
  {
    id: "3",
    text: "Mirá, si hubiera de mi talle, no te habría quedado para presumir"
  }
];

export default function ResponseListExample() {
  const handleResponseCopy = (response: any) => {
    console.log('Response copied:', response.text);
  };

  return (
    <div className="p-4 max-w-md">
      <ResponseList 
        responses={mockResponses}
        onResponseCopy={handleResponseCopy}
      />
    </div>
  );
}