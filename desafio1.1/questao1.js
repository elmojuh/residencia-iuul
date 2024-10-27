const prompt = require('prompt-sync')();

class Vertice {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    set x(x) {
        this.#x = x;
    }

    set y(y) {
        this.#y = y;
    }

    // Metodo que retorna a distância entre dois vértices. d(a, b) = sqrt((xa - xb)^2 + (ya - yb)^2)
    // Distancia de do vertice A para o vertice B. A sendo (v1.x, v1.y) e B sendo (v2.x, v2.y)
    // get distancia retorna uma funcao anonima que espera um parametro v que é um objeto do tipo Vertice
    get distancia() {
        return (v) => Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2);
    }

    equals(v){
        return this.x === v.x && this.y === v.y;
    }

    move(x,y){
        this.x = x;
        this.y = y;
    }
}

function leVertice(string) {
    let x = parseInt(prompt(`Digite o valor de x do vertice ${string}: `));
    let y = parseInt(prompt(`Digite o valor de y do vertice ${string}: `));
    return new Vertice(x, y);
}

module.exports = { Vertice, leVertice };

function main(){
    // Ler três vertices do usuário
    let vA = leVertice('A');
    let vB = leVertice('B');
    let vC = leVertice('C');

// Testes da leitura do usuário
    console.log("distancia - Testando a distância");
    console.log(`Teste de distancia entre o vertice A(${vA.x}, ${vA.y}) e vertice B(${vB.x}, ${vB.y}). Disntancia de: ${vA.distancia(vB)}`);
    console.log(`Teste de distancia entre o vertice B(${vB.x}, ${vB.y} e vertice C(${vC.x}, ${vC.y}). Disntancia de: ${vB.distancia(vC)}`);
    console.log(`Teste de distancia entre o vertice C(${vC.x}, ${vC.y}) e vertice A(${vA.x}, ${vA.y}). Disntancia de: ${vC.distancia(vA)}`);

    console.log("equals - Testando se são iguais");
    let vD = new Vertice(0, 0);
    let vE = new Vertice(0, 0);
    console.log(`Teste do vertice D (${vD.x} e ${vD.y}) com o vertice E(${vE.x} e ${vE.y}): ${vD.equals(vE)}`);
    console.log(`Teste do vertice A (${vA.x} e ${vA.y}) com o vertice B(${vB.x} e ${vB.y}): ${vA.equals(vB)}`);
    console.log(`Teste do vertice B (${vB.x} e ${vB.y}) com o vertice C(${vC.x} e ${vC.y}): ${vB.equals(vC)}`);
    console.log(`Teste do vertice C (${vC.x} e ${vC.y}) com o vertice A(${vA.x} e ${vA.y}): ${vC.equals(vA)}`);
}

main();
