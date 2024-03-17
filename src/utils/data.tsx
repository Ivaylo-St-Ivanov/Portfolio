export const myPhotos = [
    '/images/photo3.jpeg',
    '/images/photo1.jpeg',
    '/images/photo2.jpeg',
    '/images/photo4.jpeg',
];

export const aboutMeText = (
    <>
        <p>&nbsp;&nbsp;&nbsp;Hello!</p>
        <p>&nbsp;&nbsp;&nbsp;</p>
        <p>My name is Ivaylo Ivanov 👋, a motivated junior enthusiast diving into the world of web development. I'm seeking a position to work in a team, develop, to expand my problem-solving and technical skills. Currently immersed in continuous learning, I am honing my JavaScript and React skills. I'm interested in anything related to UI and Web development, particularly Front-End using JS, React, and SCSS. I'm a loyal team player who is always fully committed to the success of the project. With my dedication, I'm confident in my ability to make meaningful contributions to any team or project. I consider myself a curious, proactive, motivated, and collaborative individual with a strong desire to learn. I'm highly adaptable to dynamic work environments. That's why I would love the chance to join a new team.</p>
        <p>&nbsp;&nbsp;&nbsp;</p>
        <p>I want to experience new places and cultures, to create something that could positively impact people globally. I love to travel, be in nature, and enjoy what it gives us. I strive to exercise regularly and eat well. Some of my other favorite activities include reading books, visiting theater plays, riding a motorbike, meeting friends, and last but not least, cooking.</p>
        <p>&nbsp;&nbsp;&nbsp;</p>
        <p>I think it is important for people to appreciate what they have while they have it.</p>
    </>
);

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const bookshelvesVideoPublicId = import.meta.env.VITE_BOOKSHELVES_VIDEO_PUBLIC_ID;
const exploreBGVideoPublicId = import.meta.env.VITE_EXPLORE_BG_VIDEO_PUBLIC_ID;

const bookshelvesVideoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${bookshelvesVideoPublicId}.mp4`;
const exploreBGVideoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${exploreBGVideoPublicId}.mp4`;

export const projectsData = [
    {
        projectName: 'Explore BG',
        fileType: 'video',
        file: exploreBGVideoUrl,
        description: 'Next.js, TS, SCSS / still working on it /',
        repoLink: 'https://github.com/ExploreBG/ExploreBG',
        demoLink: ''
    },
    {
        projectName: 'My Portfolio app',
        fileType: 'photo',
        file: '/images/portfolio.png',
        description: 'React - Vite, TS, SCSS, ExpressJS',
        repoLink: 'https://github.com/Ivaylo-St-Ivanov/Portfolio',
        demoLink: ''
    },
    {
        projectName: 'Hangman Game',
        fileType: 'photo',
        file: '/images/hangman.png',
        description: 'React - Vite, TS, SCSS',
        repoLink: 'https://github.com/Ivaylo-St-Ivanov/Hangman--React-TS',
        demoLink: 'https://hangman-g-a-m-e.github.io/'
    },
    {
        projectName: 'Pets Match',
        fileType: 'photo',
        file: '/images/pets.png',
        description: 'Team participant (intern) within the Software university\'s “Intern & Team Lead Academy”',
        repoLink: 'https://github.com/ConnectingPets/PetsMatch',
        demoLink: ''
    },
    {
        projectName: 'The Old Bookshelves',
        fileType: 'video',
        file: bookshelvesVideoUrl,
        description: 'Angular, TS, CSS, HTML, Back4App',
        repoLink: 'https://github.com/Ivaylo-St-Ivanov/The-Old-Bookshelves--Angular',
        demoLink: 'https://the-old-bookshelves.github.io/home'
    },
    {
        projectName: 'Infinity Inspiration',
        fileType: 'photo',
        file: '/images/infinity.png',
        description: 'My first project 😄 - ReactJS, CSS, HTML, Back4App',
        repoLink: 'https://github.com/Ivaylo-St-Ivanov/Infinity-Inspiration--ReactJS/tree/main',
        demoLink: 'https://infinity-inspiration.github.io/'
    }
];