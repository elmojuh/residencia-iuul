export class Moeda {
    codigo: string;
    valor: number;

    constructor(codigo: string, valor: number) {
        if (codigo.length !== 3) {
            throw new Error("O código da moeda deve ter exatamente 3 caracteres.");
        }
        if (valor <= 0) {
            throw new Error("O valor deve ser maior que zero.");
        }
        this.codigo = codigo;
        this.valor = valor;
    }
}
