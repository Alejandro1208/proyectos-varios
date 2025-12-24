import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <p className="text-base text-muted-foreground">
            Generando respuestas ingeniosas...
          </p>
        </div>
      </div>
      
      {/* Skeleton cards */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted animate-pulse rounded w-full" />
              <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            </div>
            <div className="h-8 w-8 bg-muted animate-pulse rounded shrink-0" />
          </div>
        </Card>
      ))}
    </div>
  );
}