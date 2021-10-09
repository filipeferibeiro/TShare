import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { iconColor } from '../../constants/constants';

interface PageNameProps {
    name: string;
    back?: boolean;
    to?: string;
}

const PageName:React.FC<PageNameProps> = ({ name, back, to, children }) => {
    return (
        <div className={`flex justify-between items-center h-14`}>
            <div className={`flex gap-3 items-center`}>
                {back &&
                    <Link to={to || "/"}><FiChevronLeft color={iconColor} size={30} /></Link>
                }
                <h1 className="font-sans font-medium text-3xl text-white ">{name}</h1>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default PageName;