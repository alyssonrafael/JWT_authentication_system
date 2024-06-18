//componente que montra as caixinhas de cada tecnologia
//typos esperados
type TechnologieProps = {
    text: string;
    Icon: React.ElementType;
    iconClassName?: string
    className?:string;
};
//construçao de cada item de tecnologia
const Tecnologie: React.FC<TechnologieProps> = ({text, Icon, iconClassName, className}) => {
    return(
        <div className={`flex items-center bg-secundaria shadow-md rounded-lg p-2 hover:shadow-lg border border-transparent transition duration-500 ease-in-out transform hover:-translate-y-2 ${className}`}>
        <Icon className={`text-4xl ${iconClassName}`} />
        <span className={`flex-1 text-center text-sm md:text-lg`}>{text}</span>
      </div>  
    );
};


export default Tecnologie;