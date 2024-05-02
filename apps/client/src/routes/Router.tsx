import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { LobbyPage } from '../pages/Lobby';
import { Paint } from '../pages/Paint';
import { Welcome } from '../pages/Welcome';
import { AuthenticationRedirect } from './AuthenticationRedirect';

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Outlet />}>
                    <Route index element={<AuthenticationRedirect />} />
                    {/* <Route
                        path="connect"
                        element={
                            <AuthenticationRedirect>
                                <Connect />
                            </AuthenticationRedirect>
                        }
                    /> */}
                    <Route
                        path="welcome"
                        element={
                            <AuthenticationRedirect>
                                <Welcome />
                            </AuthenticationRedirect>
                        }
                    />
                    <Route
                        path="/rooms"
                        element={
                            <AuthenticationRedirect>
                                <LobbyPage />
                            </AuthenticationRedirect>
                        }
                    />
                    <Route path="/rooms/:roomId" element={<Paint />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

// export const router = createBrowserRouter([
//     {
//         path: '/',
//         Component: Layout,
//         children: [
//             {
//                 index: true,
//                 loader: connectApiClient(apiClient),
//                 Component: Welcome,
//             },
// {
//     path: 'rooms',
//     loader: loadRooms(loadingSetter, apiClient),
//     Component: LobbyPage,
//     children: [
//         {
//             path: ':roomId',
//             loader: loadRoom(loadingSetter, apiClient),
//             Component: RoomPage,
//         },
//     ],
// },
//         ],
//     },
// ]);
