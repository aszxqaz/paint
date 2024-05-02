// export type ShapesStateInner = {
//     readonly history: History<IShape>;
//     readonly view: IShape[];
// };

// export class ShapesState {
//     private constructor(public readonly in_: ShapesStateInner) {}

//     static initial(): ShapesState {
//         return new ShapesState({
//             history: History.empty<IShape>(),
//             view: [],
//         });
//     }

//     static fromElements(elements: ShapeJson[]): ShapesState {
//         const shapes = elements.map(ShapeCreator.fromJson);
//         return new ShapesState({
//             history: History.fromInitial(shapes),
//             view: shapes,
//         });
//     }

//     shapeAddedToView(shape: IShape): ShapesState {
//         // if (!shape.checkNotVoid()) return this;
//         return new ShapesState({
//             ...this.in_,
//             view: [...this.in_.view, shape],
//         });
//     }

//     historySaved(): ShapesState {
//         if (!this.in_.view.length) return this;
//         const shape = this.in_.view[this.in_.view.length - 1];
//         if (!shape.checkNotVoid()) {
//             return new ShapesState({
//                 ...this.in_,
//                 view: this.in_.view.slice(0, this.in_.view.length - 1),
//             });
//         }
//         return new ShapesState({
//             ...this.in_,
//             history: this.in_.history.appended(this.in_.view),
//         });
//     }

//     undoMade(): ShapesState {
//         const history = this.in_.history.undo();
//         const view = history.snapshot || [];
//         return new ShapesState({
//             ...this.in_,
//             history,
//             view,
//         });
//     }

//     redoMade(): ShapesState {
//         const history = this.in_.history.redo();
//         const view = history.snapshot || [];
//         return new ShapesState({
//             ...this.in_,
//             history,
//             view,
//         });
//     }

//     shapeDrawnUpdated(x: number, y: number): ShapesState {
//         let shape = this.in_.view[this.in_.view.length - 1];
//         shape = shape.update(x, y);
//         return new ShapesState({
//             ...this.in_,
//             view: [...this.in_.view.slice(0, this.in_.view.length - 1), shape],
//         });
//     }

//     shapeConfigChanged(id: string, config: NodeConfig): ShapesState {
//         const index = this.in_.view.findIndex(s => s.props.id == id);
//         if (index == -1) return this;
//         const view = this.in_.view.slice();
//         view[index] = view[index].updateConfig(config);
//         return new ShapesState({
//             ...this.in_,
//             view,
//         }).historySaved();
//     }
// }

// const changeShapeConfig = (id: string) => (config: NodeConfig) => {
//     setShapes(prev => {
//         const index = prev.findIndex(s => s.props.id == id);
//         if (index == -1) return prev;
//         prev = prev.slice();
//         prev[index] = prev[index].updateConfig(config);
//         return prev;
//     });
// };

// const updateShape = (event: KonvaEventObject<MouseEvent>) => {
//     if (mouseDown.current) {
//         setShapes(prev => {
//             let shape = prev[prev.length - 1];
//             shape = shape.update(event.evt.layerX, event.evt.layerY);
//             return [...prev.slice(0, prev.length - 1), shape];
//         });
//     }
// };

// const addShape = (event: KonvaEventObject<MouseEvent>) => {
//     mouseDown.current = false;
// };

// const selectShapeId = (id: string | null) => () => {
//     setSelectedShapeId(id);
// };
