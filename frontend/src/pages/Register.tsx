import React, { useState } from "react"; //importaçao hook
import axios from "axios"; //axios para requisiçao
import { useNavigate, Link } from "react-router-dom"; //navigate para navegar entre paginas
import Input from "../components/Input";
import MensagemCard from "../components/Message";
import HomeMobile from "./mobile/HomeMobile";
import BannerInicial from "../components/layout/BannerInicial";

//componete funcional de Registro
const Register: React.FC = () => {
  // Criação de estados para armazenar o nome, email e senha do usuário.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mensagem, setMensagem] = useState({ sucesso: false, texto: "" });
  const [mensagemCount, setMensagemCount] = useState(0);
  const navigate = useNavigate();

  // Função assíncrona que lida com o evento de submissão do formulário de registro.
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // mensagem para solicitar preenchimento dos campos
    if (password === "" || confirmPassword === "" || email === "" || name === "") {
      setMensagem({ sucesso: false, texto: "" });
      setMensagemCount(mensagemCount + 1);
      setMensagem({
        sucesso: false,
        texto: "Preencha todos os campos",
      });
      return;
    }
    //tamanho da senha
    if (password.length < 6) {
      setMensagem({
        sucesso: false,
        texto: "A senha deve ter pelo menos 6 caracteres.",
      });
      return;
    }
    // confirmaçao da senha
    if (password !== confirmPassword) {
      setMensagem({ sucesso: false, texto: "" });
      setMensagemCount(mensagemCount + 1);
      setMensagem({
        sucesso: false,
        texto: "As senhas não estão iguais",
      });
      return;
    }

    setMensagem({ sucesso: false, texto: "" });
    setMensagemCount(mensagemCount + 1);

    try {
      await axios.post("https://jwt-authentication-system-back.vercel.app/api/register", {
        name,
        email,
        password,
      });
      // mensagem de sucesso
      setMensagem({
        sucesso: true,
        texto: "Cadastro realizado com sucesso. Você será redirecionado.",
      });
      setTimeout(() => {
        //espera 3 segundos para redirecionar para o login
        navigate("/");
      }, 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        //se o erro do axios for o 409 vindo do backend ele sinaliza o email ja cadastrado
        setMensagem({
          sucesso: false,
          texto:
            "Não foi possível realizar seu cadastro. Por favor, use outro email.",
        });
      } else {
        //se nao ele manda um erro generico
        setMensagem({
          sucesso: false,
          texto:
            "Erro ao realizar cadastro. Por favor, tente novamente mais tarde.",
        });
      }
      //seta os campos como vazios para que o usuario possa preencher novamente
      setEmail("");
      setPassword("");
      setName("");
      console.error("Erro ao registrar:", error);
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
        <BannerInicial
          src="/undraw_login_re_4vu2 1.svg"
          alt="unDraw image"
          className="px-24"
        />
        <div className="w-1/2 bg-secundaria h-full flex flex-col items-center justify-center">
          <div className="w-full px-8 md:px-16 text-textow">
            <h2 className="lg:text-5xl font-bold font-serat">Sign-Up</h2>
            <p className="mt-8 mb-6 lg:text-xl">
              Faça agora mesmo seu cadastro. <br /> Para sua privacidade faça o
              cadastro com dados fictícios.
            </p>
            {/* Formulário de registro */}
            <form
              onSubmit={handleRegister}
              className="w-full max-w-sm md:max-w-md"
            >
              <div className="mb-4">
                <label className="block lg:text-xl">Nome:</label>
                <Input
                  type="text"
                  placeholder="Digite seu Nome"
                  value={name}
                  className="w-full"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
              <div className="mb-4">
                <label className="block lg:text-xl">Senha:</label>
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  className="w-full"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block lg:text-xl">Confirmar Senha:</label>
                <Input
                  type="password"
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  className="w-full"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primaria text-textod lg:px-4 lg:py-3 rounded relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-secundaria group"
              >
                <span className="w-0 h-0 rounded bg-terciaria absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
                <span className="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                  Cadastrar
                </span>
              </button>
            </form>
            {/* Links adicionais */}
            <p className="pt-4 lg:text-xl">
              Já tem cadastro ?
              <Link
                to="/"
                className="text-textod underline pl-3 hover:text-white transition-all duration-300"
              >
                Fazer Login !
              </Link>
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

export default Register;
