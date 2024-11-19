import promptSync from 'prompt-sync';
import { PacienteService } from '../services/PacienteService';
import { AgendaService } from '../services/AgendaService';
import { Paciente } from '../models/Paciente';
import { CPF } from '../models/CPF';
import {Consulta} from "../models/Consulta";

const fazerPopulacaoDeDados: boolean = true;
const prompt = promptSync();
const agendaService = new AgendaService();
const pacienteService = new PacienteService();

// Configura as dependências após a criação dos objetos
agendaService.setPacienteService(pacienteService);
pacienteService.setAgendaService(agendaService);

export function menuPrincipal() {
    podePopular();
    while (true) {
        console.log("\nMenu Principal");
        console.log("1 - Cadastro de pacientes");
        console.log("2 - Agenda");
        console.log("3 - Fim");
        const opcao = prompt("Escolha uma opção: ");

        if (opcao === "1") menuCadastroPaciente();
        else if (opcao === "2") menuAgenda();
        else if (opcao === "3") break;
        else console.log("Opção inválida. Tente novamente.");
    }
}

function menuCadastroPaciente() {
    while (true) {
        console.log("\nMenu do Cadastro de Pacientes");
        console.log("1 - Cadastrar novo paciente");
        console.log("2 - Excluir paciente");
        console.log("3 - Listar pacientes (ordenado por CPF)");
        console.log("4 - Listar pacientes (ordenado por nome)");
        console.log("5 - Voltar para o menu principal");
        const opcao = prompt("Escolha uma opção: ");

        if (opcao === "1") cadastrarPaciente();
        else if (opcao === "2") excluirPaciente();
        else if (opcao === "3") listarPacientesPorCPF();
        else if (opcao === "4") listarPacientesPorNome();
        else if (opcao === "5") break;
        else console.log("Opção inválida. Tente novamente.");
    }
}

function cadastrarPaciente() {
    const nome = prompt("Nome: ");
    const cpf = prompt("CPF: ");
    const dataNascimento = prompt("Data de Nascimento (DD/MM/AAAA): ");
    try {
        const cpfObj = new CPF(cpf);
        const dataNascimentoDate = new Date(dataNascimento.split('/').reverse().join('-'));

        const paciente = new Paciente(nome, cpfObj, dataNascimentoDate);
        pacienteService.adicionarPaciente(paciente);
    } catch (error) {
        console.log(error.message);
    }
}

function excluirPaciente() {
    const cpf = prompt("CPF: ");
    try {
        pacienteService.excluirPaciente(cpf);
    } catch (error) {
        console.log(error.message);
    }
}

function formatarColunas(dados: string[], tamanhos: number[]): string {
    return dados
        .map((dado, i) => dado.padEnd(tamanhos[i]))
        .join(" ");
}

function listarPacientesPorCPF() {
    const pacientes = pacienteService.listarPacientesPorCPF();
    const tamanhosColunas = [20, 25, 12, 5]; // Tamanhos para CPF, Nome, Data de Nasc., Idade
    console.log("--------------------------------------------------------------------");
    console.log(formatarColunas(["CPF", "Nome", "Dt. Nasc.", "Idade"], tamanhosColunas));
    console.log("--------------------------------------------------------------------");
    pacientes.forEach(paciente => {
        console.log(formatarColunas(
            [
                paciente.cpf.valor,
                paciente.nome,
                paciente.dataNascimento.toLocaleDateString(),
                (new Date().getFullYear() - paciente.dataNascimento.getFullYear()).toString(),
            ],
            tamanhosColunas
        ));
    });
    console.log("--------------------------------------------------------------------");
}

function listarPacientesPorNome() {
    const pacientes = pacienteService.listarPacientesPorNome();
    const tamanhosColunas = [20, 25, 12, 5]; // Tamanhos para CPF, Nome, Data de Nasc., Idade
    console.log("--------------------------------------------------------------------");
    console.log(formatarColunas(["CPF", "Nome", "Dt. Nasc.", "Idade"], tamanhosColunas));
    console.log("--------------------------------------------------------------------");
    pacientes.forEach(paciente => {
        console.log(formatarColunas(
            [
                paciente.cpf.valor,
                paciente.nome,
                paciente.dataNascimento.toLocaleDateString(),
                (new Date().getFullYear() - paciente.dataNascimento.getFullYear()).toString(),
            ],
            tamanhosColunas
        ));
    });
    console.log("--------------------------------------------------------------------");
}

