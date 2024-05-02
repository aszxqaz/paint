export type CanvasElement = {
    id: string;
};

export class Room<T extends any = any> {
    constructor(public id: string, public name: string, public elements: T[]) {}
}

export type ShapeJson = {
    type: string;
    props: {
        id: string
    }
};