import { Categoria } from "./categoria";
import { Conta } from "./conta";

export class Lancamento {
    conta: Conta;
    categoria: Categoria;
    dtLancamento: string;
    descricao: string;
    valor: number;
    data: Date;
}