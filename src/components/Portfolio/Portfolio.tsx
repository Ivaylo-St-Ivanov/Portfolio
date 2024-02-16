import React, { useState, useEffect, useRef } from 'react';

import { mouseEvent } from '../../utils/utils';

import './Portfolio.scss';

interface PortfolioProps {
    isPortfolioClick: boolean
    setIsPortfolioClick: React.Dispatch<React.SetStateAction<boolean>>
}

interface IConfig {
    baseUrl: string
    appId: string
    apiKey: string
}

interface IProject {
    objectId: string
    projectName: string
    screenshot: { url: string }
    repoLink: string
    demoLink?: string
    techStack?: string
}

const Portfolio: React.FC<PortfolioProps> = ({ isPortfolioClick, setIsPortfolioClick }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [projects, setProjects] = useState<IProject[]>([]);
    const [hovered, setHovered] = useState<string>('');
    const popupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const responseConfig = await fetch('http://localhost:5000/config');
                const configData: IConfig = await responseConfig.json();

                const response = await fetch(configData.baseUrl, {
                    method: 'GET',
                    headers: {
                        'X-Parse-Application-Id': configData.appId,
                        'X-Parse-REST-API-Key': configData.apiKey
                    }
                });
                const projectsData = await response.json();

                setProjects(projectsData.results.reverse());
            } catch (err) {
                console.error('Error fetching data: ', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        mouseEvent(popupRef, isPortfolioClick, setIsPortfolioClick);
    }, [isPortfolioClick, setIsPortfolioClick]);

    return (
        <section ref={popupRef} className="portfolio-wrapper">
            {!loading && (
                <>
                    <h3>Projects</h3>
                    <p>Here you can see a part of my projects and also projects collaborating with other people.</p>
                </>
            )}

            {loading && (
                <div className="portfolio-wrapper__loading">
                    <span>Loading...</span>
                </div>
            )}

            <div className="portfolio-wrapper__projects">
                {projects && projects.map(p => (
                    <article
                        key={p.objectId}
                        onMouseEnter={() => setHovered(p.objectId)}
                        onMouseLeave={() => setHovered('')}
                        onTouchStart={() => setHovered(p.objectId)}
                        className="portfolio-wrapper__projects__box"
                    >
                        <img src={p.screenshot.url} alt="App screenshot" />
                        {hovered == p.objectId && (
                            <div className="portfolio-wrapper__projects__box__overlay">
                                <h3>{p.projectName}</h3>
                                <p>{p.techStack}</p>
                                <div className="portfolio-wrapper__projects__box__overlay__buttons">
                                    {p.demoLink && <a href={p.demoLink} target="_blank" rel="noopener noreferrer">Demo</a>}
                                    <a href={p.repoLink} target="_blank" rel="noopener noreferrer">Repo</a>
                                </div>
                            </div>
                        )}
                    </article>
                ))}

                <article className="portfolio-wrapper__projects__box"></article>
            </div>
        </section>
    );
};

export default Portfolio;