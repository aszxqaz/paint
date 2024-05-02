import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { Messages } from '@users/common';
import { Socket } from 'socket.io';

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
    private logger = new Logger(WsExceptionFilter.name);

    constructor(private readonly event: Messages) {
        super();
    }

    catch(exception: any, host: ArgumentsHost) {
        // console.log(stringify(exception));
        // console.log(stringify(host));
        const socket = host.switchToWs().getClient<Socket>();
        this.logger.error(exception);
        const error = exception.response?.message ?? 'Unknown error occured';
        socket.emit(this.event, {
            error,
        });
    }
}
