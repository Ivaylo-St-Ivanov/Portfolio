import React, { useState, useEffect, useRef, FormEvent } from 'react';

import { mouseEvent } from '../../utils/utils';
import './ContactMe.scss';

interface ContactMeProps {
    isContactMeClick: boolean
    setIsContactMeClick: React.Dispatch<React.SetStateAction<boolean>>
    setToastMessage: React.Dispatch<React.SetStateAction<string>>
}

const ContactMe: React.FC<ContactMeProps> = ({ isContactMeClick, setIsContactMeClick, setToastMessage }) => {
    const [status, setStatus] = useState<string>('send message');
    const apiUrl = import.meta.env.VITE_API_URL;
    const popupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        mouseEvent(popupRef, isContactMeClick, setIsContactMeClick);
    }, [isContactMeClick, setIsContactMeClick]);

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        if (name == '') {
            setToastMessage('Name is required!');
            return;
        } else if (email == '') {
            setToastMessage('Email is required!');
            return;
        } else if (message == '') {
            setToastMessage('Message is required!');
            return;
        }

        const details = {
            name,
            email,
            subject,
            message
        };

        setStatus('Sending...');
                                           
        const response = await fetch(`${apiUrl}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(details)
        });
        setStatus('send message');

        const result = await response.json();
        setToastMessage(result.status);
        setIsContactMeClick(false);
    };

    return (
        <section ref={popupRef} className="contact-me__wrapper">
            <h3>Contact</h3>

            <form onSubmit={onFormSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder="John Doe" />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="john.doe@gmail.com" />
                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" id="subject" />
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" placeholder="......" />

                <input type="submit" className={status != 'send message' ? 'disabled' : ''} value={status} />
            </form>
        </section>
    );
};

export default ContactMe;