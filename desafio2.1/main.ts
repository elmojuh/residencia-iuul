import { ConversorController } from "./controller/ConversorController";
import { InterfaceAPI } from "./view/InterfaceAPI";

const interfaceAPI = new InterfaceAPI();
const controller = new ConversorController();

async function main() {
    while (true) {
        try {
            const moedaOrigem = interfaceAPI.perguntar("Moeda origem");
            if (!moedaOrigem) break;

            const moedaDestino = interfaceAPI.perguntar("Moeda destino");
            const valorStr = interfaceAPI.perguntar("Valor");
            const valor = parseFloat(valorStr);

            if (isNaN(valor)) {
                throw new Error("O valor deve ser numérico.");
            }

            const { valorConvertido, taxa } = await controller.processarConversao(moedaOrigem, moedaDestino, valor);

            interfaceAPI.exibirResultado(moedaOrigem, moedaDestino, valor, valorConvertido, taxa);
        } catch (error: any) {
            interfaceAPI.exibirMensagem(error.message);
        }
    }
}

main();
