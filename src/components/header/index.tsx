import { type FC } from "react";

import taskManagementLogo from "../../assets/task-management.png";

const Header: FC = () => {
  return (
    <header className="h-16 w-full bg-white sticky top-0 z-50 shadow-md flex items-center justify-between px-4 md:px-8">
      <div className="w-2/3 md:w-1/3 flex justify-center items-center">
        <img
          src={taskManagementLogo}
          alt="project-hub-logo"
          className="h-12 w-12 my-2 block"
        />
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent ml-5">
          Project Hub
        </h1>
      </div>
      <div className=""></div>
    </header>
  );
};

export default Header;
