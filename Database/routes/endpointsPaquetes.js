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
router.put('/:id', upload.single('imagen'), async (req, res) => {
    const { id } = req.params;
    const { codigo, nombre, descripcion, lugar, fecha_inicio, fecha_fin, servicios, precio } = req.body;
    const imagen = req.file ? req.file.buffer : null;

    try {
        
        const serviciosArray = Array.isArray(servicios)
            ? servicios
            : servicios.split(',').map((s) => s.trim());

        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('codigo', sql.NVarChar, codigo)
            .input('nombre', sql.NVarChar, nombre)
            .input('descripcion', sql.NVarChar, descripcion)
            .input('lugar', sql.NVarChar, lugar)
            .input('fecha_inicio', sql.Date, fecha_inicio)
            .input('servicios', sql.NVarChar, serviciosArray.join(','))
            .input('fecha_fin', sql.Date, fecha_fin)
            .input('precio', sql.Decimal(10, 2), precio)
            .input('imagen', sql.VarBinary, imagen) 
            .execute('ActualizarPaquete');

        res.status(200).send('Paquete actualizado con éxito');
    } catch (error) {
        console.error('Error al actualizar el paquete:', error);
        res.status(500).send('Error interno del servidor');
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

        // Construir la consulta base
        let query = `
            SELECT 
                p.id AS paquete_id,
                p.codigo,
                p.nombre,
                p.descripcion,
                p.lugar,
                p.fecha_inicio,
                p.fecha_fin,
                p.precio,
                p.imagen,
                s.nombre AS servicio
            FROM paquetes p
            LEFT JOIN servicios_incluidos s ON p.id = s.paquete_id
            WHERE 1=1
        `;

        // Agregar filtros dinámicamente
        if (codigo) query += ` AND p.codigo = @codigo`;
        if (nombre) query += ` AND p.nombre LIKE @nombre`;
        if (lugar) query += ` AND p.lugar LIKE @lugar`;
        if (fecha_inicio) query += ` AND p.fecha_inicio >= @fecha_inicio`;
        if (fecha_fin) query += ` AND p.fecha_fin <= @fecha_fin`;
        if (precio_min) query += ` AND p.precio >= @precio_min`;
        if (precio_max) query += ` AND p.precio <= @precio_max`;

        const request = pool.request();

        // Agregar los parámetros al request
        if (codigo) request.input('codigo', sql.NVarChar, codigo);
        if (nombre) request.input('nombre', sql.NVarChar, `%${nombre}%`);
        if (lugar) request.input('lugar', sql.NVarChar, `%${lugar}%`);
        if (fecha_inicio) request.input('fecha_inicio', sql.Date, fecha_inicio);
        if (fecha_fin) request.input('fecha_fin', sql.Date, fecha_fin);
        if (precio_min) request.input('precio_min', sql.Decimal(10, 2), precio_min);
        if (precio_max) request.input('precio_max', sql.Decimal(10, 2), precio_max);

        const result = await request.query(query);

        const paquetesMap = new Map();

        result.recordset.forEach((row) => {
            const {
                paquete_id,
                codigo,
                nombre,
                descripcion,
                lugar,
                fecha_inicio,
                fecha_fin,
                precio,
                imagen,
                servicio,
            } = row;

            // Si el paquete aún no está en el Map, agregarlo
            if (!paquetesMap.has(paquete_id)) {
                paquetesMap.set(paquete_id, {
                    id: paquete_id,
                    codigo,
                    nombre,
                    descripcion,
                    lugar,
                    fecha_inicio,
                    fecha_fin,
                    precio,
                    imagen: imagen
                        ? `data:image/jpeg;base64,${Buffer.from(imagen).toString('base64')}`
                        : null,
                    servicios: [],
                });
            }

            // Agregar el servicio si existe
            if (servicio) {
                paquetesMap.get(paquete_id).servicios.push(servicio);
            }
        });

        // Convertir el Map a un array
        const paquetes = Array.from(paquetesMap.values());

        res.json(paquetes);
    } catch (error) {
        console.error('Error al buscar paquetes:', error);
        res.status(500).send('Error interno del servidor');
    }
});


// Obtener un paquete por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();

        // Consulta principal para el paquete
        const paqueteResult = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM paquetes WHERE id = @id');

        if (paqueteResult.recordset.length === 0) {
            return res.status(404).json({ message: 'Paquete no encontrado' });
        }

        const paquete = paqueteResult.recordset[0];

        // Convertir la imagen a base64
        if (paquete.imagen) {
            paquete.imagen = `data:image/jpeg;base64,${Buffer.from(paquete.imagen).toString('base64')}`;
        }

        // Obtener los servicios relacionados
        const serviciosResult = await pool.request()
            .input('paquete_id', sql.Int, id)
            .query('SELECT nombre FROM servicios_incluidos WHERE paquete_id = @paquete_id');

        // Agregar servicios al paquete como un array
        paquete.servicios = serviciosResult.recordset.map(servicio => servicio.nombre);

        res.json(paquete);
    } catch (error) {
        console.error('Error al obtener el paquete:', error);
        res.status(500).send('Error interno del servidor');
    }
});



module.exports = router;
