import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import { getBlogPosts, createBlog, updateBlog, deleteBlog } from '../blog/data';
import defaultLegalContent, { loadLegalContent, saveLegalContent } from '../../data/legalContent';
import defaultContactData, { loadContactData, saveContactData } from '../../data/contactData';
import defaultBanners, { loadBanners, saveBanner } from '../../data/banners';

const emptyBlog = {
  id: null,
  title: '',
  subtitle: '',
  description: '',
  content: '',
  slug: '',
  date: '',
  author: '',
  image: '',
  bannerImage: '',
};

const Admin = () => {
  const navigate = useNavigate();
  const [section, setSection] = useState('blogs');

  const [blogs, setBlogs] = useState([]);
  const [blogForm, setBlogForm] = useState(emptyBlog);
  const [legalContent, setLegalContent] = useState(defaultLegalContent);
  const [initialLegal, setInitialLegal] = useState(defaultLegalContent);
  const [contactData, setContactData] = useState(defaultContactData);
  const [initialContact, setInitialContact] = useState(defaultContactData);
  const [uploading, setUploading] = useState(false);
  const [banners, setBanners] = useState(defaultBanners);
  const [initialBanners, setInitialBanners] = useState(defaultBanners);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const sectionKeyToLegal = (tab) => {
    if (tab === 'legales-aviso') return 'aviso';
    if (tab === 'legales-terminos') return 'terminos';
    if (tab === 'legales-privacidad') return 'privacidad';
    return 'aviso';
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth') === 'true';
    if (!isAuth) {
      navigate('/login');
    }
  }, [navigate]);

  // Cargar datos iniciales desde la API
  useEffect(() => {
    let active = true;

    const loadAll = async () => {
      try {
        const [blogList, legal, contact, bannerData] = await Promise.all([
          getBlogPosts(),
          loadLegalContent(),
          loadContactData(),
          loadBanners(),
        ]);
        if (!active) return;
        setBlogs(blogList);
        setLegalContent(legal);
        setInitialLegal(legal);
        setContactData(contact || defaultContactData);
        setInitialContact(contact || defaultContactData);
        setBanners(bannerData || defaultBanners);
        setInitialBanners(bannerData || defaultBanners);
      } catch (e) {
        console.error('Error cargando datos de admin', e);
      }
    };

    loadAll();

    return () => {
      active = false;
    };
  }, []);

  const resetBlogForm = () => setBlogForm(emptyBlog);

  const showFeedback = (type, message) => setFeedback({ type, message });

  const isSameBlog = (form, existing) => {
    if (!existing) return false;
    const fields = ['title','subtitle','description','content','slug','date','author','bannerImage','image'];
    return fields.every((f) => (form[f] || '') === (existing[f] || existing.banner_image || ''));
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const isEditing = Boolean(blogForm.id);

    if (isEditing) {
      const existing = blogs.find((b) => b.id === blogForm.id);
      if (isSameBlog(blogForm, existing)) {
        showFeedback('info', 'No hay cambios en el blog.');
        return;
      }
    } else {
      const fields = ['title', 'slug', 'description', 'content'];
      const empty = fields.every((f) => !blogForm[f]);
      if (empty) {
        showFeedback('info', 'No hay cambios para crear.');
        return;
      }
    }

    try {
      if (isEditing) {
        const updated = await updateBlog({
          ...blogForm,
          bannerImage: blogForm.bannerImage || blogForm.image,
        });
        setBlogs((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
        showFeedback('success', 'Blog actualizado');
      } else {
        const created = await createBlog({
          ...blogForm,
          bannerImage: blogForm.bannerImage || blogForm.image,
        });
        setBlogs((prev) => [...prev, created]);
        showFeedback('success', 'Blog creado');
      }
      resetBlogForm();
    } catch (error) {
      console.error('Error guardando blog', error);
      showFeedback('error', 'Ocurrió un error al guardar el blog.');
    }
  };

  const handleBlogEdit = (blog) => {
    setBlogForm({ ...blog, bannerImage: blog.bannerImage || blog.coverImage || blog.image });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBlogDelete = (id) => {
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      showFeedback('info', 'Confirma eliminación.');
      return;
    }
    const filtered = blogs.filter((b) => b.id !== id);
    setBlogs(filtered);
    deleteBlog(id).then(() => {
      showFeedback('success', 'Blog eliminado');
    }).catch((error) => {
      console.error('Error eliminando blog', error);
      showFeedback('error', 'Ocurrió un error al eliminar el blog.');
    });
    setConfirmDeleteId(null);
    if (blogForm.id === id) resetBlogForm();
  };

  const handleLegalChange = (key, value) => {
    const updated = { ...legalContent, [sectionKeyToLegal(section)]: { ...legalContent[sectionKeyToLegal(section)], [key]: value } };
    setLegalContent(updated);
  };

  const saveLegal = () => {
    if (JSON.stringify(legalContent) === JSON.stringify(initialLegal)) {
      showFeedback('info', 'No hay cambios en legales.');
      return;
    }
    saveLegalContent(legalContent).then(() => {
      setInitialLegal(legalContent);
      showFeedback('success', 'Legales guardados');
    }).catch(() => {
      showFeedback('error', 'No se pudo guardar legales');
    });
  };

  const handleContactChange = (key, value) => {
    setContactData((prev) => ({ ...prev, [key]: value }));
  };

  const saveContact = () => {
    if (JSON.stringify(contactData) === JSON.stringify(initialContact)) {
      showFeedback('info', 'No hay cambios en contacto.');
      return;
    }
    saveContactData(contactData).then(() => {
      setInitialContact(contactData);
      showFeedback('success', 'Contacto guardado');
    }).catch(() => {
      showFeedback('error', 'No se pudo guardar contacto');
    });
  };

  const handleBannerFieldChange = (key, field, value) => {
    setBanners((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const uploadBannerFile = async (key, field, file) => {
    if (!file) return;
    setBannerUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/api/upload.php', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.path) {
        setBanners((prev) => ({
          ...prev,
          [key]: { ...prev[key], [field]: data.path },
        }));
        showFeedback('success', 'Imagen cargada');
      } else {
        showFeedback('error', 'No se pudo cargar la imagen');
      }
    } catch (e) {
      console.error('Error subiendo imagen', e);
      showFeedback('error', 'Error subiendo la imagen');
    } finally {
      setBannerUploading(false);
    }
  };

  const saveBanners = async () => {
    if (JSON.stringify(banners) === JSON.stringify(initialBanners)) {
      showFeedback('info', 'No hay cambios en banners.');
      return;
    }
    try {
      const entries = Object.entries(banners);
      for (const [key, value] of entries) {
        await saveBanner(key, {
          desktop_image: value.desktop_image,
          mobile_image: value.mobile_image,
        });
      }
      setInitialBanners(banners);
      showFeedback('success', 'Banners guardados');
    } catch (e) {
      console.error('Error guardando banners', e);
      showFeedback('error', 'No se pudieron guardar los banners');
    }
  };

  const handleBannerUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/api/upload.php', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.path) {
        setBlogForm((prev) => ({ ...prev, bannerImage: data.path }));
      } else {
        console.error('Error al subir el banner', data);
      }
    } catch (e) {
      console.error('Error al subir archivo', e);
    } finally {
      setUploading(false);
    }
  };

  const renderBlogs = () => (
    <div className="panel">
      <h2>Blogs</h2>
      <form onSubmit={handleBlogSubmit}>
        <label>Título</label>
        <input value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} required />
        <label>Subtítulo</label>
        <input value={blogForm.subtitle} onChange={(e) => setBlogForm({ ...blogForm, subtitle: e.target.value })} />
        <label>Descripción corta</label>
        <input value={blogForm.description} onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })} />
        <label>Contenido</label>
        <textarea value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} />
        <small className="helper-text">Usa saltos de línea (Enter) para separar párrafos.</small>
        <label>Slug (url)</label>
        <input value={blogForm.slug} onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })} required />
        <label>Fecha</label>
        <input value={blogForm.date} onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })} />
        <label>Autor</label>
        <input value={blogForm.author} onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })} />
        <label>Cargar banner / portada (archivo)</label>
        <input type="file" accept="image/*" onChange={handleBannerUpload} disabled={uploading} />
        {uploading && <small>Subiendo imagen...</small>}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button type="submit">{blogForm.id ? 'Actualizar' : 'Crear'} blog</button>
          {blogForm.id && (
            <button type="button" className="secondary" onClick={resetBlogForm}>
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      <div className="items-list">
        {blogs.map((blog) => (
          <div className="item-card" key={blog.id}>
            <div>
              <h4>{blog.title}</h4>
              <div>{blog.date} · {blog.author}</div>
            </div>
            <div className="actions">
              <button className="secondary" onClick={() => handleBlogEdit(blog)}>Editar</button>
              <button onClick={() => handleBlogDelete(blog.id)}>{confirmDeleteId === blog.id ? 'Confirmar' : 'Eliminar'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLegal = () => {
    const key = sectionKeyToLegal(section);
    const page = legalContent[key];
    return (
      <div className="panel">
        <h2>Legales ({page.title})</h2>
        <label>Título</label><br></br><br></br>
        <input value={page.title} onChange={(e) => handleLegalChange('title', e.target.value)} /><br></br>
        <br></br><label>Introducción</label><br></br><br></br>
        <textarea value={page.intro} onChange={(e) => handleLegalChange('intro', e.target.value)} />
        <small className="helper-text">Usa **texto** para negritas y Enter para saltos de línea.</small>
        {page.sections.map((sectionItem, index) => (
          <div key={index}>
            <br></br><label>Sección {index + 1} - Título</label><br></br><br></br>
            <input
              value={sectionItem.heading}
              onChange={(e) => {
                const newSections = page.sections.slice();
                newSections[index] = { ...sectionItem, heading: e.target.value };
                handleLegalChange('sections', newSections);
              }}
            />
            <br></br><br></br><br></br><label>Sección {index + 1} - Texto</label><br></br><br></br>
            <textarea
              value={sectionItem.text}
              onChange={(e) => {
                const newSections = page.sections.slice();
                newSections[index] = { ...sectionItem, text: e.target.value };
                handleLegalChange('sections', newSections);
              }}
            />
            <small className="helper-text">Usa **texto** para negritas y Enter para saltos de línea.</small>
          </div>
        ))}
        <button onClick={saveLegal}>Guardar legales</button>
      </div>
    );
  };

  const renderContact = () => (
    <div className="panel">
      <h2>Contacto</h2>
      <label>Instagram</label><br></br><br></br>
      <input value={contactData.instagram || ''} onChange={(e) => handleContactChange('instagram', e.target.value)} />
      <br></br><br></br><label>TikTok</label><br></br><br></br>
      <input value={contactData.tiktok || ''} onChange={(e) => handleContactChange('tiktok', e.target.value)} />
      <br></br><br></br><label>LinkedIn</label><br></br><br></br>
      <input value={contactData.linkedin || ''} onChange={(e) => handleContactChange('linkedin', e.target.value)} />
      <br></br><br></br><label>WhatsApp</label><br></br><br></br>
      <input value={contactData.whatsapp || ''} onChange={(e) => handleContactChange('whatsapp', e.target.value)} />
      <br></br><br></br><button onClick={saveContact}>Guardar contacto</button>
    </div>
  );

  const renderBanners = () => (
    <div className="panel">
      <h2>Banners</h2>
      <div className="items-list">
        {Object.entries(banners).map(([key, value]) => (
          <div key={key} className="banner-row">
            <h4>{key}</h4>
            <label>Desktop</label>
            <input
              value={value.desktop_image || ''}
              onChange={(e) => handleBannerFieldChange(key, 'desktop_image', e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              disabled={bannerUploading}
              onChange={(e) => uploadBannerFile(key, 'desktop_image', e.target.files?.[0])}
            />
            <label>Mobile</label>
            <input
              value={value.mobile_image || ''}
              onChange={(e) => handleBannerFieldChange(key, 'mobile_image', e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              disabled={bannerUploading}
              onChange={(e) => uploadBannerFile(key, 'mobile_image', e.target.files?.[0])}
            />
          </div>
        ))}
      </div>
      <button onClick={saveBanners}>Guardar banners</button>
    </div>
  );

  const logout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/login');
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Panel Admin</h1>
        <button className="secondary" onClick={logout}>Salir</button>
      </div>
      {feedback.message && <div className={`feedback ${feedback.type}`}>{feedback.message}</div>}

      <div className="admin-menu">
        <button className={section === 'blogs' ? 'active' : ''} onClick={() => setSection('blogs')}>Blogs</button>
        <button className={section === 'legales-aviso' ? 'active' : ''} onClick={() => setSection('legales-aviso')}>Aviso legal</button>
        <button className={section === 'legales-terminos' ? 'active' : ''} onClick={() => setSection('legales-terminos')}>Términos</button>
        <button className={section === 'legales-privacidad' ? 'active' : ''} onClick={() => setSection('legales-privacidad')}>Privacidad</button>
        <button className={section === 'contacto' ? 'active' : ''} onClick={() => setSection('contacto')}>Contacto</button>
        <button className={section === 'banners' ? 'active' : ''} onClick={() => setSection('banners')}>Banners</button>
      </div>

      {section === 'blogs' && renderBlogs()}
      {section.startsWith('legales') && renderLegal()}
      {section === 'contacto' && renderContact()}
      {section === 'banners' && renderBanners()}
    </div>
  );
};

export default Admin;
