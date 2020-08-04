import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { LogIn } from 'preact-feather';

import { RootState } from 'stores';
import { login, resetAuthErrors } from 'stores/authStore';

const Login: FunctionalComponent = () => {
    const dispatch = useDispatch();
    const { error, inProgress } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitDetails = async (): Promise<void> => {
        await dispatch(login({ user: { email, password } }));
    };

    return (
        <form>
            <div class="field">
                <div class="control">
                    <input
                        class="input is-large"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onInput={(e): void => {
                            dispatch(resetAuthErrors());
                            setEmail((e.target as HTMLInputElement).value);
                        }}
                    />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input
                        class="input is-large"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onInput={(e): void => {
                            dispatch(resetAuthErrors());
                            setPassword((e.target as HTMLInputElement).value);
                        }}
                    />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <h2 class="error is-size-5">{error}</h2>
                </div>
            </div>
            <button
                class={`button is-block is-deep-space-sparkle is-large is-fullwidth${inProgress ? ' is-loading' : ''}`}
                type="button"
                onClick={submitDetails}
            >
                <div class="level">
                    <div class="level-item">
                        <span>Submit</span>
                        <span class="icon is-small">
                            <LogIn />
                        </span>
                    </div>
                </div>
            </button>
        </form>
    );
};

export default Login;
