import ResponseCard from "./ResponseCard";

interface Response {
  id: string;
  text: string;
}

interface ResponseListProps {
  responses: Response[];
  onResponseCopy?: (response: Response) => void;
}

export default function ResponseList({ responses, onResponseCopy }: ResponseListProps) {
  if (responses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No hay respuestas generadas aún
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">
        Respuestas generadas ({responses.length})
      </h2>
      <div className="space-y-3">
        {responses.map((response) => (
          <ResponseCard
            key={response.id}
            response={response.text}
            onCopy={() => onResponseCopy?.(response)}
          />
        ))}
      </div>
    </div>
  );
}