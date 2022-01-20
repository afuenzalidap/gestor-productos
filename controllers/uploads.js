const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );
const { response } = require("express");

const { dbQuery } = require("../database/config");


const actualizarImagenCloudinary = async (req, res = response) => {
    
    const { id } = req.params;

    const rows = await dbQuery(`SELECT Img FROM Productos WHERE ProductoId = ${ id };`);
    
    let Img = rows[0].Img;

    if (Img !== '') {
        cloudinary.uploader.destroy(Img);

        const nombreArr = Img.split('/');
        const nombre = nombreArr[ nombreArr.length - 1 ];

        const [ public_id ] = nombre.split('.');

        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;

    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    Img = secure_url;

    const result = await dbQuery(`UPDATE Productos 
    SET Img = '${Img}' 
    WHERE ProductoId = ${ id };`);

    res.json({ Img } );
}

module.exports = {
    actualizarImagenCloudinary
}