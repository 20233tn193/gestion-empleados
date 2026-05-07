import { useEffect, useMemo, useState } from 'react';
import { empleadosApi } from './api/empleadosApi';
import EmpleadosTable from './components/EmpleadosTable';
import EmpleadoForm from './components/EmpleadoForm';
import Modal from './components/Modal';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';
import './App.css';

const DEPS_FALLBACK = [
  { codigo: 'TI', nombre: 'Tecnologías de la Información' },
  { codigo: 'RH', nombre: 'Recursos Humanos' },
  { codigo: 'VEN', nombre: 'Ventas' },
  { codigo: 'MKT', nombre: 'Marketing' },
  { codigo: 'FIN', nombre: 'Finanzas' },
  { codigo: 'OPE', nombre: 'Operaciones' },
];

export default function App() {
  const [empleados, setEmpleados] = useState([]);
  const [departamentos, setDepartamentos] = useState(DEPS_FALLBACK);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [empleadoEdit, setEmpleadoEdit] = useState(null);
  const [empleadoDelete, setEmpleadoDelete] = useState(null);
  const [toast, setToast] = useState(null);

  const cargarEmpleados = async (q = '') => {
    setLoading(true);
    try {
      const data = await empleadosApi.listar(q);
      setEmpleados(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error(err);
      mostrarToast('No se pudo conectar con el servidor', 'error');
    } finally {
      setLoading(false);
    }
  };

  const cargarDepartamentos = async () => {
    try {
      const data = await empleadosApi.departamentos();
      if (Array.isArray(data) && data.length) setDepartamentos(data);
    } catch {
      // usa fallback
    }
  };

  useEffect(() => {
    cargarDepartamentos();
    cargarEmpleados();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => cargarEmpleados(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const mostrarToast = (mensaje, tipo = 'success') => {
    setToast({ mensaje, tipo });
  };

  const abrirNuevo = () => {
    setEmpleadoEdit(null);
    setModalOpen(true);
  };

  const abrirEditar = (emp) => {
    setEmpleadoEdit(emp);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setEmpleadoEdit(null);
  };

  const guardar = async (datos) => {
    setIsSaving(true);
    try {
      if (empleadoEdit) {
        await empleadosApi.actualizar(empleadoEdit.id, datos);
        mostrarToast('Empleado actualizado correctamente');
      } else {
        await empleadosApi.crear(datos);
        mostrarToast('Empleado creado correctamente');
      }
      cerrarModal();
      cargarEmpleados(search);
    } catch (err) {
      const data = err.response?.data;
      const msg = data?.email?.[0] || data?.detail || 'Error al guardar';
      mostrarToast(msg, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmarEliminar = async () => {
    setIsDeleting(true);
    try {
      await empleadosApi.eliminar(empleadoDelete.id);
      mostrarToast('Empleado eliminado');
      setEmpleadoDelete(null);
      cargarEmpleados(search);
    } catch (err) {
      console.error(err);
      mostrarToast('Error al eliminar', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const stats = useMemo(() => {
    const total = empleados.length;
    const activos = empleados.filter((e) => e.activo).length;
    const nominaTotal = empleados.reduce((s, e) => s + Number(e.salario || 0), 0);
    return { total, activos, inactivos: total - activos, nominaTotal };
  }, [empleados]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistema de Gestión de Empleados</h1>
        <p>CRUD completo con React + Vite, Django REST Framework y MySQL</p>
      </header>

      <div className="main-card">
        <div className="toolbar">
          <div className="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre, email o puesto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={abrirNuevo}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Nuevo empleado
          </button>
        </div>

        <div className="stats-bar">
          <div className="stat">Total: <strong>{stats.total}</strong></div>
          <div className="stat">Activos: <strong>{stats.activos}</strong></div>
          <div className="stat">Inactivos: <strong>{stats.inactivos}</strong></div>
          <div className="stat" style={{ marginLeft: 'auto' }}>
            Nómina total: <strong>
              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(stats.nominaTotal)}
            </strong>
          </div>
        </div>

        {loading ? (
          <div className="loader"><div className="spinner" /></div>
        ) : (
          <EmpleadosTable
            empleados={empleados}
            onEdit={abrirEditar}
            onDelete={setEmpleadoDelete}
          />
        )}
      </div>

      <footer className="app-footer">
        <p>Proyecto de Desarrollo Web · UTEZ · 9° Cuatrimestre</p>
      </footer>

      {modalOpen && (
        <Modal
          title={empleadoEdit ? 'Editar empleado' : 'Nuevo empleado'}
          onClose={cerrarModal}
        >
          <EmpleadoForm
            empleado={empleadoEdit}
            departamentos={departamentos}
            onSubmit={guardar}
            onCancel={cerrarModal}
            isSaving={isSaving}
          />
        </Modal>
      )}

      {empleadoDelete && (
        <ConfirmDialog
          title="¿Eliminar empleado?"
          message={`Esta acción eliminará permanentemente a ${empleadoDelete.nombre}. No se puede deshacer.`}
          onConfirm={confirmarEliminar}
          onCancel={() => setEmpleadoDelete(null)}
          isLoading={isDeleting}
        />
      )}

      {toast && (
        <div className="toast-container">
          <Toast message={toast.mensaje} type={toast.tipo} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
}
