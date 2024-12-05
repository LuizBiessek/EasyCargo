const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt'); // Caso use hashing de senha

class AuthController {
  // Login do usuário
  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Verifica se o usuário existe
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Verifica a senha (caso esteja hashada)
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Gera o token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new AuthController();
