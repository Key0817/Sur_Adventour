import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Paquetes from './componentes/paquetes/paquetes';
import FormularioPaquetes from './componentes/paquetes/formularioPaquetes';
import './styles/App.css';


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Paquetes />} />
            <Route path="/formularioPaquetes" element={<FormularioPaquetes />} />
        </Routes>
    );
};

export default App;

