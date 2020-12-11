import React, { InputHTMLAttributes, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import './styles.css';

interface AddFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    func(text:string): any;
}

const AddField: React.FC<AddFieldProps> = ({ func }) => {
    const [value, setValue] = useState<string>("");

    function handleAdd() {
        func(value);
        setValue("");
    }

    return (
        <div className="addItemTextField">
            <input className="field" type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
            <p className="add" onClick={handleAdd}><FiPlus color="#FFF" size={19} />Adicionar</p>
        </div>
    );
}

export default AddField;
