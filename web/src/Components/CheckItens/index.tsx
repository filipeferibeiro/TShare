import React, { InputHTMLAttributes } from 'react';
import { FiX } from 'react-icons/fi';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    deleteFunction?(i:number): any;
    selectFunction?(i:number): any;
    i?: number;
    id?: string;
    detail?: boolean
    selected?: boolean
}

const CheckItens: React.FC<InputProps> = ({ name, label, deleteFunction, selectFunction, i, id, detail, selected }) => {
    function handleDelete() {
        if (deleteFunction && i !== undefined) {
            Array.from((document.querySelectorAll(`input[name="${name}"]:checked`) as any), (input:HTMLInputElement) => input.checked = false);
            deleteFunction(i);
        }
    }
    function handleSelect() {
        if (selectFunction && i !== undefined) {
            selectFunction(i);
        }
    }

    return (
        <div className="checkContainer">
            {(detail) &&
                <input id={id} className="alternative" type="radio" name={name} readOnly disabled checked={selected} />
            }
            {!detail &&
                <>
                    <p id={`${id}DeleteBt`} className="deleteBt" onClick={handleDelete}><FiX color="#E72E2E" size={16} /></p>
                    <input id={id} className="alternative" type="radio" name={name} checked={selected} onChange={handleSelect} />
                </>
            }
            <label>{label}</label>
        </div>
    );
}

export default CheckItens;