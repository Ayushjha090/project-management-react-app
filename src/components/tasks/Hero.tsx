import { type FC } from "react";

import { MdArrowBack } from "react-icons/md";
import type { Project } from "../../types/project";

interface HeroSectionProps {
  projectDetails: Project;
  onClickBack: () => void;
}

const Hero: FC<HeroSectionProps> = ({ projectDetails, onClickBack }) => {
  return (
    <>
      <div>
        <button
          onClick={onClickBack}
          className="text-md flex items-center border-none p-2 my-5 bg-transparent text-gray-500 hover:bg-gray-300 rounded-xl cursor-pointer justify-self-start transition:all duration-100"
        >
          <MdArrowBack className="text-2xl mr-2" /> Back to Projects
        </button>
      </div>
    </>
  );
};

export default Hero;
