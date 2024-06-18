import { FaReact, FaDocker, FaNodeJs, FaJs, FaFigma } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript, SiPrisma, SiPostgresql, SiAxios } from "react-icons/si"; //import dos icones das tecnologias

import Technologie from "../components/Tecnologie"; //inprtando componente tecnologie para montar cada item
//componente tecnologies
const Technologies = () => {
  return (
    <div className="flex flex-col justify-center items-center my-6 text-textow">
      <div className="flex justify-center mb-8">
        <div className="text-center lg:text-5xl font-sans text-4xl lg:pb-16 pt-16 lg:pt-0">
          <h1>Tecnologias usadas</h1>
        </div>
      </div>

      <div className="lg:grid grid-rows-auto grid-cols-4 grid-rows-4  lg:grid-cols-12 lg:grid-rows-1 gap-4 w-4/5">
        {/* seçao do front end */}
        <div className="lg:col-span-6 row-span-1 col-span-4  text-center whitespace-normal  ">
          <div className="text-lg lg:flex-column lg:justify-center space-y-4 mb-4 lg:mb-0">
            <h1 className="text-2xl">Front-end</h1>
            <div className="mx-2 lg:space-y-3 md:space-y-3 grid grid-cols-2 gap-4 md:block lg:block ">
              <Technologie
                text="React Js"
                Icon={FaReact}
                className="hover:border-blue-400"
                iconClassName="text-blue-500"
              />
              <Technologie
                text="Tailwind css"
                Icon={RiTailwindCssFill}
                className="hover:border-blue-600"
                iconClassName="text-blue-400"
              />
              <Technologie
                text="Typescript"
                Icon={SiTypescript}
                className="hover:border-blue-600"
                iconClassName="text-blue-500"
              />
              <Technologie
                text="Figma"
                Icon={FaFigma}
                className="hover:border-pink-600"
                iconClassName="text-pink-500"
              />
              <Technologie
                text="Axios"
                Icon={SiAxios}
                className="hover:border-purple-600"
                iconClassName="text-purple-500"
              />
            </div>
          </div>
        </div>
        {/* seçao do back end */}
        <div className="lg:col-span-6 row-span-1 col-span-4 text-center whitespace-normal">
          <div className="text-lg flex-column justify-center space-y-4 mb-4 lg:mb-0">
            <h1 className="text-2xl">Back-end</h1>
            <div className="mx-2 lg:space-y-3 md:space-y-3 grid grid-cols-2 gap-4 md:block lg:block ">
              <Technologie
                text="NodeJS"
                Icon={FaNodeJs}
                className="hover:border-green-400"
                iconClassName="text-green-400"
              />
              <Technologie
                text="Javascript"
                Icon={FaJs}
                className="hover:border-yellow-400"
                iconClassName="text-yellow-400"
              />
              <Technologie
                text="Postgresql"
                Icon={SiPostgresql}
                className="hover:border-blue-400"
                iconClassName="text-blue-400"
              />
              <Technologie
                text="Prisma"
                Icon={SiPrisma}
                className="hover:border-gray-200"
                iconClassName="text-textod"
              />
              <Technologie
                text="Docker"
                Icon={FaDocker}
                className="hover:border-blue-400"
                iconClassName="text-blue-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;
