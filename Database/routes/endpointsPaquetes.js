const express = require('express');
const { getConnection } = require('../db/connection');
const sql = require('mssql');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(), 
});

const router = express.Router();

//Crear un nuevo paquete turistico 
router.post('/', upload.single('imagen'), async (req, res) => {
    const { codigo, nombre, descripcion, lugar, fecha_inicio, fecha_fin, servicios, precio } = req.body;
    const imagen = req.file ? req.file.buffer : null; 

    try {
        // Validar y transformar "servicios" en un string separado por comas
        const serviciosArray = Array.isArray(servicios)
            ? servicios
            : servicios.split(',').map((s) => s.trim());

            console.log('Servicios procesados:', serviciosArray.join(','));

        const pool = await getConnection();
        await pool.request()
            .input('codigo', sql.NVarChar, codigo)
            .input('nombre', sql.NVarChar, nombre)
            .input('descripcion', sql.NVarChar, descripcion)
            .input('lugar', sql.NVarChar, lugar)
            .input('fecha_inicio', sql.Date, fecha_inicio)
            .input('fecha_fin', sql.Date, fecha_fin)
            .input('servicios', sql.NVarChar, serviciosArray.join(',')) 
            .input('precio', sql.Decimal(10, 2), precio)
            .input('imagen', sql.VarBinary, imagen) 
            .execute('CrearPaquete'); 

        res.status(201).send('Paquete creado con éxito');
    } catch (error) {
        console.error('Error al crear el paquete:', error);
        res.status(500).send('Error interno del servidor');
    }
});

//Actualizar un paquete
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { codigo, nombre, descripcion, fecha_inicio, fecha_fin, precio, lugar, imagen, servicios } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('codigo', sql.NVarChar, codigo)
            .input('nombre', sql.NVarChar, nombre)
            .input('descripcion', sql.NVarChar, descripcion)
            .input('fecha_inicio', sql.Date, fecha_inicio)
            .input('fecha_fin', sql.Date, fecha_fin)
            .input('precio', sql.Decimal(10, 2), precio)
            .input('lugar', sql.NVarChar, lugar)
            .input('imagen', sql.VarBinary, imagen)
            .input('servicios', sql.NVarChar, servicios.join(','))
            .execute('ActualizarPaquete');
        res.send('Paquete actualizado con éxito');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrio un error al actualizar el paquete');
    }
});

// Eliminar un paquete
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .execute('EliminarPaquete');
        res.send('Paquete eliminado con éxito');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

//Busqueda de Paquetes 
router.get('/search', async (req, res) => {
    const { codigo, nombre, lugar, fecha_inicio, fecha_fin, precio_min, precio_max } = req.query;

    try {
        const pool = await getConnection();
        let query = `
            SELECT * FROM paquetes
            WHERE 1=1
        `;

        // Agregar filtros dinámicamente solo si hay parámetros
        if (codigo) query += ` AND codigo = @codigo`;
        if (nombre) query += ` AND nombre LIKE @nombre`;
        if (lugar) query += ` AND lugar LIKE @lugar`;
        if (fecha_inicio) query += ` AND fecha_inicio >= @fecha_inicio`;
        if (fecha_fin) query += ` AND fecha_fin <= @fecha_fin`;
        if (precio_min) query += ` AND precio >= @precio_min`;
        if (precio_max) query += ` AND precio <= @precio_max`;

        const request = pool.request();
        if (codigo) request.input('codigo', sql.NVarChar, codigo);
        if (nombre) request.input('nombre', sql.NVarChar, `%${nombre}%`);
        if (lugar) request.input('lugar', sql.NVarChar, `%${lugar}%`);
        if (fecha_inicio) request.input('fecha_inicio', sql.Date, fecha_inicio);
        if (fecha_fin) request.input('fecha_fin', sql.Date, fecha_fin);
        if (precio_min) request.input('precio_min', sql.Decimal(10, 2), precio_min);
        if (precio_max) request.input('precio_max', sql.Decimal(10, 2), precio_max);

        const result = await request.query(query);

        if (!result.recordset.length) {
            return res.status(404).json({ message: 'No se encontraron paquetes con los criterios proporcionados' });
        }

        // Traer las imagenes de la base de datos (se encuentran en formato binario)
        const paquetes = result.recordset.map(paquete => ({
            ...paquete,
            imagen: paquete.imagen ? `data:image/jpeg;base64,${paquete.imagen.toString('base64')}` : null,
        }));

        res.json(paquetes);
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error interno del servidor');
    }
});


module.exports = router;