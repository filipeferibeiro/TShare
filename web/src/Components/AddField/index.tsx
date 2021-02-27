import React, { InputHTMLAttributes, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import Input from '../Input';

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
            <Input id={id} type="text" value={value} onChange={setValue} />
            <p id={`${id}AddBt`} className="add" onClick={handleAdd}><FiPlus color="#FFF" size={19} />Adicionar</p>
            <p id={`${id}AddBt`} className="add addMobile" onClick={handleAdd}><FiPlus color="#FFF" size={19} /></p>
        </div>
    );
}

export default AddField;