function menuAgenda() {
    while (true) {
        console.log("\nMenu da Agenda");
        console.log("1 - Agendar consulta");
        console.log("2 - Cancelar agendamento");
        console.log("3 - Listar agenda");
        console.log("4 - Voltar para o menu principal");
        const opcao = prompt("Escolha uma opção: ");

        if (opcao === "1") agendarConsulta();
        else if (opcao === "2") cancelarConsulta();
        else if (opcao === "3") listarAgenda();
        else if (opcao === "4") break;
        else console.log("Opção inválida. Tente novamente.");
    }
}

function agendarConsulta() {
    const cpf = prompt("CPF do paciente: ");
    const data = prompt("Data da consulta (DD/MM/AAAA): ");
    const inicio = prompt("Hora de início (HHMM): ");
    const fim = prompt("Hora de término (HHMM): ");

    try {
        agendaService.agendarConsulta(cpf, new Date(data.split('/').reverse().join('-')), inicio, fim);
    } catch (error) {
        console.log(error.message);
    }
}

function cancelarConsulta() {
    const cpf = prompt("CPF do paciente: ");
    const data = prompt("Data da consulta (DD/MM/AAAA): ");
    const inicio = prompt("Hora de início (HHMM): ");
    try {
        agendaService.cancelarConsulta(cpf, new Date(data.split('/').reverse().join('-')), inicio);
    } catch (error) {
        console.log(error.message);
    }
}

function listarAgenda() {
    const opcao = prompt("Escolha T para Toda ou P para Período: ").toUpperCase();

    let consultas: Consulta[] = [];
    if (opcao === "T") {
        consultas = agendaService.listarAgenda();
    } else if (opcao === "P") {
        const dataInicio = prompt("Data inicial (DD/MM/AAAA): ");
        const dataFim = prompt("Data final (DD/MM/AAAA): ");
        const dataInicioDate = new Date(dataInicio.split('/').reverse().join('-'));
        const dataFimDate = new Date(dataFim.split('/').reverse().join('-'));
        consultas = agendaService.listarAgenda(dataInicioDate, dataFimDate);
    } else {
        console.log("Opção inválida.");
        return;
    }

    if (consultas.length === 0) {
        console.log("Nenhuma consulta encontrada.");
        return;
    }

    const tamanhosColunas = [12, 6, 6, 5, 25, 12]; // Tamanhos para Data, H.Ini, H.Fim, Tempo, Nome, Dt.Nasc.
    console.log("-----------------------------------------------------------------------");
    console.log(formatarColunas(["Data", "H.Ini", "H.Fim", "Tempo", "Nome", "Dt.Nasc."], tamanhosColunas));
    console.log("-----------------------------------------------------------------------");
    consultas.forEach(consulta => {
        const tempo = parseInt(consulta.fim) - parseInt(consulta.inicio); // Cálculo do tempo em minutos
        console.log(formatarColunas(
            [
                consulta.dataConsulta.toLocaleDateString(),
                consulta.inicio,
                consulta.fim,
                tempo.toString(),
                consulta.paciente.nome,
                consulta.paciente.dataNascimento.toLocaleDateString(),
            ],
            tamanhosColunas
        ));
    });
    console.log("----------------------------------------------------------------------");
}

// população de dados

function podePopular(){
    if (fazerPopulacaoDeDados) {
        popularDados();
        console.log("POPULAÇÃO DE DADOS ESTÁ HABILITADA, PARA REMOVE-LA ALTERE fazerPopulacaoDeDados NO MenuControlador.");
    }
    else {
        console.log("POPULAÇÃO DE DADOS ESTÁ DESABILITADA, PARA ADICIONA-LA ALTERE fazerPopulacaoDeDados NO MenuControlador.");
    }
}

function popularDados() {
    const pacientes = [
        new Paciente("João de Almeira", new CPF("12345678912"), new Date("2000-01-01")),
        new Paciente("Maria Flor", new CPF("98765432109"), new Date("1999-12-31")),
        new Paciente("José Alencar", new CPF("45678912345"), new Date("2001-01-01")),
        new Paciente("Beatriz", new CPF("78912345678"), new Date("2002-02-10")),
        new Paciente("Carlos Silvio", new CPF("11122233344"), new Date("2002-02-10")),
    ];
    pacientes.forEach(p => pacienteService.adicionarPaciente(p));

    const agenda = [
        new Consulta(pacientes[0], new Date("2024-12-25"), "14:00", "14:30"),
        new Consulta(pacientes[1], new Date("2024-12-25"), "14:30", "15:00"),
        new Consulta(pacientes[2], new Date("2024-12-25"), "15:00", "15:30"),
        new Consulta(pacientes[3], new Date("2024-12-25"), "15:30", "16:00"),
    ];
    agenda.forEach(c => agendaService.agendarConsulta(c.paciente.cpf.valor, c.dataConsulta, c.inicio, c.fim));
    console.log("Dados populados com sucesso! É possível remove-los com a troca de valor de DADOS = false ");
}
