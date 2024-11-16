const express = require('express');
const { getConnection } = require('../db/connection');
const sql = require('mssql');

const router = express.Router();

//Crear un nuevo paquete turistico 
router.post('/paquetes', async (req,res) => {
    const {codigo, nombre, descripcion, fecha_inicio, fecha_fin, precio, lugar, imagen, servicios} = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
        .input('codigo', sql.NVarChar, codigo)
        .input('nombre', sql.NVarChar, nombre)
        .input('descripcion', sql.NVarChar, descripcion)
        .input('fecha_inicio', sql.Date, fecha_inicio)
        .input('fecha_fin', sql.Date, fecha_fin)
        .input('precio', sql.Decimal(10, 2), precio)
        .input('lugar', sql.NVarChar, lugar)
        .input('imagen', sql.VarBinary, imagen)
        .input('servicios', sql.NVarChar, servicios.join(','))
        .execute('CrearPaquete');
    res.status(201).send('Paquete creado con éxito');
    } catch (error) {
        console.error(error);
        res.status(500).send('ocurrio un error en la creacion del paquete');
    }
});

//Actualizar un paquete
router.put('/paquetes/:id', async (req, res) => {
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
router.delete('/paquetes/:id', async (req, res) => {
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
router.get('/paquetes/search', async (req, res) => {
    const { codigo, nombre, lugar, fecha_inicio, fecha_fin, precio_min, precio_max } = req.query;

    try {
        const pool = await getConnection();
        let query = `
            SELECT * FROM paquetes
            WHERE 1=1
        `;

        // Agregar filtros dinámicamente
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
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send('El paquete que deseas buscar no existe');
    }
});

module.exports = router;