import React, { useState } from 'react';
import { crearPaquete } from '../../services/paquetes';
import { useNavigate } from 'react-router-dom';
import './paquetes.css';

const RegistrarPaquete = () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, imagen: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convertir los servicios en un array si es necesario
        const paqueteData = {
            ...formData,
            servicios: formData.servicios.split(',').map((s) => s.trim()),
        };

        try {
            await crearPaquete(paqueteData);
            setMensaje('¡Paquete creado con éxito!');
            // Reiniciar el formulario
            setFormData({
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
        } catch (error) {
            console.error('Error al registrar el paquete:', error);
            setMensaje('Ocurrió un error al registrar el paquete.');
        }

        navigate('/');
    };

    return (
        <div className="registrar-paquete">
            <h2>Registrar Paquete</h2>
            <form onSubmit={handleSubmit} className="formulario">
                <div>
                    <label>Código Paquete:</label>
                    <input
                        type="text"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleChange}
                        required
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
                <button type="submit">Registrar Nuevo Paquete</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default RegistrarPaquete;