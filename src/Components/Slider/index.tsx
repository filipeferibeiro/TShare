import React from 'react';

import './styles.css';

const Slider = () => {
    return (
        <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
        </label>
    );
}

export default Slider;