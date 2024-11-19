import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/index.css';
import Paquetes from './componentes/paquetes/paquetes';
import PaqueteItem from './componentes/paquetes/paqueteItem';
import FormularioPaquete from './componentes/paquetes/formularioPaquetes';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <p>beinvenido a la pagina web de sur adventour</p>
    {/* <Paquetes />
    <PaqueteItem />
    <FormularioPaquete /> */}
  </div>
);

