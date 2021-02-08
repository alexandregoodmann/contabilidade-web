import { Banco } from "./banco";

export class Conta {
    [x: string]: any;
    id: string;
    conta: string;
    saldo: Number;
    banco: Banco;
    selecionado: boolean;
}