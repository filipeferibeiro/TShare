import React, { InputHTMLAttributes, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import './styles.css';

interface AddFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    func(text:string): any;
    id?: string;
}

const AddField: React.FC<AddFieldProps> = ({ func, id }) => {
    const [value, setValue] = useState<string>("");

    function handleAdd() {
        func(value);
        setValue("");
    }

    return (
        <div className="addItemTextField">
            <input id={id} className="field" type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
            <p id={`${id}AddBt`} className="add" onClick={handleAdd}><FiPlus color="#FFF" size={19} />Adicionar</p>
        </div>
    );
}

export default AddField;