import { useEffect, useState } from 'react';

const initialState = {
  nombre: '',
  email: '',
  puesto: '',
  departamento: 'TI',
  salario: '',
  fecha_contratacion: '',
  activo: true,
};

export default function EmpleadoForm({ empleado, departamentos, onSubmit, onCancel, isSaving }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (empleado) {
      setFormData({
        nombre: empleado.nombre || '',
        email: empleado.email || '',
        puesto: empleado.puesto || '',
        departamento: empleado.departamento || 'TI',
        salario: empleado.salario || '',
        fecha_contratacion: empleado.fecha_contratacion || '',
        activo: empleado.activo ?? true,
      });
    } else {
      setFormData(initialState);
    }
    setErrors({});
  }, [empleado]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const validar = () => {
    const errs = {};
    if (!formData.nombre.trim() || formData.nombre.trim().length < 2)
      errs.nombre = 'El nombre debe tener al menos 2 caracteres';
    if (!formData.email.trim()) errs.email = 'El email es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = 'Email inválido';
    if (!formData.puesto.trim()) errs.puesto = 'El puesto es requerido';
    if (!formData.salario || Number(formData.salario) < 0)
      errs.salario = 'Salario debe ser un número positivo';
    if (!formData.fecha_contratacion) errs.fecha_contratacion = 'Fecha requerida';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validar();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({ ...formData, salario: Number(formData.salario) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-body">
        <div className="form-grid">
          <div className="form-group full">
            <label>Nombre completo *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. Juan Manuel Chávez"
              autoFocus
            />
            {errors.nombre && <span className="error">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@empresa.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Puesto *</label>
            <input
              type="text"
              name="puesto"
              value={formData.puesto}
              onChange={handleChange}
              placeholder="Ej. Desarrollador Full-Stack"
            />
            {errors.puesto && <span className="error">{errors.puesto}</span>}
          </div>

          <div className="form-group">
            <label>Departamento *</label>
            <select name="departamento" value={formData.departamento} onChange={handleChange}>
              {departamentos.map((d) => (
                <option key={d.codigo} value={d.codigo}>
                  {d.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Salario (MXN) *</label>
            <input
              type="number"
              name="salario"
              step="0.01"
              min="0"
              value={formData.salario}
              onChange={handleChange}
              placeholder="0.00"
            />
            {errors.salario && <span className="error">{errors.salario}</span>}
          </div>

          <div className="form-group">
            <label>Fecha de contratación *</label>
            <input
              type="date"
              name="fecha_contratacion"
              value={formData.fecha_contratacion}
              onChange={handleChange}
            />
            {errors.fecha_contratacion && (
              <span className="error">{errors.fecha_contratacion}</span>
            )}
          </div>

          <div className="form-group full">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="activo"
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
              />
              <label htmlFor="activo">Empleado activo</label>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={isSaving}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? 'Guardando...' : empleado ? 'Actualizar' : 'Crear empleado'}
        </button>
      </div>
    </form>
  );
}
