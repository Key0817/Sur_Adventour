import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buscarPaquetePorId, actualizarPaquete } from '../../services/paquetes';

const ModificarPaquete = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        descripcion: '',
        lugar: '',
        fecha_inicio: '',
        fecha_fin: '',
        servicios: '',
        precio: '',
        imagen: null,
    });

    const [mensaje, setMensaje] = useState('');

    // Cargar los datos del paquete
    useEffect(() => {
        const fetchPaquete = async () => {
            try {
                const paquete = await buscarPaquetePorId(id);

                setFormData({
                    ...paquete,
                    servicios: paquete.servicios.join(', '),
                });
            } catch (error) {
                console.error('Error al cargar el paquete:', error);
                setMensaje('No se pudo cargar el paquete.');
            }
        };

        fetchPaquete();
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        console.log('Imagen seleccionada:', e.target.files[0]);
        setFormData({ ...formData, imagen: e.target.files[0] });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const paqueteData = {
            ...formData,
            servicios: formData.servicios.split(',').map((s) => s.trim()),
        };
    
        try {
            const formDataObject = new FormData();
            for (const key in paqueteData) {
                if (key === 'imagen' && formData.imagen) {
                    formDataObject.append(key, formData.imagen);
                } else {
                    formDataObject.append(key, paqueteData[key]);
                }
            }
    
            await actualizarPaquete(id, formDataObject); 
            setMensaje('¡Paquete actualizado con éxito!');
            navigate('/');
        } catch (error) {
            console.error('Error al actualizar el paquete:', error);
            setMensaje('Ocurrió un error al actualizar el paquete.');
        }
    };

    return (
        <div className="registrar-paquete">
            <h2>Editar Paquete</h2>
            <form onSubmit={handleSubmit} className="formulario">
                <div>
                    <label>Código Paquete:</label>
                    <input
                        type="text"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Lugar:</label>
                    <input
                        type="text"
                        name="lugar"
                        value={formData.lugar}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Fecha Inicio:</label>
                    <input
                        type="date"
                        name="fecha_inicio"
                        value={formData.fecha_inicio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Fecha Fin:</label>
                    <input
                        type="date"
                        name="fecha_fin"
                        value={formData.fecha_fin}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Servicios (separados por coma):</label>
                    <input
                        type="text"
                        name="servicios"
                        value={formData.servicios}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input
                        type="number"
                        step="0.01"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <button type="submit">Actualizar Paquete</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default ModificarPaquete;
