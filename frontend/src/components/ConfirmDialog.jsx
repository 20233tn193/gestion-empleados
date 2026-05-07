export default function ConfirmDialog({ title, message, onConfirm, onCancel, isLoading }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
          </svg>
        </div>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn btn-ghost" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Eliminando...' : 'Sí, eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}
