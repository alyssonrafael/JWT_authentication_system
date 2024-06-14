// Importa o módulo express para criar o servidor / Importa o módulo cors para habilitar CORS
const express = require('express');
const cors = require('cors');
// Carrega variáveis de ambiente
require('dotenv').config();
// Cria uma instância da aplicação express
const app = express();
// Usa o middleware : cors para permitir requisições de outros domínios/ express.json() para fazer o parse de JSON no corpo das requisições
app.use(cors());
app.use(express.json());

// Define a porta em que o servidor vai rodar, usando a variável de ambiente PORT ou 3333 por padrão
const PORT = process.env.PORT || 3333;
// Inicia o servidor e escuta na porta definida, imprimindo uma mensagem no console
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
