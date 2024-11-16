export class CPF {
    private _valor: string;

    constructor(valor: string) {
        if (!this.validaCPF(valor)) {
            throw new Error("CPF inválido");
        }
        this._valor = valor;
    }

    get valor() {
        return this._valor;
    }

    private validaCPF(cpf: string): boolean {
        const regex = /^\d{11}$/;
        return regex.test(cpf);
    }

    equals(cpf: CPF): boolean {
        return this._valor === cpf.valor;
    }
}
