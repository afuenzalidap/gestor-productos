const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { login } = require('../controllers/usuarios');

const router = Router();

router.get('/', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

module.exports = router;