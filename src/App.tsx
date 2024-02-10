import { FaRegCopyright } from 'react-icons/fa6';

import './App.scss';

function App() {

    return (
        <>
            <header>
                <input type="button" value="About Me" />
                <input type="button" value="Portfolio" />
            </header>

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
