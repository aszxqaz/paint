import { Button, HStack, IconButton, VStack } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { IoEllipseOutline } from 'react-icons/io5';
import { PiCircle, PiCursor, PiLineSegment, PiRectangle } from 'react-icons/pi';
import { useShallow } from 'zustand/react/shallow';
import { ShapeType } from '../shapes/IShape';
import { ToolType, useShapesStore } from '../state/shapes/shapes-state';

type InstrumentPanelProps = {};

export const InstrumentPanel = forwardRef<HTMLDivElement, InstrumentPanelProps>(
    function ({}, ref) {
        const { canRedo, canUndo, setTool, tool, redo, undo } = useShapesStore(
            useShallow(state => ({
                undo: state.undo,
                redo: state.redo,
                canUndo: state.history.canUndo,
                canRedo: state.history.canRedo,
                tool: state.tool,
                setTool: state.setTool,
            }))
        );
        return (
            <VStack p="1rem" bg="blue.500" ref={ref}>
                {/* <Popover closeOnBlur={true} isOpen={isPopoverOpen}>
        <PopoverTrigger>
            <IconButton
                icon={<PiPalette />}
                onClick={() => setIsPopoverOpen(true)}
                aria-label="palette"
            />
        </PopoverTrigger>
        <Portal>
            <PopoverContent w="fit-content" ml="1rem">
                <SketchPicker
                    color={color}
                    onChangeComplete={res => {
                        setColor(res.hex);
                    }}
                />{" "}
            </PopoverContent>
        </Portal>
    </Popover> */}
                <HStack>
                    <IconButton
                        aria-label="Cursor"
                        title="Cursor"
                        icon={<PiCursor />}
                        onClick={() =>
                            setTool({
                                toolType: ToolType.Selection,
                                shape: null,
                            })
                        }
                        isDisabled={tool.toolType == ToolType.Selection}
                    />
                </HStack>
                <HStack>
                    <IconButton
                        aria-label="Line"
                        title="Line"
                        icon={<PiLineSegment />}
                        onClick={() =>
                            setTool({
                                toolType: ToolType.Shape,
                                shapeType: ShapeType.Line,
                            })
                        }
                        isDisabled={
                            tool.toolType == ToolType.Shape &&
                            tool.shapeType == ShapeType.Line
                        }
                    />
                    <IconButton
                        aria-label="Rectangle"
                        title="Rectangle"
                        icon={<PiRectangle />}
                        onClick={() =>
                            setTool({
                                toolType: ToolType.Shape,
                                shapeType: ShapeType.Rect,
                            })
                        }
                        isDisabled={
                            tool.toolType == ToolType.Shape &&
                            tool.shapeType == ShapeType.Rect
                        }
                    />
                </HStack>
                <HStack>
                    <IconButton
                        aria-label="Circle"
                        title="Circle"
                        icon={<PiCircle />}
                        onClick={() =>
                            setTool({
                                toolType: ToolType.Shape,
                                shapeType: ShapeType.Circle,
                            })
                        }
                        isDisabled={
                            tool.toolType == ToolType.Shape &&
                            tool.shapeType == ShapeType.Circle
                        }
                    />
                    <IconButton
                        aria-label="Ellipse"
                        title="Ellipse"
                        icon={<IoEllipseOutline />}
                        onClick={() =>
                            setTool({
                                toolType: ToolType.Shape,
                                shapeType: ShapeType.Ellipse,
                            })
                        }
                        isDisabled={
                            tool.toolType == ToolType.Shape &&
                            tool.shapeType == ShapeType.Ellipse
                        }
                    />
                </HStack>
                <HStack>
                    <Button isDisabled={!canUndo} onClick={undo}>
                        Undo
                    </Button>
                    <Button isDisabled={!canRedo} onClick={redo}>
                        Redo
                    </Button>
                </HStack>
                {/* <HStack>
                <IconButton
                    aria-label="Triangle"
                    title="Triangle"
                    icon={<PiTriangle />}
                    isDisabled={instrument == "triangle"}
                    onClick={() => onChangeInstrument("triangle")}
                />
            </HStack>
            <HStack>
                <IconButton
                    aria-label="Star"
                    title="Star"
                    icon={<PiStar />}
                    isDisabled={instrument == "star"}
                    onClick={() => onChangeInstrument("star")}
                />
            </HStack>
            <IconButton
                aria-label="Pencil"
                title="Pencil"
                icon={<PiPencil />}
                isDisabled={instrument == "pencil"}
                onClick={() => onChangeInstrument("pencil")}
            /> */}
                {/* <IconButton
                aria-label="eraser"
                icon={<PiEraser />}
                isDisabled={instrument == "eraser"}
                onClick={() => onChangeInstrument("eraser")}
            /> */}

                {/* <PencilWidthMenu /> */}
            </VStack>
        );
    }
);
