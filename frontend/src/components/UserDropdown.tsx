import { useState, useEffect } from "react"; //estados e efeitos
import { useNavigate } from "react-router-dom"; //navegaçao
import axios, { AxiosResponse } from "axios"; //axios para requisiçoes
import { decodeToken } from "./utils/tokenUtils"; // Importando a função de decode do token
import { useUser } from "./context/UserContext"; // Importando o contexto do usuário
import MensagemCard from "./Message";//menssage de feedback

// Interface
interface ApiResponse {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Estado para controlar se o dropdown está aberto
  const [isEditing, setIsEditing] = useState<boolean>(false); // Estado para controlar se está no modo de edição
  const [newName, setNewName] = useState<string>(""); // Estado para armazenar o novo nome do usuário
  const navigate = useNavigate(); // Hook do React Router para navegação programática
  const { user, setUser } = useUser(); // Usando o contexto do usuário

  const [mensagem, setMensagem] = useState({ sucesso: false, texto: "" });// estado mensagem de feedback
  const [mensagemCount, setMensagemCount] = useState(0);// estado para garantir a exibiçao

  // Efeito para carregar os dados do usuário ao montar o componente
  useEffect(() => {
    // Obtém o token do localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Decodifica o token JWT para obter o ID do usuário
      const decoded = decodeToken(token);
      if (decoded) {
        // Faz uma requisição GET para obter os dados do usuário usando o ID decodificado
        axios
          .get<ApiResponse>(`http://localhost:3333/api/user/${decoded.userId}`)
          .then((response: AxiosResponse<ApiResponse>) => {
            const { id, name, email, role } = response.data; // Extrai dados do usuário da resposta
            setUser({ id, name, email, role }); // Atualiza o estado com os dados do usuário
          })
          .catch((error) => console.error("Erro ao buscar usuário:", error)); // Trata erros na requisição
      }
    }
  }, [setUser]); //sempre que o setuser mudar vai ser remontado

  // Função para lidar com o logout do usuário
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    setUser(null); // Remove o usuário do estado
    navigate("/"); // Navega para a página de login
  };

  // Função para alternar a visibilidade do dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Inverte o estado de isOpen para abrir ou fechar o dropdown
    setIsEditing(false); // Fecha a edição ao abrir o dropdown
  };

  // Função para lidar com a edição do nome do usuário
  const handleEdit = () => {
    setIsEditing(true); // Ativa o modo de edição
    if (user) {
      setNewName(user.name); // Define o nome atual como valor inicial
    }
  };

  // Função para salvar o novo nome do usuário
  const handleSave = () => {
    // Redefina a mensagem
    setMensagem({ sucesso: false, texto: "" });
    // Incrementa o contador de mensagens forçando ela a aparecer
    setMensagemCount(mensagemCount + 1);
    if (user) {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = decodeToken(token);
        if (decoded) {
          axios
            .put<ApiResponse>(
              `http://localhost:3333/api/users/${decoded.userId}`,
              { name: newName },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response: AxiosResponse<ApiResponse>) => {
              const { id, name, email, role } = response.data; // Extrai dados do usuário da resposta
              setUser({ id, name, email, role }); // Atualiza o estado com o novo nome do usuário
              setIsEditing(false); // Desativa o modo de edição
              setIsOpen(false);
              setMensagem({
                sucesso: true,
                texto: "Nome alterado com sucesso",
              });
            })
            // tratamento de erro
            .catch((error) => {
              console.error("Erro ao atualizar usuário:", error)
              setMensagem({
                sucesso: false,
                texto: "erro ao mudar nome tente mais tarde",
              });
              setIsOpen(false);
            }
            );
        }
      }
    }
  };

  // Função para cancelar a edição
  const handleCancel = () => {
    setIsEditing(false); // Desativa o modo de edição
  };

  // Renderiza o componente do dropdown do usuário
  if (!user) {
    return (
      <div className="origin-top-right absolute right-4 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-slate-300"
        >
          Sair
        </button>
      </div>
    ); // Retorna um botão de sair se o user não for achado
  }

  // Retorna o JSX que representa o dropdown do usuário
  return (
    <div className="relative text-left">
      <div>
        {/* Botão que mostra o nome e role do usuário */}
        <button
          type="button"
          className="inline-flex justify-center w-full text-xs rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-textow md:text-sm font-medium text-textod hover:bg-gray-50 focus:outline-none"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown} // Chama toggleDropdown ao clicar no botão
        >
          {user.name} <br /> ({user.role}) {/* Nome e role do usuário */}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown que aparece quando isOpen é verdadeiro */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {/* Condição para renderizar a área de edição do nome ou os botões padrão */}
            {isEditing ? (
              <div className="flex flex-col px-4 py-2 space-y-2">
                {/* Input para edição do nome */}
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-sm text-gray-700 border rounded-md px-2 py-1"
                />
                {/* Botões para salvar ou cancelar a edição */}
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="w-full text-left px-4 py-2 text-sm text-white bg-primaria hover:bg-secundaria rounded-md"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="w-full text-left px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Botão para editar o nome */}
                <button
                  onClick={handleEdit}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Editar Nome
                </button>
                {/* Botão para fazer logout */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Sair
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {/* //menssage de feedback */}
      <MensagemCard
        sucesso={mensagem.sucesso}
        mensagem={mensagem.texto}
        key={mensagemCount}
      />
    </div>
  );
};

export default UserDropdown;
