interface BannerInicialProps {
  src: string;
  alt: string;
  className?: string;
}//interface para as props
// componente funcional do banner
const BannerInicial: React.FC<BannerInicialProps> = ({
  src,
  alt,
  className,
}) => {
  return (
    //titulo e layout do baner das paginas de regitro e login
    <div className="w-1/2 flex flex-col justify-center h-full">
      <div className="text-center font-sans lg:text-5xl lg:mb-36">
        <h1 className="text-5xl">Seja bem-vindo, este é meu</h1>
        <h1 className="font-bold text-4xl">Sistema de autenticação</h1>
      </div>
      <div className="flex justify-center">
        <img
          src={src}
          alt={alt}
          className={className}
        />
      </div>
    </div>
  );
};

export default BannerInicial;
