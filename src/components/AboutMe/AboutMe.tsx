import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import { aboutMeText, myPhotos } from '../../utils/data';
import { mouseEvent } from '../../utils/utils';
import './AboutMe.scss';

interface AboutMeProps {
    isAboutMeClick: boolean
    setIsAboutMeClick: React.Dispatch<React.SetStateAction<boolean>>
}

const AboutMe: React.FC<AboutMeProps> = ({ isAboutMeClick, setIsAboutMeClick }) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
    const popupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        mouseEvent(popupRef, isAboutMeClick, setIsAboutMeClick);
    }, [isAboutMeClick, setIsAboutMeClick]);

    useEffect(() => {
        preloadImages();
    }, []);

    const preloadImages = () => {
        const imagePromises: Promise<void>[] = myPhotos.map(photoUrl => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = photoUrl;
                img.onload = () =>  resolve();
                img.onerror = (error) =>  reject(error);
            });
        });

        Promise.all(imagePromises)
            .then(() => {
                setImagesLoaded(true);
            })
            .catch((err) => {
                console.error('Error preloading images:', err);
            });
    };

    const onClickNextPhoto = () => {
        setCurrentPhotoIndex(index => (index + 1) % myPhotos.length);
    };

    const onClickPrevPhoto = () => {
        setCurrentPhotoIndex(index => index == 0 ? myPhotos.length - 1 : index - 1);
    };

    return (
        <div className="container">
            <section ref={popupRef} className="container__about-me__wrapper">
                <article className="container__about-me__wrapper__content">
                    {/* <h3>About Me</h3> */}
                    {aboutMeText}
                </article>

                <div className="container__about-me__wrapper__photos">
                    <IoIosArrowUp onClick={onClickPrevPhoto} />

                    <div>
                        {imagesLoaded && <img src={myPhotos[currentPhotoIndex]} alt="Ivaylo's photo" />}
                    </div>

                    <IoIosArrowDown onClick={onClickNextPhoto} />
                </div>
            </section>
        </div>
    );
};

export default AboutMe;