import { useState, useEffect } from 'react';
import { FaBarsStaggered, FaGithub, FaLinkedin, FaRegCopyright } from 'react-icons/fa6';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

import MainPage from './components/MainPage/MainPage';
import AboutMe from './components/AboutMe/AboutMe';
import Portfolio from './components/Portfolio/Portfolio';
import ContactMe from './components/ContactMe/ContactMe';
import TechStack from './components/TechStack/TechStack';
import './App.scss';

function App() {
    const [onClickNavBar, setOnClickNavBar] = useState<boolean>(false);
    const [isAboutMeClick, setIsAboutMeClick] = useState<boolean>(false);
    const [isPortfolioClick, setIsPortfolioClick] = useState<boolean>(false);
    const [isContactMeClick, setIsContactMeClick] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [isTechStackClick, setIsTechStackClick] = useState<boolean>(false);

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
                <div className={onClickNavBar ? '' : 'nav'}>
                    <FaBarsStaggered onClick={() => setOnClickNavBar(true)} />
                </div>

                <div className={onClickNavBar ? 'show' : ''}>
                    <a href="https://www.linkedin.com/in/ivaylo-st-ivanov" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                    <a href="https://github.com/Ivaylo-St-Ivanov" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                </div>
                <div className={onClickNavBar ? 'show' : ''}>
                    <span onClick={() => setIsAboutMeClick(true)}>About Me</span>
                    <span onClick={() => setIsPortfolioClick(true)}>Portfolio</span>
                </div>
            </header>

            <aside className={onClickNavBar ? 'show' : ''}>
                <span onClick={() => setIsContactMeClick(true)}><MdArrowBackIos /> Contact Me</span>
            </aside>

            <aside className={onClickNavBar ? 'show' : ''}>
                <span onClick={() => setIsTechStackClick(true)}>Tech Stack <MdArrowForwardIos /></span>
            </aside>

            <MainPage toastMessage={toastMessage} />

            {isAboutMeClick && <AboutMe isAboutMeClick={isAboutMeClick} setIsAboutMeClick={setIsAboutMeClick} />}

            {isPortfolioClick && <Portfolio isPortfolioClick={isPortfolioClick} setIsPortfolioClick={setIsPortfolioClick} />}

            {isContactMeClick && <ContactMe isContactMeClick={isContactMeClick} setIsContactMeClick={setIsContactMeClick} setToastMessage={setToastMessage} />}

            {isTechStackClick && <TechStack isTechStackClick={isTechStackClick} setIsTechStackClick={setIsTechStackClick} />}

            <footer>
                <span><FaRegCopyright /> {new Date().getFullYear()} Ivaylo Ivanov</span>
            </footer>
        </>
    );
}

export default App;
