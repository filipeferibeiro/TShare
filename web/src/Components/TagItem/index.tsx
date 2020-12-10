import React from 'react';
import { FiTag } from 'react-icons/fi';

import './styles.css';

const TagItem = () => {
    return (
        <div className="tagItem">
            <FiTag color="#FFFFFF" size={14} />
            <p className="tagName">Trigonometria</p>
        </div>
    );
}

export default TagItem;