import { Spinner } from '@chakra-ui/react';
import { Outlet, useFetchers } from 'react-router-dom';

export function Layout() {
    let fetchers = useFetchers();
    let fetcherInProgress = fetchers.some(f =>
        ['loading', 'submitting'].includes(f.state)
    );

    return (
        <>
            {fetcherInProgress && <Spinner />}
            <Outlet />
        </>
    );
}
