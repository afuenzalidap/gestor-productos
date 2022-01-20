const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { obtenerClientes, crearCliente, modificarCliente, obtenerCliente, eliminarCliente } = require('../controllers/clientes');

const router = Router();

router.get('/:empresa', [
    check('empresa', 'La empresa es obligatoria').not().isEmpty()
], obtenerClientes);

router.get('/:id', obtenerCliente);

router.post('/',[
    check('nombre').not().isEmpty(),
    check('direccion').not().isEmpty(),
    check('telefono').not().isEmpty(),
    check('email').not().isEmpty(),
    check('email').isEmail(),
    check('empresa').not().isEmpty(),
    validarCampos
], crearCliente);

router.put('/:id', [

],modificarCliente);

router.delete('/:id', eliminarCliente);

module.exports = router;