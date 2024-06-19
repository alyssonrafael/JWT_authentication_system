const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const hashPassword = require('../utils/hashPassword');

const prisma = new PrismaClient();
const secretKey = process.env.SECRET_KEY;

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await hashPassword(password);

  console.log(`Register request: ${JSON.stringify(req.body)}`);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(`Login request: ${JSON.stringify(req.body)}`);

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
      res.json({ token, role: user.role });
    } else {
      console.error('Invalid email or password');
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };
