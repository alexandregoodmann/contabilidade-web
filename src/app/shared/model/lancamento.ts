import { Categoria } from "./categoria";
import { Conta } from "./conta";
import { Planilha } from "./planilha";

export class Lancamento {
    id: string;
    conta: Conta;
    categoria: Categoria;
    planilha: Planilha;
    dtLancamento: Date;
    descricao: string;
    valor: number;
    data: Date;
    fixo: boolean;
}
