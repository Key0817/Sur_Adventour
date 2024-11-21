import React, { useState } from 'react';
import './paquetes';

const BusquedaPaquetes = ({ onBuscar }) => {
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtrosAvanzados, setFiltrosAvanzados] = useState({
        lugar: '',
        fecha_inicio: '',
        fecha_fin: '',
        precio_min: '',
        precio_max: '',

    });
    const [menuVisible, setMenuVisible] = useState(false);

    // Manejar cambios en filtros avanzados
    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltrosAvanzados({ ...filtrosAvanzados, [name]: value });
    };

    // Buscar paquetes
    const handleBuscar = () => {
        const filtros = {
            nombre: filtroNombre,
            ...filtrosAvanzados,
        };
        onBuscar(filtros); 
    };

    return (
        <div className="busqueda-container">
            <div className="barra-busqueda">
                <button className="btn-filtros" onClick={() => setMenuVisible(!menuVisible)}>
                    Filtros
                </button>
            </div>

            {menuVisible && (
                <div className="menu-filtros">
                    <div>
                        <label>Lugar:</label>
                        <input
                            type="text"
                            name="lugar"
                            value={filtrosAvanzados.lugar}
                            onChange={handleFiltroChange}
                        />
                    </div>
                    <div>
                        <label>Fecha Inicio:</label>
                        <input
                            type="date"
                            name="fechaInicio"
                            value={filtrosAvanzados.fechaInicio}
                            onChange={handleFiltroChange}
                        />
                    </div>
                    <div>
                        <label>Fecha Fin:</label>
                        <input
                            type="date"
                            name="fechaFin"
                            value={filtrosAvanzados.fechaFin}
                            onChange={handleFiltroChange}
                        />
                    </div>
                    <div>
                        <label>Precio Mínimo:</label>
                        <input
                            type="number"
                            name="precioMin"
                            value={filtrosAvanzados.precioMin}
                            onChange={handleFiltroChange}
                        />
                    </div>
                    <div>
                        <label>Precio Máximo:</label>
                        <input
                            type="number"
                            name="precioMax"
                            value={filtrosAvanzados.precioMax}
                            onChange={handleFiltroChange}
                        />
                    </div>
                    <button onClick={handleBuscar}>Aplicar Filtros</button>
                </div>
            )}
        </div>
    );
};

export default BusquedaPaquetes;
