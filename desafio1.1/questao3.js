const { Vertice, leVertice } = require('./questao1.js');
const prompt = require('prompt-sync')();

class Poligono {
    #vertices = [];

    constructor(vertices) {
        if (vertices.length < 3) {
            throw new Error("Polígono deve ter no mínimo 3 vértices.");
        }
        this.#vertices = vertices;
        Poligono.numeroVertices += 1;
    }

    get vertices(){
        return this.#vertices;
    }

    addVertice(v){
        for (let vertice of this.#vertices){
            if(vertice.equals(v)){
                console.log("!!! Vertice já existe no poligono !!!");
                return false;
            }
        }
        this.#vertices.push(v);
        return this;
    }

    get perimetro() {
        let perimetro = 0;
        for (let i = 0; i < this.qtdVertices - 1; i++){
            perimetro += this.#vertices[i].distancia(this.#vertices[i + 1]);
        }
        perimetro += this.#vertices[this.qtdVertices - 1].distancia(this.#vertices[0]);
        return perimetro;
    }

    get qtdVertices(){
        return this.#vertices.length;
    }
}

function lePoligono(){
    let qtdVertices = parseInt(prompt("Digite a quantidade de vertices do poligono: "));
    let vertices = [];
    for (let i = 1; i <= qtdVertices; i++){
        vertices.push(leVertice(`Poligono ${i}`));
    }
    return new Poligono(vertices);
}

module.exports = Poligono;

// mainTeste(); //mais a baixo
main();

function main() {
    console.log("Construindo Poligono do Usuário:");
    const poligono = lePoligono();
    console.log("Perimetro do poligono: ", poligono.perimetro);
    console.log("Quantidade de vertices do poligono: ", poligono.qtdVertices);
    const v1 = leVertice("Novo Vertice");
    poligono.addVertice(v1);
    console.log("Perimetro do poligono: ", poligono.perimetro);
    console.log("Quantidade de vertices do poligono: ", poligono.qtdVertices);
    const v2 = leVertice("Novo Vertice");
    poligono.addVertice(v2);
    console.log("Perimetro do poligono: ", poligono.perimetro);
    console.log("Quantidade de vertices do poligono: ", poligono.qtdVertices);

}


function mainTeste (){
    console.log("Teste com dados imputados:");
    const v1 = new Vertice(0, 0);
    const v2 = new Vertice(5, 5);
    const v3 = new Vertice(5, 1);
    const poligono = new Poligono([v1, v2, v3]);
    console.log("Perimetro do poligono: ", poligono.perimetro);
    console.log("Quantidade de vertices do poligono: ", poligono.qtdVertices);
    const v4 = new Vertice(1, 2);
    poligono.addVertice(v4);
    console.log("Perimetro do poligono: ", poligono.perimetro);
    console.log("Quantidade de vertices do poligono: ", poligono.qtdVertices);
    const v5 = new Vertice(3, 4);
    poligono.addVertice(v5);
    console.log("Perimetro do poligono: ", poligono.perimetro);
    console.log("Quantidade de vertices do poligono: ", poligono.qtdVertices);
}


