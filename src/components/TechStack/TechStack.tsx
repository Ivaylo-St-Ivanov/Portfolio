import React, { useEffect, useRef, useState } from 'react';

import { mouseEvent } from '../../utils/utils';
import './TechStack.scss';

interface TechStackProps {
    isTechStackClick: boolean
    setIsTechStackClick: React.Dispatch<React.SetStateAction<boolean>>
}

const icons = [
    'https://skillicons.dev/icons?i=js,ts',
    'https://skillicons.dev/icons?i=react,vite,next,angular',
    'https://skillicons.dev/icons?i=express,nodejs,mongodb,postgres',
    'https://skillicons.dev/icons?i=scss,css,html,vscode,github'
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
                icon.onload = () => resolve();
                icon.onerror = (error) => reject(error);
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
        <div className="container">
            <section ref={popupRef} className="container__tech-stack__wrapper">
                {!iconsLoaded && <p>Loading...</p>}

                {/* {iconsLoaded && <h3>Skills</h3>} */}

                {iconsLoaded && icons.map((i, index) => (
                    <img key={index} src={i} width="300" height="60" loading="eager" alt="Tech stack icons" title="Ivaylo Ivanov's tech stack" />
                ))}
            </section>
        </div>
    );
};

export default TechStack;