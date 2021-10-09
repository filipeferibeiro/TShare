import React from 'react';
import { OptionProps } from '../../interfaces/interfaces';
import { Option, OptionSelected, rounded, whiteContainer } from '../../styles/styles';

interface OptionBarProps {
    options: OptionProps[];
    setOptions(options: OptionProps[]): any
}

const OptionBar: React.FC<OptionBarProps> = ({ options, setOptions }) => {
    function handleSetOption(i: number) {
        const newOptions = options.map((option, index) => {
            if (index === i) {
                return { text: option.text, state: true }
            } else {
                return { text: option.text, state: false }
            }
        })
        setOptions(newOptions);
    }

    return (
        <div className={`grid grid-flow-col gap-1 ${whiteContainer} ${rounded} p-1`}>
            {options.map((option, index) => (
                <p key={index} className={`${option.state ? OptionSelected : Option}`} onClick={() => handleSetOption(index)}>{option.text}</p>
            ))}
        </div>
    );
}

export default OptionBar;