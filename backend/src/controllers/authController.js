const { PrismaClient } = require('@prisma/client'); //orm para interaçao com o banco de dados
const jwt = require('jsonwebtoken'); //gerar tokens jwt
const bcrypt = require('bcrypt'); //emcriptografar senhas
const hashPassword = require('../utils/hashPassword'); //funçao auxiliar para encriptografar
//instanciaçao para interagir com o banco de dados
const prisma = new PrismaClient();
//chave secreta para assinar o jwt esta armazenada no .env
const secretKey = process.env.SECRET_KEY;

//funçao para registrar novo usuarios
const register = async (req, res) =>{
    //pegando os valores do corpo da requisiçao
    const { name, email, password, role } = req.body;
    //encriptaçao da senha
    const hashedPassword = await hashPassword(password)
    try {
        //criaçao de novo usuario no banco usando prisma
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword, // Armazenamento da senha encriptada
                role
            }
        });//mensagens de status
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};
// Função assíncrona para realizar login de um usuário
const login = async (req, res) => {
    // Extração do email e senha do corpo da requisição
    const { email, password } = req.body;
    try {
        // Busca por um usuário único no banco de dados pelo email
        const user = await prisma.user.findUnique({ where: {email} });
         // Verificação se o usuário existe e se a senha está correta
        if (user && await bcrypt.compare(password, user.password)) {
            // Geração do token JWT com o ID do usuário e seu papel, válido por 1 hora
            const token = jwt.sign({userId: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
            // Resposta com o token gerado
            res.json({ token })
        } else {
            //resposta sse as credenciais estiverem incorretas
            res.status(401).json({ error:'invalid email or password' });
        }
    } catch (error) {
        //outro tipo de erro
        res.status(400).json({ error: error.message })
    }
}
// Exportação das funções de registro e login para serem utilizadas em outras partes da aplicação
module.exports = {register, login}