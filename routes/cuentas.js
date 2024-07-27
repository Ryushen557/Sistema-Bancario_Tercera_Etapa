const express = require('express');
const router = express.Router();
const cuentasController = require('../controllers/cuentas');
const authenticateToken = require('../middlewares/auth');

router.post('/prestamos', authenticateToken, (req, res) => cuentasController.AñadirCuentaPrestamo(req, res));
router.post('/ahorros', authenticateToken, (req, res) => cuentasController.AñadirCuentaAhorro(req, res));
router.put('/prestamos/:id', authenticateToken, (req, res) => cuentasController.EditarCuentaPrestamo(req, res));
router.put('/ahorros/:id', authenticateToken, (req, res) => cuentasController.EditarCuentaAhorro(req, res));
router.delete('/prestamos/:id', authenticateToken, (req, res) => cuentasController.EliminarCuentaPrestamo(req, res));
router.delete('/ahorros/:id', authenticateToken, (req, res) => cuentasController.EliminarCuentaAhorro(req, res));
router.get('/prestamos/:cuentaId/proximafecha', authenticateToken, (req, res) => cuentasController.MostrarProximaFechaPago(req, res));
router.get('/usuarios/:usuarioId/cuentas', authenticateToken, (req, res) => cuentasController.MostrarCuentasUsuario(req, res));
router.get('/resumen/cuentas', authenticateToken, (req, res) => cuentasController.MostrarResumenCuentas(req, res));

module.exports = router;
