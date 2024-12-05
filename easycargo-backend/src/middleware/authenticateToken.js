
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }


    // Verificar e validar o token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err) {

            return res.sendStatus(403).json({ erro: 'Teste' });;
        }
        req.user = user;
        next();
    });
};

module.exports = {
    authenticateToken
};