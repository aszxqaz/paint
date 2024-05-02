import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { LoadingIndicator } from '../components/CenterSpinner';
import { useAppState } from '../state/context';
import { useAsyncCallbacks } from '../state/hooks';

export type LoadingState =
    | {
          loading: true;
          message: string;
      }
    | {
          loading: false;
      };

export type LoadingSetter = (state: LoadingState) => void;

export function Connect() {
    const { connectApiClient } = useAsyncCallbacks();

    useEffect(() => {
        connectApiClient();
    }, [connectApiClient]);

    return <></>;
}

export function Root() {
    const { appState } = useAppState();

    if (appState.loading.loading) {
        return <LoadingIndicator message={appState.loading.message} />;
    }

    return <Outlet />;
}
