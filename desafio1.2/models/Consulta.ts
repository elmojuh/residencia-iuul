// cada Paciente só pode ter uma consulta ativa por vez
// não pode haver agendamentos sobrepostos
// As horas inicial e final são definidas sempre de 15 em 15 minutos. Assim, são válidas horas como 1400, 1730, 1615, 1000 e 0715. Por outro lado, não são válidas horas como 1820, 1235, 0810 e 1950.
// O horário de funcionamento do consultório é das 8:00h às 19:00h, logo os horários de agendamento não podem sair desses limites.
// O agendamento deve ser para um período futuro: data da consulta > data atual ou (data da consulta = data atual e hora inicial > hora atual).
// Hora final > hora inicial.
// O dentista não atende crianças, logo o paciente deve ter 13 anos ou mais no momento do cadastro (data atual).

import { Paciente } from './Paciente';

export class Consulta {
    paciente: Paciente;
    dataConsulta: Date;
    inicio: string;
    fim: string;


    constructor(paciente: Paciente, dataConsulta: Date, inicio: string, fim: string) {
        if (!this.validarHorario(inicio) || !this.validarHorario(fim)) {
            throw new Error("Horário inválido. Apenas horários de 15 em 15 minutos são aceitos.");
        }
        if (!this.validarHorarioFuncionamento(inicio, fim)) {
            throw new Error("O horário de funcionamento é das 08:00 às 19:00.");
        }
        if (parseInt(inicio.replace(':', '')) >= parseInt(fim.replace(':', ''))) {
            throw new Error("Hora final deve ser maior que a hora inicial.");
        }

        this.paciente = paciente;
        this.dataConsulta = dataConsulta;
        this.inicio = inicio;
        this.fim = fim;
    }

    private validarHorario(hora: string): boolean {
        const [h, m] = hora.split(':').map(Number);
        return (m % 15 === 0) && (h >= 0 && h <= 23) && (m >= 0 && m < 60);
    }

    private validarHorarioFuncionamento(inicio: string, fim: string): boolean {
        const horarioInicio = parseInt(inicio.replace(':', ''), 10);
        const horarioFim = parseInt(fim.replace(':', ''), 10);
        return horarioInicio >= 800 && horarioFim <= 1900;
    }
}
