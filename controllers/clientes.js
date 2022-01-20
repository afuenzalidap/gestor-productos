const { response } = require("express");
const { dbQuery } = require("../database/config");
//const { Producto } = require('../models/index');

const obtenerClientes = async (req, res = response) => {

    const {  empresa } = req.params;
    const rows = await dbQuery(`SELECT * FROM Clientes where EmpresaId = ${ empresa };`);
    
    res.json({
        clientes: rows
    });
}

const obtenerCliente = async (req, res = response) => {
    const { id } = req.params;

    const rows = await dbQuery(`SELECT * FROM Clientes WHERE ClienteId = ${ id };`);    
    
    res.json({
        cliente: rows
    });
}

const crearCliente = async (req, res = response) => {    
    const { nombre, direccion, telefono, email, empresa } = req.body;

    const { insertId } = await dbQuery(`INSERT INTO Clientes (Nombre, Direccion, Telefono, Email, EmpresaId) VALUES ('${nombre}', '${direccion}', '${telefono}', '${ email }','${ empresa }');`);
    
    res.json({
        id: insertId,
        ...req.body
    });
}

const modificarCliente = async (req, res = response) => {
    const { nombre, direccion, telefono, email, empresa } = req.body;
    const { id } = req.params;
    
    const rows = await dbQuery(`UPDATE Clientes 
    SET Nombre = '${ nombre }', 
    Direccion = '${ direccion }', 
    Telefono = '${ telefono }',
    Email = '${ email }',
    EmpresaId = '${ empresa }'   
    WHERE ClienteId = ${ id };`);
    
    res.json({
        id,
        ...req.body
    });
}

const eliminarCliente = async (req, res = response) => {
    const { id } = req.params;
    
    const rows = await dbQuery(`DELETE FROM Clientes WHERE ClienteId = ${ id };`);
    
    res.json({
        ok: true,
        msg: 'Cliente eliminado'
    });
}

module.exports = {
    obtenerClientes,
    obtenerCliente,
    crearCliente,
    modificarCliente,
    eliminarCliente
}