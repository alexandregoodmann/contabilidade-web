import { Banco } from "./banco";

export class Conta {
    id: string;
    conta: string;
    saldo: Number;
    banco: Banco;
    selecionado: boolean;
}