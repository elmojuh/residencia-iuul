// a. CPF deve existir no cadastro.
// b. A data da consulta deve ser fornecida no formato DD/MM/AAAA.
// c. Hora inicial e final devem ser fornecidos no formato HHMM (padrão brasileiro).
// d. O agendamento deve ser para um período futuro: data da consulta > data atual ou (data da consulta = data atual e hora inicial > hora atual).
// e. Hora final > hora inicial.
// f. Cada paciente só pode realizar um agendamento futuro por vez (os agendamentos passados não podem ser usados nessa verificação).
// g. Não pode haver agendamentos sobrepostos.
// h. As horas inicial e final são definidas sempre de 15 em 15 minutos. Assim, são válidas horas como 1400, 1730, 1615, 1000 e 0715. Por outro lado, não são válidas horas como 1820, 1235, 0810 e 1950.
// i. O horário de funcionamento do consultório é das 8:00h às 19:00h, logo os horários de agendamento não podem sair desses limites.

// a. O cancelamento só pode ser realizado se for de um agendamento futuro (data do agendamento > data atual ou (data do agendamento = data atual e hora inicial > hora atual)).

// a. A listagem da agenda deve ser apresentada conforme o layout definido no final desse documento e deve estar ordenada de forma crescente por data e hora inicial.
// b. O usuário pode listar toda a agenda ou a agenda de um período. Nesse último caso, deve ser solicitada a data inicial e final (formato DD/MM/AAAA).

import { Consulta } from '../models/Consulta';
import { CPF } from '../models/CPF';
import { PacienteService } from './PacienteService';

export class AgendaService {
    agenda: Consulta[];
    private pacienteService: PacienteService;

    constructor() {
        this.agenda = [];
    }

    // Metodo para configurar o PacienteService
    setPacienteService(pacienteService: PacienteService) {
        this.pacienteService = pacienteService;
    }

    agendarConsulta(cpf: string, data: Date, inicio: string, fim: string) {
        if (!this.pacienteService) {
            throw new Error("PacienteService não foi inicializado corretamente.");
        }
        const paciente = this.pacienteService.getPaciente(cpf);

        const consultaFutura = this.agenda.find(c => c.paciente.cpf.equals(cpf.toString()) && c.dataConsulta > new Date());
        if (consultaFutura) throw new Error("Paciente já possui uma consulta futura");

        const cpfObj = new CPF(cpf);

        this.jaExisteConsulta(cpfObj, data, inicio, fim);

        const consulta = new Consulta(paciente, data, inicio, fim);
        this.agenda.push(consulta);
        console.log(`Consulta agendada com sucesso para o paciente ${paciente.nome} no dia ${data.toLocaleDateString()} das ${inicio} às ${fim}`);
    }



    cancelarConsulta(cpf: string, data: Date, inicio: string) {
        const paciente = this.pacienteService.getPaciente(cpf);

        const consulta = this.agenda.find(c => c.paciente.cpf.equals(paciente.cpf) && c.dataConsulta.getTime() === data.getTime() && c.inicio === inicio);

        if (!consulta) throw new Error("Consulta não encontrada");

        const agora = new Date();
        if (consulta.dataConsulta < agora || (consulta.dataConsulta.getTime() === agora.getTime() && parseInt(inicio) <= parseInt(consulta.inicio))) {
            throw new Error("Não é possível cancelar consultas passadas");
        }

        this.agenda = this.agenda.filter(c => c !== consulta);

        console.log(`Agendamento do paciente de cpf: ${cpf} cancelado com sucesso! Horário ${inicio} liberado`);
    }


    listarAgenda(dataInicio?: Date, dataFim?: Date): Consulta[] {
        return this.agenda.filter(c => {
            if (dataInicio && dataFim) {
                return c.dataConsulta >= dataInicio && c.dataConsulta <= dataFim;
            }
            return true;
        });
    }

    private jaExisteConsulta(cpf: CPF, data: Date, inicio: string, fim: string): void {
        if (this.agenda.some(c =>
            c.paciente.cpf.equals(cpf) &&
            c.dataConsulta.getTime() === data.getTime() &&
            ((parseInt(inicio) >= parseInt(c.inicio) && parseInt(inicio) < parseInt(c.fim)) ||
                (parseInt(fim) > parseInt(c.inicio) && parseInt(fim) <= parseInt(c.fim)))
        )) {
            throw new Error("Já existe uma consulta agendada nesse horário");
        }
    }
}
