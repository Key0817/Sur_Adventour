import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscarPaquetes } from '../../services/paquetes';
import PaqueteItem from './paqueteItem';
import './paquetes.css';

const Paquetes = () => {
    const [paquetes, setPaquetes] = useState([]);
    const [filtro, setFiltro] = useState('');

    // Fetch inicial de paquetes
    useEffect(() => {
        const fetchPaquetes = async () => {
            try {
                const data = await buscarPaquetes({ nombre: filtro });
                setPaquetes(data);
            } catch (error) {
                console.error('Error al cargar los paquetes:', error);
            }
        };
        fetchPaquetes();
    }, [filtro]);

    // Navegación al formulario de registro
    const navigate = useNavigate();

    const handleNavigateToRegistro = () => {
        navigate('/formularioPaquetes');
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
                <input
                    type="text"
                    placeholder="Busca un paquete..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />

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
                <p>© 2024 Sur Adventour | Términos y condiciones</p>
                <div className="social-icons">
                    <a href="https://www.facebook.com/suradventour">Facebook</a>
                    <a href="https://www.instagram.com/sur_adventour?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">Instagram</a>
                    <a href="#">WhatsApp</a>
                </div>
            </footer>
        </div>
    );
};

export default Paquetes;
