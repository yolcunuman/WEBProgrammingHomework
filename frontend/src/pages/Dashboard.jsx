import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // STATE DEFINITIONS FOR API BINDING
  const [data, setData] = useState({
    quickStats: null,
    activeBoards: [],
    assignedTasks: [],
    upcomingDeadlines: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // SIMULATE API FETCH (To be replaced with Axios)
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // FIXME: Axios request will go here: const response = await axios.get('/api/dashboard');
        
        // Simulating network delay for realistic API mimicry
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockResponse = {
          quickStats: { pending: 12, inProgress: 5, completedThisWeek: 8 },
          activeBoards: [
            { id: 1, name: 'Frontend Yenileme', tasks: 24, progress: 65, color: '#6366F1' },
            { id: 2, name: 'API Entegrasyonu', tasks: 15, progress: 30, color: '#A5B4FC' },
            { id: 3, name: 'Mobil Uygulama MVP', tasks: 42, progress: 85, color: '#10B981' }
          ],
          assignedTasks: [
            { id: 101, title: 'Dashboard UI Kodlaması', board: 'Frontend Yenileme', status: 'In Progress', statusColor: '#FBBF24', deadline: 'Bugün', isUrgent: true },
            { id: 102, title: 'Kullanıcı Yetkilendirme Testleri', board: 'API Entegrasyonu', status: 'Review', statusColor: '#A5B4FC', deadline: 'Yarın', isUrgent: false },
            { id: 103, title: 'Renk Paleti Seçimi', board: 'Frontend Yenileme', status: 'To Do', statusColor: '#9CA3AF', deadline: '3 Gün Sonra', isUrgent: false }
          ],
          upcomingDeadlines: [
            { id: 201, title: 'Sunucu Taşıma İşlemi', date: '29 Nisan 2026', type: 'Kritik', color: '#FCA5A5' },
            { id: 202, title: 'Müşteri Demounu Hazırlama', date: '1 Mayıs 2026', type: 'Önemli', color: '#FCD34D' }
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

  const { quickStats, activeBoards, assignedTasks, upcomingDeadlines } = data;

  return (
    <>
      {/* Container header */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--custom-text)' }}>Genel Bakış</h2>
          <p className="text-muted mb-0">İş süreçlerinize ait son durumu buradan takip edebilirsiniz.</p>
        </div>
      </div>

      {/* 3. İstatistik Paneli (Quick Stats) */}
      <div className="row g-3 mb-5">
        <div className="col-md-4">
          <div className="card p-4 border-0 shadow-sm d-flex flex-row align-items-center justify-content-between h-100">
            <div>
              <p className="text-muted fw-semibold mb-1">Bekleyen İşler</p>
              <h2 className="fw-bold mb-0" style={{ color: '#64748B' }}>{quickStats.pending}</h2>
            </div>
            <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 50, height: 50, backgroundColor: '#F1F5F9', fontSize: 24 }}>⏳</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4 border-0 shadow-sm d-flex flex-row align-items-center justify-content-between h-100">
            <div>
              <p className="text-muted fw-semibold mb-1">Devam Edenler</p>
              <h2 className="fw-bold mb-0" style={{ color: '#F59E0B' }}>{quickStats.inProgress}</h2>
            </div>
            <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 50, height: 50, backgroundColor: '#FEF3C7', fontSize: 24 }}>🚀</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4 border-0 shadow-sm d-flex flex-row align-items-center justify-content-between h-100">
            <div>
              <p className="text-muted fw-semibold mb-1">Bu Hafta Tamamlanan</p>
              <h2 className="fw-bold mb-0" style={{ color: '#10B981' }}>{quickStats.completedThisWeek}</h2>
            </div>
            <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 50, height: 50, backgroundColor: '#D1FAE5', fontSize: 24 }}>✅</div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          
          {/* 1. Aktif Panolar (Active Boards) */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">Aktif Panolar</h4>
            <button className="btn btn-sm btn-primary rounded-pill px-3 shadow-sm">+ Yeni Pano</button>
          </div>
          
          <div className="row g-3 mb-5">
            {activeBoards.map(board => (
              <div key={board.id} className="col-md-6">
                <div className="card p-4 border-0 shadow-sm h-100">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="fw-bold text-truncate mb-0" style={{ maxWidth: '70%', color: 'var(--custom-text)' }}>{board.name}</h5>
                    <span className="badge rounded-pill fw-medium" style={{ backgroundColor: 'var(--custom-bg)', color: 'var(--custom-text)' }}>
                      {board.tasks} Görev
                    </span>
                  </div>
                  
                  <div className="mb-4 mt-2">
                    <div className="d-flex justify-content-between text-muted small mb-1">
                      <span>Tamamlanma</span>
                      <span className="fw-bold">{board.progress}%</span>
                    </div>
                    <div className="progress" style={{ height: '8px', backgroundColor: '#E2E8F0' }}>
                      <div className="progress-bar rounded-pill" role="progressbar" style={{ width: `${board.progress}%`, backgroundColor: board.color }}></div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-2 text-end">
                    <Link to={`/board/${board.id}`} className="btn btn-outline-primary btn-sm rounded-pill px-4 fw-medium">
                      Panoya Git
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Bana Atananlar (Assigned to Me) */}
          <h4 className="fw-bold mb-3">Bana Atananlar</h4>
          <div className="card border-0 shadow-sm overflow-hidden mb-4">
            <ul className="list-group list-group-flush">
              {assignedTasks.map(task => (
                <li key={task.id} className="list-group-item p-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      {task.isUrgent && <span className="badge bg-danger rounded-pill px-2">Acil</span>}
                      <h6 className="fw-bold mb-0" style={{ color: 'var(--custom-text)' }}>{task.title}</h6>
                    </div>
                    <span className="text-muted small">Pano: <strong>{task.board}</strong></span>
                  </div>
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex flex-column align-items-md-end">
                      <span className="badge rounded-pill fw-medium" style={{ backgroundColor: `${task.statusColor}20`, color: task.statusColor === '#FBBF24' ? '#D97706' : task.statusColor }}>
                        {task.status}
                      </span>
                      <small className="text-muted mt-1"><i className="bi bi-clock me-1"></i> {task.deadline}</small>
                    </div>
                    <button className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>👉</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="col-lg-4">
          {/* 4. Yaklaşan Tarihler (Upcoming Deadlines) */}
          <div className="card border-0 shadow-sm p-4 mb-4" style={{ backgroundColor: 'white' }}>
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <span style={{ fontSize: '1.25rem' }}>📅</span> Yaklaşan Tarihler
            </h5>
            
            <div className="d-flex flex-column gap-3">
              {upcomingDeadlines.map(deadline => (
                <div key={deadline.id} className="p-3 rounded-3" style={{ borderLeft: `5px solid ${deadline.color}`, backgroundColor: `${deadline.color}10` }}>
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--custom-text)' }}>{deadline.title}</h6>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="small fw-medium" style={{ color: '#64748B' }}>{deadline.date}</span>
                    <span className="badge rounded-pill bg-white border shadow-sm" style={{ color: deadline.color }}>{deadline.type}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="btn btn-outline-secondary btn-sm w-100 mt-4 rounded-pill fw-medium">
              Tüm Takvimi Gör
            </button>
          </div>
          
          {/* Soft encouragement illustration box */}
          <div className="card border-0 shadow-sm p-4 text-center" style={{ background: 'linear-gradient(135deg, var(--custom-secondary), var(--custom-primary))', color: 'white' }}>
            <div className="mb-3" style={{ fontSize: '3rem' }}>🎯</div>
            <h5 className="fw-bold">Harika Gidiyorsun!</h5>
            <p className="small mb-0" style={{ color: 'rgba(255,255,255,0.9)' }}>Odaklanmaya devam et. Her küçük adım seni hedefe daha da yaklaştırır.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
