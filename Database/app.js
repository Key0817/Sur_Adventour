const express = require('express');
const cors = require('cors');
const path = require('path');
const endPoints = require('./routes/endpointsPaquetes'); 



const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Registrar los endpoints
app.use('/api/paquetes', endPoints);

app.get('/', (req, res) => {
    res.send('Bienvenido al servidor de Sur Adventour...');
});

// Iniciar el servidor
const PORT = 5000; 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
