const express = require('express');
const router = express.Router();
const cooperativaController = require('../controllers/cooperativas');
const authenticateToken = require('../middlewares/auth');
const authorizeRole = require('../middlewares/role');

router.get('/', authenticateToken, authorizeRole('Admin'), (req, res) => cooperativaController.ObtenerTodasCooperativas(req, res));
router.get('/resumen', authenticateToken, (req, res) => cooperativaController.ObtenerResumen(req, res));
router.get('/:id', authenticateToken, (req, res) => cooperativaController.ObtenerDetallesCooperativa(req, res));
router.post('/', authenticateToken, authorizeRole('Admin'), (req, res) => cooperativaController.AñadirCooperativa(req, res));
router.post('/:cooperativaId/usuarios/:usuarioId', authenticateToken, authorizeRole('Admin'), (req, res) => cooperativaController.RelacionarUsuarioConCooperativa(req, res));
router.put('/:id', authenticateToken, authorizeRole('Admin'), (req, res) => cooperativaController.EditarCooperativa(req, res));
router.delete('/:id', authenticateToken, authorizeRole('Admin'), (req, res) => cooperativaController.BorrarCooperativa(req, res));
router.delete('/:cooperativaId/usuarios/:usuarioId', authenticateToken, authorizeRole('Admin'), (req, res) => cooperativaController.EliminarUsuarioDeCooperativa(req, res));

module.exports = router;
