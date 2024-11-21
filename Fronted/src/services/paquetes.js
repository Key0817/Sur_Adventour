import API from './api';

// Obtener paquetes con filtros
export const buscarPaquetes = async (filtros) => {
    try {
        const response = await API.get('/search', { params: filtros });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.warn('No se encontraron paquetes:', error.response.data.message);
            return []; // Devuelve una lista vacía al frontend
        }
        console.error('Error al buscar paquetes:', error);
        throw error;
    }
};

// Crear un paquete
export const crearPaquete = async (paquete) => {
    const formData = new FormData();

    // Agregar datos al FormData
    for (const key in paquete) {
        if (key === 'imagen' && paquete.imagen) {
            formData.append(key, paquete.imagen); 
        } else {
            formData.append(key, paquete[key]);
        }
    }

    // Realizar la petición POST
    const response = await API.post('/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    });

    return response.data;
};

// Actualizar un paquete
export const actualizarPaquete = async (id, paqueteData) => {
    const response = await API.put(`/${id}`, paqueteData, {
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    });
    return response.data;
};

// Eliminar un paquete
export const eliminarPaquete = async (id) => {
    const response = await API.delete(`/${id}`); 
    return response.data;
};

// Obtener un paquete por ID
export const buscarPaquetePorId = async (id) => {
    try {
        const response = await API.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el paquete por ID:', error);
        throw error;
    }
};

//Filtrado de paquetes mas especificado
const buscarPaquetes = async (filtros) => {
    try {
        const response = await axios.get('http://localhost:5000/api/paquetes/search', { params: filtros });
        setPaquetes(response.data);
    } catch (error) {
        console.error('Error al buscar paquetes:', error);
    }
};