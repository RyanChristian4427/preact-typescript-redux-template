import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { LogIn } from 'preact-feather';

import { RootState } from 'stores';
import { logout, register, resetAuthErrors } from 'stores/authStore';

const Register: FunctionalComponent = () => {
    const dispatch = useDispatch();
    const { error, inProgress } = useSelector((state: RootState) => state.auth);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);

    const submitDetails = async (): Promise<void> => {
        await dispatch(register({ user: { firstName, lastName, email, password } }));
    };

    return (
        <form>
            <div class="field">
                <div class="control">
                    <input
                        class="input is-large"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onInput={(e): void => setFirstName((e.target as HTMLInputElement).value)}
                    />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input
                        class="input is-large"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onInput={(e): void => setLastName((e.target as HTMLInputElement).value)}
                    />
                </div>
            </div>
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

export default Register;
