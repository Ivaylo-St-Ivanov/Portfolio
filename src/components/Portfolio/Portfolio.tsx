import React, { useState, useEffect, useRef } from 'react';

import { mouseEvent } from '../../utils/utils';
import { projectsData } from '../../utils/data';

import './Portfolio.scss';

interface PortfolioProps {
    isPortfolioClick: boolean
    setIsPortfolioClick: React.Dispatch<React.SetStateAction<boolean>>
}

const Portfolio: React.FC<PortfolioProps> = ({ isPortfolioClick, setIsPortfolioClick }) => {
    const [isHovered, setIsHovered] = useState<number | null>(null);
    const popupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        mouseEvent(popupRef, isPortfolioClick, setIsPortfolioClick);
    }, [isPortfolioClick, setIsPortfolioClick]);

    useEffect(() => {
        if (isHovered) {
            const timer = setTimeout(() => {
                setIsHovered(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isHovered]);

    return (
        <div className="container">
            <section ref={popupRef} className="container__portfolio-wrapper">
                <h3>Projects</h3>
                <p>Here you can see a few of my projects, as well as projects where I have collaborated with other people.</p>

                <div className="container__portfolio-wrapper__projects">
                    {projectsData && projectsData.map((p, index) => (
                        <article
                            key={index}
                            className="container__portfolio-wrapper__projects__box"
                        >
                            {p.fileType == 'photo' && <img src={p.file} alt="App screenshot" />}
                            {p.fileType == 'video' && (
                                <video autoPlay muted loop>
                                    <source src={p.file} />
                                    Your browser does not support the video tag.
                                </video>
                            )}

                            <div
                                onClick={() => setIsHovered(index)}
                                onTouchStart={() => setIsHovered(index)}
                                onTouchEnd={() => setIsHovered(null)}
                                className={`container__portfolio-wrapper__projects__box__overlay ${isHovered == index ? 'hovered' : null}`}
                            >
                                <h3>{p.projectName}</h3>
                                <p>{p.description}</p>
                                <div className="container__portfolio-wrapper__projects__box__overlay__buttons">
                                    {p.demoLink && <a href={p.demoLink} target="_blank" rel="noopener noreferrer">Demo</a>}
                                    <a href={p.repoLink} target="_blank" rel="noopener noreferrer">Repo</a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
