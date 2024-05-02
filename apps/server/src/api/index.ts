import { ResponseData } from '@users/common';

export type WsResponse<T> = Promise<{
    event: T;
    data: ResponseData<T>;
}>;
