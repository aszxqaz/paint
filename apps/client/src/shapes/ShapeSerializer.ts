import { NodeConfig } from 'konva/lib/Node';
import { IShape, ShapeProps, ShapeType } from './IShape';

export type ShapeJson = {
    type: ShapeType;
    props: ShapeProps<NodeConfig>;
};

export class ShapeSerializer {
    static toJson(shape: IShape) {
        return {
            type: shape.type,
            props: shape.props,
        };
    }
}
