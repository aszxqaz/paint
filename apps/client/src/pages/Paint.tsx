import { HStack } from '@chakra-ui/react';
import { KonvaEventObject, NodeConfig } from 'konva/lib/Node';
import { RefObject, useRef } from 'react';
import { Layer, Stage } from 'react-konva';
import { useParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useApiClient } from '../api';
import { useWindowResize } from '../hooks/useWindowResize';
import { ShapeCreator } from '../shapes/ShapeCreator';
import { ToolType, useShapesStore } from '../state/shapes/shapes-state';
import { InstrumentPanel } from './InstrumentPanel';

const RATE_MS = 1000;

export function Paint() {
    const shapesSent = new Set<string>();
    const panelRef = useRef() as RefObject<HTMLDivElement>;
    const [windowWidth] = useWindowResize();
    const { apiClient } = useApiClient();
    const { roomId } = useParams();
    const stageWidth = windowWidth - (panelRef.current?.clientWidth || 0);
    const isMouseDown = useRef(false);

    // const {
    //     addShape,
    //     drawShape,
    //     shapes,
    //     updateShapeDrawn: updateShape,
    //     setTool,
    //     tool,
    //     selectedShapeId,
    //     setSelectedShapeId,
    //     setShapes,
    //     changeShapeConfig,
    // } = useShapes();
    const {
        tool,
        shapes,
        addShapeToView,
        setSelectedShape,
        saveViewToHistory,
        updateShapeDrawn,
        updateShapeConfig,
    } = useShapesStore(
        useShallow(state => ({
            tool: state.tool,
            shapes: state.view,
            addShapeToView: state.addShapeToView,
            setSelectedShape: state.setSelectedShape,
            saveViewToHistory: state.saveViewToHistory,
            updateShapeDrawn: state.updateShapeDrawn,
            updateShapeConfig: state.updateShapeConfig,
        }))
    );
    // const [otherShapes, setOtherShapes] = useState<ShapesState>(
    //     ShapesState.initial()
    // );

    // useEffect(() => {
    //     apiClient.getRoom(roomId!).then(response => {
    //         if ('error' in response) {
    //         } else {
    //             const elements = response.data.room.elements;
    //             setOtherShapes(ShapesState.fromElements(elements));
    //         }
    //     });
    // }, []);

    // useEffect(() => {
    //     const toSend = shapes.in_.view.filter(
    //         shape => !shapesSent.has(shape.props.id)
    //     );
    //     apiClient.sendElementsUpdate(roomId!, toSend);
    // }, [shapes.in_.view]);

    const checkDeselect = (e: KonvaEventObject<MouseEvent>) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedShape(null);
        }
    };

    const onPointerDown = (e: KonvaEventObject<MouseEvent>) => {
        // checkDeselect(e);
        isMouseDown.current = true;

        if (tool.toolType == ToolType.Shape) {
            console.log('here');
            const shape = ShapeCreator.create(tool.shapeType, e.evt, {
                fill: 'black',
                stroke: 'black',
            });
            addShapeToView(shape);
        }
    };

    const onPointerMove = (e: KonvaEventObject<MouseEvent>) => {
        if (isMouseDown.current) {
            updateShapeDrawn(e.evt.layerX, e.evt.layerY);
        }
    };

    const onPointerUp = (e: KonvaEventObject<MouseEvent>) => {
        isMouseDown.current = false;
        saveViewToHistory();
    };

    const createUpdateShapeConfig = (id: string) => (config: NodeConfig) =>
        updateShapeConfig(id, config);

    return (
        <HStack alignItems="stretch" gap={0}>
            <InstrumentPanel ref={panelRef} />
            <Stage
                width={stageWidth}
                height={window.innerHeight}
                // @ts-ignore
                onTouchStart={onPointerDown}
                onMouseDown={onPointerDown}
                onMouseMove={onPointerMove}
                onMouseUp={onPointerUp}
            >
                <Layer>
                    {shapes.map(shape => {
                        return shape.render(
                            tool.toolType === ToolType.Selection &&
                                tool.shape === shape,
                            tool.toolType === ToolType.Selection
                                ? () => setSelectedShape(shape)
                                : () => {},
                            createUpdateShapeConfig(shape.props.id)
                        );
                    })}
                    {/* {otherShapes.in_.view.map(shape => shape.render())} */}
                </Layer>
            </Stage>
        </HStack>
    );
}
