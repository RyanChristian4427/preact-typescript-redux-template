import { ComponentChild, FunctionalComponent, Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Link, route } from 'preact-router';

import Footer from 'components/Core/footer';

import Login from './login';
// import ForgottenPassword from './forgottenPassword';
// import Register from './register';

import './style.scss';

interface IProps {
    subPage?: SubPage;
}

enum SubPage {
    login = 'login',
    register = 'register',
    forgottenPassword = 'forgotten-password',
}

const Auth: FunctionalComponent<IProps> = (props: IProps) => {
    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [form, setForm] = useState<ComponentChild>(null);
    const [links, setLinks] = useState<ComponentChild>(null);

    useEffect(() => {
        switch (props.subPage) {
            case SubPage.login:
                setTitle('Login');
                setSubtitle('Please provide your credentials to proceed.');
                setForm(<Login />);
                setLinks(
                    <Fragment>
                        <Link href="/auth/register">Sign Up</Link>
                        &nbsp;·&nbsp;
                        <Link href="/auth/forgotten-password">Forgot Password</Link>
                    </Fragment>,
                );
                break;
            // case SubPage.forgottenPassword:
            //     setTitle('Forgotten Password');
            //     setSubtitle('Please provide the email address associated with your account');
            //     setForm(<ForgottenPassword />);
            //     setLinks(
            //         <Fragment>
            //             <Link href="/auth/register">Sign Up</Link>
            //             &nbsp;·&nbsp;
            //             <Link href="/auth/login">Login</Link>
            //         </Fragment>,
            //     );
            //     break;
            // case SubPage.register:
            //     setTitle('Register');
            //     setSubtitle('Please provide your details to proceed.');
            //     setForm(<Register />);
            //     setLinks(
            //         <Fragment>
            //             <Link href="/auth/login">Login</Link>
            //             &nbsp;·&nbsp;
            //             <Link href="/auth/forgotten-password">Forgot Password</Link>
            //         </Fragment>,
            //     );
            //     break;
            default:
                route('/auth/login', true);
        }
    }, [props.subPage]);

    return (
        <div class="auth-page">
            <section class="hero is-fullheight">
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <div class="column is-4 is-offset-4">
                            <h3 class="title">{title}</h3>
                            <hr class="auth-hr" />
                            <h5 class="subtitle">{subtitle}</h5>
                            <div class="box">
                                <figure class="avatar">
                                    <img src="https://picsum.photos/800/600/?random" alt="Random Image" />
                                </figure>
                                {form}
                            </div>
                            <p class="has-text-grey">{links}</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    );
};

export default Auth;
