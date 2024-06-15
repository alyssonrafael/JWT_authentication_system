import React, { useState } from "react"; //importaçao hook
import axios from "axios"; //axios para requisiçao
import { useNavigate, Link } from "react-router-dom"; //navigate para navegar entre paginas
import Input from "../components/Input";
import MensagemCard from "../components/Message";
import HomeMobile from "./mobile/HomeMobile";
import BannerInicial from "../components/layout/BannerInicial";

//componete funcional de login
const Login: React.FC = () => {
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
      // Caso ocorra um erro na requisição, exibir mensagem de erro para o usuário
      setMensagem({ sucesso: false, texto: "Email ou senha incorretos" });
      setEmail("");
      setPassword("");
      // Caso ocorra um erro na requisição, ele é exibido no console.
      //console.error("Erro ao fazer login:", error);
    }
  };
  // Renderização do formulário de login com campos para email e senha.
  return (
    <div className="bg-primaria h-screen overflow-hidden">
      {/* Seção para renderizar o componente HomeMobile em dispositivos pequenos */}
      <div className="block lg:hidden w-full h-full">
        <HomeMobile />
      </div>
      {/* Seção para renderizar conteúdo para telas maiores */}
      <div className="hidden lg:flex lg:h-full items-center justify-center">
        {/*componente banner da imagem com o layout */}
        <BannerInicial
          src="/undraw_login_re_4vu2 1.svg"
          alt="unDraw image"
          className="px-24"
        />
        
        <div className="w-1/2 bg-secundaria h-full flex flex-col items-center justify-center">
          <div className="w-full px-8 md:px-16 text-textow">
            <h2 className="lg:text-5xl font-bold font-serat">LOGIN</h2>
            <p className="mt-8 mb-6 lg:text-xl">Faça agora mesmo seu login.</p>
            {/* Formulário de login */}
            <form
              onSubmit={handleLogin}
              className="w-full max-w-sm md:max-w-md"
            >
              <div className="mb-4">
                <label className="block lg:text-xl">Email:</label>
                <Input
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  className="w-full"
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
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
                  required={true}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primaria text-textod lg:px-4 lg:py-3 rounded relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-secundaria group"
              >
                <span className="w-0 h-0 rounded bg-terciaria absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
                <span className="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                  Login
                </span>
              </button>
            </form>
            {/* Links adicionais */}
            <p className="pt-4 lg:text-xl">
              É novo por aqui?
              <Link
                to="/register"
                className="text-textod underline pl-3 hover:text-white transition-all duration-300"
              >
                Cadastre-se agora.
              </Link>
            </p>

            <p className="mt-4 lg:text-xl">
              Quer saber mais sobre esse projeto?
              <a
                href="https://github.com/alyssonrafael/JWT_authentication_system"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textod underline pl-3 hover:text-white transition-all duration-300"
              >
                Clique aqui.
              </a>
            </p>
            <p className="mt-4">
              Você pode testar o login com as seguintes credenciais <br />
              Email: user@mail.com <br /> Senha: 123456
            </p>
          </div>
        </div>
      </div>
      {/* Componente MensagemCard para exibir mensagens de feedback */}
      <MensagemCard
        sucesso={mensagem.sucesso}
        mensagem={mensagem.texto}
        key={mensagemCount}
      />
    </div>
  );
};

export default Login;
