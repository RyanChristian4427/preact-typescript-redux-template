import { FunctionalComponent, h, VNode } from 'preact';
import { useEffect } from 'preact/hooks';
import { Suspense } from 'preact/compat';
import { route, Route, Router } from 'preact-router';
import { useSelector, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Auth from 'routes/Auth';
import Home from 'routes/Home';
import redux, { RootState } from 'stores';

const App: FunctionalComponent = () => {
    return (
        <div id="app">
            <Provider store={redux.store}>
                <PersistGate loading={<Fallback />} persistor={redux.persistor}>
                    <Suspense fallback={<Fallback />}>
                        <Router>
                            <AuthenticatedRoute path="/" component={Home} />
                            <Route path="/auth/:subPage?" component={Auth} />
                        </Router>
                    </Suspense>
                </PersistGate>
            </Provider>
        </div>
    );
};

const Fallback: FunctionalComponent = () => {
    return (
        <div class="w-screen block">
            <div class="flex">
                <div class="main-content" />
            </div>
        </div>
    );
};

const AuthenticatedRoute = (props: { path: string; component: FunctionalComponent }): VNode => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) route('/auth/login', true);
    }, [isAuthenticated]);

    if (!isAuthenticated) return null;

    return <Route {...props} />;
};

export default App;
