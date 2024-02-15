import React from 'react';

import './Loading.scss';

interface LoadingProps { }

const Loading: React.FC<LoadingProps> = () => {
    return (
        <div className="loading-wrapper">
            <span>Loading...</span>
        </div>
    );
};

export default Loading;