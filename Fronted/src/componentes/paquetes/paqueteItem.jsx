import React from 'react';
import './paquetes.css';

const PaqueteItem = ({ paquete }) => {
    return (
        <div className="paquete-item">
            <img src={paquete.imagen} alt={paquete.nombre} className="paquete-imagen" />
            <div className="paquete-info">
                <h2>{paquete.nombre}</h2>
                <p>{paquete.descripcion}</p>
                <div className="paquete-meta">
                    <span>Duración: {paquete.fecha_inicio} - {paquete.fecha_fin}</span>
                    <span>Precio: ${paquete.precio}</span>
                </div>
            </div>
            <button className="btn-editar">Editar</button>
        </div>
    );
};

export default PaqueteItem;
