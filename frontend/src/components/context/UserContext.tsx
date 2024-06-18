import React, { createContext, useState, useContext, ReactNode } from "react";

// Definição do tipo para um usuário
interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

// Definição do tipo para o contexto do usuário
interface UserContextType {
  user: User | null; // Usuário atual ou null se não estiver autenticado
  setUser: (user: User | null) => void; // Função para definir o usuário
}

// Criação do contexto do usuário
const UserContext = createContext<UserContextType | undefined>(undefined);

// Componente funcional UserProvider que provê o contexto do usuário para toda a aplicação
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Estado local para armazenar o usuário

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children} {/* Renderiza os componentes filhos */}
    </UserContext.Provider>
  );
};

// Hook useUser que permite acessar o contexto do usuário em componentes filhos
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = (): UserContextType => {
  const context = useContext(UserContext); // Obtém o contexto do usuário
  if (!context) {
    throw new Error("useUser must be used within a UserProvider"); // Lança um erro se o contexto não estiver definido
  }
  return context; // Retorna o contexto do usuário
};

export default UserProvider;
