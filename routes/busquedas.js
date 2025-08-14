/*

ruta: api/todo/:busqueda */

const { Router } = require('express');
const {check } = require('express-validator');
const { getBusquedas,getDocumentosColeccion} = require('../controllers/busquedas');
const router = Router();
const { validarJWT } = require('../midlewares/validar-jwt');

router.get('/:busqueda', validarJWT, getBusquedas);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);

module.exports = router;