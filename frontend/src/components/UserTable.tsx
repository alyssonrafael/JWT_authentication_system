import React from "react";
import { User } from "./TabelaAdm";

// Definição das propriedades esperadas pelo componente 
interface UserTableProps {
  users: User[]; // Array de objetos do tipo User
  onDelete: (userId: string) => void; // Função para deletar um usuário, recebe o ID como parâmetro
  onRoleChange: (userId: string, newRole: "USER" | "ADMIN") => void; // Função para alterar o tipo de usuário, recebe ID e novo papel como parâmetros
  onUserClick: (user: User) => void; // Função para lidar com o clique em um usuário, recebe o objeto User como parâmetro
}

// Componente funcional UserTable recebe as props desestruturadas
const UserTable: React.FC<UserTableProps> = ({
  users,
  onDelete,
  onRoleChange,
  onUserClick,
}) => {
  return (
    <table className="table-fixed w-full mx-2 text-xs lg:text-base text-textow">
      <thead
        className="bg-secundaria sticky top-20 md:top-11 z-10"
        style={{ boxShadow: "0 2px 5px -2px rgba(0, 0, 0, 0.2)" }}
      >
        <tr>
          <th className="w-1/4 px-4 py-2">Usuário</th>
          <th className="w-1/4 px-4 py-2 hidden md:table-cell">Email</th>
          <th className="w-1/4 px-4 py-2">Tipo</th>
          <th className="w-1/4 px-4 py-2">Excluir</th>
        </tr>
      </thead>
      <tbody>
        {/* Mapeia os usuários e cria uma linha na tabela para cada usuário */}
        {users.map((user, index) => (
          <tr key={index} className="text-center">
            {/* Coluna do nome do usuário */}
            <td
              className="w-1/4 px-4 py-2 truncate cursor-pointer"
              style={{ maxWidth: "100px" }}
              onClick={() => onUserClick(user)} // Chama onUserClick ao clicar no nome do usuário
            >
              {user.name}
            </td>
            {/* Coluna do email do usuário, oculta em telas menores */}
            <td
              className="w-1/4 px-4 py-2 truncate hidden md:table-cell"
              style={{ maxWidth: "100px" }}
            >
              {user.email}
            </td>
            {/* Coluna do tipo de usuário com um select para alteração */}
            <td className="w-1/4 px-4 py-2 truncate">
              <select
                value={user.role} // Valor selecionado é o role atual do usuário
                onChange={(e) => onRoleChange(user.id, e.target.value as "USER" | "ADMIN")} // Chama onRoleChange ao alterar o valor do select
                className="bg-transparent"
              >
                <option value="USER" className="text-textod">USER</option>
                <option value="ADMIN" className="text-textod">ADMIN</option>
              </select>
            </td>
            {/* Coluna de botão para excluir o usuário */}
            <td className="w-1/4 px-4 py-2">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                onClick={() => onDelete(user.id)} // Chama onDelete ao clicar no botão de excluir
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
