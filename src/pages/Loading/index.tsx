import React from 'react';

import './styles.css';

const Loading = () => {
    return (
        <div className="containerLoading">
            <div className="loader"></div>
            <p className="loadingText">Carregando...</p>
        </div>
    )
}

export default Loading;