import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router';

import avatar from 'assets/avatar.png';

const Header: FunctionalComponent = () => {
    const [burgerClicked, setBurgerClicked] = useState(false);

    return (
        <div className="hero-head">
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item">
                            <img src={avatar} alt="gravatar placeholder" />
                        </a>
                        <span
                            className={`navbar-burger burger${burgerClicked ? ' is-active' : ''}`}
                            onClick={(): void => setBurgerClicked(!burgerClicked)}
                        >
                            <span />
                            <span />
                            <span />
                        </span>
                    </div>
                    <div className={`navbar-menu${burgerClicked ? ' is-active' : ''}`}>
                        <div className="navbar-end">
                            <div className="tabs is-right">
                                <ul>
                                    <li className="is-active">
                                        <a>Home</a>
                                    </li>
                                    <li>
                                        <Link href="/auth/login">Log Out</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
