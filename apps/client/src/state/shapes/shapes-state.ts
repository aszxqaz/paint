import { NodeConfig } from 'konva/lib/Node';
import { create } from 'zustand';
import { IShape, ShapeType } from '../../shapes/IShape';
import { History } from './history';

export enum ToolType {
    Shape,
    Selection,
}

export type Tool =
    | {
          toolType: ToolType.Shape;
          shapeType: ShapeType;
      }
    | {
          toolType: ToolType.Selection;
          shape: IShape | null;
      };

export type ShapesState = {
    history: History<IShape>;
    view: IShape[];
    tool: Tool;
};

const initialShapesState: ShapesState = {
    tool: { toolType: ToolType.Selection, shape: null },
    history: History.empty<IShape>(),
    view: [],
};

type ShapesStore = ShapesState & {
    setTool: (tool: Tool) => void;
    setSelectedShape: (shape: IShape | null) => void;
    addShapeToView: (shape: IShape) => void;
    updateShapeDrawn: (x: number, y: number) => void;
    saveViewToHistory: () => void;
    undo: () => void;
    redo: () => void;
    updateShapeConfig: (id: string, config: NodeConfig) => void;
};

export const useShapesStore = create<ShapesStore>((set, get) => ({
    ...initialShapesState,
    setTool: (tool: Tool) => set({ tool }),
    setSelectedShape: (shape: IShape | null) =>
        set({
            tool: { toolType: ToolType.Selection, shape },
        }),
    addShapeToView: (shape: IShape) => {
        console.log('here');
        if (get().tool.toolType != ToolType.Shape) return;
        set({
            view: [...get().view, shape],
        });
    },
    updateShapeDrawn: (x: number, y: number) => {
        let shape = get().view[get().view.length - 1];
        shape = shape.update(x, y);
        const slicedView = get().view.slice(0, get().view.length - 1);
        set({ view: [...slicedView, shape] });
    },
    saveViewToHistory: () => {
        if (get().view.length == 0) return;
        const shape = get().view[get().view.length - 1];
        if (!shape.checkNotVoid()) {
            const view = get().view.slice(0, get().view.length - 1);
            return set({ view });
        }
        const history = get().history.appended(get().view);
        return set({ history });
    },
    undo: () => {
        const history = get().history.undo();
        const view = history.snapshot || [];
        set({ history, view });
    },
    redo: () => {
        const history = get().history.redo();
        const view = history.snapshot || [];
        set({ history, view });
    },
    updateShapeConfig: (id: string, config: NodeConfig) => {
        const index = get().view.findIndex(s => s.props.id == id);
        if (index == -1) return;
        const view = get().view.slice();
        view[index] = view[index].updateConfig(config);
        set({ view });
        get().saveViewToHistory();
    },
}));
useShapesStore.subscribe(console.log);
