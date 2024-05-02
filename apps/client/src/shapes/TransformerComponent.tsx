import Konva from 'konva';
import { KonvaEventObject, NodeConfig } from 'konva/lib/Node';
import React, { useEffect } from 'react';
import { KonvaNodeComponent, Transformer } from 'react-konva';

type TransformerComponentProps<K extends Konva.Node, P extends NodeConfig> = {
    isSelected?: boolean;
    onSelect?: (evt: KonvaEventObject<MouseEvent>) => void;
    Component: KonvaNodeComponent<K, P>;
    props: NodeConfig;
    onConfigChange?: (config: P) => void;
};

export function KonvaNodeWithTransformer<
    K extends Konva.Node,
    P extends NodeConfig
>({
    props,
    isSelected,
    onConfigChange,
    onSelect,
    Component,
}: TransformerComponentProps<K, P>) {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    useEffect(() => {
        if (isSelected && trRef) {
            // @ts-ignore
            trRef.current!.nodes([shapeRef.current]);
            // @ts-ignore
            trRef.current!.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            {/* @ts-ignore */}
            <Component
                onClick={onSelect}
                onTap={onSelect}
                // @ts-ignore
                ref={shapeRef}
                {...props}
                draggable={isSelected}
                onDragEnd={e => {
                    // @ts-ignore
                    onConfigChange({ x: e.target.x(), y: e.target.y() });
                }}
                onTransformEnd={e => {
                    const node = shapeRef.current! as Konva.Node;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // node.scaleX(1);
                    // node.scaleY(1);
                    // @ts-ignore
                    onConfigChange({
                        x: node.x(),
                        y: node.y(),
                        // width: Math.max(5, node.width() * scaleX),
                        // height: Math.max(5, node.height() * scaleY),
                        scaleX,
                        scaleY,
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    // @ts-ignore
                    ref={trRef}
                    flipEnabled={false}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (
                            Math.abs(newBox.width) < 5 ||
                            Math.abs(newBox.height) < 5
                        ) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
}
