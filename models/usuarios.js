const pool = require('../config/db');

class UsuariosModel {
    static async obtenerUsuarioPorEmail(email) {
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        const [rows] = await pool.execute(query, [email]);
        console.log('Resultado de la consulta:', rows); // Añadir log para ver el resultado de la consulta
        return rows[0]; // Asegurarse de retornar el primer resultado
    }



    static async obtenerTodosLosUsuarios() {
        const query = 'SELECT * FROM usuarios';
        const [rows] = await pool.execute(query);
        return rows;
    }

    static async añadirUsuario(usuario) {
        const query = 'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)';
        const { nombre, email, password, role } = usuario;
        await pool.execute(query, [nombre, email, password, role]);
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
