import { ConversorService } from "../service/ConversorService";

export class ConversorController {
    private service = new ConversorService();

    async processarConversao(codigoOrigem: string, codigoDestino: string, valor: number): Promise<{ valorConvertido: number; taxa: number }> {
        this.validarCodigoMoeda(codigoOrigem);
        this.validarCodigoMoeda(codigoDestino);
        this.validarValor(valor);

        const params = { moedaOrigem: codigoOrigem, moedaDestino: codigoDestino, valor };
        return await this.service.converter(params);
    }

    private validarCodigoMoeda(codigo: string): void {
        if (codigo.length !== 3) {
            throw new Error("O código da moeda deve ter exatamente 3 caracteres.");
        }
    }

    private validarValor(valor: number): void {
        if (valor <= 0 || isNaN(valor)) {
            throw new Error("O valor deve ser maior que zero e numérico.");
        }
    }
}
