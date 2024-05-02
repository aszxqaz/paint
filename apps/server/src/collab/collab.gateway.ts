import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {
    ClientToServerEvents,
    Messages,
    ServerToClientEvents,
} from '@users/common';
import { Server, Socket } from 'socket.io';
import { WsResponse } from '../api';
import { UpdateElementsPayload } from '../app.dto';
import { WsExceptionFilter } from '../ws.exception.filter';
import { CollabService } from './collab.service';

@UsePipes(new ValidationPipe())
@WebSocketGateway({
    cors: {
        origin: ['http://localhost:4200'],
    },
})
export class CollabGateway {
    private readonly logger = new Logger(CollabGateway.name);
    @WebSocketServer() io: Server<ClientToServerEvents, ServerToClientEvents>;

    constructor(private readonly collabService: CollabService) {}

    @UseFilters(new WsExceptionFilter(Messages.UpdateElements))
    @SubscribeMessage(Messages.UpdateElements)
    async handleUpdateElements(
        @MessageBody() payload: UpdateElementsPayload,
        @ConnectedSocket()
        socket: Socket
    ): WsResponse<Messages.UpdateElements> {
        this.logUpdateElements(socket, payload);
        const room = await this.collabService.updateElements(
            payload.roomId,
            payload.elements
        );
        const sockets = await this.io.sockets.in(payload.roomId).fetchSockets();
        for (const client of sockets) {
            if (client.id != socket.id) {
                client.emit(Messages.ElementsUpdated, { data: { room } });
            }
        }
        return {
            event: Messages.UpdateElements,
            data: null,
        };
    }

    private logUpdateElements(socket: Socket, payload: UpdateElementsPayload) {
        this.logger.debug(
            `Received [UpdateElements] from client id: ${socket.id}, room id: ${payload.roomId} `
        );
    }
}
