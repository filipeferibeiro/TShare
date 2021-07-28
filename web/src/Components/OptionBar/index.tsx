import React from 'react';

import './styles.css';

interface InputProps {
    option: boolean[];
    setOption(option: boolean[]): any;
    options: string[];
}

const OptionBar: React.FC<InputProps> = ({ option, setOption, options }) => {
    function handleOptions(index:number) {
        if (index === 0) {
            setOption([true, false, false])
        } else if (index === 1) {
            setOption([false, true, false])
        } else if (index === 2) {
            setOption([false, false, true])
        }
    }

    function handleIsSelected(index:number) {
        if (option[index]) {
            return "selected";
        }
        return "";
    }

    return (
        <div className="glass-d2 optionBarContainer">
            {options.map((op, index) => (
                <p key={index} className={handleIsSelected(index)} onClick={() => handleOptions(index)}>{op}</p>
            ))}
        </div>
    );
}

export default OptionBar;