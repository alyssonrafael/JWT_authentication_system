// Importação do React e React Router DOM.
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// componentes das páginas.
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LoginMobile from "./pages/mobile/LoginMobile";

// Importação do componente de rota protegida.
import ProtectedRoute from "./pages/ProtectedRouter";
import RegisterMobile from "./pages/mobile/RegisterMobile";

// Definição do componente AppRouter como uma função componente do React.
const AppRouter: React.FC = () => (
  // Utilização do BrowserRouter para envolver as rotas da aplicação.
  <Router>
    {/* Definição das rotas utilizando o componente Routes. */}
    <Routes>
      {/* Rota para a página de login. */}
      <Route path="/" element={<Login />} />
      {/* Rota para a página de login mobile. */}
      <Route path="/login-mobile" element={<LoginMobile />} />
      {/* Rota para a página de registro. */}
      <Route path="/register" element={<Register />} />
      {/* Rota para a página de registro mobile. */}
      <Route path="/register-mobile" element={<RegisterMobile />} />
      {/* Rota protegida para o dashboard do usuário. */}
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      {/* Rota protegida para o dashboard do administrador. */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

// Exportação do componente AppRouter para ser utilizado em outras partes da aplicação.
export default AppRouter;
