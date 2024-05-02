export interface IHelloMessagePayload {
    username: string;
}

export interface ICreateRoomPayload {
    roomname: string;
}

export interface IUpdateElementsPayload {
    roomId: string;
    elements: {
        id: string;
    }[];
}

export interface IGetRoomPayload {
    id: string;
}
