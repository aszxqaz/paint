import { Params } from 'react-router-dom';
import { ApiClient } from '../api/client';
import { LoadingSetter } from './Root';

export const connectApiClient =
    (setLoading: LoadingSetter, apiClient: ApiClient) => async () => {
        // setLoading({ loading: true, message: 'Loading rooms...' });
        const rooms = await apiClient.connect();
        console.log('Connected');
        // setLoading({ loading: false });
        return rooms;
    };

export const loadRooms =
    (setLoading: LoadingSetter, apiClient: ApiClient) => async () => {
        // setLoading({ loading: true, message: 'Loading rooms...' });
        const rooms = await apiClient.getAllRooms();
        // setLoading({ loading: false });
        return rooms;
    };

export const loadRoom =
    (setLoading: LoadingSetter, apiClient: ApiClient) =>
    async ({ params }: { params: Params }) => {
        // setLoading({
        //     loading: true,
        //     message: `Loading room #${params.roomId}...`,
        // });
        const room = await apiClient.getRoom(params.roomId!);
        // setLoading({ loading: false });
        return room;
    };
