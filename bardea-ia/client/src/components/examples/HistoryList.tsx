import HistoryList from "../HistoryList";

const mockHistory = [
  {
    id: "1",
    response: "No me digas... ¿tampoco había de tu inteligencia?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    originalMessage: "Linda remera, ¿no había de tu talle?"
  },
  {
    id: "2",
    response: "Che, gracias por avisarme que tengo que empezar a ser más sutil",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    originalMessage: "Sos muy directo"
  },
  {
    id: "3", 
    response: "Obvio, mi equipo juega al fútbol, no al bingo como el tuyo",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  }
];

export default function HistoryListExample() {
  return (
    <div className="p-4 max-w-md">
      <HistoryList history={mockHistory} />
    </div>
  );
}