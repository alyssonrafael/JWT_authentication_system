import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Technologies from "../components/Technologies";
import UserDropdown from "../components/UserDropdown";

function UserDashboard() {
  return (
    <div className="bg-gradient-to-r to-primaria from-secundaria min-h-screen px-6 md:px-10 lg:px-[15%] py-12">
      <div className="grid grid-cols-12 gap-4 text-textow">
        {/* User dropdown para telas pequenas */}
        <div className="col-start-9 col-span-4 md:col-end-13 md:col-span-2 block md:hidden">
          <UserDropdown />
        </div>

        {/* mensagem de bem vindo */}
        <div className="col-span-12 md:col-span-9 space-y-4 text-center mb-8">
          <h1 className="text-5xl font-bold text-center">
            Sucesso!! Você foi autenticado.
          </h1>
          <p className="text-base md:text-xl">
            Agora você pode saber mais como esse projeto foi moldado, quais
            tecnologias usadas e curiosidades sobre autenticação de usuários em
            um sistema.
          </p>
        </div>

        {/* User dropdown para telas medias e grandes */}
        <div className="col-span-12 md:col-end-13 md:col-span-2 hidden md:block">
          <UserDropdown />
        </div>

        {/* section explicando oque e o JWT */}
        <div className="col-span-12 md:col-span-12 flex flex-col md:flex-row items-center space-y-4 md:space-x-8 md:space-y-0">
          <section className="col-span-12 md:col-span-6">
            <h2 className="text-3xl text-center mb-4">
              Como funciona a autenticação por meio do JWT (JSON Web Token)
            </h2>
            {/* Imagem para telas pequenas */}
            <div className="col-span-12 md:col-span-6 md:hidden justify-center items-center flex">
              <img src="/undraw_hello_re_3evm (1) 1.svg" alt="undraw.img" />
            </div>
            <ol className="list-decimal pl-6 text-lg p-6">
              <li>Login: O usuário envia suas credenciais (usuário e senha) ao servidor.</li>
              <li>Verificação: O servidor verifica as credenciais. Se válidas, gera um token JWT.</li>
              <li>Token JWT: Este token contém informações do usuário (payload), uma assinatura e é enviado de volta ao cliente.</li>
              <li>Armazenamento: O cliente armazena o token (geralmente no localStorage ou cookies).</li>
              <li>Acesso a Recursos: Para acessar recursos protegidos, o cliente envia o token no cabeçalho da solicitação.</li>
              <li>Validação do Token: O servidor valida o token, verifica a assinatura e as informações contidas nele.</li>
              <li>Autorização: Se o token for válido, o servidor responde com os recursos solicitados.</li>
              <li>Expiração: O token possui um tempo de expiração, após o qual o usuário precisa fazer login novamente para obter um novo token.</li>
            </ol>
          </section>
          {/* Image para telas medias e grandes */}
          <div className="col-span-12 md:col-span-6 md:flex justify-center items-center min-h-72 min-w-72 hidden">
            <img src="/undraw_hello_re_3evm (1) 1.svg" alt="undraw.img" />
          </div>
        </div>

        {/* Seçao explicando as funcionalidades */}
        <div className="col-span-12 md:col-span-12 flex flex-col md:flex-row items-center space-y-4 md:space-x-8 md:space-y-0">
          {/* Image para telas medias e grandes */}
          <div className="col-span-12 md:col-span-6 md:flex justify-center items-center min-h-72 min-w-72 hidden">
            <img src="/undraw_product_teardown_re_m1pc 1.svg" alt="undraw.img" />
          </div>
          <section className="col-span-12 md:col-span-6">
            <h2 className="text-3xl text-center mb-4">Funcionalidades</h2>
            {/* Image para telass pequenas*/}
            <div className="col-span-12 md:col-span-6 md:hidden justify-center items-center min-h-72 min-w-72 flex">
              <img src="/undraw_product_teardown_re_m1pc 1.svg" alt="undraw.img" />
            </div>
            <ol className="list-decimal pl-6 text-lg p-6">
              <li>
                <span className="font-bold">Registro de Usuário</span>
                <ul className="list-disc pl-8 mt-2">
                  <li>Formulário de registro para novos usuários.</li>
                  <li>Validação de dados do usuário (e-mail, senha).</li>
                  <li>Armazenamento seguro de credenciais (hashing de senha).</li>
                </ul>
              </li>
              <li>
                <span className="font-bold">Login de Usuário</span>
                <ul className="list-disc pl-8 mt-2">
                  <li>Formulário de login para usuários existentes.</li>
                  <li>Autenticação de credenciais e geração de token JWT.</li>
                  <li>Armazenamento do token no cliente localStorage.</li>
                </ul>
              </li>
              <li>
                <span className="font-bold">Logout</span>
                <ul className="list-disc pl-8 mt-2">
                  <li>Opção de logout que invalida o token no cliente.</li>
                  <li>Limpeza de dados do usuário armazenados no cliente.</li>
                </ul>
              </li>
              <li>
                <span className="font-bold">Proteção de Rotas</span>
                <ul className="list-disc pl-8 mt-2">
                  <li>Middleware para verificar a presença e validade do token JWT em solicitações.</li>
                  <li>Redirecionamento para página de login se o token for inválido ou ausente.</li>
                </ul>
              </li>
              <li>
                <span className="font-bold">Páginas Específicas por Tipo de Usuário</span>
                <ul className="list-disc pl-8 mt-2">
                  <li>Redirecionamento para páginas específicas com base no tipo de usuário (usuário comum ou administrador).</li>
                  <li>Controle de acesso a funcionalidades específicas de cada tipo de usuário.</li>
                </ul>
              </li>
              <li>
                <span className="font-bold">Painel de Administração</span>
                <ul className="list-disc pl-8 mt-2">
                  <li>Página exclusiva para administradores com ferramentas de gestão.</li>
                  <li>Visualização e gerenciamento de usuários registrados.</li>
                  <li>Capacidade de promover ou despromover usuários, editar informações de usuário, etc.</li>
                </ul>
              </li>
            </ol>
          </section>
        </div>

        {/* Technologies component  com cada tecnologia*/}
        <div className="col-span-12 my-2">
          <Technologies />
        </div>

        {/* seçao de contato */}
        <div className="col-span-12">
          <div className="grid grid-cols-12 gap-6 items-center">
            <section className="col-span-12 md:col-span-6">
              <h2 className="text-3xl text-center mb-4">Contato</h2>
              <p className="mb-4 text-xl">
                Gostou do meu trabalho? Fique à vontade para entrar em contato!
                Estou sempre animado para colaborar em novos projetos e oportunidades.
                Se você tem uma ideia interessante ou precisa de ajuda para dar vida às suas visões, estou aqui para ajudar.
                Vamos trabalhar juntos para criar algo incrível!
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://github.com/alyssonrafael"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textod underline pl-3 hover:text-white transition-all duration-300"
                >
                  <FaGithub className="text-2xl" />
                </a>
                <a
                  href="https://www.linkedin.com/in/alysson-rafael-485540290/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textod underline pl-3 hover:text-white transition-all duration-300"
                >
                  <FaLinkedinIn className="text-2xl" />
                </a>
                <a
                  href="mailto:alyssonrafaelf@outlook.com?subject=Contato pelo sistema de autenticação&body=Olá estou entrando em contato pelo sistema de autenticação"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textod underline pl-3 hover:text-white transition-all duration-300"
                >
                  <IoMdMail className="text-2xl" />
                </a>
              </div>
            </section>
            <div className="col-span-12 md:col-span-6 flex justify-center items-center min-h-72 min-w-72">
              <img src="/undraw_agreement_re_d4dv 1.svg" alt="undraw.img" className="h-72 w-72" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-textow mt-4">© 2024 Alysson Rafael. Todos os direitos reservados.</footer>
    </div>
  );
}

export default UserDashboard;
