const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { authenticateToken } = require('./middleware/authenticateToken');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

app.use('/api/auth', authRoutes);
app.use(authenticateToken);

// Rotas da API
app.use('/api/', driversRouter);


Promise.all([connectMySQL()])
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar com o banco de dados:', err);
        process.exit(1);
    });