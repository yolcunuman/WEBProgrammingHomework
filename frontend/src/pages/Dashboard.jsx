import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI States
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Yeni proje oluşturma state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [createError, setCreateError] = useState(null);

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // API'den projeleri çek
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (err) {
        setError('Projeler yüklenirken hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Yeni proje oluştur
  const handleCreateProject = async (e) => {
    e.preventDefault();
    setCreateError(null);

    if (!newProjectName.trim()) {
      setCreateError('Proje adı boş bırakılamaz.');
      return;
    }

    try {
      const res = await api.post('/projects', {
        name: newProjectName.trim(),
        description: newProjectDesc.trim(),
      });

      // Projeyi listeye ekle (optimistic)
      const newProject = {
        id: res.data.projectId,
        name: newProjectName.trim(),
        description: newProjectDesc.trim(),
        created_at: new Date().toISOString(),
      };
      setProjects((prev) => [newProject, ...prev]);
      setNewProjectName('');
      setNewProjectDesc('');
      setShowCreateForm(false);
      showToast('Proje oluşturuldu!');
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Proje oluşturulamadı.');
    }
  };

  // Proje sil
  const handleDeleteProject = async (projectId) => {
    const oldProjects = [...projects];
    setProjects((prev) => prev.filter((p) => p.id !== projectId));

    try {
      await api.delete(`/projects/${projectId}`);
      showToast('Proje silindi.');
    } catch (err) {
      setProjects(oldProjects);
      showToast('Proje silinemedi.', 'danger');
    }
  };

  // Renk paleti (projelere sırayla renk atar)
  const colors = ['#6366F1', '#A5B4FC', '#FCA5A5', '#10B981', '#F59E0B', '#EC4899'];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid px-0 h-100 d-flex flex-column">

      {/* Toast Bildirimi */}
      {toast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <div
            className={`alert alert-${toast.type} alert-dismissible shadow-lg border-0 fade show`}
            role="alert"
            style={{ borderRadius: '12px', fontSize: '14px', minWidth: '250px' }}
          >
            {toast.type === 'success' ? '✅' : '⚠️'} {toast.message}
          </div>
        </div>
      )}

      {/* 1. Projeler Bölümü */}
      <div className="mb-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 pb-2 border-bottom">
          <h3
            className="fw-normal mb-3 mb-md-0 d-flex align-items-center gap-2"
            style={{ color: 'var(--custom-text)', letterSpacing: '-0.5px' }}
          >
            Projeler
          </h3>

          <div className="d-flex flex-wrap align-items-center gap-3">
            {/* Search Bar */}
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-control-sm rounded-pill px-3 shadow-none"
                placeholder="Proje ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '220px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}
              />
              <span className="position-absolute" style={{ right: 12, top: 5, color: '#94a3b8', fontSize: '14px' }}>
                🔍
              </span>
            </div>

            {/* View Toggles */}
            <div
              className="btn-group shadow-sm bg-white rounded-pill p-1"
              role="group"
              style={{ border: '1px solid #e2e8f0' }}
            >
              <button
                type="button"
                className={`btn btn-sm rounded-pill px-3 fw-medium border-0 ${
                  viewMode === 'grid' ? 'text-white' : 'btn-light text-muted'
                }`}
                onClick={() => setViewMode('grid')}
                style={{ background: viewMode === 'grid' ? 'var(--custom-primary)' : 'transparent' }}
              >
                Grid
              </button>
              <button
                type="button"
                className={`btn btn-sm rounded-pill px-3 fw-medium border-0 ${
                  viewMode === 'list' ? 'text-white' : 'btn-light text-muted'
                }`}
                onClick={() => setViewMode('list')}
                style={{ background: viewMode === 'list' ? 'var(--custom-primary)' : 'transparent' }}
              >
                Liste
              </button>
            </div>

            {/* Oluştur Butonu */}
            <button
              className="btn btn-primary fw-medium shadow-sm"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              ➕ Oluştur
            </button>
          </div>
        </div>

        {/* Yeni Proje Formu (inline) */}
        {showCreateForm && (
          <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: '12px' }}>
            <form onSubmit={handleCreateProject}>
              <h6 className="fw-bold mb-3" style={{ color: 'var(--custom-text)' }}>
                Yeni Proje Oluştur
              </h6>
              {createError && (
                <div className="alert alert-danger py-2" style={{ fontSize: '13px' }}>
                  {createError}
                </div>
              )}
              <div className="row g-3">
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Proje adı"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Açıklama (opsiyonel)"
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                  />
                </div>
                <div className="col-md-2 d-flex gap-2">
                  <button type="submit" className="btn btn-primary flex-grow-1">
                    Kaydet
                  </button>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setShowCreateForm(false)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Projects Render Area */}
        <div className="mt-4">
          {viewMode === 'grid' ? (
            <div className="d-flex flex-wrap gap-4">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className="position-relative">
                  <Link to={`/board/${project.id}`} className="text-decoration-none">
                    <div
                      className="card border-0 shadow-sm overflow-hidden"
                      style={{
                        width: '160px',
                        height: '240px',
                        borderRadius: '12px',
                        backgroundColor: '#F8FAFC',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                      }}
                    >
                      <div
                        className="w-100 d-flex align-items-center justify-content-center"
                        style={{
                          height: '70%',
                          background: `linear-gradient(135deg, ${colors[index % colors.length]}80, ${colors[index % colors.length]})`,
                        }}
                      >
                        <span style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.7)' }}>📁</span>
                      </div>
                      <div className="p-3 d-flex flex-column justify-content-between flex-grow-1 bg-white">
                        <h6
                          className="fw-semibold text-truncate mb-0"
                          style={{ color: 'var(--custom-text)', fontSize: '14px' }}
                        >
                          {project.name}
                        </h6>
                        <small className="text-muted" style={{ fontSize: '12px' }}>
                          Yönetici
                        </small>
                      </div>
                    </div>
                  </Link>
                  {/* Sil butonu */}
                  <button
                    className="btn btn-sm position-absolute shadow-sm"
                    style={{
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      width: 28,
                      height: 28,
                      padding: 0,
                      lineHeight: '28px',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteProject(project.id);
                    }}
                    title="Projeyi Sil"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="d-flex flex-column gap-2">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className="d-flex align-items-center gap-2">
                  <Link to={`/board/${project.id}`} className="text-decoration-none flex-grow-1">
                    <div className="card border-0 shadow-sm px-4 py-3 bg-white d-flex flex-row align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded"
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: colors[index % colors.length],
                          }}
                        />
                        <div>
                          <h6 className="fw-semibold mb-0" style={{ color: 'var(--custom-text)' }}>
                            {project.name}
                          </h6>
                          {project.description && (
                            <small className="text-muted">{project.description}</small>
                          )}
                        </div>
                      </div>
                      <span className="badge bg-light text-muted border">Yönetici</span>
                    </div>
                  </Link>
                  <button
                    className="btn btn-light btn-sm"
                    onClick={() => handleDeleteProject(project.id)}
                    title="Sil"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
          {filteredProjects.length === 0 && !loading && (
            <div className="text-center text-muted py-5">
              {searchQuery
                ? 'Arama kriterlerine uygun proje bulunamadı.'
                : 'Henüz projeniz yok. İlk projenizi oluşturun!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
