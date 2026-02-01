import React, { useState } from 'react';
import { X, Tag } from 'lucide-react';
import { PromoCode } from '../types';

interface Props {
  onClose: () => void;
  onApply: (code: string) => void;
  validPromoCode: PromoCode | null;
}

const PromoCodeModal: React.FC<Props> = ({ onClose, onApply, validPromoCode }) => {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validPromoCode || !validPromoCode.is_active) {
      setError('No hay promociones activas en este momento.');
      return;
    }

    if (inputCode.trim().toUpperCase() === validPromoCode.code.toUpperCase()) {
      onApply(validPromoCode.code);
      onClose();
    } else {
      setError('Código inválido o expirado.');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-black">
          <X size={20} />
        </button>
        
        <div className="text-center mb-6">
          <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag size={32} className="text-[#BF926B]" />
          </div>
          <h3 className="text-2xl font-bold text-[#0E0F26]">¿Tenés un código?</h3>
          <p className="text-slate-500 mt-2">Ingresalo para acceder a descuentos exclusivos.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={inputCode}
            onChange={(e) => { setInputCode(e.target.value); setError(''); }}
            placeholder="Ej: NACHO10"
            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-center font-bold text-lg uppercase tracking-widest focus:ring-2 focus:ring-[#BF926B] outline-none"
          />
          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
          <button type="submit" className="w-full bg-[#0E0F26] text-white py-4 rounded-xl font-bold hover:bg-black transition-all">
            Aplicar Descuento
          </button>
        </form>
      </div>
    </div>
  );
};

export default PromoCodeModal;