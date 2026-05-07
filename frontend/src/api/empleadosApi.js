import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const empleadosApi = {
  listar: async (search = '') => {
    const params = search ? { search } : {};
    const { data } = await api.get('/empleados/', { params });
    return data;
  },

  obtener: async (id) => {
    const { data } = await api.get(`/empleados/${id}/`);
    return data;
  },

  crear: async (empleado) => {
    const { data } = await api.post('/empleados/', empleado);
    return data;
  },

  actualizar: async (id, empleado) => {
    const { data } = await api.put(`/empleados/${id}/`, empleado);
    return data;
  },

  eliminar: async (id) => {
    await api.delete(`/empleados/${id}/`);
    return id;
  },

  departamentos: async () => {
    const { data } = await api.get('/empleados/departamentos/');
    return data;
  },
};

export default api;
