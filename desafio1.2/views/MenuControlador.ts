import promptSync from 'prompt-sync';
import { PacienteService } from '../services/PacienteService';
import { AgendaService } from '../services/AgendaService';
import { Paciente } from '../models/Paciente';
import { CPF } from '../models/CPF';

const prompt = promptSync();
const agendaService = new AgendaService();
const pacienteService = new PacienteService();

// Configura as dependências após a criação dos objetos
agendaService.setPacienteService(pacienteService);
pacienteService.setAgendaService(agendaService);

export function menuPrincipal() {
    popularDados();
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

        // Verificar a idade
        const idade = new Date().getFullYear() - dataNascimentoDate.getFullYear();
        if (idade < 13) {
            throw new Error("Erro: paciente deve ter pelo menos 13 anos.");
        }

        const paciente = new Paciente(nome, cpfObj, dataNascimentoDate);
        pacienteService.adicionarPaciente(paciente);
        console.log("Paciente cadastrado com sucesso!");
    } catch (error) {
        console.log(error.message);
    }
}

function excluirPaciente() {
    const cpf = prompt("CPF: ");
    try {
        pacienteService.excluirPaciente(cpf);
        console.log("Paciente excluído com sucesso!");
    } catch (error) {
        console.log(error.message);
    }
}

function listarPacientesPorCPF() {
    const pacientes = pacienteService.listarPacientesPorCPF();
    console.log("------------------------------------------------------------");
    console.log("CPF Nome Dt.Nasc. Idade");
    console.log("------------------------------------------------------------");
    console.log(pacientes.map(p => `${p.cpf.valor} ${p.nome} ${p.dataNascimento.toLocaleDateString()} ${new Date().getFullYear() - p.dataNascimento.getFullYear()}`));
    console.log("------------------------------------------------------------");
}

function listarPacientesPorNome() {
    const pacientes = pacienteService.listarPacientesPorNome();
    console.log("------------------------------------------------------------");
    console.log("CPF Nome Dt.Nasc. Idade");
    console.log("------------------------------------------------------------");
    console.log(pacientes.map(p => `${p.cpf.valor} ${p.nome} ${p.dataNascimento.toLocaleDateString()} ${new Date().getFullYear() - p.dataNascimento.getFullYear()}`));
    console.log("------------------------------------------------------------");
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
        console.log("Agendamento realizado com sucesso!");
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
        console.log("Agendamento cancelado com sucesso!");
    } catch (error) {
        console.log(error.message);
    }
}

function listarAgenda() {
    const consultas = agendaService.listarAgenda();
    console.log("Apresentar a agenda T-Toda ou P-Periodo: P");
    const dataInicio = prompt("Data inicial: ");
    const dataFim = prompt("Data final: ");
    console.log("-------------------------------------------------------------");
    console.log("Data H.Ini H.Fim Tempo Nome Dt.Nasc.");
    console.log("-------------------------------------------------------------");
    console.log(consultas.map(c => `${c.dataConsulta.toLocaleDateString()} ${c.inicio} ${c.fim} ${parseInt(c.fim) - parseInt(c.inicio)} ${c.paciente.nome} ${c.paciente.dataNascimento.toLocaleDateString()}`));
    console.log("-------------------------------------------------------------");
}

function popularDados() {
    const pacientes = [
        new Paciente("João de Almeira", new CPF("12345678912"), new Date("2000-01-01")),
        new Paciente("Maria Flor", new CPF("98765432109"), new Date("1999-12-31")),
        new Paciente("José Alencar", new CPF("45678912345"), new Date("2001-01-01")),
        new Paciente("Beatriz", new CPF("11122233344"), new Date("2002-02-10")),
    ];
    pacientes.forEach(p => pacienteService.adicionarPaciente(p));

    agendaService.agendarConsulta("12345678912", new Date("2025-12-01"), "14:00", "14:30");
}
