import React from "react";
import { Link } from "react-router-dom";

const HomeMobile: React.FC = () => {
  return (
    <div className="flex flex-col h-screen px-4 overflow-y-auto">
      {/* Imagem na parte superior, ocupando 1/3 da tela */}
      <div className="flex justify-center items-center h-1/3 w-full my-8">
        <img
          src="/undraw_two_factor_authentication_namy 1.svg"
          alt="unDraw image"
          className="w-full h-full object-contain"
        />
      </div>
      {/* Conteúdo abaixo da imagem, ocupando 2/3 da tela */}
      <div className="flex flex-col h-2/3 w-full">
        <div className="mb-4">
          <h1 className="text-3xl font-bold font-sans">Seja bem-vindo</h1>
          <h2 className="text-lg text-textow">
            Este é meu sistema de autenticação
          </h2>
        </div>
        {/* Botões de links para as páginas mobile de login e cadastro */}
        <div className="flex flex-col space-y-10 pt-10 font-medium">
          <Link
            to="/login-mobile"
            className="bg-white py-2 px-4 rounded-full shadow text-center"
          >
            Login
          </Link>
          <Link
            to="/register-mobile"
            className="bg-white py-2 px-4 rounded-full shadow text-center"
          >
            Cadastrar nova conta
          </Link>
        </div>
      </div>
      {/* Rodapé */}
      <footer className="text-textow text-center underline underline-offset-4 py-4 font-light">
        <a
          href="https://github.com/alyssonrafael/JWT_authentication_system"
          target="_blank"
          rel="noopener noreferrer"
        >
          Clique aqui para conhecer mais sobre esse projeto
        </a>
      </footer>
    </div>
  );
};

export default HomeMobile;
