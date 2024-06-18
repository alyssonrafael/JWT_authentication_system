import React, { useState } from "react"; //importaçao hook
import axios from "axios"; //axios para requisiçao
import { useNavigate, Link } from "react-router-dom"; //navigate para navegar entre paginas
import { FaArrowLeft } from "react-icons/fa6";
import MensagemCard from "../../components/Message";
import Input from "../../components/Input";

function LoginMobile() {
  // Criação de estados para armazenar o email e senha do usuário.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState({ sucesso: false, texto: "" });
  const [mensagemCount, setMensagemCount] = useState(0);
  // Instanciação do hook useNavigate para permitir a navegação entre as páginas.
  const navigate = useNavigate();

  // Função assíncrona que lida com o evento de submissão do formulário de login.
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário.
    // mensagem para solicitar preenchimento dos campos
    if (password === "" || email === ""){
      setMensagem({ sucesso: false, texto: "" });
      setMensagemCount(mensagemCount + 1);
      setMensagem({
        sucesso: false,
        texto: "Preencha todos os campos",
      });
      return;
    }
    // Redefina a mensagem
    setMensagem({ sucesso: false, texto: "" });
    // Incrementa o contador de mensagens forçando ela a aparecer
    setMensagemCount(mensagemCount + 1);

    try {
      // Realiza uma requisição POST para a API de login com o email e senha.
      const response = await axios.post("http://localhost:3333/api/login", {
        email,
        password,
      });
      // Desestruturação para obter o token e o (role) do usuário da resposta da API.
      const { token, role } = response.data;
      // Armazena o token no localStorage do navegador.
      localStorage.setItem("token", token);
      // Redireciona o usuário para o dashboard de acordo com seu role.
      if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      // mensagem de feedback
      setMensagem({ sucesso: false, texto: "Email ou senha incorretos" });
      setEmail("");
      setPassword("");
      // Caso ocorra um erro na requisição, ele é exibido no console.
      //console.error("Erro ao fazer login:", error);
    }
  };
  return (
    <div className="h-screen bg-primaria text-white flex flex-col">
      {/* Cabeçalho com ícone de volta e título */}
      <div className="py-4 h-1/5">
        <div className="m-4 text-3xl">
          {/* volta para o / que exibe a home do mobile ou login se tiver em telas grandes */}
          <Link to="/" className="text-textod">
            <FaArrowLeft />
          </Link>
        </div>
        <div className="flex justify-between mx-4 ">
          <h2 className="text-5xl font-bold text-textod">LOGIN</h2>
          <img src="/Lock.svg" alt="unDraw image" />
        </div>
      </div>

      {/* Formulário de Login */}
      <div className="flex justify-center h-4/5 bg-secundaria rounded-t-[14px] p-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold my-8">Seja bem-vindo de volta</h1>

          <form onSubmit={handleLogin} className="w-full max-w-sm md:max-w-md">
            <div className="mb-4">
              <label className="block lg:text-xl">Email:</label>
              <Input
                type="email"
                placeholder="Digite seu email"
                value={email}
                className="w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block lg:text-xl">Senha:</label>
              <Input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                className="w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primaria text-textod rounded h-10 font-semibold"
            >
              Login
            </button>
          </form>

          <div className="mt-6 ">
            <p>
              Quer saber mais sobre esse projeto?
              <a
                href="https://github.com/alyssonrafael/JWT_authentication_system"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textow underline pl-1"
              >
                Clique aqui
              </a>
            </p>
            <p className="mt-4 text-sm">
              Você pode testar o login com as seguintes credenciais: <br />
              Email: user@mail.com <br /> Senha: 123456
            </p>
          </div>
        </div>
      </div>
      {/* componente da mensagem de feedback */}
      <MensagemCard
        sucesso={mensagem.sucesso}
        mensagem={mensagem.texto}
        key={mensagemCount}
      />
    </div>
  );
}

export default LoginMobile;
