const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.set('view engine', 'ejs');

const indexRouter = require('./routes/index');
const usuariosRouter = require('./routes/usuarios');
const cuentasRouter = require('./routes/cuentas');
const cooperativasRouter = require('./routes/cooperativas');

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/cuentas', cuentasRouter);
app.use('/cooperativas', cooperativasRouter);

app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto http://localhost:${port}`);
});
