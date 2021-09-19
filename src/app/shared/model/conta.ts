import { Banco } from "./banco";

export class Conta {
    id: string;
    descricao: string;
    label: string;
    banco: Banco;
}