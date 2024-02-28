import React, { useEffect, useRef, useState } from 'react';

import { mouseEvent } from '../../utils/utils';
import './TechStack.scss';

interface TechStackProps {
    isTechStackClick: boolean
    setIsTechStackClick: React.Dispatch<React.SetStateAction<boolean>>
}

const icons = [
    'https://skillicons.dev/icons?i=js,ts,react,vite,angular',
    'https://skillicons.dev/icons?i=express,nodejs,mongodb,postgres',
    'https://skillicons.dev/icons?i=html,css,scss,vscode,github'
];

const TechStack: React.FC<TechStackProps> = ({ isTechStackClick, setIsTechStackClick }) => {
    const [iconsLoaded, setIconsLoaded] = useState<boolean>(false);
    const popupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        mouseEvent(popupRef, isTechStackClick, setIsTechStackClick);
    }, [isTechStackClick, setIsTechStackClick]);

    useEffect(() => {
        preloadIcons();
    }, []);

    const preloadIcons = () => {
        const iconPromises: Promise<void>[] = icons.map(photoUrl => {
            return new Promise((resolve, reject) => {
                const icon = new Image();
                icon.src = photoUrl;
                icon.onload = () =>  resolve();
                icon.onerror = (error) =>  reject(error);
            });
        });

        Promise.all(iconPromises)
            .then(() => {
                setIconsLoaded(true);
            })
            .catch((err) => {
                console.error('Error preloading icons:', err);
            });
    };

    return (
        <section ref={popupRef} className="tech-stack__wrapper">
            {!iconsLoaded && <p>Loading...</p>}
            
            {iconsLoaded && <h3>Skills</h3>}
            
            {iconsLoaded && icons.map((i, index) => (
                <img key={index} src={i} alt="Tech stack icons" />
            ))}
        </section>
    );
};

export default TechStack;