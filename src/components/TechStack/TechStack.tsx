import React, { useEffect, useRef } from 'react';

import { mouseEvent } from '../../utils/utils';
import './TechStack.scss';

interface TechStackProps {
    isTechStackClick: boolean
    setIsTechStackClick: React.Dispatch<React.SetStateAction<boolean>>
}

const TechStack: React.FC<TechStackProps> = ({ isTechStackClick, setIsTechStackClick }) => {
    const popupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        mouseEvent(popupRef, isTechStackClick, setIsTechStackClick);
    }, [isTechStackClick, setIsTechStackClick]);

    return (
        <section ref={popupRef} className="tech-stack__wrapper">
            <h3>Skills</h3>
            <img src="https://skillicons.dev/icons?i=js,ts,html,css,scss,react,vite,angular,postgres,mongodb,nodejs,vscode,github" />
        </section>
    );
};

export default TechStack;