import axios from 'axios';

const API_KEY_PAQUETES = 'http://localhost:3000/api/paquetes';

// Obtener paquetes con filtros
export const buscarPaquetes = async (filtros) => {
    try {
        const response = await axios.get(`${API_KEY_PAQUETES}/search`, { params: filtros });
        return response.data;
    } catch (error) {
        console.error('Error al buscar paquetes:', error);
        throw error;
    }
};

// Crear un paquete
export const crearPaquete = async (paquete) => {
    try {
        const response = await axios.post(API_KEY_PAQUETES, paquete);
        return response.data;
    } catch (error) {
        console.error('Error al crear paquete:', error);
        throw error;
    }
};

// Modificar un paquete
export const actualizarPaquete = async (id, paquete) => {
    try {
        const response = await axios.put(`${API_KEY_PAQUETES}/${id}`, paquete);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar paquete:', error);
        throw error;
    }
};

// Eliminar un paquete
export const eliminarPaquete = async (id) => {
    try {
        const response = await axios.delete(`${API_KEY_PAQUETES}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar paquete:', error);
        throw error;
    }
};
