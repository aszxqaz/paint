import {
    ICreateRoomPayload,
    IGetRoomPayload,
    IHelloMessagePayload,
    IUpdateElementsPayload,
} from './request';
import {
    CreateRoomResponse,
    ElementsUpdatedServerEvent,
    GetAllRoomsResponse,
    GetRoomResponse,
    HelloResponse,
    UpdateElementsResponse,
} from './response';

export enum Messages {
    Hello = 'hello',
    CreateRoom = 'create-room',
    UpdateElements = 'update-elements',
    ElementsUpdated = 'elements-updated',
    GetAllRooms = 'get-all-rooms',
    GetRoom = 'get-room',
}

export interface ClientToServerEvents {
    [Messages.CreateRoom]: (payload: ICreateRoomPayload) => void;
    [Messages.Hello]: (payload: IHelloMessagePayload) => void;
    [Messages.GetAllRooms]: () => void;
    [Messages.UpdateElements]: (payload: IUpdateElementsPayload) => void;
    [Messages.GetRoom]: (payload: IGetRoomPayload) => void;
}

export interface ServerToClientEvents {
    [Messages.CreateRoom]: (payload: CreateRoomResponse) => void;
    [Messages.Hello]: (payload: HelloResponse) => void;
    [Messages.GetAllRooms]: (payload: GetAllRoomsResponse) => void;
    [Messages.ElementsUpdated]: (payload: ElementsUpdatedServerEvent) => void;
    [Messages.UpdateElements]: (payload: UpdateElementsResponse) => void;
    [Messages.GetRoom]: (payload: GetRoomResponse) => void;
}
