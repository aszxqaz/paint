import { Inject, Injectable } from '@nestjs/common';
import { Room } from '@users/common';
import RedisClient from 'ioredis';
import { v4 } from 'uuid';
import { REDIS } from '../redis/redis.module';

@Injectable()
export class LobbyService {
    constructor(@Inject(REDIS) private readonly redisClient: RedisClient) {}

    async createRoom(roomname: string): Promise<Room> {
        const id = v4();
        const room = new Room(id, roomname, []);
        await this.redisClient.set(`room:${id}`, JSON.stringify(room));
        return room;
    }

    async getAllRoomsJson() {
        const keys = await this.redisClient.keys('room:*');
        const rooms = await Promise.all(
            keys.map(key => this.redisClient.get(key))
        );
        return { rooms };
    }
}
