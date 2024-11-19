import API from './api';

// Obtener paquetes con filtros
export const buscarPaquetes = async (filtros) => {
    const response = await API.get('/paquetes/search', { params: filtros });
    return response.data;
};

// Crear un paquete
export const crearPaquete = async (paquete) => {
    const response = await API.post('/paquetes', paquete);
    return response.data;
};

// Actualizar un paquete
export const actualizarPaquete = async (id, paquete) => {
    const response = await API.put(`/paquetes/${id}`, paquete);
    return response.data;
};

// Eliminar un paquete
export const eliminarPaquete = async (id) => {
    const response = await API.delete(`/paquetes/${id}`);
    return response.data;
};
