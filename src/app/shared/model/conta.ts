import { Lancamento } from "./lancamento";

export class Conta {
    id: number;
    descricao: string;
    label: string;
    lancamentos: Lancamento[] = [];
    total: number = 0;
    cargaArquivo: boolean;
}