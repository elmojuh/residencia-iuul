import { CPF } from './CPF';

export class Paciente {
    nome: string;
    cpf: CPF;
    dataNascimento: Date;

    constructor(nome: string, cpf: CPF, dataNascimento: Date) {
        if (nome.length < 5) throw new Error("Nome inválido");
        this.validarIdade(dataNascimento);

        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
    }

    private validarIdade(dataNascimento: Date): void {
        const hoje = new Date();
        const idade = hoje.getFullYear() - dataNascimento.getFullYear();
        const mesAniversarioPassou = hoje.getMonth() > dataNascimento.getMonth() ||
            (hoje.getMonth() === dataNascimento.getMonth() && hoje.getDate() >= dataNascimento.getDate());
        if (idade < 13 || (idade === 13 && !mesAniversarioPassou)) {
            throw new Error("Paciente deve ter 13 anos ou mais");
        }
    }
}
