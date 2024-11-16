const sql = require('mssql');

/*Configuracion de conexion*/ 
const dbSettings = {      
    user: 'keylor_admin',                    
    password: '1231231234',
    server: '127.0.0.1',
    database: 'sur_adventour',
    port: 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

/*Funcion que nos mantiene la conexion de la base de datos activa*/ 
async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getConnection};

