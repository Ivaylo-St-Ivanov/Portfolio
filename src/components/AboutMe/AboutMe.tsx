import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import { myPhotos } from '../../utils/data';
import { mouseEvent } from '../../utils/utils';
import './AboutMe.scss';

interface AboutMeProps {
    isAboutMeClick: boolean
    setIsAboutMeClick: React.Dispatch<React.SetStateAction<boolean>>
    aboutMeContent: string
}

const AboutMe: React.FC<AboutMeProps> = ({ isAboutMeClick, setIsAboutMeClick, aboutMeContent }) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
    const popupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        mouseEvent(popupRef, isAboutMeClick, setIsAboutMeClick);
    }, [isAboutMeClick, setIsAboutMeClick]);

    const onClickNextPhoto = () => {
        setCurrentPhotoIndex(index => (index + 1) % myPhotos.length);
    };

    const onClickPrevPhoto = () => {
        setCurrentPhotoIndex(index => index == 0 ? myPhotos.length - 1 : index - 1);
    };

    return (
        <section ref={popupRef} className="about-me__wrapper">
            <article className="about-me__wrapper__content">
                <h3>About Me</h3>
                <p>&nbsp;&nbsp;&nbsp;Hello!</p>
                <p>&nbsp;&nbsp;&nbsp;</p>
                <p>&nbsp;&nbsp;&nbsp;{aboutMeContent}</p>
            </article>

            <div className="about-me__wrapper__photos">
                <IoIosArrowUp onClick={onClickPrevPhoto} />

                <div>
                    <img src={myPhotos[currentPhotoIndex]} alt="Ivaylo's photo" />
                </div>

                <IoIosArrowDown onClick={onClickNextPhoto} />
            </div>
        </section>
    );
};

export default AboutMe;