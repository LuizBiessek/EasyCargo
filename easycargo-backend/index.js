const express = require('express');
const cors = require('cors');
const { authenticateToken } = require('./src/middleware/authenticateToken'); // Middleware para autenticação
const { sequelize } = require('./src/models'); // Sequelize e modelos
require('dotenv').config();

// Importação de rotas
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const driverRoutes = require('./src/routes/driver.routes');
const companyRoutes = require('./src/routes/company.routes');
const vehicleRoutes = require('./src/routes/vehicle.routes');
const loadingLocationRoutes = require('./src/routes/loadingLocation.routes');
const freightOfferRoutes = require('./src/routes/freightOffer.routes');
const freightRequestRoutes = require('./src/routes/freightRequest.routes');
const driverFreightRoutes = require('./src/routes/driverFreight.routes');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares globais
app.use(express.json());
app.use(cors());

// Middleware para logs
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware para autenticação JWT
app.use(authenticateToken);

// Rotas públicas
app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

// Rotas protegidas da API
app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/loading-locations', loadingLocationRoutes);
app.use('/api/freight-offers', freightOfferRoutes);
app.use('/api/freight-requests', freightRequestRoutes);
app.use('/api/driver-freights', driverFreightRoutes);

// Middleware para erros globais
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// Sincronização do banco e inicialização do servidor
Promise.all([
    sequelize.sync({ alter: true }), // Use alter:true para ajustar o banco sem perder dados
])
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar com o banco de dados:', err);
        process.exit(1);
    });
