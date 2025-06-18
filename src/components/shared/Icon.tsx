import {type FC} from 'react';

import type { IconType } from 'react-icons';

interface IconProps {
    icon: IconType
    iconClassName?: string;
    backgroundClassName?: string;
}

const Icon: FC<IconProps> = ({ icon: IconComponent, iconClassName, backgroundClassName }) => {

    return (
        <div className={backgroundClassName}>
            <IconComponent className={iconClassName} />
        </div>
    )
};

export default Icon;