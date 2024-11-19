import React, { useEffect, useState } from 'react';
import { buscarPaquetes } from '../../services/paquetes'; 
import PaqueteItem from './paqueteItem';
import './paquetes.css';

const Paquetes = () => {
    const [paquetes, setPaquetes] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        const fetchPaquetes = async () => {
            try {
                const data = await buscarPaquetes({ nombre: filtro });
                setPaquetes(data);
            } catch (error) {
                console.error('Error al obtener paquetes:', error);
            }
        };
        fetchPaquetes();
    }, [filtro]);

    return (
        <div className="paquetes-container">
            <h1>Administración de los paquetes turísticos</h1>
            <div className="paquetes-actions">
                <input
                    type="text"
                    placeholder="Busca un paquete..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
                <button className="btn-registrar">Registrar Nuevo Paquete</button>
            </div>
            <div className="paquetes-lista">
                {paquetes.map((paquete) => (
                    <PaqueteItem key={paquete.id} paquete={paquete} />
                ))}
            </div>
        </div>
    );
};

export default Paquetes;
