const formatoMoneda = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

const formatoFecha = (fecha) => {
  if (!fecha) return '-';
  const d = new Date(fecha);
  return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
};

export default function EmpleadosTable({ empleados, onEdit, onDelete }) {
  if (!empleados.length) {
    return (
      <div className="empty-state">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="1.5" style={{ margin: '0 auto 1rem', opacity: 0.4 }}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <line x1="20" y1="8" x2="20" y2="14"></line>
          <line x1="23" y1="11" x2="17" y2="11"></line>
        </svg>
        <h3>No hay empleados registrados</h3>
        <p>Comienza agregando tu primer empleado con el botón "Nuevo empleado".</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Puesto</th>
            <th>Departamento</th>
            <th>Salario</th>
            <th>Contratación</th>
            <th>Estado</th>
            <th style={{ textAlign: 'right' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp.id}>
              <td><strong>{emp.nombre}</strong></td>
              <td>{emp.email}</td>
              <td>{emp.puesto}</td>
              <td><span className="badge badge-dept">{emp.departamento_nombre}</span></td>
              <td>{formatoMoneda.format(emp.salario)}</td>
              <td>{formatoFecha(emp.fecha_contratacion)}</td>
              <td>
                <span className={`badge ${emp.activo ? 'badge-active' : 'badge-inactive'}`}>
                  {emp.activo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>
                <div className="actions-cell">
                  <button
                    className="btn-icon edit"
                    onClick={() => onEdit(emp)}
                    aria-label="Editar"
                    title="Editar empleado"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button
                    className="btn-icon delete"
                    onClick={() => onDelete(emp)}
                    aria-label="Eliminar"
                    title="Eliminar empleado"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
