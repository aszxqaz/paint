import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Messages } from '@users/common';
import { Server, Socket } from 'socket.io';
import { WsResponse } from '../api';
import { CreateRoomPayload, HelloMessagePayload } from '../app.dto';
import { WsExceptionFilter } from '../ws.exception.filter';
import { LobbyService } from './lobby.service';

@UsePipes(new ValidationPipe())
@WebSocketGateway({
    cors: {
        origin: ['http://localhost:4200'],
    },
})
export class LobbyGateway {
    private readonly logger = new Logger(LobbyGateway.name);
    @WebSocketServer() io: Server;

    constructor(private readonly roomService: LobbyService) {}

    // @UseFilters(new WsExceptionFilter('elements'))
    @SubscribeMessage('elements')
    handleElements(
        @MessageBody() payload: HelloMessagePayload,
        @ConnectedSocket() socket: Socket
    ) {
        this.logElements;
        socket.emit('hello', { ok: true });
    }

    @UseFilters(new WsExceptionFilter(Messages.CreateRoom))
    @SubscribeMessage(Messages.CreateRoom)
    async handleCreateRoom(
        @MessageBody() { roomname }: CreateRoomPayload,
        @ConnectedSocket() socket: Socket
    ): WsResponse<Messages.CreateRoom> {
        this.logCreateRoom(socket);
        const room = await this.roomService.createRoom(roomname);
        return {
            event: Messages.CreateRoom,
            data: { data: { room } },
        };
    }

    @UseFilters(new WsExceptionFilter(Messages.GetAllRooms))
    @SubscribeMessage(Messages.GetAllRooms)
    async handleGetAllRooms(
        @ConnectedSocket() socket: Socket
    ): WsResponse<Messages.GetAllRooms> {
        this.logCreateRoom(socket);
        const { rooms } = await this.roomService.getAllRoomsJson();
        return {
            event: Messages.GetAllRooms,
            data: { data: { rooms } },
        };
    }

    private logElements(socket: Socket, payload: HelloMessagePayload) {
        this.logger.debug(
            `Received [Elements] from client id: ${
                socket.id
            }, payload: ${JSON.stringify(payload)} `
        );
    }

    private logCreateRoom(socket: Socket) {
        this.logger.debug(`Received [CreateRoom] from client id: ${socket.id}`);
    }
}
