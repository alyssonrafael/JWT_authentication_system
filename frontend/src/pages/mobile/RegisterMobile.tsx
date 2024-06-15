import React, { useState } from "react"; //importaçao hook
import axios from "axios"; //axios para requisiçao
import { useNavigate, Link } from "react-router-dom"; //navigate para navegar entre paginas
import { FaArrowLeft } from "react-icons/fa6";
import MensagemCard from "../../components/Message";
import Input from "../../components/Input";

function RegisterMobile() {
  // Criação de estados para armazenar o nomr, email e senha do usuário.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState({ sucesso: false, texto: "" });
  const [mensagemCount, setMensagemCount] = useState(0);
  // Instanciação do hook useNavigate para permitir a navegação entre as páginas.
  const navigate = useNavigate();

  // Função assíncrona que lida com o evento de submissão do formulário de registro.
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // forçando mensagem a ser exibida
    setMensagem({ sucesso: false, texto: "" });
    setMensagemCount(mensagemCount + 1);

    try {
      await axios.post("http://localhost:3333/api/register", {
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
        navigate("/login-mobile");
      }, 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        //se o erro do axios for o 409 vindo do backend ele sinaliza o email ja cadastrado
        setMensagem({
          sucesso: false,
          texto:
            "Não foi possivel realizar seu cadastro. Por favor, use outro email.",
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
        <div className="flex justify-between mx-4 mt-8">
          <h2 className="text-5xl font-bold text-textod">Sing-up</h2>
          <img src="/Lock.svg" alt="unDraw image" className="" />
        </div>
      </div>

      {/* Formulário de registro */}
      <div className="flex flex-col h-4/5 bg-secundaria rounded-t-[14px] p-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mt-8">
            Faça agora mesmo seu cadastro
          </h1>
          <p className="mb-8">
            Para sua privacidade faça o cadastro com dados ficticios.{" "}
          </p>

          <form
            onSubmit={handleRegister}
            className="w-full max-w-sm md:max-w-md"
          >
            <div className="mb-4">
              <label className="block lg:text-xl">Nome:</label>
              <Input
                type="text"
                placeholder="Digite seu nome"
                value={name}
                className="w-full"
                onChange={(e) => setName(e.target.value)}
                required={true}
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
              className="w-full bg-primaria text-textod rounded h-10 font-semibold"
            >
              Login
            </button>
          </form>
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

export default RegisterMobile;
