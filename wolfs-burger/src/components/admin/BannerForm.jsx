import React, { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const BannerForm = ({ banner, onClose }) => {
    const { addBanner, updateBanner } = useData();
    const [desktopFile, setDesktopFile] = useState(null);
    const [mobileFile, setMobileFile] = useState(null);
    const [desktopPreview, setDesktopPreview] = useState(banner?.image_url || '');
    const [mobilePreview, setMobilePreview] = useState(banner?.image_url_mobile || '');
    const [isProcessing, setIsProcessing] = useState(false);
    const isEditing = !!banner;

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;
        if (type === 'desktop') {
            setDesktopFile(file);
            setDesktopPreview(URL.createObjectURL(file));
        } else {
            setMobileFile(file);
            setMobilePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        const formData = new FormData();
        if (desktopFile) formData.append('image_desktop', desktopFile);
        if (mobileFile) formData.append('image_mobile', mobileFile);

        if (isEditing) {
            formData.append('id', banner.id);
            // Extraer solo la ruta relativa para el backend
            const getRelativePath = (url) => url ? url.substring(url.indexOf('uploads/')) : null;

            if (!desktopFile && banner.image_url) {
                formData.append('existing_image_url', getRelativePath(banner.image_url));
            }
            if (!mobileFile && banner.image_url_mobile) {
                formData.append('existing_image_url_mobile', getRelativePath(banner.image_url_mobile));
            }
            await updateBanner(formData);
        } else {
            await addBanner(formData);
        }

        setIsProcessing(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" style={{ marginTop: 0 }}>
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold">{isEditing ? 'Editar Banner' : 'Nuevo Banner'}</h2>
                    <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X size={20}/></button>
                </div>
                <form id="banner-form" onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
                    {/* Campo para Imagen de Escritorio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Imagen de Escritorio*</label>
                        <div className="mt-2 flex items-center gap-4">
                            <div className="w-40 h-20 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center border">
                                {desktopPreview ? <img src={desktopPreview} alt="Preview Desktop" className="w-full h-full object-cover"/> : <ImageIcon className="text-gray-400"/>}
                            </div>
                            <label htmlFor="desktop-upload" className="btn-secondary cursor-pointer">Subir Imagen</label>
                            <input id="desktop-upload" type="file" className="hidden" onChange={(e) => handleFileChange(e, 'desktop')} accept="image/*"/>
                        </div>
                    </div>
                    {/* Campo para Imagen Móvil */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Imagen Móvil (Opcional)</label>
                        <p className="text-xs text-gray-500">Recomendado formato vertical (ej: 9:16). Si se deja en blanco, se usará la de escritorio.</p>
                        <div className="mt-2 flex items-center gap-4">
                            <div className="w-20 h-40 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center border">
                                {mobilePreview ? <img src={mobilePreview} alt="Preview Mobile" className="w-full h-full object-cover"/> : <ImageIcon className="text-gray-400"/>}
                            </div>
                            <label htmlFor="mobile-upload" className="btn-secondary cursor-pointer">Subir Imagen</label>
                            <input id="mobile-upload" type="file" className="hidden" onChange={(e) => handleFileChange(e, 'mobile')} accept="image/*"/>
                        </div>
                    </div>
                </form>
                <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
                    <button type="button" onClick={onClose} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm">Cancelar</button>
                    <button type="submit" form="banner-form" disabled={isProcessing} className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md">
                        {isProcessing ? 'Guardando...' : 'Guardar Banner'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BannerForm;