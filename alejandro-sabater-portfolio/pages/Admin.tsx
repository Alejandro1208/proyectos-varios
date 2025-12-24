import React, { useEffect, useState } from 'react';
import { AppData, Project, Video, SocialLink } from '../types';
import { Lock, Save, LogOut, User, Layout, Video as VideoIcon, Plus, Trash2, Edit2, X, AlertTriangle, Share2 } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import { useAppData } from '../hooks/useAppData';

const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

const Admin: React.FC = () => {
  const { data: serverData, loading: loadingServer, error, reload } = useAppData();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'videos' | 'socials'>('profile');
  
  // Data State
  const [data, setData] = useState<AppData | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (serverData) {
      setData(serverData);
    }
  }, [serverData]);

  // Modal States
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null); // Null means adding new
  
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);

  const [deleteConfirmation, setDeleteConfirmation] = useState<{ type: 'project' | 'video' | 'social', id: number | string } | null>(null);

  // --- Login Handler ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'AleejandroSabater1992' && password === 'Giovanni2906') {
      setIsLoggedIn(true);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handleError = (message: string, err?: unknown) => {
    console.error(message, err);
    setErrorMsg(message);
  };

  // --- Profile Save ---
  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setFeedback(null);
    setErrorMsg(null);

    try {
      // Upload avatar if a new file was selected
      if (avatarFile) {
        const avatarForm = new FormData();
        avatarForm.append('avatar', avatarFile);
        const res = await fetch(`${API_BASE}/profile/avatar`, {
          method: 'POST',
          body: avatarForm
        });
        if (!res.ok) {
          throw new Error('No se pudo subir el avatar');
        }
      }

      const res = await fetch(`${API_BASE}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.profile.name,
          role: data.profile.role,
          location: data.profile.location,
          bioShort: data.profile.bioShort,
          bioLong: data.profile.bioLong,
          email: data.profile.email,
          skills: data.profile.skills
        })
      });

      if (!res.ok) {
        throw new Error('No se pudo actualizar el perfil');
      }

      await reload();
      setAvatarFile(null);
      setFeedback('Perfil actualizado correctamente.');
    } catch (err) {
      handleError('No se pudo guardar el perfil. Verifica la API.', err);
    } finally {
      setSaving(false);
    }
  };

  // --- Profile Handlers ---
  const updateProfile = (field: keyof AppData['profile'], value: any) => {
    setData(prev => prev ? ({
      ...prev,
      profile: { ...prev.profile, [field]: value }
    }) : prev);
  };

  const updateProfileSkills = (value: string) => {
    const skillsArray = value.split(',').map(s => s.trim());
    updateProfile('skills', skillsArray);
  };

  // --- Project Handlers ---
  const openProjectModal = (project: Project | null) => {
    setEditingProject(project);
    setProjectImageFile(null);
    setIsProjectModalOpen(true);
  };

  const saveProjectFromModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    setErrorMsg(null);

    const form = new FormData(e.target as HTMLFormElement);
    const techs = (form.get('technologies') as string) || '';
    const formData = new FormData();
    formData.append('title', (form.get('title') as string) ?? '');
    formData.append('description', (form.get('description') as string) ?? '');
    formData.append('siteUrl', (form.get('siteUrl') as string) ?? '');
    formData.append('technologies', techs);

    if (projectImageFile) {
      formData.append('image', projectImageFile);
    } else if (editingProject?.imageUrl) {
      formData.append('imageUrl', editingProject.imageUrl);
    }

    try {
      const url = editingProject
        ? `${API_BASE}/projects/${editingProject.id}`
        : `${API_BASE}/projects`;

      // Usamos POST en ambos casos para compatibilidad con PHP (multipart en PUT no llena $_POST/$_FILES)
      const method = 'POST';
      if (editingProject) {
        formData.append('_method', 'PUT');
      }

      const res = await fetch(url, {
        method,
        body: formData
      });

      if (!res.ok) {
        throw new Error('No se pudo guardar el proyecto');
      }

      await reload();
      setIsProjectModalOpen(false);
      setEditingProject(null);
      setProjectImageFile(null);
      setFeedback(`Proyecto ${editingProject ? 'actualizado' : 'creado'} correctamente.`);
    } catch (err) {
      handleError('Error al guardar el proyecto. Verifica la API.', err);
    } finally {
      setSaving(false);
    }
  };

  const confirmDeleteProject = async () => {
    if (deleteConfirmation?.type !== 'project') return;
    setSaving(true);
    setErrorMsg(null);
    setFeedback(null);

    try {
      const res = await fetch(`${API_BASE}/projects/${deleteConfirmation.id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('No se pudo eliminar el proyecto');
      }
      await reload();
      setFeedback('Proyecto eliminado correctamente.');
    } catch (err) {
      handleError('Error al eliminar el proyecto. Verifica la API.', err);
    } finally {
      setSaving(false);
      setDeleteConfirmation(null);
    }
  };

  // --- Video Handlers ---
  const openVideoModal = (video: Video | null) => {
    setEditingVideo(video);
    setIsVideoModalOpen(true);
  };

  // --- Social Handlers ---
  const openSocialModal = (social: SocialLink | null) => {
    setEditingSocial(social);
    setIsSocialModalOpen(true);
  };

  const saveSocialFromModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    setErrorMsg(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const payload = {
      platform: (formData.get('platform') as string) ?? '',
      url: (formData.get('url') as string) ?? '',
      icon: (formData.get('icon') as string) ?? ''
    };

    try {
      const url = editingSocial?.id
        ? `${API_BASE}/socials/${editingSocial.id}`
        : `${API_BASE}/socials`;
      const method = editingSocial?.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('No se pudo guardar la red social');
      }

      await reload();
      setFeedback(`Red social ${editingSocial ? 'actualizada' : 'creada'} correctamente.`);
      setIsSocialModalOpen(false);
      setEditingSocial(null);
    } catch (err) {
      handleError('Error al guardar la red social. Verifica la API.', err);
    } finally {
      setSaving(false);
    }
  };

  const confirmDeleteSocial = async () => {
    if (deleteConfirmation?.type !== 'social') return;
    setSaving(true);
    setErrorMsg(null);
    setFeedback(null);
    try {
      const res = await fetch(`${API_BASE}/socials/${deleteConfirmation.id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('No se pudo eliminar la red social');
      }
      await reload();
      setFeedback('Red social eliminada correctamente.');
    } catch (err) {
      handleError('Error al eliminar la red social. Verifica la API.', err);
    } finally {
      setSaving(false);
      setDeleteConfirmation(null);
    }
  };

  const saveVideoFromModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    setErrorMsg(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const payload = {
      id: (formData.get('id') as string) ?? '',
      title: (formData.get('title') as string) ?? ''
    };

    try {
      const url = editingVideo ? `${API_BASE}/videos/${editingVideo.id}` : `${API_BASE}/videos`;
      const method = editingVideo ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('No se pudo guardar el video');
      }

      await reload();
      setIsVideoModalOpen(false);
      setEditingVideo(null);
      setFeedback(`Video ${editingVideo ? 'actualizado' : 'creado'} correctamente.`);
    } catch (err) {
      handleError('Error al guardar el video. Verifica la API.', err);
    } finally {
      setSaving(false);
    }
  };

  const confirmDeleteVideo = async () => {
    if (deleteConfirmation?.type !== 'video') return;
    setSaving(true);
    setErrorMsg(null);
    setFeedback(null);
    try {
      const res = await fetch(`${API_BASE}/videos/${deleteConfirmation.id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('No se pudo eliminar el video');
      }
      await reload();
      setFeedback('Video eliminado correctamente.');
    } catch (err) {
      handleError('Error al eliminar el video. Verifica la API.', err);
    } finally {
      setSaving(false);
      setDeleteConfirmation(null);
    }
  };

  // --- Render Login ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-indigo-600 rounded-full">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-white mb-6">Panel de Administración</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm font-medium">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loadingServer && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        Cargando datos del CMS...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-red-200">
        No se pudieron cargar los datos. {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">CMS Manager</h1>
          <div className="flex gap-4">
             <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg hover:shadow-green-500/20 disabled:opacity-60"
            >
              <Save className="w-4 h-4 mr-2" /> {saving ? 'Guardando...' : 'Guardar Perfil'}
            </button>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" /> Salir
            </button>
          </div>
        </div>

        {(feedback || errorMsg) && (
          <div className="mb-6">
            {feedback && (
              <div className="mb-2 px-4 py-3 rounded-lg bg-green-900/40 border border-green-600 text-green-100 text-sm">
                {feedback}
              </div>
            )}
            {errorMsg && (
              <div className="px-4 py-3 rounded-lg bg-red-900/30 border border-red-600 text-red-100 text-sm">
                {errorMsg}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Tabs */}
          <div className="w-full lg:w-64 flex flex-col gap-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors text-left ${activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              <User className="w-5 h-5 mr-3" /> Perfil
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors text-left ${activeTab === 'projects' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              <Layout className="w-5 h-5 mr-3" /> Proyectos
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors text-left ${activeTab === 'videos' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              <VideoIcon className="w-5 h-5 mr-3" /> Videos
            </button>
            <button
              onClick={() => setActiveTab('socials')}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors text-left ${activeTab === 'socials' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              <Share2 className="w-5 h-5 mr-3" /> Redes Sociales
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-xl min-h-[500px]">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">Editar Perfil</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Avatar Upload */}
                  <div className="md:col-span-2 lg:col-span-1">
                     <FileUploader 
                        label="Foto de Perfil"
                        currentImage={data.profile.avatarUrl}
                        onImageSelect={(base64) => updateProfile('avatarUrl', base64)}
                        onFileSelect={(file) => setAvatarFile(file)}
                     />
                  </div>

                  <div className="md:col-span-2 lg:col-span-1 space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Nombre Completo</label>
                        <input type="text" value={data.profile.name} onChange={(e) => updateProfile('name', e.target.value)} className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-indigo-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Rol / Título</label>
                        <input type="text" value={data.profile.role} onChange={(e) => updateProfile('role', e.target.value)} className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-indigo-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                        <input
                          type="email"
                          value={data.profile.email}
                          onChange={(e) => updateProfile('email', e.target.value)}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-indigo-500 outline-none"
                        />
                      </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-1">Bio Corta (Hero)</label>
                    <input type="text" value={data.profile.bioShort} onChange={(e) => updateProfile('bioShort', e.target.value)} className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-indigo-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-1">Bio Larga (Sobre mí)</label>
                    <textarea rows={5} value={data.profile.bioLong} onChange={(e) => updateProfile('bioLong', e.target.value)} className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-indigo-500 outline-none resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-1">Skills (separados por coma)</label>
                    <input type="text" value={data.profile.skills.join(', ')} onChange={(e) => updateProfileSkills(e.target.value)} className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-indigo-500 outline-none" />
                  </div>
                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                   <h2 className="text-xl font-bold text-white">Editar Proyectos</h2>
                   <button onClick={() => openProjectModal(null)} className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm text-white transition-colors font-medium">
                     <Plus className="w-4 h-4 mr-2" /> Agregar Proyecto
                   </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {data.projects.map((project) => (
                    <div key={project.id} className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden group hover:border-indigo-500/50 transition-all flex flex-col">
                      <div className="h-32 overflow-hidden relative">
                         <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-white font-bold mb-1 truncate">{project.title}</h3>
                        <p className="text-slate-400 text-xs mb-4 line-clamp-2 flex-1">{project.description}</p>
                        <div className="flex gap-2 pt-2 border-t border-slate-800">
                           <button 
                             onClick={() => openProjectModal(project)}
                             className="flex-1 flex items-center justify-center py-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded transition-colors text-sm"
                           >
                             <Edit2 className="w-3 h-3 mr-2" /> Editar
                           </button>
                           <button 
                             onClick={() => setDeleteConfirmation({ type: 'project', id: project.id })}
                             className="flex-1 flex items-center justify-center py-2 bg-slate-800 hover:bg-red-900/30 text-red-400 rounded transition-colors text-sm"
                           >
                             <Trash2 className="w-3 h-3 mr-2" /> Eliminar
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIDEOS TAB */}
            {activeTab === 'videos' && (
              <div className="space-y-6 animate-fade-in">
                 <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                   <h2 className="text-xl font-bold text-white">Editar Videos (YouTube)</h2>
                   <button onClick={() => openVideoModal(null)} className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm text-white transition-colors font-medium">
                     <Plus className="w-4 h-4 mr-2" /> Agregar Video
                   </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {data.videos.map((video) => (
                    <div key={video.id} className="flex flex-col sm:flex-row gap-4 items-center bg-slate-900 p-4 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors">
                      <div className="w-full sm:w-32 h-20 bg-black rounded overflow-hidden flex-shrink-0">
                         <img 
                           src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                           alt="Thumbnail" 
                           className="w-full h-full object-cover opacity-80"
                         />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-white font-bold">{video.title}</h3>
                        <p className="text-slate-500 text-xs font-mono">ID: {video.id}</p>
                      </div>
                      <div className="flex gap-2">
                         <button onClick={() => openVideoModal(video)} className="p-2 text-indigo-400 hover:bg-indigo-900/30 rounded transition-colors">
                           <Edit2 className="w-5 h-5" />
                         </button>
                         <button onClick={() => setDeleteConfirmation({ type: 'video', id: video.id })} className="p-2 text-red-400 hover:bg-red-900/30 rounded transition-colors">
                           <Trash2 className="w-5 h-5" />
                         </button>
                      </div>
                    </div>
                  ))}
                  {data.videos.length === 0 && <p className="text-slate-500 text-center py-4">No hay videos cargados.</p>}
                </div>
              </div>
            )}

            {/* SOCIALS TAB */}
            {activeTab === 'socials' && (
              <div className="space-y-6 animate-fade-in">
                 <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                   <h2 className="text-xl font-bold text-white">Editar Redes Sociales</h2>
                   <button onClick={() => openSocialModal(null)} className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm text-white transition-colors font-medium">
                     <Plus className="w-4 h-4 mr-2" /> Agregar Red
                   </button>
                 </div>

                 <div className="space-y-4">
                  {data.socials.map((social) => (
                    <div key={`${social.platform}-${social.id ?? 'new'}`} className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900 p-4 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors gap-3">
                      <div>
                        <p className="text-white font-semibold">{social.platform}</p>
                        <p className="text-slate-400 text-sm break-all">{social.url}</p>
                        <p className="text-slate-500 text-xs mt-1 font-mono">Icono: {social.icon}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openSocialModal(social)} className="px-3 py-2 text-indigo-400 hover:bg-indigo-900/30 rounded transition-colors text-sm flex items-center">
                          <Edit2 className="w-4 h-4 mr-1" /> Editar
                        </button>
                        <button onClick={() => setDeleteConfirmation({ type: 'social', id: social.id ?? '' })} className="px-3 py-2 text-red-400 hover:bg-red-900/30 rounded transition-colors text-sm flex items-center">
                          <Trash2 className="w-4 h-4 mr-1" /> Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                  {data.socials.length === 0 && <p className="text-slate-500 text-center py-4">No hay redes sociales cargadas.</p>}
                 </div>
              </div>
            )}

          </div>
        </div>

        {/* --- MODALS --- */}

        {/* Project Modal */}
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700">
               <form onSubmit={saveProjectFromModal}>
                  <div className="flex justify-between items-center p-6 border-b border-slate-700">
                    <h3 className="text-xl font-bold text-white">
                      {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                    </h3>
                    <button type="button" onClick={() => setIsProjectModalOpen(false)} className="text-slate-400 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="p-6 space-y-6">
                     <FileUploader 
                        label="Imagen del Proyecto"
                        currentImage={editingProject?.imageUrl}
                        onImageSelect={(base64) => setEditingProject(prev => prev ? {...prev, imageUrl: base64} : { ...prev as any, imageUrl: base64 })}
                        onFileSelect={(file) => setProjectImageFile(file)}
                     />

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                           <label className="block text-sm text-slate-400 mb-1">Título</label>
                           <input name="title" required defaultValue={editingProject?.title} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500" />
                        </div>
                        <div className="md:col-span-2">
                           <label className="block text-sm text-slate-400 mb-1">Descripción</label>
                           <textarea name="description" required rows={3} defaultValue={editingProject?.description} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500 resize-none" />
                        </div>
                        <div>
                           <label className="block text-sm text-slate-400 mb-1">URL Sitio Web</label>
                           <input name="siteUrl" defaultValue={editingProject?.siteUrl} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500" />
                        </div>
                        <div>
                           <label className="block text-sm text-slate-400 mb-1">Tecnologías (separadas por coma)</label>
                           <input name="technologies" defaultValue={editingProject?.technologies?.join(', ')} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500" />
                        </div>
                     </div>
                  </div>

                  <div className="p-6 border-t border-slate-700 flex justify-end gap-3 bg-slate-800/50">
                    <button type="button" onClick={() => setIsProjectModalOpen(false)} className="px-4 py-2 text-slate-300 hover:text-white font-medium">Cancelar</button>
                    <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-lg hover:shadow-indigo-500/20">
                      {editingProject ? 'Guardar Cambios' : 'Crear Proyecto'}
                    </button>
                  </div>
               </form>
            </div>
          </div>
        )}

        {/* Video Modal */}
        {isVideoModalOpen && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md border border-slate-700">
               <form onSubmit={saveVideoFromModal}>
                  <div className="flex justify-between items-center p-6 border-b border-slate-700">
                    <h3 className="text-xl font-bold text-white">
                      {editingVideo ? 'Editar Video' : 'Nuevo Video'}
                    </h3>
                    <button type="button" onClick={() => setIsVideoModalOpen(false)} className="text-slate-400 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="p-6 space-y-4">
                     <div>
                        <label className="block text-sm text-slate-400 mb-1">ID de YouTube</label>
                        <input name="id" required defaultValue={editingVideo?.id} placeholder="Ej: dQw4w9WgXcQ" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500" />
                        <p className="text-xs text-slate-500 mt-1">El código que aparece después de v= en la URL</p>
                     </div>
                     <div>
                        <label className="block text-sm text-slate-400 mb-1">Título</label>
                        <input name="title" required defaultValue={editingVideo?.title} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500" />
                     </div>
                  </div>

                  <div className="p-6 border-t border-slate-700 flex justify-end gap-3 bg-slate-800/50">
                    <button type="button" onClick={() => setIsVideoModalOpen(false)} className="px-4 py-2 text-slate-300 hover:text-white font-medium">Cancelar</button>
                    <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-lg hover:shadow-indigo-500/20">
                      {editingVideo ? 'Guardar Cambios' : 'Agregar Video'}
                    </button>
                  </div>
               </form>
            </div>
          </div>
        )}

        {/* Social Modal */}
        {isSocialModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md border border-slate-700">
              <form onSubmit={saveSocialFromModal}>
                <div className="flex justify-between items-center p-6 border-b border-slate-700">
                  <h3 className="text-xl font-bold text-white">
                    {editingSocial ? 'Editar Red Social' : 'Nueva Red Social'}
                  </h3>
                  <button type="button" onClick={() => setIsSocialModalOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Plataforma</label>
                    <input name="platform" required defaultValue={editingSocial?.platform} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">URL</label>
                    <input name="url" required defaultValue={editingSocial?.url} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Icono (nombre de lucide)</label>
                    <input name="icon" required defaultValue={editingSocial?.icon} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500" />
                    <p className="text-xs text-slate-500 mt-1">Ej: Linkedin, Instagram, MessageCircle</p>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-700 flex justify-end gap-3 bg-slate-800/50">
                  <button type="button" onClick={() => setIsSocialModalOpen(false)} className="px-4 py-2 text-slate-300 hover:text-white font-medium">Cancelar</button>
                  <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-lg hover:shadow-indigo-500/20">
                    {editingSocial ? 'Guardar Cambios' : 'Agregar Red'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmation && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
             <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-sm border border-slate-700 p-6 text-center">
                <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">¿Estás seguro?</h3>
                <p className="text-slate-400 mb-6">
                  Esta acción no se puede deshacer. Se eliminará el {deleteConfirmation.type === 'project' ? 'proyecto' : deleteConfirmation.type === 'video' ? 'video' : 'enlace'} permanentemente.
                </p>
                <div className="flex gap-3 justify-center">
                   <button 
                    onClick={() => setDeleteConfirmation(null)}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                   >
                     Cancelar
                   </button>
                   <button 
                    onClick={
                      deleteConfirmation.type === 'project'
                        ? confirmDeleteProject
                        : deleteConfirmation.type === 'video'
                          ? confirmDeleteVideo
                          : confirmDeleteSocial
                    }
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-500/20"
                   >
                     Sí, Eliminar
                   </button>
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;
