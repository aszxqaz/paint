import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { ElementsService } from './collab/element.service';
import { LobbyGateway } from './lobby/lobby.gateway';
import { LobbyService } from './lobby/lobby.service';
import { redisModule } from './redis/redis.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
            exclude: ['/api*'],
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        redisModule,
    ],
    controllers: [AppController],
    providers: [AppGateway, LobbyGateway, LobbyService, ElementsService],
})
export class AppModule {}
