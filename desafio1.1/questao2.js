const { Vertice, leVertice } = require('./questao1.js');

class Triangulo {
    // privados do tipo Vertice
    #v1;
    #v2;
    #v3;

    constructor(v1, v2, v3) {
        // Verifica se é um triangulo valido
        if (!this.#ehTriangulo(v1, v2, v3)) {
            throw new Error("Não é um triângulo válido");
        }
        this.#v1 = v1;
        this.#v2 = v2;
        this.#v3 = v3;
    }

    get v1() {
        return this.#v1;
    }

    get v2() {
        return this.#v2;
    }

    get v3() {
        return this.#v3;
    }

    #ehTriangulo(v1, v2, v3) {
        // Verifica se a soma de dois lados é maior que o terceiro
        const l1 = v1.distancia(v2);
        const l2 = v1.distancia(v3);
        const l3 = v2.distancia(v3);
        return l1 + l2 > l3 && l1 + l3 > l2 && l2 + l3 > l1;
    }

    equals(t) {
        return this.#v1.equals(t.v1) && this.#v2.equals(t.v2) && this.#v3.equals(t.v3);
    }

    tipo() {
        const l1 = this.v1.distancia(this.v2);
        const l2 = this.v1.distancia(this.v3);
        const l3 = this.v2.distancia(this.v3);
        if (l1 === l2 && l1 === l3) {
            return "Equilátero";
        } else if (l1 === l2 || l1 === l3 || l2 === l3) {
            return "Isósceles";
        } else {
            return "Escaleno";
        }
    }

    clone() {
        return new Triangulo(this.v1, this.v2, this.v3);
    }

    get perimetro() {
        return this.v1.distancia(this.v2) + this.v1.distancia(this.v3) + this.v2.distancia(this.v3);
    }

    get area() {
        const p = this.perimetro / 2;
        const l1 = this.v1.distancia(this.v2);
        const l2 = this.v1.distancia(this.v3);
        const l3 = this.v2.distancia(this.v3);
        return Math.sqrt(p * (p - l1) * (p - l2) * (p - l3));
    }
}

function leTriangulo(string) {
    console.log(`Digite os vértices do triângulo ${string}:`);
    const v1 = leVertice(1);
    const v2 = leVertice(2);
    const v3 = leVertice(3);
    return new Triangulo(v1, v2, v3);
}

module.exports = { Triangulo, leTriangulo };

main();

function main () {

    //Testes Imputados:
    console.log("Construindo Triangulos do Usuário:");
    const T1 = new Triangulo(new Vertice(0, 0), new Vertice(6, 0), new Vertice(3, (3 * Math.sqrt(3))));
    console.log(`Triangulo T1: L1(${T1.v1.x}, ${T1.v1.y}) ,L2(${T1.v2.x}, ${T1.v2.y}) , L3(${T1.v3.x}, ${T1.v3.y})`);
    console.log("Triangulo T1 Perimetro: ", T1.perimetro);
    console.log("Triangulo T1 Area: ", T1.area);
    console.log("Triangulo T1 Tipo: ", T1.tipo());


    console.log("Construindo Trinagulos:");
    const t1 = leTriangulo('T1');
    const t2 = leTriangulo('T2');
    const t3 = leTriangulo('T3');

    console.log("Testando se são iguais:");
    console.log('Triangulo T1', t1.equals(t2));
    console.log('Triangulo T2', t2.equals(t3));
    console.log('Triangulo T3', t3.equals(t1));

    console.log("Testando o tipo: ");
    console.log('Triangulo T1: ', t1.tipo());
    console.log('Triangulo T2: ', t2.tipo());
    console.log('Triangulo T3: ', t3.tipo());

    console.log("Testando o perimetro: ");
    console.log('Triangulo T1: ', t1.perimetro);
    console.log('Triangulo T2: ', t2.perimetro);
    console.log('Triangulo T3: ', t3.perimetro);

    console.log("Testando a area: ");
    console.log('Triangulo T1: ', t1.area);
    console.log('Triangulo T2: ', t2.area);
    console.log('Triangulo T3: ', t3.area);
}

