import { IComparable } from "./IComparable";

export class Peca implements IComparable {
    private _codigo: number;
    private _descricao: string;

    constructor(codigo: number, descricao: string) {
        this._codigo = codigo;
        this._descricao = descricao;
    }

    public get codigo(): number {
        return this._codigo;
    }

    public get descricao(): string {
        return this._descricao;
    }

    public set descricao(descricao: string) {
        this._descricao = descricao;
    }

    public equals(peca: Peca): boolean {
        return this._codigo === peca.codigo;
    }

    public compareTo(peca: Peca): number {
        if (this._codigo < peca.codigo) {
            return -1;
        } else if (this._codigo > peca.codigo) {
            return 1;
        }
        return 0;
    }

    public toString(): string {
        return `[${this._codigo}] ${this._descricao}`;
    }
}
