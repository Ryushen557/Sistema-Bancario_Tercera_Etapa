var express = require('express');
var router = express.Router();
var cooperativaController = require('../controllers/cooperativas');

router.get('/', (req, res) => cooperativaController.ObtenerTodasCooperativas(req, res));
router.get('/resumen', (req, res) => cooperativaController.ObtenerResumen(req, res));
router.get('/:id', (req, res) => cooperativaController.ObtenerDetallesCooperativa(req, res));

router.post('/', (req, res) => cooperativaController.AñadirCooperativa(req, res));
router.post('/:cooperativaId/usuarios/:usuarioId', (req, res) => cooperativaController.RelacionarUsuarioConCooperativa(req, res));

router.put('/:id', (req, res) => cooperativaController.EditarCooperativa(req, res));

router.delete('/:id', (req, res) => cooperativaController.BorrarCooperativa(req, res));
router.delete('/:cooperativaId/usuarios/:usuarioId', (req, res) => cooperativaController.EliminarUsuarioDeCooperativa(req, res));

module.exports = router;