import React, { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import { aboutMeContent, myPhotos } from '../../utils/data';
import './AboutMe.scss';

interface AboutMeProps { }

const AboutMe: React.FC<AboutMeProps> = () => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

    const onClickNextPhoto = () => {
        setCurrentPhotoIndex(index => (index + 1) % myPhotos.length);
    };

    const onClickPrevPhoto = () => {
        setCurrentPhotoIndex(index => index == 0 ? myPhotos.length - 1 : index - 1);
    };

    return (
        <section className="about-me__wrapper">
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