import prompt from 'prompt-sync';

export class InterfaceAPI {
    private input = prompt();

    perguntar(mensagem: string): string {
        return this.input(`${mensagem}: `).trim();
    }

    exibirMensagem(mensagem: string): void {
        console.log(mensagem);
    }

    exibirResultado(origem: string, destino: string, valor: number, valorConvertido: number, taxa: number): void {
        console.log(`${origem} ${valor.toFixed(2)} => ${destino} ${valorConvertido.toFixed(2)}`);
        console.log(`Taxa: ${taxa.toFixed(6)}`);
    }
}
