import React, { InputHTMLAttributes } from 'react';
import { FiX } from 'react-icons/fi';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    deleteFunction?(i:number): any;
    selectFunction?(i:number): any;
    i: number;
    id?: string;
}

const CheckItens: React.FC<InputProps> = ({ name, label, deleteFunction, selectFunction, i, id }) => {
    function handleDelete() {
        if (deleteFunction) {
            deleteFunction(i);
        }
    }
    function handleSelect() {
        if (selectFunction) {
            selectFunction(i);
        }
    }

    return (
        <div className="checkContainer">
            <p id={`${id}DeleteBt`} className="deleteBt" onClick={handleDelete}><FiX color="#E72E2E" size={16} /></p>
            <input id={id} className="alternative" type="radio" name={name} onChange={handleSelect} />
            <label>{label}</label>
        </div>
    );
}

export default CheckItens;