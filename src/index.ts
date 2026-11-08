import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { Stack } from "./Stack";
import { Peca } from "./Peca";

const rl = readline.createInterface({ input, output });
const aparelho = new Stack<Peca>();

function carregarExemplo(): void {
    aparelho.clear();
    aparelho.push(new Peca(1, "Carcaça inferior"));
    aparelho.push(new Peca(2, "Placa-mãe"));
    aparelho.push(new Peca(3, "Processador"));
    aparelho.push(new Peca(4, "Pasta térmica e cooler"));
    aparelho.push(new Peca(5, "Memória RAM"));
    aparelho.push(new Peca(6, "SSD"));
    aparelho.push(new Peca(7, "Bateria"));
    aparelho.push(new Peca(8, "Tampa traseira"));
}

function copiarPilha(origem: Stack<Peca>): Stack<Peca> {
    const auxiliar = new Stack<Peca>();
    const copia = new Stack<Peca>();
    while (!origem.isEmpty()) {
        auxiliar.push(origem.pop()!);
    }
    while (!auxiliar.isEmpty()) {
        const peca = auxiliar.pop()!;
        origem.push(peca);
        copia.push(peca);
    }
    return copia;
}

function listar(pilha: Stack<Peca>, rotuloPrimeiro: string, rotuloUltimo: string): void {
    if (pilha.isEmpty()) {
        console.log("Nenhuma peça no aparelho.");
        return;
    }
    const linhas = pilha.toString().split("\n");
    linhas.forEach((linha, i) => {
        let marcador = "";
        if (i === 0) {
            marcador = `  <- ${rotuloPrimeiro}`;
        } else if (i === linhas.length - 1) {
            marcador = `  <- ${rotuloUltimo}`;
        }
        console.log(`${String(i + 1).padStart(2)}. ${linha}${marcador}`);
    });
}

async function lerCodigo(mensagem: string): Promise<number | undefined> {
    const texto = (await rl.question(mensagem)).trim();
    const codigo = Number(texto);
    if (texto === "" || !Number.isInteger(codigo) || codigo <= 0) {
        console.log("Código inválido. Informe um número inteiro positivo.");
        return undefined;
    }
    return codigo;
}

async function montarPeca(): Promise<void> {
    const codigo = await lerCodigo("Código da peça: ");
    if (codigo === undefined) {
        return;
    }
    if (aparelho.search(new Peca(codigo, "")) !== -1) {
        console.log(`Já existe uma peça com o código ${codigo} no aparelho.`);
        return;
    }
    const descricao = (await rl.question("Descrição da peça: ")).trim();
    if (descricao === "") {
        console.log("A descrição não pode ficar vazia.");
        return;
    }
    const peca = new Peca(codigo, descricao);
    aparelho.push(peca);
    console.log(`Peça ${peca} montada no topo do aparelho.`);
}

function removerTopo(): void {
    const peca = aparelho.pop();
    if (peca === undefined) {
        console.log("O aparelho não tem peças para remover.");
    } else {
        console.log(`Peça removida do topo: ${peca}`);
    }
}

function verTopo(): void {
    const peca = aparelho.peek();
    if (peca === undefined) {
        console.log("O aparelho está vazio, não há peça no topo.");
    } else {
        console.log(`Peça no topo (próxima a ser desmontada): ${peca}`);
    }
}

function verificarVazio(): void {
    if (aparelho.isEmpty()) {
        console.log("Sim, o aparelho está vazio.");
    } else {
        console.log(`Não, o aparelho tem ${aparelho.length} peça(s).`);
    }
}

async function buscarPosicao(): Promise<void> {
    const codigo = await lerCodigo("Código da peça procurada: ");
    if (codigo === undefined) {
        return;
    }
    const indice = aparelho.search(new Peca(codigo, ""));
    if (indice === -1) {
        console.log(`Nenhuma peça com o código ${codigo} no aparelho.`);
        return;
    }
    const posicao = indice + 1;
    console.log(`A peça está na posição ${posicao} a partir do topo.`);
    if (indice === 0) {
        console.log("Ela está no topo e pode ser removida diretamente.");
    } else {
        console.log(`É preciso desmontar ${indice} peça(s) antes de chegar até ela.`);
    }
}

function exibirPecas(): void {
    console.log("Peças do aparelho, na ordem de desmontagem:");
    listar(aparelho, "topo", "base");
}

