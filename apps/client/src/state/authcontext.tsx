import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { AuthState, AuthStateType } from './auth';
import { PartialDispatch } from './types';

type AuthStateContext = {
    authState: AuthStateType;
    setAuthState: PartialDispatch<AuthStateType>;
};

const defaultAuthState = AuthState.initial;

const defaultAuthStateContext: AuthStateContext = {
    authState: AuthState.initial,
    setAuthState: _ => () => {},
};

const AuthStateContext = createContext(defaultAuthStateContext);

export function AuthStateProvider({ children }: PropsWithChildren) {
    const [authState, setAuthState] = useState<AuthStateType>(defaultAuthState);

    return (
        <AuthStateContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthStateContext.Provider>
    );
}

export const useAuthState = () => useContext(AuthStateContext);
