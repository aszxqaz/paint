import { NodeConfig } from 'konva/lib/Node';
import { ShapeConfig } from 'konva/lib/Shape';
import { EllipseConfig } from 'konva/lib/shapes/Ellipse';
import { v4 } from 'uuid';
import {
    CircleShape,
    EllipseShape,
    LineShape,
    RectShape,
    ShapeProps,
    ShapeType,
} from './IShape';
import { ShapeJson } from './ShapeSerializer';

export class ShapeCreator {
    static create(type: ShapeType, event: MouseEvent, config: ShapeConfig) {
        const id = v4();
        switch (type) {
            case ShapeType.Rect:
                return new RectShape({
                    id,
                    isSelected: false,
                    x: event.layerX,
                    y: event.layerY,
                    width: 0,
                    height: 0,
                    ...config,
                });

            case ShapeType.Circle:
                return new CircleShape({
                    id,
                    isSelected: false,
                    x: event.layerX,
                    y: event.layerY,
                    radius: 0,
                    ...config,
                });

            case ShapeType.Ellipse:
                return new EllipseShape({
                    id,
                    isSelected: false,
                    x: event.layerX,
                    y: event.layerY,
                    radiusX: 0,
                    radiusY: 0,
                    ...config,
                });

            case ShapeType.Line:
                return new LineShape({
                    id,
                    isSelected: false,
                    points: [
                        event.layerX,
                        event.layerY,
                        event.layerX,
                        event.layerY,
                    ],
                    ...config,
                });
        }
    }

    static fromJson<T extends NodeConfig>({ type, props }: ShapeJson) {
        switch (type) {
            case ShapeType.Rect:
                return new RectShape({
                    ...props,
                });

            case ShapeType.Circle:
                return new CircleShape({
                    ...props,
                });

            case ShapeType.Ellipse:
                return new EllipseShape({
                    ...(props as unknown as ShapeProps<EllipseConfig>),
                });

            case ShapeType.Line:
                return new LineShape({
                    ...props,
                });
        }
    }
}
