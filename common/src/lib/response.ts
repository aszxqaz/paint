import { Room } from './entity';
import { Messages } from './event';

export type Response<T> =
    | {
          error: string | string[];
      }
    | {
          data: T;
      };

export type HelloResponse = Response<null>;

export type CreateRoomResponse = Response<{
    room: Room;
}>;

export type GetRoomResponse = Response<{
    room: Room;
}>;

type RoomsJson = string;

export type GetAllRoomsResponse = Response<{
    rooms: RoomsJson[];
}>;

export type UpdateElementsResponse = Response<null>;

export type ElementsUpdatedServerEvent = Response<{
    room: Room;
}>;

export type ResponseData<T> = T extends Messages.CreateRoom
    ? CreateRoomResponse
    : T extends Messages.Hello
    ? HelloResponse
    : T extends Messages.GetAllRooms
    ? GetAllRoomsResponse
    : T extends Messages.GetRoom
    ? GetRoomResponse
    : T extends Messages.UpdateElements
    ? UpdateElementsResponse
    : never;
