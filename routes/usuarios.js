const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios');
const authenticateToken = require('../middlewares/auth');
const authorizeRole = require('../middlewares/role');

router.post('/login', (req, res) => usuarioController.IniciarSesion(req, res));
router.post('/register', (req, res) => usuarioController.Registro(req, res));

router.get('/', authenticateToken, authorizeRole('Admin'), (req, res) => usuarioController.ObtenerTodosLosUsuarios(req, res));
router.get('/:id', authenticateToken, (req, res) => usuarioController.ObtenerDetallesUsuario(req, res));
router.post('/', authenticateToken, authorizeRole('Admin'), (req, res) => usuarioController.AñadirUsuario(req, res));
router.put('/:id', authenticateToken, authorizeRole('Admin'), (req, res) => usuarioController.EditarUsuario(req, res));
router.delete('/:id', authenticateToken, authorizeRole('Admin'), (req, res) => usuarioController.BorrarUsuario(req, res));

module.exports = router;
