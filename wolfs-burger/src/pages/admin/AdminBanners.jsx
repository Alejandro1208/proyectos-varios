import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, AlertCircle, CheckCircle, Monitor, Smartphone } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import BannerForm from '../../components/admin/BannerForm';

const AdminBanners = () => {
  const { banners, heroContent, deleteBanner, updateHeroContent, loading } = useData();

  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (heroContent) {
      setFormData({
        title: heroContent.title || '',
        subtitle: heroContent.subtitle || '',
        cta1_text: heroContent.cta1_text || '',
        cta1_link: heroContent.cta1_link || '',
        cta2_text: heroContent.cta2_text || '',
        cta2_link: heroContent.cta2_link || '',
      });
    }
  }, [heroContent]);

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const showSuccessMessage = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleContentSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    const result = await updateHeroContent(formData);
    if(result.success) {
      showSuccessMessage('Contenido guardado exitosamente.');
    } else {
      setError(result.error || 'No se pudo guardar el contenido.');
    }
    setIsSaving(false);
  };

  const handleOpenForm = (banner = null) => {
    setEditingBanner(banner);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingBanner(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar este banner?')) {
      await deleteBanner(id);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración de Portada</h1>
        <p className="mt-2 text-gray-600">
          Gestiona las imágenes del carrusel y edita el texto principal de la portada.
        </p>
      </div>

      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-center gap-3" role="alert"><AlertCircle size={20}/><p>{error}</p></div>}
      {success && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 flex items-center gap-3" role="alert"><CheckCircle size={20}/><p>{success}</p></div>}

      <div className="bg-white p-6 rounded-lg shadow-sm">
         <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Imágenes del Carrusel</h2>
            <button onClick={() => handleOpenForm()} className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center gap-2">
                <Plus size={16}/> Nuevo Banner
            </button>
         </div>

        {loading && <p className="text-center text-gray-500 py-4">Cargando imágenes...</p>}
        {!loading && banners.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No hay imágenes en el carrusel. Haz clic en "Nuevo Banner" para agregar la primera.</p>
        ) : (
          <div className="space-y-4">
            {banners.map(banner => (
              <div key={banner.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-grow flex items-center gap-4">
                    <div className="text-center">
                        <Monitor className="mx-auto mb-1 text-gray-500" size={18}/>
                        <img src={banner.image_url} alt="Desktop" className="w-28 h-16 object-cover rounded-md bg-gray-200 shadow-sm border"/>
                    </div>
                    <div className="text-center">
                        <Smartphone className="mx-auto mb-1 text-gray-500" size={18}/>
                        {banner.image_url_mobile ? (
                            <img src={banner.image_url_mobile} alt="Mobile" className="w-16 h-28 object-cover rounded-md bg-gray-200 shadow-sm border"/>
                        ) : (
                            <div className="w-16 h-28 flex items-center justify-center bg-gray-100 rounded-md text-xs text-gray-400 border">Sin img.</div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                    <button onClick={() => handleOpenForm(banner)} className="p-2 text-gray-500 hover:text-indigo-600 rounded-md bg-gray-100 hover:bg-indigo-100" title="Editar"><Edit size={16}/></button>
                    <button onClick={() => handleDelete(banner.id)} className="p-2 text-gray-500 hover:text-red-600 rounded-md bg-gray-100 hover:bg-red-100" title="Eliminar"><Trash2 size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* El formulario para el contenido fijo se mantiene igual */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <form onSubmit={handleContentSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Contenido Fijo de la Portada</h2>
          {/* ... campos de título, subtítulo y botones ... */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input type="text" name="title" value={formData.title || ''} onChange={handleInputChange} className="input-styled" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtítulo</label>
            <textarea name="subtitle" value={formData.subtitle || ''} onChange={handleInputChange} className="input-styled" rows="2"></textarea>
          </div>
          <fieldset className="border p-4 rounded-md space-y-3">
            <legend className="text-sm font-medium px-1">Botón 1 (Principal)</legend>
            <input type="text" name="cta1_text" value={formData.cta1_text || ''} onChange={handleInputChange} placeholder="Texto del botón (ej: Ver Productos)" className="input-styled"/>
            <input type="text" name="cta1_link" value={formData.cta1_link || ''} onChange={handleInputChange} placeholder="Enlace (ej: /menu)" className="input-styled"/>
          </fieldset>
          <fieldset className="border p-4 rounded-md space-y-3">
            <legend className="text-sm font-medium px-1">Botón 2 (Secundario)</legend>
            <input type="text" name="cta2_text" value={formData.cta2_text || ''} onChange={handleInputChange} placeholder="Texto del botón (ej: Pedir Ahora)" className="input-styled"/>
            <input type="text" name="cta2_link" value={formData.cta2_link || ''} onChange={handleInputChange} placeholder="Enlace externo" className="input-styled"/>
          </fieldset>
          <div className="flex justify-end pt-2">
            <button type="submit" disabled={isSaving} className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 disabled:opacity-50">
              <Save size={16}/>{isSaving ? 'Guardando...' : 'Guardar Contenido'}
            </button>
          </div>
        </form>
      </div>

      {showForm && <BannerForm banner={editingBanner} onClose={handleCloseForm} />}
    </div>
  );
};
export default AdminBanners;