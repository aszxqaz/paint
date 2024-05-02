import {
    Inject,
    Logger,
    UseFilters,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Messages } from '@users/common';
import RedisClient from 'ioredis';
import { Server, Socket } from 'socket.io';
import { WsResponse } from './api';
import { HelloMessagePayload } from './app.dto';
import { REDIS } from './redis/redis.module';
import { WsExceptionFilter } from './ws.exception.filter';

@UsePipes(new ValidationPipe())
@WebSocketGateway({
    cors: {
        origin: ['http://localhost:4200'],
    },
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection {
    private readonly logger = new Logger(AppGateway.name);
    @WebSocketServer() io: Server;

    constructor(@Inject(REDIS) private readonly redisClient: RedisClient) {}

    afterInit(server: any) {
        this.logger.log(`Gateway initialized`);
    }

    async handleDisconnect(@ConnectedSocket() socket: Socket) {
        this.logger.debug(`Cliend id:${socket.id} disconnected`);
        const res = await this.redisClient.del(`socket:${socket.id}`);
        if (res) {
            this.logger.debug(`Socket id:${socket.id} removed from Redis`);
        } else {
            this.logger.debug(
                `Socket id:${socket.id} not found in Redis - nothing to remove`
            );
        }
    }

    handleConnection(client: any, ...args: any[]) {
        const { sockets } = this.io.sockets;
        this.logger.debug(`Client id: ${client.id} connected`);
        this.logger.debug(`Number of connected clients: ${sockets.size}`);
    }

    @SubscribeMessage('ping')
    handlePing(client: any, data: any) {
        this.logger.debug(`Message received from client id: ${client.id}`);
        this.logger.debug(`Payload: ${data}`);
        return {
            event: 'pong',
        };
    }

    @UseFilters(new WsExceptionFilter(Messages.Hello))
    @SubscribeMessage(Messages.Hello)
    async handleHello(
        @MessageBody() payload: HelloMessagePayload,
        @ConnectedSocket() socket: Socket
    ): WsResponse<Messages.Hello> {
        this.logger.debug(
            `Received Hello from client id: ${
                socket.id
            }, payload: ${JSON.stringify(payload)} `
        );
        await this.redisClient.set(`socket:${socket.id}`, payload.username);
        return {
            event: Messages.Hello,
            data: {
                data: null,
            },
        };
    }
}
