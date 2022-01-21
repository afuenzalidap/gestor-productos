const mysql = require('mysql2/promise');

const dbConnection = async() => {
    try {
        //await mongoose.connect(process.env.MONGODB_CNN);
        await mysql.createConnection({
            host: process.env.CNN, 
            user: process.env.USER, 
            password: process.env.PASS,
            port: process.env.MYSQL_PORT,
            database: 'gestionproductos'
        });
        
        console.log('Base de datos online!!');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la base de datos');
    }
}

const dbQuery = async(query, params) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.CNN, 
            user: process.env.USER, 
            password: process.env.PASS,
            port: process.env.MYSQL_PORT,
            database: 'gestionproductos'
        });
        
        const [rows, fields] = await connection.execute(query, params);
        return rows;
    } catch (error) {
        console.log(error);
        throw new Error('Error al ejecutar la consulta');
    }
}

module.exports = {
    dbConnection,
    dbQuery
}