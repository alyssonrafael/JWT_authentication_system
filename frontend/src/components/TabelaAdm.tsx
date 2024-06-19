import React, { useState, useEffect } from "react"; // efeitos e estados
import axios, { AxiosResponse } from "axios"; //axios para requuisiçoes
import { useNavigate } from "react-router-dom"; // navigate para navegaçao
import SearchBar from "./SearchBar"; // Importando a barra de pesquisa
import UserTable from "./UserTable"; // Importando a tabela
import UserModal from "./UserModal"; // Importando o modal
import MensagemCard from "./Message"; // Importando o componente de mensagem
import { decodeToken } from "./utils/tokenUtils"; // Importando a função de decode do token
import { useUser } from "./context/UserContext"; // Importando o contexto do usuário

// Definição do tipo para um usuário
export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

const TabelaAdm: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Estado para armazenar os usuários
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para o termo de busca
  const [mensagem, setMensagem] = useState({ sucesso: false, texto: "" }); // Estado para mensagem exibida
  const [mensagemCount, setMensagemCount] = useState(0); // Estado para forçar a exibição da mensagem
  const [modal, setModal] = useState<User | null>(null); // Estado para o modal de usuário
  const { user } = useUser(); // Usando o contexto do usuário
  const token = localStorage.getItem("token"); // Obtendo o token do localStorage
  const navigate = useNavigate(); // Hook de navegação do React Router

  // Configurar Axios com o token
  const axiosInstance = axios.create({
    baseURL: "https://jwt-authentication-system-back.vercel.app/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Função para buscar os dados do servidor
  const fetchUsers = async () => {
    // Redefina a mensagem
    setMensagem({ sucesso: false, texto: "" });
    // Incrementa o contador de mensagens forçando ela a aparecer
    setMensagemCount(mensagemCount + 1);

    try {
      const response: AxiosResponse<User[]> = await axiosInstance.get("/users");
      setUsers(response.data); // Atualizar o estado com os usuários obtidos
    } catch (error) {
      setMensagem({
        sucesso: false,
        texto: "Erro ao tentar listar usuarios tente fazer o login novamente",
      });
      console.error("Erro ao buscar usuários:", error);
    }
  };
  // Função para deletar um usuário
  const deleteUser = async (userId: string) => {
    try {
      await axiosInstance.delete(`/users/${userId}`);
      // Filtrar usuários e atualizar o estado
      setUsers(users.filter((user) => user.id !== userId));
      // Decodificar o token para obter os dados do usuário atualmente logado
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = decodeToken(token);
        if (decoded.userId === userId) {
          // Remover token do localStorage e redireciona para o login
          localStorage.removeItem("token");
          navigate("/");
        }
      }
      setMensagem({ sucesso: true, texto: "Usuário excluído com sucesso" });
    } catch (error) {
      setMensagem({
        sucesso: false,
        texto: "Não foi possível excluir o usuário",
      });
      console.error("Erro ao excluir usuário:", error);
    }
  };
  // Função para alterar o papel (role) de um usuário
  const handleRoleChange = async (
    userId: string,
    newRole: "USER" | "ADMIN"
  ) => {
    // Redefina a mensagem
    setMensagem({ sucesso: false, texto: "" });
    // Incrementa o contador de mensagens forçando ela a aparecer
    setMensagemCount(mensagemCount + 1);
    try {
      await axiosInstance.patch(`/users/${userId}/role`, { role: newRole });
      // Atualizar o estado dos usuários
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      // Decodificar o token para obter os dados do usuário atualmente logado
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = decodeToken(token);
        if (decoded.userId === userId) {
          // Remover token do localStorage e é redirecionado apos um tempo
          localStorage.removeItem("token");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      }
      setMensagem({
        sucesso: true,
        texto: "Função de usuário atualizada com sucesso",
      });
    } catch (error) {
      setMensagem({
        sucesso: false,
        texto: "Não foi possível atualizar a função do usuário",
      });
      console.error("Erro ao atualizar função do usuário:", error);
    }
  };
  // Efeito para buscar os usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executa apenas uma vez ao montar o componente
  // Efeito para atualizar o nome do usuário logado na lista de usuários
  useEffect(() => {
    if (user) {
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? { ...u, name: user.name } : u))
      );
    }
  }, [user]); // Atualiza apenas quando o usuário logado muda

  // Filtrar usuários com base na palavra de busca
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Renderização do componente
  return (
    <div className="bg-secundaria shadow-2xl rounded-lg w-full h-full">
      <div className="bg-secundaria sticky top-0 z-10 px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0 md:space-x-2 pt-2">
          <h1 className="text-textow font-semibold text-2xl text-center md:text-left">
            Lista de Usuários
          </h1>
          {/* barra de pesquisa */}
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
      </div>
      <div className="flex justify-center mt-8 w-full h-full">
        {/* se nao hover usuarios que corespondam a busca exibe isso */}
        {filteredUsers.length === 0 ? (
          <p className="text-center mb-6 text-textow mt-4">
            Nenhum usuário encontrado....
          </p>
        ) : (
          // se nao a tabela e exibida
          <UserTable
            users={filteredUsers}
            onDelete={deleteUser}
            onRoleChange={handleRoleChange}
            onUserClick={setModal}
          />
        )}
      </div>
      {/* modal quando clica em cima do nome */}
      <UserModal user={modal} onClose={() => setModal(null)} />
      {/* mensagem de feedback */}
      <MensagemCard
        sucesso={mensagem.sucesso}
        mensagem={mensagem.texto}
        key={mensagemCount}
      />
    </div>
  );
};

export default TabelaAdm;