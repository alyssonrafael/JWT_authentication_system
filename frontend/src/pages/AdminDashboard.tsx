import TabelaAdm from "../components/TabelaAdm"; // Importa o componente TabelaAdm
import UserDropdown from "../components/UserDropdown"; // Importa o componente UserDropdown
import { Link } from "react-router-dom"; // recurso para linkar entre paginas

function AdminDashboard() {
  return (
    <div className="bg-gradient-to-r to-primaria from-secundaria min-h-screen flex flex-col items-center p-4 md:p-10">
      <div className="grid grid-cols-4 md:grid-cols-3 md:grid-rows-auto gap-4 lg:gap-8 max-w-6xl w-full">
        {/* Coluna para mensagem de boas-vindas e título */}
        <div className="col-span-2 md:col-span-2 space-y-4 text-center lg:text-left">
          <h1 className="text-base font-bold md:text-xl lg:text-4xl text-left text-textod">
            Parabéns, você foi autenticado com sucesso. Bem-vindo ao painel de
            administração.
          </h1>
        </div>
        {/* Coluna para o dropdown do usuário */}
        <div className="m-2 md:flex md:justify-center col-span-2">
          <UserDropdown />
        </div>
        {/* Parágrafo com informações sobre as funcionalidades do administrador */}
        <p className="text-textow text-sm md:text-lg lg:text-2xl col-span-4">
          Como administrador você tem a possibilidade de visualizar todos os
          usuários, alterar o tipo de usuário, excluir usuários do banco de
          dados e buscar usuarios com base no nome. Clique no nome de um usuário
          para ver informações detalhadas. <br />
          {/* link para o admin poder ver a pagina de usuario */}
          <Link
            to="/user-dashboard"
            className="text-textod underline underline-offset-4 hover:text-white transition-all duration-300 text-sm"
          >
            Conheça mais sobre o projeto, Visite a página de usuários!
          </Link>
        </p>
        {/* Coluna para exibir a tabela de administração */}
        <div className="col-span-4 md:col-span-3">
          <div className="bg-secundaria shadow-2xl rounded-lg">
            <div className=" max-h-[70vh] lg:max-h-[46vh] overflow-y-auto">
              <TabelaAdm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
