import {
    ClientToServerEvents,
    CreateRoomResponse,
    GetAllRoomsResponse,
    GetRoomResponse,
    HelloResponse,
    Messages,
    ServerToClientEvents,
    UpdateElementsResponse,
} from '@users/common';
import { Socket, io } from 'socket.io-client';
import { ShapeJson } from '../shapes/ShapeSerializer';

type ApiClientOptions = {
    url?: string;
};

export class ApiClient {
    private readonly socket: Socket<ServerToClientEvents, ClientToServerEvents>;

    constructor(private readonly url?: string) {
        this.socket = io('ws://localhost:3000', {
            autoConnect: false,
        });
    }

    async connect(): Promise<void> {
        return new Promise(resolve => {
            this.socket.connect();
            if (!this.socket.hasListeners('connect')) {
                this.socket.on('connect', resolve);
            }
        });
    }

    async sendHello(username: string): Promise<HelloResponse> {
        return new Promise(resolve => {
            this.socket.emit(Messages.Hello, { username });
            if (!this.socket.hasListeners(Messages.Hello)) {
                this.socket.on(Messages.Hello, resolve);
            }
        });
    }

    async createRoom(roomname: string): Promise<CreateRoomResponse> {
        return new Promise(resolve => {
            this.socket.emit(Messages.CreateRoom, { roomname });
            if (!this.socket.hasListeners(Messages.CreateRoom)) {
                this.socket.on(Messages.CreateRoom, resolve);
            }
        });
    }

    async getAllRooms(): Promise<GetAllRoomsResponse> {
        return new Promise(resolve => {
            this.socket.emit(Messages.GetAllRooms);
            if (!this.socket.hasListeners(Messages.GetAllRooms)) {
                this.socket.on(Messages.GetAllRooms, resolve);
            }
        });
    }

    async getRoom(roomId: string): Promise<GetRoomResponse> {
        return new Promise(resolve => {
            this.socket.emit(Messages.GetRoom, { id: roomId });
            if (!this.socket.hasListeners(Messages.GetRoom)) {
                this.socket.on(Messages.GetRoom, resolve);
            }
        });
    }

    async sendElementsUpdate(
        roomId: string,
        elements: ShapeJson[]
    ): Promise<UpdateElementsResponse> {
        return new Promise(resolve => {
            this.socket.emit(Messages.UpdateElements, { roomId, elements });
            if (!this.socket.hasListeners(Messages.UpdateElements)) {
                this.socket.on(Messages.UpdateElements, resolve);
            }
        });
    }
}

export const apiClient = new ApiClient();
