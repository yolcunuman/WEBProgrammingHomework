import React from 'react';

const statusConfig = {
  todo:        { label: 'Yapılacak',     bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0' },
  in_progress: { label: 'Devam Ediyor',  bg: '#eff6ff', color: '#3b82f6', border: '#bfdbfe' },
  done:        { label: 'Tamamlandı',     bg: '#f0fdf4', color: '#22c55e', border: '#bbf7d0' },
};

const TaskCard = ({ task, onStatusChange, onEdit, onDelete }) => {
  const cfg = statusConfig[task.status] || statusConfig.todo;

  return (
    <div
      className="card mb-2 border-0 shadow-sm"
      style={{
        borderRadius: '12px',
        borderLeft: `4px solid ${cfg.color}`,
        cursor: 'grab',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
      }}
    >
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="fw-semibold mb-0" style={{ color: 'var(--custom-text)', fontSize: '14px' }}>
            {task.title}
          </h6>
          {/* Aksiyon butonları */}
          <div className="dropdown">
            <button
              className="btn btn-sm p-0 border-0 bg-transparent"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ lineHeight: 1 }}
            >
              ⋮
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm" style={{ fontSize: '13px' }}>
              <li>
                <button className="dropdown-item" onClick={() => onEdit && onEdit(task)}>
                  ✏️ Düzenle
                </button>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item text-danger" onClick={() => onDelete && onDelete(task.id)}>
                  🗑️ Sil
                </button>
              </li>
            </ul>
          </div>
        </div>

        {task.description && (
          <p className="text-muted mb-2" style={{ fontSize: '12px', lineHeight: '1.5' }}>
            {task.description.length > 80 ? task.description.substring(0, 80) + '...' : task.description}
          </p>
        )}

        <div className="d-flex justify-content-between align-items-center">
          {/* Statü rozeti */}
          <span
            className="badge rounded-pill fw-medium"
            style={{
              backgroundColor: cfg.bg,
              color: cfg.color,
              border: `1px solid ${cfg.border}`,
              fontSize: '11px',
              padding: '4px 10px',
            }}
          >
            {cfg.label}
          </span>

          {/* Atanan kişi */}
          {task.assigned_username && (
            <span className="text-muted" style={{ fontSize: '11px' }}>
              👤 {task.assigned_username}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
