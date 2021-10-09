import React from 'react';

interface SectionProps {
    title: string;
    Component?: React.FC;
}

const Section:React.FC<SectionProps> = ({ title, children, Component }) => {
    return (
        <div className={`flex flex-col w-full`}>
            <header className={`flex justify-between px-3 items-center mb-2`}>
                <p className={`text-white font-light`}>{title}</p>
                {Component &&
                    <Component />
                }
            </header>
            {children}
        </div>
    );
}

export default Section;