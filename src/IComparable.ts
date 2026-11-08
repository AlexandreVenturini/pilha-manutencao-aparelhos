export interface IComparable{
    equals(other: IComparable): boolean;

    compareTo(other: IComparable): number;
}