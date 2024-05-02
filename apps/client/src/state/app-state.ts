import { CanvasElement, Room } from '@users/common';
import { create } from 'zustand';
import { apiClient } from '../api';

type LoadingState =
    | {
          loading: true;
          message: string;
      }
    | {
          loading?: false;
          error?: string;
      };

type AppState = {
    connected: boolean;
    username: string | null;
    loading: LoadingState;
    rooms: Room<CanvasElement>[] | null;
};

const initialAppState: AppState = {
    connected: false,
    username: null,
    loading: {
        loading: false,
    },
    rooms: null,
};

type AppStore = AppState & {
    setError: (errors: string | string[]) => void;
    setLoading: (message: string) => void;
    fetchRooms: () => void;
    createRoom: (roomName: string) => void;
    sendName: (username: string) => void;
};

export const useAppStore = create<AppStore>((set, get) => ({
    ...initialAppState,
    setError: errors => {
        const error = Array.isArray(errors) ? errors[0] : errors;
        set({ loading: { loading: false, error } });
    },
    setLoading: message => set({ loading: { loading: true, message } }),
    fetchRooms: async () => {
        get().setLoading('Fetching rooms...');
        const response = await apiClient.getAllRooms();
        if ('error' in response) {
            get().setError(response.error);
        } else {
            const rooms = response.data.rooms.map(room => JSON.parse(room));
            set({ loading: { loading: false }, rooms });
        }
    },
    createRoom: async (roomName: string) => {
        get().setLoading('Creating room...');
        const response = await apiClient.createRoom(roomName);
        if ('error' in response) {
            get().setError(response.error);
        } else {
            const rooms = [...(get().rooms || []), response.data.room];
            set({ loading: { loading: false }, rooms });
        }
    },
    sendName: async (username: string) => {
        get().setLoading('Saying hello to the server...');
        const response = await apiClient.sendHello(username);
        if ('error' in response) {
            get().setError(response.error);
        } else {
            set({ loading: { loading: false }, username });
        }
    },
}));
