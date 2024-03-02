import React, { useState, useEffect, useRef } from 'react';

import { mouseEvent } from '../../utils/utils';
import { projectsData } from '../../utils/data';

import './Portfolio.scss';

interface PortfolioProps {
    isPortfolioClick: boolean
    setIsPortfolioClick: React.Dispatch<React.SetStateAction<boolean>>
}

// interface IProject {
//     projectName: string,
//     fileType: string,
//     file: string,
//     description: string,
//     repoLink: string,
//     demoLink: string
// }

const Portfolio: React.FC<PortfolioProps> = ({ isPortfolioClick, setIsPortfolioClick }) => {
    const [isHovered, setIsHovered] = useState<number | null>(null);
    const [projectsLoaded, setProjectsLoaded] = useState<boolean>(false);
    const popupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        mouseEvent(popupRef, isPortfolioClick, setIsPortfolioClick);
    }, [isPortfolioClick, setIsPortfolioClick]);

    // const preloadProjects = useCallback((projects: IProject[]) => {
    //     const projectsPromises: Promise<void>[] = projects.map(p => {
    //         return new Promise((resolve, reject) => {
    //             if (p.fileType == 'photo') {
    //                 const img = new Image();
    //                 img.src = p.file;
    //                 img.onload = () => resolve();
    //                 img.onerror = (error) => reject(error);
    //             } else if (p.fileType == 'video') {
    //                 const video = document.createElement('video');
    //                 video.src = p.file;
    //                 video.playsInline = true;
    //                 video.oncanplaythrough = () => resolve();
    //                 video.onerror = (error) => reject(error);
    //             }
    //         });
    //     });

    //     Promise.all(projectsPromises)
    //         .then(() => {
    //             setProjectsLoaded(true);
    //         })
    //         .catch((err) => {
    //             console.error('Error preloading projects: ', err);
    //         });
    // }, []);

    useEffect(() => {
        // preloadProjects(projectsData);

        const animationFrame = requestAnimationFrame(() => {
            const timeout = setTimeout(() => {
                setProjectsLoaded(true);
            }, 2500);

            return () => clearTimeout(timeout);
        });

        return () => {
            if (animationFrame != undefined) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [projectsLoaded]);

    useEffect(() => {
        const handleHoverTimeout = () => {
            setIsHovered(null);
        };

        if (isHovered) {
            return;
        }

        const animationFrameId = requestAnimationFrame(() => {
            const timeoutId = setTimeout(handleHoverTimeout, 3000);

            return () => clearTimeout(timeoutId);
        });

        return () => {
            if (animationFrameId != undefined) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isHovered]);

    return (
        <div className="container">
            <section ref={popupRef} className="container__portfolio-wrapper">
                {!projectsLoaded && (
                    <div className="container__portfolio-wrapper__loading">
                        <span>L</span>
                        <span>o</span>
                        <span>a</span>
                        <span>d</span>
                        <span>i</span>
                        <span>n</span>
                        <span>g</span>
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </div>
                )}

                {projectsLoaded && (
                    <>
                        <h3>Projects</h3>
                        <p>Here you can see a few of my projects, as well as projects where I have collaborated with other people.</p>

                        <div className="container__portfolio-wrapper__projects">
                            {projectsData.map((p, index) => (
                                <article
                                    key={index}
                                    className="container__portfolio-wrapper__projects__box"
                                >
                                    {p.fileType == 'photo' && <img src={p.file} alt="App screenshot" />}
                                    {p.fileType == 'video' && (
                                        <video autoPlay muted loop playsInline >
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
                                            {p.repoLink && <a href={p.repoLink} target="_blank" rel="noopener noreferrer">Repo</a>}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

export default Portfolio;
