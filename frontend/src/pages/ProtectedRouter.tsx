import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Definição da interface de props
interface ProtectedRouteProps {
  // Pode receber um nó React como filho (opcional).
  children?: React.ReactNode;
}

// Definição do componente funcional ProtectedRoute.
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Busca pelo token de autenticação no armazenamento local do navegador.
  const token = localStorage.getItem('token');

  // Se não houver token, redireciona para a página de login.
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Se houver filhos, renderiza-os; caso contrário, renderiza o Outlet.
  // Outlet é um componente que renderiza os elementos de rota filhos.
  return children ? <>{children}</> : <Outlet />;
};

// Exportação do componente ProtectedRoute para uso em outras partes da aplicação.
export default ProtectedRoute;
