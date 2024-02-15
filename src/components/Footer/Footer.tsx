import React from 'react';
import { FaRegCopyright } from 'react-icons/fa6';

import './Footer.scss';

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer>
            <span><FaRegCopyright /> Ivaylo Ivanov</span>
        </footer>
    );
};

export default Footer;