import { useState } from "react";
import MainLayout from "../MainLayout";
import { ThemeProvider } from "../ThemeProvider";

export default function MainLayoutExample() {
  const [currentPage, setCurrentPage] = useState<'home' | 'results' | 'history'>('home');

  const handlePageChange = (page: 'home' | 'results' | 'history') => {
    setCurrentPage(page);
    console.log('Page changed to:', page);
  };

  return (
    <ThemeProvider>
      <MainLayout currentPage={currentPage} onPageChange={handlePageChange}>
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">Página: {currentPage}</h2>
          <p className="text-muted-foreground">
            Usa la navegación inferior para cambiar de página
          </p>
        </div>
      </MainLayout>
    </ThemeProvider>
  );
}