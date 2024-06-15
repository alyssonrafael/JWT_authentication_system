const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();//criando para poder interagir

const checkDuplicateEmail = async (req, res, next) => { //extrai o email da requisição
  const { email } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({//procurra se ja existe o email dentro do banco
      where: {
        email,
      },
    });

    if (existingUser) {//se existir retorna o erro
      return res.status(409).json({ error: 'Este email já está cadastrado.' });
    }

    next(); // Chama o próximo middleware (neste caso, a função de registro)
  } catch (error) {//tratamento de erro para erro interno
    console.error('Erro ao verificar email :', error);
    res.status(500).json({ error: 'Erro ao verificar email. Por favor, tente novamente mais tarde.' });
  }
};

module.exports = checkDuplicateEmail;
