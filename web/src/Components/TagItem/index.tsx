import React, { InputHTMLAttributes } from 'react';
import { FiTag } from 'react-icons/fi';

import './styles.css';

interface TagProps extends InputHTMLAttributes<HTMLInputElement> {
    isEdit?: boolean;
    label: string;
    deleteFunction?(i:number): any;
    searchFunction?(i:string): any;
    i: number;
    id?: string;
}

const TagItem: React.FC<TagProps>= ({ label, deleteFunction, searchFunction, i, id }) => {
    function handleFunction() {
        if(deleteFunction) {
            deleteFunction(i);
        }
        if(searchFunction) {
            searchFunction(label);
        }
    }

    function isDeleteClasses() {
        if (deleteFunction) {
            return "tagItem delete"
        } else {
            return "tagItem"
        }
    }

    return (
        <div id={id} className={isDeleteClasses()} onClick={handleFunction}>
            <div className="top" />
            <FiTag color="#FFFFFF" size={14} />
            <p className="tagName">{label}</p>
        </div>
    );
}

export default TagItem;