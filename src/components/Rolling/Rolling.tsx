import React from 'react';

interface RollingProps {
    title: string
}

const Rolling: React.FC<RollingProps> = ({ title }) => {
    return (
        title.split('').map((letter, index) => (
            <span key={index} className="rolling">{letter}</span>
        ))
    );
};

export default Rolling;