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
                <img src="/images/photo4.2.jpeg" alt="Ivaylo's photo" />
            </div>
            <div className="wrapper__overlay"></div>

            <div className="wrapper__title">
                <div>
                    <span>&lt;/ Hi, there &gt;</span>
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
    );
};

export default MainPage;