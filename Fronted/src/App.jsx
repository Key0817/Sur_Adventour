import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Paquetes from './componentes/paquetes/paquetes';
import FormularioPaquetes from './componentes/paquetes/formularioPaquetes';
import ModificarPaquetes from './componentes/paquetes/modificarPaquetes'
import './styles/App.css';


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Paquetes />} />
            <Route path="/formularioPaquetes" element={<FormularioPaquetes />} />
            <Route path="/modificarPaquetes/:id" element={<ModificarPaquetes />} />
        </Routes>
    );
};

export default App;

