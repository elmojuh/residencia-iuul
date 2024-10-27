const prompt = require('prompt-sync')();
const { DateTime } = require('luxon');

class Pessoa {
    constructor(nome, CPF, dataDeNascimento, rendaMensal, estadoCivil, dependentes) {
        this.nome = this.validarNome(nome);
        this.CPF = this.validarCPF(CPF);
        this.dataDeNascimento = this.validarDataDeNascimento(dataDeNascimento);
        this.rendaMensal = this.validarRendaMensal(rendaMensal);
        this.estadoCivil = this.validarEstadoCivil(estadoCivil);
        this.dependentes = this.validarDependentes(dependentes);
    }

    validarNome(nome) {
        if (nome.length < 5 || typeof nome !== 'string') {
            throw new Error("Nome deve conter pelo menos 5 caracteres.");
        }
        return nome;
    }

    validarCPF(CPF) {
        if (CPF.length !== 11) {
            throw new Error("CPF deve conter 11 caracteres.");
        }
        return CPF;
    }

    validarDataDeNascimento(dataDeNascimento) {
        const data = DateTime.fromFormat(dataDeNascimento, 'dd/MM/yyyy');
        if (!data.isValid) {
            throw new Error("Data de nascimento deve estar no como DD/MM/AAAA.");
        }
        const idade = DateTime.now().diff(data, 'years').years;

        if (idade < 18) {
            throw new Error("Pessoa deve ser maior de idade.");
        }
        return data.toISODate();
    }

    validarRendaMensal(rendaMensalSemFormato) {
        const rendaMensal = parseFloat(rendaMensalSemFormato.replace(',', '.'));
        if (rendaMensal < 0) {
            throw new Error("Renda mensal deve ser maior ou igual a zero.");
        }
        return rendaMensal.toFixed(2);
    }

    validarEstadoCivil(estadoCivil) {
        const estadosCivis = ['C', 'S', 'V', 'D'];
        if (!estadosCivis.includes(estadoCivil)) {
            throw new Error("Estado civil deve ser C, S, V ou D.");
        }
        return estadoCivil;
    }

    validarDependentes(dependentes) {
        const numeroDependentes = parseInt(dependentes);
        if (numeroDependentes >= 0 && numeroDependentes < 10) {
            return numeroDependentes;
        }
        throw new Error("Número de dependentes deve ser entre 0 e 9.");
    }
}

// mainTeste();
function mainTeste(){
    try {
        const pessoa = new Pessoa("João Carlos", "12345678901", "01/01/2000", "1000,00", "S", "2");
        console.log(`Nome: ${pessoa.nome}`);
        console.log(`CPF: ${pessoa.CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}`);
        console.log(`Data de Nascimento: ${DateTime.fromISO(pessoa.dataDeNascimento).toFormat('dd/MM/yyyy')}`);
        console.log(`Renda Mensal: ${pessoa.rendaMensal.replace('.', ',')}`);
        console.log(`Estado Civil: ${pessoa.estadoCivil}`);
        console.log(`Dependentes: ${pessoa.dependentes}`);
    } catch (erro) {
        console.log(erro.message);
    }
}

const pessoasCriadas = [];

function criarPessoaDoUsuario() {
    while (true) {
        try {
            const nome = prompt("Digite o nome (pelo menos 5 caracteres): ");
            const CPF = prompt("Digite o CPF (11 dígitos): ");
            const dataDeNascimento = prompt("Digite a data de nascimento (no formato DD/MM/AAAA): ");
            const rendaMensal = prompt("Digite a renda mensal (valor >= 0): ");
            const estadoCivil = prompt("Digite o estado civil (C, S, V ou D): ");
            const dependentes = prompt("Digite o número de dependentes (0 a 9): ");
            const pessoaCriada = new Pessoa(nome, CPF, dataDeNascimento, rendaMensal, estadoCivil, dependentes);
            pessoasCriadas.push(pessoaCriada);
            console.log("\nPessoa criada com sucesso!\n");
            break;
        } catch (erro) {
            console.log(`Erro: ${erro.message}`);
            console.log("Por favor, insira os dados novamente.\n");
        }
    }
}

function popularPessoas(){
    const pessoa1 = new Pessoa("João Carlos", "12345678910", "01/01/2000", "1000,00", "S", "2");
    const pessoa2 = new Pessoa("Maria Silva", "12345678920", "01/01/1990", "2000,00", "C", "0");
    pessoasCriadas.push(pessoa1);
    pessoasCriadas.push(pessoa2);
    console.log("Pessoa criada com sucesso!");
}

function listarPessoas() {
    if (pessoasCriadas.length === 0) {
        console.log("Nenhuma pessoa foi cadastrada ainda.");
    } else {
        console.log("\nLista de Pessoas Cadastradas:");
        pessoasCriadas.forEach((pessoa, index) => {
            console.log(`\nPessoa ${index + 1}:`);
            console.log(`Nome: ${pessoa.nome}`);
            console.log(`CPF: ${pessoa.CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}`);
            console.log(`Data de Nascimento: ${DateTime.fromISO(pessoa.dataDeNascimento).toFormat('dd/MM/yyyy')}`);
            console.log(`Renda Mensal: R$ ${pessoa.rendaMensal.replace('.', ',')}`);
            console.log(`Estado Civil: ${pessoa.estadoCivil}`);
            console.log(`Dependentes: ${pessoa.dependentes}`);
        });
    }
}

function componenteMenu(){
    console.log("\n !Menu! Escolha uma opção:");
    console.log("1 - Criar pessoa");
    console.log("2 - Popular pessoas");
    console.log("3 - Listar pessoas");
    console.log("4 - Sair");
}

function main() {
    let opcao = '';
    do {
        componenteMenu();
        opcao = prompt("Digite a opção escolhida: ");
        switch(opcao) {
            case '1':
                criarPessoaDoUsuario();
                break;
            case '2':
                popularPessoas();
                break;
            case '3':
                listarPessoas();
                break;
            case '4':
                console.log("Programa encerrado.");
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    } while (opcao !== '4');
}

main();