function exibirManual(): void {
    if (aparelho.isEmpty()) {
        console.log("Nenhuma peça no aparelho para gerar o manual.");
        return;
    }
    const manual = copiarPilha(aparelho);
    manual.reverse();
    console.log("Manual de montagem (pilha invertida, da base para o topo):");
    listar(manual, "primeira a montar", "última a montar");
}

async function fazerManutencao(): Promise<void> {
    if (aparelho.isEmpty()) {
        console.log("Não há aparelho montado para fazer manutenção.");
        return;
    }
    const codigo = await lerCodigo("Código da peça defeituosa: ");
    if (codigo === undefined) {
        return;
    }
    const procurada = new Peca(codigo, "");
    const indice = aparelho.search(procurada);
    if (indice === -1) {
        console.log(`Nenhuma peça com o código ${codigo} no aparelho.`);
        return;
    }

    const removidas = new Stack<Peca>();
    console.log("\n1) Desmontando até chegar na peça defeituosa:");
    while (!aparelho.peek()!.equals(procurada)) {
        const peca = aparelho.pop()!;
        removidas.push(peca);
        console.log(`   Desmontou ${peca} e guardou na pilha de peças removidas`);
    }
    if (removidas.isEmpty()) {
        console.log("   A peça defeituosa já estava no topo, nada a desmontar.");
    }

    const defeituosa = aparelho.pop()!;
    console.log(`\n2) Peça defeituosa retirada: ${defeituosa}`);

    const resposta = (await rl.question(`   Descrição da peça nova (Enter para manter "${defeituosa.descricao}"): `)).trim();
    const nova = new Peca(defeituosa.codigo, resposta === "" ? defeituosa.descricao : resposta);
    aparelho.push(nova);
    console.log(`\n3) Peça nova instalada: ${nova}`);

    console.log("\n4) Remontando as peças, da última retirada para a primeira:");
    let remontadas = 0;
    while (!removidas.isEmpty()) {
        const peca = removidas.pop()!;
        aparelho.push(peca);
        remontadas++;
        console.log(`   Remontou ${peca}`);
    }
    if (remontadas === 0) {
        console.log("   Nenhuma peça para remontar.");
    }
    console.log(`\nManutenção concluída. ${remontadas} peça(s) desmontada(s) e remontada(s).`);
}

async function descartarAparelho(): Promise<void> {
    if (aparelho.isEmpty()) {
        console.log("O aparelho já está vazio.");
        return;
    }
    const resposta = (await rl.question("Tem certeza que deseja descartar todas as peças? (s/n): ")).trim().toLowerCase();
    if (resposta === "s") {
        aparelho.clear();
        console.log("Todas as peças foram descartadas.");
    } else {
        console.log("Operação cancelada.");
    }
}

function mostrarMenu(): void {
    console.log("\n========== MANUTENÇÃO DE APARELHOS ==========");
    console.log(`Peças no aparelho: ${aparelho.length}`);
    console.log(" 1. Montar peça (empilhar)");
    console.log(" 2. Remover peça do topo (desempilhar)");
    console.log(" 3. Ver peça do topo");
    console.log(" 4. Verificar se o aparelho está vazio");
    console.log(" 5. Buscar posição de uma peça");
    console.log(" 6. Exibir peças (ordem de desmontagem)");
    console.log(" 7. Ver manual de montagem (pilha invertida)");
    console.log(" 8. Fazer manutenção de peça defeituosa");
    console.log(" 9. Descartar aparelho (limpar pilha)");
    console.log("10. Carregar notebook de exemplo");
    console.log(" 0. Sair");
}

async function main(): Promise<void> {
    carregarExemplo();
    console.log("Notebook de exemplo carregado com 8 peças.");
    let executando = true;
    while (executando) {
        mostrarMenu();
        const opcao = (await rl.question("Escolha uma opção: ")).trim();
        console.log();
        switch (opcao) {
            case "1": await montarPeca(); break;
            case "2": removerTopo(); break;
            case "3": verTopo(); break;
            case "4": verificarVazio(); break;
            case "5": await buscarPosicao(); break;
            case "6": exibirPecas(); break;
            case "7": exibirManual(); break;
            case "8": await fazerManutencao(); break;
            case "9": await descartarAparelho(); break;
            case "10":
                carregarExemplo();
                console.log("Notebook de exemplo carregado com 8 peças.");
                break;
            case "0":
                executando = false;
                console.log("Encerrando o sistema.");
                break;
            default:
                console.log("Opção inválida.");
        }
    }
    rl.close();
}

main();
