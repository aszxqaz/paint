// import { KonvaEventObject, NodeConfig } from 'konva/lib/Node';
// import { useRef, useState } from 'react';
// import { IShape, ShapeType } from '../../shapes/IShape';
// import { ShapeCreator } from '../../shapes/ShapeCreator';
// import { ShapesState } from '../shapes';

// export enum ToolType {
//     Shape,
//     Selection,
// }

// export type Tool =
//     | {
//           toolType: ToolType.Shape;
//           shapeType: ShapeType;
//       }
//     | {
//           toolType: ToolType.Selection;
//           shape: IShape | null;
//       };

// export function useShapes() {
//     const [shapes, setShapes] = useState<ShapesState>(ShapesState.initial());
//     const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
//     const [tool, setTool] = useState<Tool>({
//         toolType: ToolType.Selection,
//         shape: null,
//     });
//     const mouseDown = useRef(false);

//     const drawShape = (event: KonvaEventObject<MouseEvent>) => {
//         mouseDown.current = true;
//         if (tool.toolType == ToolType.Shape) {
//             const shape = ShapeCreator.create(tool.shapeType, event.evt, {
//                 fill: 'black',
//                 stroke: 'black',
//             });
//             setShapes(prev => prev.shapeAddedToView(shape));
//         }
//     };

//     const updateShapeDrawn = (event: KonvaEventObject<MouseEvent>) => {
//         if (mouseDown.current) {
//             setShapes(prev =>
//                 prev.shapeDrawnUpdated(event.evt.layerX, event.evt.layerY)
//             );
//         }
//     };

//     const addShape = (event: KonvaEventObject<MouseEvent>) => {
//         mouseDown.current = false;
//         setShapes(prev => prev.historySaved());
//     };

//     const changeShapeConfig = (id: string) => (config: NodeConfig) => {
//         setShapes(prev => prev.shapeConfigChanged(id, config));
//     };

//     return {
//         shapes,
//         drawShape,
//         updateShapeDrawn,
//         addShape,
//         tool,
//         selectedShapeId,
//         changeShapeConfig,
//         setShapes,
//         setSelectedShapeId,
//         setTool,
//     };
// }
