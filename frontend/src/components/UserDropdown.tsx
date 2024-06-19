import { useState, useEffect } from "react"; // Estados e efeitos
import { useNavigate } from "react-router-dom"; // Navegação
import axios, { AxiosResponse } from "axios"; // Axios para requisições
import { decodeToken } from "./utils/tokenUtils"; // Importando a função de decode do token
import { useUser } from "./context/UserContext"; // Importando o contexto do usuário
import MensagemCard from "./Message"; // Mensagem de feedback

// Interface
interface ApiResponse {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

// IDs dos usuários protegidos
const PROTECTED_USER_IDS = [
  "04c45ff2-5548-4478-8238-4e6d5a4fc3f7",
  "28e4bdb9-0b0e-4abe-ae3a-e17718d1ebd1",
];

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Estado para controlar se o dropdown está aberto
  const [isEditing, setIsEditing] = useState<boolean>(false); // Estado para controlar se está no modo de edição
  const [newName, setNewName] = useState<string>(""); // Estado para armazenar o novo nome do usuário
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<boolean>(false); // Estado para controlar se está confirmando a exclusão da conta
  const navigate = useNavigate(); // Hook do React Router para navegação programática
  const { user, setUser } = useUser(); // Usando o contexto do usuário

  const [mensagem, setMensagem] = useState({ sucesso: false, texto: "" }); // Estado mensagem de feedback
  const [mensagemCount, setMensagemCount] = useState(0); // Estado para garantir a exibição

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
          .get<ApiResponse>(`https://jwt-authentication-system-back.vercel.app/api/user/${decoded.userId}`)
          .then((response: AxiosResponse<ApiResponse>) => {
            const { id, name, email, role } = response.data; // Extrai dados do usuário da resposta
            setUser({ id, name, email, role }); // Atualiza o estado com os dados do usuário
          })
          .catch((error) => console.error("Erro ao buscar usuário:", error)); // Trata erros na requisição
      }
    }
  }, [setUser]); // Sempre que o setUser mudar vai ser remontado

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
    setIsConfirmingDelete(false); // Fecha a confirmação de exclusão ao abrir o dropdown
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
    // Redefine a mensagem
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
              `https://jwt-authentication-system-back.vercel.app/api/users/${decoded.userId}`,
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
            // Tratamento de erro
            .catch((error) => {
              console.error("Erro ao atualizar usuário:", error);
              setMensagem({
                sucesso: false,
                texto: "Erro ao mudar nome, tente mais tarde",
              });
              setIsOpen(false);
            });
        }
      }
    }
  };

  // Função para cancelar a edição
  const handleCancel = () => {
    setIsEditing(false); // Desativa o modo de edição
  };

  // Função para confirmar exclusão da conta
  const handleDeleteConfirm = () => {
    setIsConfirmingDelete(true); // Ativa a confirmação de exclusão
  };

  // Função para cancelar a confirmação de exclusão
  const handleCancelDelete = () => {
    setIsConfirmingDelete(false); // Desativa a confirmação de exclusão
  };

  // Função para excluir a conta do usuário
  const handleDeleteAccount = () => {
    // Redefine a mensagem
    setMensagem({ sucesso: false, texto: "" });
    // Incrementa o contador de mensagens forçando ela a aparecer
    setMensagemCount(mensagemCount + 1);
    
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && user) {
        // Verifica se o usuário atual é protegido
        if (PROTECTED_USER_IDS.includes(user.id)) {
          setMensagem({
            sucesso: false,
            texto: "Este usuário não pode ser excluído.",
          });
          setMensagemCount(mensagemCount + 1);
          setIsConfirmingDelete(false);
          return;
        }

        axios
          .delete(`https://jwt-authentication-system-back.vercel.app/api/users/${decoded.userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            // Define a mensagem de sucesso
            setMensagem({
              sucesso: true,
              texto: "Conta excluída com sucesso",
            });
            setMensagemCount(mensagemCount + 1);
            // Usa setTimeout para redirecionar após 3 segundos
            setTimeout(() => {
              localStorage.removeItem("token"); // Remove o token do localStorage
              setUser(null); // Remove o usuário do estado
              navigate("/"); // Navega para a página de login
            }, 3000); // 3 segundos de espera
          })
          .catch((error) => {
            console.error("Erro ao excluir conta:", error);
            setMensagem({
              sucesso: false,
              texto: "Erro ao excluir conta, tente mais tarde",
            });
            setIsConfirmingDelete(false);
            setIsOpen(false);
          });
      }
    }
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
                {/* Botão para excluir a conta */}
                <button
                  onClick={handleDeleteConfirm}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Excluir Conta
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
      {/* Modal de confirmação para excluir a conta */}
      {isConfirmingDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 mx-6">
          <div className="bg-white rounded-md shadow-lg p-4 text-textod">
            <p className="mb-4">
              Tem certeza que deseja excluir sua conta? Esta ação não pode ser
              desfeita.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md"
              >
                Excluir
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Mensagem de feedback */}
      <MensagemCard
        sucesso={mensagem.sucesso}
        mensagem={mensagem.texto}
        key={mensagemCount}
      />
    </div>
  );
};

export default UserDropdown;
