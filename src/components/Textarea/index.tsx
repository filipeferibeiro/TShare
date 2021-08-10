import React, { TextareaHTMLAttributes } from 'react';
import { rounded, whiteContainer } from '../../styles/styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    onChange(value: any): any;
}

const Textarea: React.FC<TextareaProps> = ({ onChange, className, ...rest }) => {
    return (
        <textarea 
            className={`${whiteContainer} ${rounded} resize-none h-96 text-white font-light placeholder-gray-300 py-4 px-6 ring-0 focus:ring-1 focus:ring-blue-500 focus:outline-none`} 
            onChange={e => onChange(e.target.value)} 
            { ...rest }
        />
    );
}

export default Textarea;