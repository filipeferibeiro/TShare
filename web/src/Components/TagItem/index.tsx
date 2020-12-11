import React, { InputHTMLAttributes } from 'react';
import { FiTag } from 'react-icons/fi';

import './styles.css';

interface TagProps extends InputHTMLAttributes<HTMLInputElement> {
    isEdit?: boolean;
    label: string;
    deleteFunction?(i:number): any;
    i: number;
}

const TagItem: React.FC<TagProps>= ({ label, deleteFunction, i }) => {
    function handleDelete() {
        if(deleteFunction) {
            deleteFunction(i);
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
        <div className={isDeleteClasses()} onClick={handleDelete}>
            <div className="top" />
            <FiTag color="#FFFFFF" size={14} />
            <p className="tagName">{label}</p>
        </div>
    );
}

export default TagItem;
