// a. CPF deve ser válido (vide Anexo A).
// b. O nome do usuário deve ter pelo menos 5 caracteres.
// c. A data de nascimento deve ser fornecida no formato DD/MM/AAAA.
// d. Caso algum dado seja inválido, deve ser apresentada uma mensagem de erro e o dado deve ser solicitado novamente.
// e. Não podem existir dois pacientes com o mesmo CPF.
// f. O dentista não atende crianças, logo o paciente deve ter 13 anos ou mais no momento do cadastro (data atual).

// a. Um paciente com uma consulta agendada futura não pode ser excluído.
// b. Se o paciente tiver uma ou mais consultas agendadas passadas, ele pode ser excluído. Nesse caso, os respectivos agendamentos também devem ser excluídos.

import { Paciente } from '../models/Paciente';
import { AgendaService } from './AgendaService';

export class PacienteService {
    private pacientes: Paciente[];
    private agendaService: AgendaService;

    constructor() {
        this.pacientes = [];
    }

    // Metodo para configurar o AgendaService
    setAgendaService(agendaService: AgendaService) {
        this.agendaService = agendaService;
    }

    adicionarPaciente(paciente: Paciente): void {
        this.pacienteJaExiste(paciente.cpf.valor);
        this.pacientes.push(paciente);
        console.log("Paciente cadastrado com sucesso!");
    }

    excluirPaciente(cpf: string): void {
        const paciente = this.getPaciente(cpf);
        this.possuiConsultaFutura(paciente);
        this.pacientes = this.pacientes.filter(p => p.cpf.valor !== cpf);
        console.log("Paciente excluído com sucesso!");
    }

    listarPacientesPorCPF(): Paciente[] {
        return this.pacientes.sort((a, b) => a.cpf.valor.localeCompare(b.cpf.valor));
    }

    listarPacientesPorNome(): Paciente[] {
        return this.pacientes.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    getPaciente(cpf: string): Paciente {
        const paciente = this.pacientes.find(p => p.cpf.valor === cpf);
        if (!paciente) {
            throw new Error("Paciente não encontrado");
        }
        return paciente
    }

    private pacienteJaExiste(cpf: string): void {
        if(this.pacientes.some(p => p.cpf.valor === cpf)) {
            throw new Error("CPF já cadastrado");
        }
    }

    private possuiConsultaFutura(paciente: Paciente): void {
        if (this.agendaService.listarAgenda().some(c => c.paciente.cpf.equals(paciente.cpf))) {
            throw new Error("Paciente possui consultas futuras agendadas");
        }
    }

}
