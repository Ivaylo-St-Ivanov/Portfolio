import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaRegCopyright } from 'react-icons/fa6';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

import MainPage from './components/MainPage/MainPage';
import AboutMe from './components/AboutMe/AboutMe';
import Portfolio from './components/Portfolio/Portfolio';
import ContactMe from './components/ContactMe/ContactMe';
import TechStack from './components/TechStack/TechStack';
import './App.scss';

interface IConfig {
    baseUrl: string
    appId: string
    apiKey: string
}

export interface IProject {
    objectId: string
    projectName: string
    screenshot: { url: string }
    repoLink: string
    demoLink?: string
    techStack?: string
}

function App() {
    const [aboutMeContent, setAboutMeContent] = useState<string>('');
    const [projects, setProjects] = useState<IProject[]>([]);
    const [isAboutMeClick, setIsAboutMeClick] = useState<boolean>(false);
    const [isPortfolioClick, setIsPortfolioClick] = useState<boolean>(false);
    const [isContactMeClick, setIsContactMeClick] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [isTechStackClick, setIsTechStackClick] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseConfig = await fetch('http://localhost:5000/config');
                const configData: IConfig = await responseConfig.json();

                const options = {
                    method: 'GET',
                    headers: {
                        'X-Parse-Application-Id': configData.appId,
                        'X-Parse-REST-API-Key': configData.apiKey
                    }
                };

                const responseAboutMe = await fetch(`${configData.baseUrl}/AboutMe`, options);
                const aboutMeData = await responseAboutMe.json();
                setAboutMeContent(aboutMeData.results[0].aboutMe);

                const responseProjects = await fetch(`${configData.baseUrl}/Projects`, options);
                const projectsData = await responseProjects.json();
                setProjects(projectsData.results.reverse());
            } catch (err) {
                console.error('Error fetching data: ', err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    return (
        <>
            <header>
                <div>
                    <a href="https://www.linkedin.com/in/ivaylo-st-ivanov" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                    <a href="https://github.com/Ivaylo-St-Ivanov" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                </div>
                <div>
                    <span onClick={() => setIsAboutMeClick(true)}>About Me</span>
                    <span onClick={() => setIsPortfolioClick(true)}>Portfolio</span>
                </div>
            </header>

            <aside>
                <span onClick={() => setIsContactMeClick(true)}><MdArrowBackIos /> Contact Me</span>
            </aside>

            <aside>
                <span onClick={() => setIsTechStackClick(true)}>Tech Stack <MdArrowForwardIos /></span>
            </aside>

            <MainPage toastMessage={toastMessage} />

            {isAboutMeClick && <AboutMe isAboutMeClick={isAboutMeClick} setIsAboutMeClick={setIsAboutMeClick} aboutMeContent={aboutMeContent} />}

            {isPortfolioClick && <Portfolio isPortfolioClick={isPortfolioClick} setIsPortfolioClick={setIsPortfolioClick} projects={projects} />}

            {isContactMeClick && <ContactMe isContactMeClick={isContactMeClick} setIsContactMeClick={setIsContactMeClick} setToastMessage={setToastMessage} />}

            {isTechStackClick && <TechStack isTechStackClick={isTechStackClick} setIsTechStackClick={setIsTechStackClick} />}

            <footer>
                <span><FaRegCopyright /> Ivaylo Ivanov</span>
            </footer>
        </>
    );
}

export default App;
