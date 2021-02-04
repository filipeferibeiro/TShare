import React, { useState } from 'react';

import './styles.css';

interface InputProps {
    option: boolean[];
    setOption(option: boolean[]): any;
}

const OptionBar: React.FC<InputProps> = ({ option, setOption }) => {
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
        <div className="optionBarContainer">
            <p className={handleIsSelected(0)} onClick={() => handleOptions(0)}>Objetiva</p>
            <p className={handleIsSelected(1)} onClick={() => handleOptions(1)}>Objetiva Justificada</p>
            <p className={handleIsSelected(2)} onClick={() => handleOptions(2)}>Discursiva</p>
        </div>
    );
}

export default OptionBar;
