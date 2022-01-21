const { Router } = require('express');
const { check } = require('express-validator');

const { validarArchivo } = require('../middlewares/validar-archivo');
const { validarCampos } = require('../middlewares/validar-campos');
const { actualizarImagenCloudinary } = require('../controllers/uploads');

const router = Router();

router.put('/:id', [
    validarArchivo,
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos
], actualizarImagenCloudinary);
/* ], actualizarImagen); */


module.exports = router;