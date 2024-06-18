import React from "react";
import { FaSearch } from "react-icons/fa";

// Definindo as propriedades esperadas pelo component
interface SearchBarProps {
  searchTerm: string; //nome buscado no componente pai
  onSearchChange: (term: string) => void; //mudança do nome buscado
}

// Componente funcional SearchBar recebendo props do tipo SearchBarProps
const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative flex-grow max-w-sm">
      {/* Input para inserção do termo de busca */}
      <input
        type="text"
        placeholder="Digite o nome desejado"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)} // Ao alterar, chama a função onSearchChange com o novo valor
        className="pl-8 pr-8 py-2 text-sm rounded-full bg-white/25 focus:bg-white/80 transition-all duration-300 w-full"
      />
      {/* icone de lupa  */}
      <FaSearch className="absolute text-sm left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default SearchBar;
