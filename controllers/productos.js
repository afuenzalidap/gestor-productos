const { response } = require("express");
const { dbQuery } = require("../database/config");
//const { Producto } = require('../models/index');

const obtenerProductos = async (req, res = response) => {

    const {  empresa } = req.params;
    const rows = await dbQuery(`SELECT * FROM Productos where EmpresaId = ${ empresa };`);
    
    res.json({
        productos: rows
    });
}

const obtenerProducto = async (req, res = response) => {
    const { id } = req.params;

    const rows = await dbQuery(`SELECT * FROM Productos WHERE ProductoId = ${ id };`);    
    
    res.json({
        producto: rows
    });
}

const crearProducto = async (req, res = response) => {    
    const { producto, descripcion, precio, empresa } = req.body;        
    const rows = await dbQuery(`INSERT INTO Productos (Producto, Descripcion, Precio, Img, EmpresaId) VALUES ('${producto}', '${descripcion}', ${precio}, '', ${empresa});`);
    
    res.json({
        id: rows.insertId,
        ...req.body
    });
}

const modificarProducto = async (req, res = response) => {
    const { producto, descripcion, precio } = req.body;
    const { id } = req.params;
    
    const rows = await dbQuery(`UPDATE Productos 
    SET Producto = '${producto}', 
    Descripcion = '${descripcion}', 
    Precio = ${precio} 
    WHERE ProductoId = ${ id };`);
    
    res.json({
        id,
        ...req.body
    });
}

const eliminarProducto = async (req, res = response) => {
    const { id } = req.params;
    
    const rows = await dbQuery(`DELETE FROM Productos WHERE ProductoId = ${ id };`);
    
    res.json({
        ok: true,
        msg: 'Producto eliminado'
    });
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    modificarProducto,
    eliminarProducto
}