const pool = require('../conexion');

class UsuariosModel {
    static obtenerTodosLosUsuarios() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM usuarios', (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static añadirUsuario(usuario) {
        return new Promise((resolve, reject) => {
            const { nombre, email, contraseña, rol } = usuario;
            const contraseñaCriptada = bcrypt.hashSync(contraseña, 10);
            pool.query('INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)', [nombre, email, contraseñaCriptada, rol], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static autenticarUsuario(usuario, contraseña) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], (error, results) => {
                if (error) {
                    return reject(error);
                }
                if (results.length === 0 || !bcrypt.compareSync(contraseña, results[0].contraseña)) {
                    return reject(new Error('Usuario o contraseña incorrectos'));
                }
                resolve(results[0]);
            });
        });
    }

    static editarUsuario(id, usuario) {
        return new Promise((resolve, reject) => {
            const { nombre, email } = usuario;
            pool.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static borrarUsuario(id) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static obtenerDetallesUsuario(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0]);
            });
        });
    }
}

module.exports = UsuariosModel;
