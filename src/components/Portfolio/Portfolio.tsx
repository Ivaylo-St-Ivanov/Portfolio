import React, { useState, useEffect, useRef } from 'react';

import { mouseEvent } from '../../utils/utils';
import './Portfolio.scss';

interface PortfolioProps {
    isPortfolioClick: boolean
    setIsPortfolioClick: React.Dispatch<React.SetStateAction<boolean>>
}

interface IProject {
    objectId: string
    projectName: string
    screenshot: { url: string }
}

interface IConfig {
    baseUrl: string
    appId: string
    apiKey: string
}

const Portfolio: React.FC<PortfolioProps> = ({ isPortfolioClick, setIsPortfolioClick }) => {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const popupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const responseConfig = await fetch('http://localhost:5000/config');
                const configData: IConfig = await responseConfig.json();

                const responseProjects = await fetch(configData.baseUrl, {
                    method: 'GET',
                    headers: {
                        'X-Parse-Application-Id': configData.appId,
                        'X-Parse-REST-API-Key': configData.apiKey
                    }
                });
                const projectsData = await responseProjects.json();

                setProjects(projectsData.results.reverse());
            } catch (err) {
                console.error('Error fetching data: ', err);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    useEffect(() => {
        mouseEvent(popupRef, isPortfolioClick, setIsPortfolioClick);
    }, [isPortfolioClick, setIsPortfolioClick]);

    return (
        <section ref={popupRef} className="portfolio-wrapper">
            {!loading && <h3>My Projects</h3>}

            {loading && (
                <div className="portfolio-wrapper__loading">
                    <span>Loading...</span>
                </div>
            )}

            <div className="portfolio-wrapper__projects">
                {projects && projects.map(p => (
                    <article key={p.objectId} className="portfolio-wrapper__projects__box">
                        <img src={p.screenshot.url} alt="App screenshot" />
                        <div className="portfolio-wrapper__projects__box__overlay">
                            <div>Details</div>
                        </div>
                    </article>
                ))}

                <article className="portfolio-wrapper__projects__box"></article>
            </div>
        </section>
    );
};

export default Portfolio;