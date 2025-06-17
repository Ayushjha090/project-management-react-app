import {type FC} from 'react';

import taskManagementLogo from '../../assets/task-management.png';

const Header: FC = () => {
    return (
        <header className='w-full flex flex-col justify-center items-center p-5'>
            <img src={taskManagementLogo} alt="project-hub-logo" className='h-24 w-24 my-5 block' />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Project Hub
            </h1>
            <p className='text-xl text-gray-600 mx-auto leading-relaxed text-center'>Organize, track, and manage your projects with style. Your personal workspace for productivity.</p>
        </header>
    )
};

export default Header;