const express = require('express');
const cors = require('cors');
const path = require('path');
const endPoints = require('./routes/endpointsPaquetes'); 



const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 

//servir estaticamente la carpeta donde estara el fronted
app.use(express.static(path.join(__dirname, '../Fronted')))

// Registrar los endpoints
app.use('/api/paquetes', endPoints);

// Ruta base para renderizar
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../Fronted', 'index.html'));
// });

app.get('/', (req, res) => {
    res.send('Bienvenido al servidor de Sur Adventour...');
});

// Iniciar el servidor
const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
