import React from "react";
import { User } from "./TabelaAdm"; // Importa o tipo de usuário definido em TabelaAdm

// Define as props esperadas para o componente
interface UserModalProps {
  user: User | null; // Recebe um objeto do tipo User ou null, indicando se o modal deve ser exibido
  onClose: () => void; // Função de callback para fechar o modal
}

// Componente funcional UserModal recebe as props desestruturadas
const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  // Se user for null, retorna null para não renderizar o modal
  if (!user) return null;

  // Renderização do modal quando user não for null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-secundaria text-textow p-6 mx-4 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Informações detalhadas</h2>
        {/* Exibe os detalhes do usuário */}
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Tipo de Usuário:</strong> {user.role}</p>
        {/* Botão para fechar o modal, invocando a função onClose */}
        <button
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={onClose} // Ao clicar, chama a função onClose para fechar o modal
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default UserModal; // Exporta o componente UserModal
