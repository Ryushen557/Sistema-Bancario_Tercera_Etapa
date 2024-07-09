var express = require('express');
var router = express.Router();
var cuentasController = require('../controllers/cuentas');

router.post('/prestamos', (req, res) => cuentasController.AñadirCuentaPrestamo(req, res));
router.post('/ahorros', (req, res) => cuentasController.AñadirCuentaAhorro(req, res));

router.put('/prestamos/:id', (req, res) => cuentasController.EditarCuentaPrestamo(req, res));
router.put('/ahorros/:id', (req, res) => cuentasController.EditarCuentaAhorro(req, res));

router.delete('/prestamos/:id', (req, res) => cuentasController.EliminarCuentaPrestamo(req, res));
router.delete('/ahorros/:id', (req, res) => cuentasController.EliminarCuentaAhorro(req, res));

router.get('/prestamos/:cuentaId/proximafecha', cuentasController.MostrarProximaFechaPago);

router.get('/usuarios/:usuarioId/cuentas', cuentasController.MostrarCuentasUsuario);

router.get('/resumen/cuentas', cuentasController.MostrarResumenCuentas);
module.exports = router;
