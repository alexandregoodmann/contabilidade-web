import { Categoria } from "./categoria";
import { Conta } from "./conta";

export class Lancamento {
    id: string;
    conta: Conta;
    categoria: Categoria;
    dtLancamento: Date;
    descricao: string;
    valor: number;
    data: Date;
    tipo: TipoLancamento = TipoLancamento.UNICO;
}

export enum TipoLancamento {
    UNICO, FIXO
}