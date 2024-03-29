import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import { TiTick } from 'react-icons/ti';

import './MainPage.scss';

interface MainPageProps {
    toastMessage: string
}

const MainPage: React.FC<MainPageProps> = ({ toastMessage }) => {
    return (
        <main className="wrapper">
            <div>
                <img src="/images/photo4.2.jpeg" width="720" height="650" loading="eager" alt="Ivaylo's photo" title="Ivaylo Ivanov's Portfolio website" />
            </div>
            <div className="wrapper__overlay"></div>

            <div className="wrapper__title">
                <div>
                    <span>&lt;/ Hi, there &gt;</span>
                    <h1>I'm Ivo <span><em>and I'm a</em></span></h1>
                    <h2>
                        <span>J</span>
                        <span>S</span>
                        <span> </span>
                        <span>W</span>
                        <span>e</span>
                        <span>b</span>
                        <span> </span>
                        <span>D</span>
                        <span>e</span>
                        <span>v</span>
                        <span>e</span>
                        <span>l</span>
                        <span>o</span>
                        <span>p</span>
                        <span>e</span>
                        <span>r</span>
                    </h2>
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
    );
};

export default MainPage;