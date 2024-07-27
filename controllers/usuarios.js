const UsuarioModel = require('../models/usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

class UsuarioController {
    async IniciarSesion(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Email y contraseña son requeridos.');
        }

        try {
            const usuario = await UsuarioModel.obtenerUsuarioPorEmail(email);
            if (!usuario) {
                return res.status(400).send('Email o contraseña incorrectos.');
            }

            // Log para verificar los valores de usuario y usuario.password
            console.log('Usuario encontrado:', usuario);
            console.log('Contraseña del usuario:', usuario.password);

            if (!usuario.password) {
                return res.status(500).send('Error del servidor. La contraseña del usuario no está definida.');
            }

            const esValidaLaContraseña = await bcrypt.compare(password, usuario.password);
            if (!esValidaLaContraseña) {
                return res.status(400).send('Email o contraseña incorrectos.');
            }

            const token = jwt.sign(
                { id: usuario.id, role: usuario.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            return res.status(200).send('Inicio de sesión exitoso.');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error del servidor.');
        }
    }

    
    async Registro(req, res) {
        const { nombre, email, password, role } = req.body;

        if (!nombre || !email || !password || !role) {
            return res.status(400).send('Todos los campos son requeridos.');
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const nuevoUsuario = { nombre, email, password: hashedPassword, role };
            await UsuarioModel.añadirUsuario(nuevoUsuario);
            return res.status(201).send('Usuario registrado exitosamente.');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error del servidor.');
        }
    }

    async ObtenerTodosLosUsuarios(req, res) {
        try {
            const usuarios = await UsuarioModel.obtenerTodosLosUsuarios();
            return res.render('usuarios', { usuarios });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error del servidor.');
        }
    }

    async ObtenerDetallesUsuario(req, res) {
        const { id } = req.params;

        try {
            const usuario = await UsuarioModel.obtenerUsuarioPorId(id);
            if (!usuario) {
                return res.status(404).send('Usuario no encontrado.');
            }

            return res.render('detalleUsuario', { usuario });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error del servidor.');
        }
    }

    async AñadirUsuario(req, res) {
        const { id, nombre, email } = req.body;
        const nuevoUsuario = { id: parseInt(id), nombre, email };
        UsuarioModel.añadirUsuario(nuevoUsuario)
            .then(results => res.status(201).json({ mensaje: 'Se ha añadido el usuario', usuario: nuevoUsuario }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    async EditarUsuario(req, res) {
        const { id } = req.params;
        const { nombre, email } = req.body;
        UsuarioModel.editarUsuario(id, { nombre, email })
            .then(results => res.json({ mensaje: 'Usuario actualizado', usuario: { id, nombre, email } }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    async BorrarUsuario(req, res) {
        const { id } = req.params;
        UsuarioModel.borrarUsuario(id)
            .then(results => res.json({ mensaje: 'Usuario eliminado' }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    async ObtenerDetallesUsuario(req, res) {
        const { id } = req.params;
        UsuarioModel.obtenerDetallesUsuario(id)
            .then(usuario => {
                if (usuario) {
                    res.render('detalleUsuario', { usuario });
                } else {
                    res.status(404).json({ mensaje: 'No se encontró el usuario en la base de datos' });
                }
            })
            .catch(error => res.status(500).json({ error: error.message }));
    }
}

module.exports = new UsuarioController();
