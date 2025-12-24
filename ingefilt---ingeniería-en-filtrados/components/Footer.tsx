import React, { useState } from 'react';
import { Logo } from './Logo';
import { X, Shield, FileText } from 'lucide-react';

type LegalType = 'privacy' | 'terms' | null;

const legalContent = {
  privacy: {
    title: "Política de Privacidad",
    icon: Shield,
    content: (
      <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
        <p><strong>1. Responsable del Tratamiento:</strong> Ingefilt Ingeniería en Filtrados ("nosotros") se compromete a proteger la privacidad de sus usuarios. Esta política describe cómo recopilamos y usamos sus datos.</p>
        <p><strong>2. Datos Recopilados:</strong> Únicamente recopilamos información personal (nombre, empresa, correo electrónico, teléfono) que usted nos proporciona voluntariamente a través de nuestro formulario de contacto o enlace de WhatsApp.</p>
        <p><strong>3. Finalidad:</strong> Los datos se utilizan exclusivamente para:
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Responder a sus consultas técnicas o comerciales.</li>
            <li>Proveer cotizaciones solicitadas.</li>
            <li>Mantener una relación comercial B2B.</li>
          </ul>
        </p>
        <p><strong>4. Protección de Datos:</strong> No vendemos, alquilamos ni compartimos su información con terceros, salvo obligación legal. Implementamos medidas de seguridad digitales para prevenir el acceso no autorizado.</p>
        <p><strong>5. Derechos del Usuario:</strong> Usted puede solicitar el acceso, rectificación o eliminación de sus datos en cualquier momento enviando un correo a info@ingefilt.com.</p>
      </div>
    )
  },
  terms: {
    title: "Términos de Uso",
    icon: FileText,
    content: (
      <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
        <p><strong>1. Aceptación:</strong> Al acceder al sitio web de Ingefilt, usted acepta cumplir con estos términos de servicio y todas las leyes y regulaciones aplicables.</p>
        <p><strong>2. Propiedad Intelectual:</strong> Todo el contenido técnico, imágenes, esquemas de filtros, logotipos y textos mostrados en este sitio son propiedad exclusiva de Ingefilt o cuentan con las licencias correspondientes. Queda prohibida su reproducción sin autorización escrita.</p>
        <p><strong>3. Uso de la Información:</strong> La información técnica provista en este sitio es referencial. Ingefilt no se hace responsable por interpretaciones erróneas o aplicaciones incorrectas de nuestros productos sin el asesoramiento directo de nuestro departamento de ingeniería.</p>
        <p><strong>4. Limitación de Responsabilidad:</strong> En ningún caso Ingefilt será responsable de daños directos o indirectos que surjan del uso o la imposibilidad de uso de los materiales en este sitio web.</p>
        <p><strong>5. Ley Aplicable:</strong> Estos términos se rigen e interpretan de acuerdo con las leyes de la República Argentina.</p>
      </div>
    )
  }
};

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<LegalType>(null);

  const openModal = (type: LegalType) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return (
    <>
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Logo className="h-10" dark={false} />
              <p className="text-slate-500 text-sm mt-2 ml-12">
                © {new Date().getFullYear()} Ingefilt. Todos los derechos reservados.
              </p>
            </div>
            
            <div className="flex space-x-6">
              <button 
                onClick={() => openModal('privacy')}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Política de Privacidad
              </button>
              <button 
                onClick={() => openModal('terms')}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Términos de Uso
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl flex flex-col">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                {activeModal === 'privacy' ? <Shield className="text-blue-600" size={24} /> : <FileText className="text-blue-600" size={24} />}
                <h3 className="text-xl font-bold text-slate-900">{legalContent[activeModal].title}</h3>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {legalContent[activeModal].content}
            </div>

            {/* Footer Action */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-colors text-sm"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};