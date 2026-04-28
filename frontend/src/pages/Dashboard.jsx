import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // STATE DEFINITIONS FOR API BINDING & UI TOGGLES
  const [data, setData] = useState({
    activeProjects: [],
    assignedTasks: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI States
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState('');

  // SIMULATE API FETCH (To be replaced with Axios)
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // FIXME: Axios request will go here: const response = await axios.get('/api/dashboard');
        await new Promise(resolve => setTimeout(resolve, 600));

        const mockResponse = {
          activeProjects: [
            { id: 1, name: 'Bitirme Projesi', role: 'Yönetici', coverColor: '#6366F1' },
            { id: 2, name: 'Web Programlama', role: 'Üye', coverColor: '#A5B4FC' },
            { id: 3, name: 'Freelance İş', role: 'Yönetici', coverColor: '#FCA5A5' },
            { id: 4, name: 'Mobil Uygulama', role: 'Üye', coverColor: '#10B981' }
          ],
          assignedTasks: [
            { id: 101, title: 'Dashboard UI Kodlaması', board: 'Web Programlama', status: 'In Progress', statusColor: '#FBBF24', deadline: 'Bugün', isUrgent: true },
            { id: 102, title: 'Kullanıcı Yetkilendirme Testleri', board: 'Bitirme Projesi', status: 'Review', statusColor: '#A5B4FC', deadline: 'Yarın', isUrgent: false },
            { id: 103, title: 'Renk Paleti Seçimi', board: 'Freelance İş', status: 'To Do', statusColor: '#9CA3AF', deadline: '3 Gün Sonra', isUrgent: false }
          ]
        };

        setData(mockResponse);
      } catch (err) {
        setError('Veriler yüklenirken hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

  const { activeProjects, assignedTasks } = data;

  const filteredProjects = activeProjects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="container-fluid px-0 h-100 d-flex flex-column">
      
      {/* 1. Projeler Bölümü */}
      <div className="mb-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 pb-2 border-bottom">
          <h3 className="fw-normal mb-3 mb-md-0 d-flex align-items-center gap-2" style={{ color: 'var(--custom-text)', letterSpacing: '-0.5px' }}>
            Projeler
          </h3>
          
          <div className="d-flex flex-wrap align-items-center gap-3">
            {/* Search Bar */}
            <div className="position-relative">
              <input 
                type="text" 
                className="form-control form-control-sm rounded-pill px-3 shadow-none" 
                placeholder="Proje ara veya katıl..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '220px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}
              />
              <span className="position-absolute" style={{ right: 12, top: 5, color: '#94a3b8', fontSize: '14px' }}>🔍</span>
            </div>

            {/* View Toggles */}
            <div className="btn-group shadow-sm bg-white rounded-pill p-1" role="group" style={{ border: '1px solid #e2e8f0' }}>
              <button 
                type="button" 
                className={`btn btn-sm rounded-pill px-3 fw-medium border-0 ${viewMode === 'grid' ? 'btn-primary' : 'btn-light text-muted'}`}
                onClick={() => setViewMode('grid')}
                style={{ background: viewMode === 'grid' ? 'var(--custom-primary)' : 'transparent' }}
              >
                Grid
              </button>
              <button 
                type="button" 
                className={`btn btn-sm rounded-pill px-3 fw-medium border-0 ${viewMode === 'list' ? 'btn-primary' : 'btn-light text-muted'}`}
                onClick={() => setViewMode('list')}
                style={{ background: viewMode === 'list' ? 'var(--custom-primary)' : 'transparent' }}
              >
                Liste
              </button>
            </div>

            {/* Action Buttons mimicking the wireframe */}
            <div className="d-flex gap-2">
              <button className="btn fw-medium shadow-sm" style={{ backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', color: '#495057', padding: '6px 20px' }}>
                Oluştur
              </button>
              <button className="btn fw-medium shadow-sm" style={{ backgroundColor: '#F8F9FA', border: '1px solid #DEE2E6', color: '#495057', padding: '6px 20px' }}>
                Katıl
              </button>
            </div>
          </div>
        </div>

        {/* Projects Render Area */}
        <div className="mt-4">
          {viewMode === 'grid' ? (
            <div className="d-flex flex-wrap gap-4">
              {filteredProjects.map((project) => (
                <Link to={`/board/${project.id}`} key={project.id} className="text-decoration-none">
                  {/* IMDB Poster Style Card */}
                  <div 
                    className="card border-0 shadow-sm card-hover-modern overflow-hidden" 
                    style={{ width: '160px', height: '240px', borderRadius: '12px', backgroundColor: '#F8FAFC' }}
                  >
                    <div 
                      className="w-100 placeholder-glow d-flex align-items-center justify-content-center" 
                      style={{ height: '70%', background: `linear-gradient(135deg, ${project.coverColor}80, ${project.coverColor})` }}
                    >
                      <span style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.7)' }}>📁</span>
                    </div>
                    <div className="p-3 d-flex flex-column justify-content-between flex-grow-1 bg-white">
                      <h6 className="fw-semibold text-truncate mb-0" style={{ color: 'var(--custom-text)', fontSize: '14px' }}>
                        {project.name}
                      </h6>
                      <small className="text-muted" style={{ fontSize: '12px' }}>{project.role}</small>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="d-flex flex-column gap-2">
              {filteredProjects.map((project) => (
                <Link to={`/board/${project.id}`} key={project.id} className="text-decoration-none">
                  <div className="card border-0 shadow-sm px-4 py-3 bg-white card-hover-modern d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded" style={{ width: '40px', height: '40px', backgroundColor: project.coverColor }}></div>
                      <h6 className="fw-semibold mb-0" style={{ color: 'var(--custom-text)' }}>{project.name}</h6>
                    </div>
                    <span className="badge bg-light text-muted border">{project.role}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {filteredProjects.length === 0 && (
            <div className="text-center text-muted py-5">
              Arama kriterlerine uygun proje bulunamadı.
            </div>
          )}
        </div>
      </div>

      {/* 2. Görevlerim Bölümü */}
      <div>
        <div className="mb-3 pb-2 border-bottom">
          <h3 className="fw-normal mb-0" style={{ color: 'var(--custom-text)', letterSpacing: '-0.5px' }}>
            Görevlerim
          </h3>
        </div>
        
        <div className="mt-3">
          <ul className="list-group list-group-flush bg-transparent">
            {assignedTasks.map(task => (
              <li key={task.id} className="list-group-item bg-transparent px-0 py-3 border-bottom d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    {task.isUrgent && <span className="badge bg-danger rounded-pill px-2" style={{ fontSize: '11px', fontWeight: '500' }}>Acil</span>}
                    <h6 className="fw-bold mb-0" style={{ color: '#475569' }}>{task.title}</h6>
                  </div>
                  <span className="text-muted small">Pano: <strong>{task.board}</strong></span>
                </div>
                
                <div className="d-flex align-items-center justify-content-end gap-5" style={{ minWidth: '150px' }}>
                  <div className="d-flex flex-column align-items-end text-end">
                    <span className="badge rounded-pill fw-medium mb-1" style={{ backgroundColor: `${task.statusColor}20`, color: task.statusColor === '#FBBF24' ? '#D97706' : task.statusColor, fontSize: '11px' }}>
                      {task.status}
                    </span>
                    <small className="text-muted ps-2" style={{ fontSize: '12px' }}>{task.deadline}</small>
                  </div>
                  <button className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: 32, height: 32, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>👉</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
