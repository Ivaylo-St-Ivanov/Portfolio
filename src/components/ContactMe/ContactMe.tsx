import React, { useEffect, useRef } from 'react';

import { mouseEvent } from '../../utils/utils';
import './ContactMe.scss';

interface ContactMeProps {
    isContactMeClick: boolean
    setIsContactMeClick: React.Dispatch<React.SetStateAction<boolean>>
}

const ContactMe: React.FC<ContactMeProps> = ({ isContactMeClick, setIsContactMeClick }) => {
    const popupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        mouseEvent(popupRef, isContactMeClick, setIsContactMeClick);
    }, [isContactMeClick, setIsContactMeClick]);

    return (
        <section ref={popupRef} className="contact-me__wrapper">
            <h3>Contact</h3>
            
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder="John Doe" />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="john.doe@gmail.com" />
                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" id="subject" />
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" placeholder="......" />

                <input type="submit" value="send message" />
            </form>
        </section>
    );
};

export default ContactMe;