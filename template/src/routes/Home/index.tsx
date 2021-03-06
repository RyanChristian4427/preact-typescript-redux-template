import { FunctionalComponent, h } from 'preact';

import Footer from 'components/Core/Footer';
import Header from 'components/Core/Header';

import './style.scss';

const Home: FunctionalComponent = () => {
    return (
        <div class="home-page">
            <section class="hero is-fullheight is-default is-bold">
                <Header />
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <div class="columns is-vcentered">
                            <div class="column is-5">
                                <figure class="image is-4by3">
                                    <img src="https://picsum.photos/800/600/?random" alt="Description" />
                                </figure>
                            </div>
                            <div class="column is-6 is-offset-1">
                                <h1 class="title is-2">Superhero Scaffolding</h1>
                                <h2 class="subtitle is-4">Let this cover page describe a product or service.</h2>
                                <br />
                                <p class="has-text-centered">
                                    <a class="button is-medium is-info is-outlined">Learn more</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    );
};

export default Home;
