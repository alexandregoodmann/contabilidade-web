import { Lancamento } from "./lancamento";

export class Planilha {
    id: string;
    mes: number;
    ano: number;
    descricao: string;
    lancamentos: Lancamento[];
}