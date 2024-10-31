const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && (req.user.role === 'Driver' || req.user.role === role)) {
            next();
        } else {
            res.status(403).json({ erro: 'Acesso negado. Página não autorizada para este tipo de usuário.' });
        }
    };
};

module.exports = checkRole;