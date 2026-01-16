/*

ruta: api/todo/:busqueda */

const { Router } = require('express');
const {check } = require('express-validator');
const { getBusquedas,getDocumentosColeccion} = require('../controllers/busquedas');
const router = Router();
const { validarJWT } = require('../midlewares/validar-jwt');

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);
router.get('/:busqueda', validarJWT, getBusquedas);

module.exports = router;