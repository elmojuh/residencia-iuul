import axios from 'axios';
import { ConversaoParams } from "../models/ConversaoParams";
import { ConversaoResponse } from "../models/ConversaoResponse";

export class ConversorService {
    private readonly baseUrl = "https://v6.exchangerate-api.com/v6/689a9cc819db97a6acf8cec1";

    async converter(params: ConversaoParams): Promise<ConversaoResponse> {
        const { moedaOrigem, moedaDestino, valor } = params;

        try {
            const response = await axios.get(`${this.baseUrl}/pair/${moedaOrigem}/${moedaDestino}`);

            const taxa = response.data.conversion_rate;
            if (!taxa) {
                throw new Error("Problema na conversão. Verifique os códigos das moedas.");
            }

            return {
                valorConvertido: parseFloat((valor * taxa).toFixed(2)),
                taxa: parseFloat(taxa.toFixed(6)),
            };
        } catch (error: any) {
            // Verifica se o erro foi causado por uma resposta da API
            if (axios.isAxiosError(error) && error.response) {
                const { data, status } = error.response;

                if (data.result === "error") {
                    const errorType = data["error-type"];
                    if (errorType === "unsupported-code") {
                        throw new Error(`O código da moeda ${moedaOrigem} ou ${moedaDestino} não é suportado.`);
                    }
                    throw new Error(`Erro desconhecido na API: ${errorType}. Consulte a documentação.`);
                }

                // Erros com status HTTP, mas sem informações detalhadas
                throw new Error(`Erro na API com status ${status}: ${data?.message || "Sem detalhes fornecidos."}`);
            }

            // Outros tipos de erro (ex.: erro de rede)
            throw new Error(error.message || "Erro desconhecido.");
        }
    }
}
