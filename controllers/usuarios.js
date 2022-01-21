const { response } = require("express");
const { dbQuery } = require("../database/config");

const login = async (req, res = response) => {

    const {  usuario, contrasena } = req.body;

    const c = Buffer.from(contrasena).toString('base64');

    const rows = await dbQuery(`SELECT * FROM Usuarios where UsuarioId = '${ usuario }' AND Contrasena = '${ c }';`);
    
    if(rows.length > 0) {
        res.json(rows);
    }else {
        res.status(400).json({
            msg: 'Usuario o contraseña incorrectos'
        });
    }
}

module.exports = {
    login
}