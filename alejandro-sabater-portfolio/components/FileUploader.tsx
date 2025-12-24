import React from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface FileUploaderProps {
  label: string;
  currentImage?: string;
  onImageSelect: (base64: string) => void;
  onFileSelect?: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ label, currentImage, onImageSelect, onFileSelect }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onFileSelect?.(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageSelect(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor sube un archivo de imagen válido.');
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-400 mb-2">{label}</label>
      <div
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onDrop={handleDrop}
        className="border-2 border-dashed border-slate-600 rounded-lg bg-slate-900/50 p-4 flex flex-col items-center justify-center text-center hover:border-indigo-500 hover:bg-slate-800 transition-all cursor-pointer relative group min-h-[160px]"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        {currentImage ? (
          <div className="relative w-full h-full flex flex-col items-center">
             <img 
               src={currentImage} 
               alt="Preview" 
               className="max-h-48 w-auto object-contain rounded shadow-md" 
             />
             <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded">
                <span className="text-white font-medium flex items-center gap-2 pointer-events-none">
                  <Upload size={20}/> Cambiar Imagen
                </span>
             </div>
             <p className="text-xs text-slate-500 mt-2">Click o arrastra para cambiar</p>
          </div>
        ) : (
          <div className="text-slate-400 pointer-events-none">
            <Upload className="w-10 h-10 mx-auto mb-3 text-slate-500" />
            <p className="text-sm font-medium text-slate-300">Arrastra una imagen aquí</p>
            <p className="text-xs text-slate-500 mt-1">o haz clic para seleccionar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
