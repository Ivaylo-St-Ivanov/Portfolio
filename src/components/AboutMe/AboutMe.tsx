import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import { aboutMeContent, myPhotos } from '../../utils/data';
import './AboutMe.scss';

interface AboutMeProps {
    isAboutMeClick: boolean
    setIsAboutMeClick: React.Dispatch<React.SetStateAction<boolean>>
}

const AboutMe: React.FC<AboutMeProps> = ({ isAboutMeClick, setIsAboutMeClick }) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
    const popupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as HTMLElement)) {
                setIsAboutMeClick(false);
            }
        };

        if (isAboutMeClick) {
            document.addEventListener('mousedown', onClickOutside);
        } else {
            document.removeEventListener('mousedown', onClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', onClickOutside);
        };
    }, [isAboutMeClick, setIsAboutMeClick]);

    const onClickNextPhoto = () => {
        setCurrentPhotoIndex(index => (index + 1) % myPhotos.length);
    };

    const onClickPrevPhoto = () => {
        setCurrentPhotoIndex(index => index == 0 ? myPhotos.length - 1 : index - 1);
    };

    return (
        <section ref={popupRef} className="about-me__wrapper">
            <article className="about-me__wrapper__content">{aboutMeContent}</article>

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