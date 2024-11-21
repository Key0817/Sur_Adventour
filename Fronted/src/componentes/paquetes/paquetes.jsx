import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscarPaquetes } from '../../services/paquetes';
import PaqueteItem from './paqueteItem';
import BusquedaPaquetes from './busquedaPaquetes';
import './paquetes.css';

const Paquetes = () => {
    const [paquetes, setPaquetes] = useState([]);
    const [filtro, setFiltro] = useState('');

    // Fetch inicial de paquetes
    useEffect(() => {
        const fetchPaquetes = async () => {
            try {
                const data = await buscarPaquetes({ nombre: filtro });
                if (!data || data.length === 0) {
                    throw new Error("No se encontraron paquetes");
                }
                setPaquetes(data);
            } catch (error) {
                console.error('Error al cargar los paquetes:', error.message);

            }
        };
        fetchPaquetes();
    }, [filtro]);

    const navigate = useNavigate();

    const handleNavigateToRegistro = () => {
        navigate('/formularioPaquetes');
    };

    const handleBuscarAvanzado = async (filtros) => {
        try {
            const data = await buscarPaquetes(filtros);
            setPaquetes(data);
        } catch (error) {
            console.error('Error al aplicar filtros:', error.message);
        }
    };

    return (
        <div className="paquetes-container">
            {/* Encabezado */}
            <header className="header">
                <div className="logo">
                    <img src="/assets/IMG/Logo.png" alt="Sur Adventour" />
                </div>
                <nav>
                    <a href="/">Inicio</a>
                    <a id="paquetes" href="/paquetes">Paquetes</a>
                </nav>
                <button className="btn-generar-reporte" onClick={handleNavigateToRegistro}>Generar Reporte</button>
            </header>

            <h1>Administración de los paquetes turísticos</h1>

            <div className="acciones">
                <div className="busqueda">
                    <input
                        type="text"
                        placeholder="Busca un paquete..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                    <BusquedaPaquetes onBuscar={handleBuscarAvanzado} />
                </div>
                <button className="btn-registrar" onClick={handleNavigateToRegistro}>
                    Registrar Nuevo Paquete
                </button>
            </div>

            {/* Lista de paquetes */}
            <div className="paquetes-lista">
                {paquetes.map((paquete) => (
                    <PaqueteItem key={paquete.id} paquete={paquete} />
                ))}
            </div>

            {/* Footer */}
            <footer className="footer">
                <div className="social-icons">
                    <h3 className="text-social">Visítanos en nuestras redes</h3>
                    <div className="redes-sociales">
                        <a href="https://www.facebook.com/suradventour"><img className="social-icon" src="/assets/Iconos/Social/facebook.png" alt="facebook-logo" /></a>
                        <a href="https://www.instagram.com/sur_adventour?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                            <img className="social-icon" src="/assets/Iconos/Social/instagram.png" alt="Instagram-logo" />
                        </a>
                        <a href="/"><img className="social-icon" src="/assets/Iconos/Social/whatsapp.png" alt="Twitter-logo" /></a>
                    </div>
                </div>
                <div className="down-footer">
                    <p>© 2024 Sur Adventour | Términos y condiciones</p>
                </div>
            </footer>
        </div>
    );
};

export default Paquetes;
