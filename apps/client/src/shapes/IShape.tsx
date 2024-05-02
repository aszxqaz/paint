import Konva from 'konva';
import { KonvaEventObject, NodeConfig } from 'konva/lib/Node';
import { CircleConfig } from 'konva/lib/shapes/Circle';
import { EllipseConfig } from 'konva/lib/shapes/Ellipse';
import { LineConfig } from 'konva/lib/shapes/Line';
import { RectConfig } from 'konva/lib/shapes/Rect';
import { ReactNode } from 'react';
import { Circle, Ellipse, KonvaNodeComponent, Line, Rect } from 'react-konva';
import { KonvaNodeWithTransformer } from './TransformerComponent';

export enum ShapeType {
    Rect = 'rect',
    Circle = 'circle',
    Ellipse = 'ellipse',
    Line = 'line',
    // Star,
}

export interface IShape<T extends NodeConfig = NodeConfig> {
    props: ShapeProps<T>;
    type: ShapeType;
    update(canvasX: number, canvasY: number): IShape<T>;
    updateConfig(config: T): IShape<T>;
    checkNotVoid(): boolean;
    render(
        isSelected?: boolean,
        onSelect?: (evt: KonvaEventObject<MouseEvent>) => void,
        onConfigChange?: (config: T) => void
    ): ReactNode;
}

export type ShapeProps<T extends NodeConfig> = {
    id: string;
    isSelected: boolean;
} & T;

export abstract class BaseShape<T extends NodeConfig> {
    constructor(public readonly props: ShapeProps<T>) {}

    protected renderImpl<K extends Konva.Node>(
        Component: KonvaNodeComponent<K, T>,
        isSelected?: boolean,
        onSelect?: (evt: KonvaEventObject<MouseEvent>) => void,
        onConfigChange?: (config: T) => void
    ): ReactNode {
        return (
            <KonvaNodeWithTransformer
                key={this.props.id}
                Component={Component}
                isSelected={isSelected}
                onSelect={onSelect}
                onConfigChange={onConfigChange}
                props={{ ...this.props }}
            />
        );
    }
}

export class LineShape
    extends BaseShape<LineConfig>
    implements IShape<LineConfig>
{
    public readonly type = ShapeType.Line;

    update(canvasX: number, canvasY: number): IShape<LineConfig> {
        const points = (this.props.points!.slice(0, 2) as number[]).concat([
            canvasX,
            canvasY,
        ]);
        return new LineShape({
            ...this.props,
            points,
        });
    }

    checkNotVoid(): boolean {
        return (
            Math.pow(this.props.points![0] - this.props.points![2], 2) +
                Math.pow(this.props.points![1] - this.props.points![3], 2) >
            0
        );
    }

    render(
        isSelected?: boolean,
        onSelect?: (evt: KonvaEventObject<MouseEvent>) => void,
        onConfigChange?: (config: LineConfig) => void
    ): ReactNode {
        return super.renderImpl(Line, isSelected, onSelect, onConfigChange);
    }

    updateConfig(config: LineConfig): IShape<LineConfig> {
        return new LineShape({
            ...this.props,
            ...config,
        });
    }
}

export class RectShape
    extends BaseShape<RectConfig>
    implements IShape<RectConfig>
{
    public readonly type = ShapeType.Rect;

    update(canvasX: number, canvasY: number): IShape<RectConfig> {
        return new RectShape({
            ...this.props,
            width: canvasX - this.props.x!,
            height: canvasY - this.props.y!,
        });
    }

    checkNotVoid(): boolean {
        return this.props.width != 0 && this.props.height != 0;
    }

    render(
        isSelected?: boolean,
        onSelect?: (evt: KonvaEventObject<MouseEvent>) => void,
        onConfigChange?: (config: RectConfig) => void
    ): ReactNode {
        return super.renderImpl(Rect, isSelected, onSelect, onConfigChange);
    }

    updateConfig(config: RectConfig): IShape<RectConfig> {
        return new RectShape({
            ...this.props,
            ...config,
        });
    }
}

export class CircleShape
    extends BaseShape<CircleConfig>
    implements IShape<CircleConfig>
{
    public readonly type = ShapeType.Circle;

    update(canvasX: number, canvasY: number): IShape<CircleConfig> {
        const radius = Math.max(
            Math.abs(canvasX - this.props.x!),
            Math.abs(canvasY - this.props.y!)
        );
        return new CircleShape({
            ...this.props,
            radius,
        });
    }

    checkNotVoid(): boolean {
        return this.props.radius! > 0;
    }

    render(
        isSelected?: boolean,
        onSelect?: (evt: KonvaEventObject<MouseEvent>) => void,
        onConfigChange?: (config: CircleConfig) => void
    ): ReactNode {
        return super.renderImpl(Circle, isSelected, onSelect, onConfigChange);
    }

    updateConfig(config: CircleConfig): IShape<CircleConfig> {
        return new CircleShape({
            ...this.props,
            ...config,
        });
    }
}

export class EllipseShape
    extends BaseShape<EllipseConfig>
    implements IShape<EllipseConfig>
{
    public readonly type = ShapeType.Ellipse;

    update(canvasX: number, canvasY: number): IShape<EllipseConfig> {
        const radiusX = Math.abs(canvasX - this.props.x!);
        const radiusY = Math.abs(canvasY - this.props.y!);
        return new EllipseShape({
            ...this.props,
            radiusX,
            radiusY,
        });
    }

    checkNotVoid(): boolean {
        return this.props.radiusX > 0 && this.props.radiusY > 0;
    }

    render(
        isSelected?: boolean,
        onSelect?: (evt: KonvaEventObject<MouseEvent>) => void,
        onConfigChange?: (config: EllipseConfig) => void
    ): ReactNode {
        return super.renderImpl(Ellipse, isSelected, onSelect, onConfigChange);
    }

    updateConfig(config: EllipseConfig): IShape<EllipseConfig> {
        return new EllipseShape({
            ...this.props,
            ...config,
        });
    }
}
