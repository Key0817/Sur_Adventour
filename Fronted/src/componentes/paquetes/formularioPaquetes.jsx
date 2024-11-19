import React, { useState } from 'react';
import { crearPaquete, actualizarPaquete } from '../../services/paquetes';

const FormularioPaquete = ({ paqueteExistente, onSuccess }) => {
    const [formulario, setFormulario] = useState(
        paqueteExistente || {
            nombre: '',
            descripcion: '',
            fecha_inicio: '',
            fecha_fin: '',
            precio: '',
            imagen: '',
        }
    );

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        try {
            if (paqueteExistente) {
                await actualizarPaquete(paqueteExistente.id, formulario);
            } else {
                await crearPaquete(formulario);
            }
            onSuccess();
        } catch (error) {
            console.error('Error al guardar el paquete:', error);
        }
    };

    return (
        <form onSubmit={manejarEnvio} className="form-paquete">
            <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                placeholder="Nombre del paquete"
                required
            />
            <textarea
                name="descripcion"
                value={formulario.descripcion}
                onChange={manejarCambio}
                placeholder="Descripción"
                required
            />
            <input
                type="date"
                name="fecha_inicio"
                value={formulario.fecha_inicio}
                onChange={manejarCambio}
                required
            />
            <input
                type="date"
                name="fecha_fin"
                value={formulario.fecha_fin}
                onChange={manejarCambio}
                required
            />
            <input
                type="number"
                name="precio"
                value={formulario.precio}
                onChange={manejarCambio}
                placeholder="Precio"
                required
            />
            <input
                type="text"
                name="imagen"
                value={formulario.imagen}
                onChange={manejarCambio}
                placeholder="URL de la imagen"
            />
            <button type="submit">Guardar</button>
        </form>
    );
};

export default FormularioPaquete;
