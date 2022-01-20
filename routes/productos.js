const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { obtenerProductos, crearProducto, modificarProducto, obtenerProducto, eliminarProducto } = require('../controllers/productos');

const router = Router();

router.get('/:empresa', [
    check('empresa', 'La empresa es obligatoria').not().isEmpty()
], obtenerProductos);
router.get('/:id', obtenerProducto);
router.post('/',[
    check('producto').not().isEmpty(),
    check('descripcion').not().isEmpty(),
    check('precio').not().isEmpty(),
    check('empresa').not().isEmpty(),
    validarCampos
], crearProducto);
router.put('/:id', modificarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;