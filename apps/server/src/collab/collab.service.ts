import { Inject, Injectable } from '@nestjs/common';
import { CanvasElement, Room } from '@users/common';
import RedisClient from 'ioredis';
import { REDIS } from '../redis/redis.module';
import { ElementsService } from './element.service';

@Injectable()
export class CollabService {
    constructor(
        @Inject(REDIS) private readonly redisClient: RedisClient,
        private readonly elemService: ElementsService
    ) {}

    async updateElements(id: string, elements: CanvasElement[]): Promise<Room> {
        const json = await this.getRoomJson(id);
        const room = JSON.parse(json) as Room<CanvasElement>;
        const updated = this.elemService.update(room.elements, elements);
        room.elements = updated;
        await this.redisClient.set(`room:${id}`, JSON.stringify(room));
        return room;
    }

    async getRoomJson(id: string) {
        return this.redisClient.get(`room:${id}`);
    }
}
