const prompt = require('prompt-sync')();

// Busque por essa linha no código para remover dados de teste
// popularTeste(turma); // Remove para ter um turma vazia

class Aluno {
    static matricula = 1210;
    nome;
    P1;
    P2;

    constructor(nome) {
        this.nome = nome;
        this.matricula = Aluno.matricula++;
    }

    calculaNotaFinal() {
        if(this.P1 === undefined) {
            this.P1 = 0;
        }
        if(this.P2 === undefined) {
            this.P2 = 0;
        }
        return (this.P1 + this.P2) / 2;
    }
}

class Turma {
    #alunos = [];

    get alunos() {
        return this.#alunos;
    }

    getNomeAluno (matricula) {
        return this.#alunos.find(a => a.matricula === matricula).nome;
    }

    addAluno(aluno) {
        this.#alunos.push(aluno);
        console.log(`Aluno ${aluno.nome} adicionado com matricula ${aluno.matricula}`);
    }

    removeAluno(matricula) {
        const nomeAluno = this.getNomeAluno(matricula);
        const alunosAtualizados = this.#alunos.filter(a => a.matricula !== matricula);
        this.#alunos = alunosAtualizados;
        console.log(`Aluno ${nomeAluno} com matricula ${matricula} removido!`);
    }

    lancaP1(matricula, P) {
        let aluno = this.#alunos.find(a => a.matricula === matricula);
        if (aluno.P1 === undefined || aluno.P1 === 0) {
            aluno.P1 = P;
        } else {
            console.log("!!! Aluno já possui P1 !!!");
        }
    }

    lancaP2(matricula, P) {
        let aluno = this.#alunos.find(a => a.matricula === matricula);
        if (aluno.P2 === undefined  || aluno.P2 === 0) {
            aluno.P2 = P;
        } else {
            console.log("!!! Aluno já possui P2 !!!");
        }
    }
}

function layoutImpressaoInicio() {
    console.log('--------------------------------------------------');
    console.log('Matricula   Nome                P1     P2      NF');
    console.log('--------------------------------------------------');
}

function layoutImpressaoFim() {
    console.log('--------------------------------------------------');
}

// imprimir alunos por ordem algabética e com matriculas, respectivas notas P1 e P2 e nota final
function imprimeAlunos(turma) {
    let alunos = turma.alunos.sort((a, b) => a.nome.localeCompare(b.nome));
    layoutImpressaoInicio();
    for (let aluno of alunos) {
        let notaFinal = aluno.calculaNotaFinal().toFixed(1);
        let p1 = aluno.P1 === 0 ? '-' : (aluno.P1.toFixed(1));
        let p2 = aluno.P2 === 0 ? '-' : (aluno.P2.toFixed(1));
        console.log(`${String(aluno.matricula).padEnd(10)}  ${aluno.nome.padEnd(20)} ${String(p1).padEnd(4)} ${String(p2).padStart(3)}     ${String(notaFinal).padStart(3)}`);
    }
    layoutImpressaoFim();
}

main();

function main() {
    const turma = new Turma();
    popularTeste(turma); // Remove para ter um turma vazia
    let opcao = 0;
    while (opcao !== 9) {
        console.log("1 - Imprimir Alunos");
        console.log("2 - Adicionar Aluno");
        console.log("3 - Lançar Nota P1");
        console.log("4 - Lançar Nota P2");
        console.log("5 - Remover Aluno");
        console.log("9 - Sair");
        opcao = parseInt(prompt("Digite a opção desejada: "));
        switch (opcao) {
            case 2:
                let nome = prompt("Digite o nome do aluno: ");
                turma.addAluno(new Aluno(nome));
                break;
            case 3:
                let matriculaP1 = parseInt(prompt("Digite a matricula do aluno: "));
                let notaP1 = parseFloat(prompt("Digite a nota da P1: "));
                turma.lancaP1(matriculaP1, notaP1);
                break;
            case 4:
                let matriculaP2 = parseInt(prompt("Digite a matricula do aluno: "));
                let notaP2 = parseFloat(prompt("Digite a nota da P2: "));
                turma.lancaP2(matriculaP2, notaP2);
                break;
            case 1:
                imprimeAlunos(turma);
                break;
            case 5:
                let matricula = parseInt(prompt("Digite a matricula do aluno a ser removido: "));
                turma.removeAluno(matricula);
                break;
            case 9:
                console.log("Saindo...");
                break;
            default:
                console.log("Opção inválida!");
        }
    }
}

function popularTeste(turma) {
    console.log("-------------------------------------------")
    console.log("Populando turma com dados de teste:");
    let aluno1 = new Aluno("Joao Santos");
    let aluno2 = new Aluno("Ana de Almeida");
    let aluno3 = new Aluno("Bruno Carvalho");
    let aluno4 = new Aluno("Fernanda Abreu");

    turma.addAluno(aluno1);
    turma.addAluno(aluno2);
    turma.addAluno(aluno3);
    turma.addAluno(aluno4);
    console.log("-------------------------------------------")
    turma.lancaP1(aluno2.matricula, 8);
    turma.lancaP2(aluno2.matricula, 8.5);

    turma.lancaP1(aluno3.matricula, 7);

    turma.lancaP2(aluno4.matricula, 8.5);

    return turma;
}
