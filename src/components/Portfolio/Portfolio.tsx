import React, { useEffect, useRef } from 'react';

import { IProject } from '../../App';
import { mouseEvent } from '../../utils/utils';

import './Portfolio.scss';

interface PortfolioProps {
    isPortfolioClick: boolean
    setIsPortfolioClick: React.Dispatch<React.SetStateAction<boolean>>
    projects: IProject[]
}

const Portfolio: React.FC<PortfolioProps> = ({ isPortfolioClick, setIsPortfolioClick, projects }) => {
    const popupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        mouseEvent(popupRef, isPortfolioClick, setIsPortfolioClick);
    }, [isPortfolioClick, setIsPortfolioClick]);

    return (
        <section ref={popupRef} className="portfolio-wrapper">
            <h3>Projects</h3>
            <p>Here you can see a few of my projects, as well as projects where I have collaborated with other people.</p>

            <div className="portfolio-wrapper__projects">
                {projects && projects.map(p => (
                    <article
                        key={p.objectId}
                        className="portfolio-wrapper__projects__box"
                    >
                        <img src={p.screenshot.url} alt="App screenshot" />

                        <div className="portfolio-wrapper__projects__box__overlay">
                            <h3>{p.projectName}</h3>
                            <p>{p.techStack}</p>
                            <div className="portfolio-wrapper__projects__box__overlay__buttons">
                                {p.demoLink && <a href={p.demoLink} target="_blank" rel="noopener noreferrer">Demo</a>}
                                <a href={p.repoLink} target="_blank" rel="noopener noreferrer">Repo</a>
                            </div>
                        </div>
                    </article>
                ))}

                <article className="portfolio-wrapper__projects__box"></article>
            </div>
        </section>
    );
};

export default Portfolio;