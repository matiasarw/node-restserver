const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();


router.get('/', usuariosGet)
router.put('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(id => existeUsuarioPorId(id)),
    check('rol').custom(rol=>esRoleValido(rol)),
    validarCampos
], usuariosPut)
router.post('/',[
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(correo => emailExiste(correo)),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El pass debe ser mas de 6 letras').isLength({min:6}),
    check('rol').custom(rol=>esRoleValido(rol)),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
], usuariosPost)
router.delete('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(id => existeUsuarioPorId(id)),
    validarCampos
], usuariosDelete)

module.exports = router;