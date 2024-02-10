import { FaRegCopyright } from 'react-icons/fa6';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

import './App.scss';

function App() {

    return (
        <>
            <header>
                <input type="button" value="About Me" />
                <input type="button" value="Portfolio" />
            </header>

            <aside>
                <span><MdArrowBackIos /> Contact Me</span>
            </aside>

            <aside>
                <span>Tech Stack <MdArrowForwardIos /></span>
            </aside>

            <main className="wrapper">
                <div>
                    <img src="/images/image5.jpeg" alt="Ivaylo's photo" />
                </div>
                <div className="wrapper__overlay"></div>

                <div className="wrapper__title">
                    <div>
                        <span>&lt;/ Hi, There &gt;</span>
                        <h1>I'm Ivo and I'm a</h1>
                        <h2>JS Web Developer</h2>
                    </div>
                </div>
            </main>

            <footer>
                <span><FaRegCopyright /> Ivaylo Ivanov</span>
            </footer>
        </>
    );
}

export default App;
