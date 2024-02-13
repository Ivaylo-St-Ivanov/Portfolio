import { useState, useEffect } from 'react';
import { FaRegCopyright, FaGithub, FaLinkedin } from 'react-icons/fa6';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { IoWarningOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

import AboutMe from './components/AboutMe/AboutMe';
import ContactMe from './components/ContactMe/ContactMe';
import TechStack from './components/TechStack/TechStack';
import './App.scss';

function App() {
    const [isAboutMeClick, setIsAboutMeClick] = useState<boolean>(false);
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
                <div>
                    <a href="https://www.linkedin.com/in/ivaylo-st-ivanov" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                    <a href="https://github.com/Ivaylo-St-Ivanov" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                </div>
                <div>
                    <span onClick={() => setIsAboutMeClick(true)}>About Me</span>
                    <span>Portfolio</span>
                </div>
            </header>

            <aside>
                <span onClick={() => setIsContactMeClick(true)}><MdArrowBackIos /> Contact Me</span>
            </aside>

            <aside>
                <span onClick={() => setIsTechStackClick(true)}>Tech Stack <MdArrowForwardIos /></span>
            </aside>

            <main className="wrapper">
                <div>
                    <img src="/images/photo4.jpeg" alt="Ivaylo's photo" />
                </div>
                <div className="wrapper__overlay"></div>

                <div className="wrapper__title">
                    <div>
                        <span>&lt;/ Hi, There &gt;</span>
                        <h1>I'm Ivo and I'm a</h1>
                        <h2>JS Web Developer</h2>
                    </div>
                </div>

                {toastMessage && (
                    <div className={`wrapper__toast-message ${toastMessage.includes('Successful sent') ? 'success' : 'warning'}`}>
                        {toastMessage.includes('Successful sent') && <TiTick />}
                        {toastMessage.includes('required') && <IoWarningOutline />}
                        <span>{toastMessage}</span>
                    </div>
                )}
            </main>

            {isAboutMeClick && <AboutMe isAboutMeClick={isAboutMeClick} setIsAboutMeClick={setIsAboutMeClick} />}

            {isContactMeClick && <ContactMe isContactMeClick={isContactMeClick} setIsContactMeClick={setIsContactMeClick} setToastMessage={setToastMessage} />}

            {isTechStackClick && <TechStack isTechStackClick={isTechStackClick} setIsTechStackClick={setIsTechStackClick} />}

            <footer>
                <span><FaRegCopyright /> Ivaylo Ivanov</span>
            </footer>
        </>
    );
}

export default App;
