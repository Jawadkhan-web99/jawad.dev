import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const isLiveDisabled = !project.liveLink || project.liveLink === '#';

  return (
    <>
      <div
        className="modal fade show"
        id="projectModal"
        tabIndex="-1"
        aria-labelledby="projectModalLabel"
        aria-modal="true"
        role="dialog"
        style={{ display: 'block', zIndex: 1060 }}
        onClick={(e) => {
          if (e.target.id === 'projectModal') onClose();
        }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content glass-card border-0">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title gradient-text fw-bold" id="projectModalLabel">
                {project.title}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-custom"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pt-2">
              {project.image && (
                <div className="modal-img-wrapper mb-4">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="img-fluid rounded-3 w-100"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="modal-category mb-2">
                <span className="category-badge"># {project.category || 'Project'}</span>
              </div>
              <h4 className="modal-project-title mb-3">{project.title}</h4>
              <p className="modal-description mb-4">{project.description}</p>
              <div className="modal-tech mb-4">
                <h6 className="modal-section-label">
                  <i className="fas fa-code me-2"></i>Technologies Used
                </h6>
                <div className="tech-badges">
                  {project.technologies?.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="modal-actions d-flex flex-wrap gap-3">
                <a
                  href={project.liveLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary-custom"
                  style={isLiveDisabled ? { opacity: 0.5, pointerEvents: 'none' } : {}}
                >
                  <i className="fas fa-external-link-alt me-2"></i>Live Demo
                </a>
                <a
                  href={project.githubLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-custom"
                >
                  <i className="fab fa-github me-2"></i>View Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" style={{ zIndex: 1055 }} onClick={onClose}></div>
    </>
  );
}
