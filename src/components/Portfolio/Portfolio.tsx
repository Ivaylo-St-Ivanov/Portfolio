import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { getConfigData, mouseEvent } from '../../utils/utils';
import { IConfig, IProject } from '../../utils/interfaces';

import Loading from '../Loading/Loading';
import './Portfolio.scss';

interface PortfolioProps {
    isPortfolioClick: boolean
    setIsPortfolioClick: React.Dispatch<React.SetStateAction<boolean>>
}

const Portfolio: React.FC<PortfolioProps> = ({ isPortfolioClick, setIsPortfolioClick }) => {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const popupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const config: IConfig = await getConfigData();

                const response = await fetch(config.baseUrl, {
                    method: 'GET',
                    headers: {
                        'X-Parse-Application-Id': config.appId,
                        'X-Parse-REST-API-Key': config.apiKey
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

        fetchConfig();
    }, []);

    useEffect(() => {
        mouseEvent(popupRef, isPortfolioClick, setIsPortfolioClick);
    }, [isPortfolioClick, setIsPortfolioClick]);

    return (
        <section ref={popupRef} className="portfolio-wrapper">
            {!loading && <h3>My Projects</h3>}

            {loading && (
                <Loading />
            )}

            <div className="portfolio-wrapper__projects">
                {projects && projects.map(p => (
                    <Link key={p.objectId} to={`/project/${p.objectId}`} className="portfolio-wrapper__projects__box">
                        <img src={p.screenshot.url} alt="App screenshot" />
                        <div className="portfolio-wrapper__projects__box__overlay">
                            <div>Details</div>
                        </div>
                    </Link>
                ))}

                <article className="portfolio-wrapper__projects__box"></article>
            </div>
        </section>
    );
};

export default Portfolio;