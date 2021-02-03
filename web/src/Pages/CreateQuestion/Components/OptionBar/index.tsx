import React, { useState } from 'react';

import './styles.css';

const OptionBar = () => {
    const [selection, setSelection] = useState([true, false, false]);

    function handleOptions(index:number) {
        if (index === 0) {
            setSelection([true, false, false])
        } else if (index === 1) {
            setSelection([false, true, false])
        } else if (index === 2) {
            setSelection([false, false, true])
        }
    }

    function handleIsSelected(index:number) {
        if (selection[index]) {
            return "selected";
        }
        return "";
    }

    return (
        <div className="optionBarContainer">
            <p className={handleIsSelected(0)} onClick={() => handleOptions(0)}>Alternativa</p>
            <p className={handleIsSelected(1)} onClick={() => handleOptions(1)}>Alternativa Justificada</p>
            <p className={handleIsSelected(2)} onClick={() => handleOptions(2)}>Objetiva</p>
        </div>
    );
}

export default OptionBar;