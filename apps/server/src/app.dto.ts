import {
    CanvasElement,
    ICreateRoomPayload,
    IHelloMessagePayload,
    IUpdateElementsPayload,
} from '@users/common';
import {
    IsArray,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';

export class HelloMessagePayload implements IHelloMessagePayload {
    @IsString()
    @MinLength(2)
    @MaxLength(15)
    username: string;
}

export class CreateRoomPayload implements ICreateRoomPayload {
    @IsString()
    @MinLength(2)
    @MaxLength(15)
    roomname: string;
}

export class UpdateElementsPayload implements IUpdateElementsPayload {
    @IsString()
    @IsUUID()
    roomId: string;

    @IsArray()
    elements: CanvasElement[];
}
