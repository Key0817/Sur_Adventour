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
                    <span>Precio: ${paquete.precio}</span>
                    <span>Fecha: {paquete.fecha_inicio} - {paquete.fecha_fin}</span>
                </div>
                <button className="btn-editar">Editar</button>
            </div>
        </div>
    );
};

export default PaqueteItem;
