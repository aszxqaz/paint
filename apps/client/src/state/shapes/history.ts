export class History<T> {
    private constructor(
        private readonly pointer: number,
        private readonly store: T[][]
    ) {}

    static empty<T>(): History<T> {
        return new History(0, [[]]);
    }

    static fromInitial<T>(initial: T[]): History<T> {
        return new History(0, [initial]);
    }

    appended(elements: T[]): History<T> {
        const store = this.store.slice(0, this.pointer + 1);
        return new History(this.pointer + 1, [...store, elements]);
    }

    get snapshot(): T[] {
        return this.store[this.pointer];
    }

    undo(): History<T> {
        if (this.canUndo) {
            return new History(this.pointer! - 1, this.store);
        }
        return this;
    }

    redo(): History<T> {
        if (this.canRedo) {
            return new History(this.pointer! + 1, this.store);
        }
        return this;
    }

    get canRedo(): boolean {
        return this.pointer + 1 < this.store.length;
    }

    get canUndo(): boolean {
        return this.pointer > 0;
    }
}
