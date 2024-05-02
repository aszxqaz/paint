import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppState } from '../state/context';

export function AuthenticationRedirect({ children }: PropsWithChildren) {
    const location = useLocation();
    const { appState } = useAppState();

    console.log(appState);

    const authenticated = appState.username !== null;

    if (!authenticated && location.pathname != '/welcome') {
        return <Navigate to="/welcome" state={{ from: location }} replace />;
    }

    if (authenticated && !location.pathname.includes('rooms')) {
        return <Navigate to="/rooms" state={{ from: location }} replace />;
    }

    return children;
}
