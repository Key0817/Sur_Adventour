import React, { useState, useRef, useEffect } from 'react';
import { eliminarPaquete } from '../../services/paquetes';
import { useNavigate } from 'react-router-dom';
import './paquetes.css';

const PaqueteItem = ({ paquete }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Alternar visibilidad del menú desplegable
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
    const handleClickOutside = (event) => {
        
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuVisible(false);
        }
    };
    useEffect(() => {
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Función para manejar la navegación a la página de edición
    const handleEditar = () => {
        navigate(`/modificarPaquetes/${paquete.id}`, { state: { paquete } });
    };

    // Función para eliminar un paquete
    const handleEliminar = async () => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar este paquete:${paquete.nombre}?`, 'Eliminar Paquete')) {

        }
        try {
            await eliminarPaquete(paquete.id);
            alert('Paquete eliminado con éxito.');
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar el paquete:', error);
            alert('Ocurrió un error al intentar eliminar el paquete.');
        }
    }
    // Funcion para formatear la menra en la que se muestra la fecha
    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES');
    };

    return (
        <div className="paquete-item">
            {paquete.imagen ? (
               <img src={paquete.imagen || '/assets/placeholder.png'} alt={paquete.nombre} className="paquete-imagen" />

            ) : (
                <div className="imagen-placeholder">Imagen no disponible</div>
            )}
            <div className="paquete-info">
                <h2>{paquete.nombre}</h2>
                <p className='paquete-descripcion'>{paquete.descripcion}</p>
                <div className="paquete-meta">
                    <p>Disponible apartir del: <span>{formatFecha(paquete.fecha_inicio)}</span> hasta el <span>{formatFecha(paquete.fecha_fin)}</span></p>
                    <p>Precio: <span>${paquete.precio}</span></p>
                </div>
            </div>
            <div className="menu-container">
                <button className="btn-editar" onClick={toggleMenu}>Editar</button>
                {menuVisible && (
                    <div className="dropdown-menu">
                        <button className="dropdown-item modificar flex-container" onClick={handleEditar}>
                            Modificar
                            <img src="/assets/Iconos/Paquetes/editar.png" alt="icono de edicion" />
                        </button>
                        <button className="dropdown-item eliminar flex-container" onClick={handleEliminar}>
                            Eliminar
                            <img src="/assets/Iconos/Paquetes/basura.png" alt="icono de eliminar" />
                        </button>
                    </div>
                )}
            </div>
        </div>

    )
};



export default PaqueteItem;
