import { DoublyLinkedList } from "./DoublyLinkedList";
import { IComparable } from "./IComparable";

export class Stack<T extends IComparable> {
    private _lista: DoublyLinkedList<T>;

    constructor(element?: T) {
        this._lista = new DoublyLinkedList<T>(element);
    }

    public get length(): number {
        return this._lista.length;
    }

    public push(element: T): void {
        this._lista.unshift(element);
    }

    public pop(): T | undefined {
        return this._lista.shift();
    }

    public peek(): T | undefined {
        return this._lista.getElementAt(0);
    }

    public isEmpty(): boolean {
        return this._lista.isEmpty();
    }

    public search(element: T): number {
        return this._lista.findIndex(element);
    }

    public clear(): void {
        this._lista.clear();
    }

    public reverse(): void {
        this._lista.reverse();
    }

    public toString(): string {
        return this._lista.toString();
    }
}
