# Manutenção de Aparelhos com Pilha

Aplicação de terminal em TypeScript que usa a estrutura de dados **Pilha** para simular a montagem, a desmontagem e a manutenção das peças de um aparelho.

Projeto desenvolvido para a **Avaliação 2: Estruturas de Dados Lineares - Pilha e Fila** da disciplina de **Estrutura de Dados** do curso de Tecnologia em Sistemas para Internet (TSI) do **IFES - Campus Santa Teresa**, semestre 2026/2.

## Sobre a atividade

A turma foi dividida em dois grupos, um responsável pela Pilha e outro pela Fila. Cada grupo deveria criar uma aplicação que resolvesse um problema real em que o uso da estrutura fosse adequado e justificado.

Requisitos da atividade:

- Implementar a estrutura usando a **Lista Duplamente Encadeada** (`DoublyLinkedList`) desenvolvida nas aulas.
- Oferecer as funcionalidades mínimas: inserir, remover, acessar o topo, verificar se está vazia, verificar a posição de um elemento, limpar, inverter e exibir.
- Ter interface em terminal ou navegador.

Este repositório é a solução do grupo da **Pilha**.

## O problema escolhido

Um aparelho (no exemplo, um notebook) é montado peça por peça, da base para o topo. Para trocar uma peça com defeito é preciso:

1. Desmontar todas as peças que estão acima dela, guardando-as em ordem.
2. Retirar a peça defeituosa.
3. Instalar uma peça nova.
4. Remontar as peças retiradas na ordem inversa: a última que saiu é a primeira que volta.

Esse comportamento é exatamente o **LIFO** (*Last In, First Out*, o último a entrar é o primeiro a sair) de uma pilha. Por isso a pilha é a estrutura adequada. O exemplo também aparece nos slides da disciplina sobre Pilhas.

## Como a Pilha foi implementada

A classe `Stack<T>` não guarda os elementos sozinha: ela usa uma `DoublyLinkedList<T>` por dentro e expõe apenas as operações de pilha. O **topo da pilha é o início da lista** (`head`), assim como na implementação apresentada nas aulas.

| Operação da pilha | Método da `Stack` | Método da `DoublyLinkedList` |
|---|---|---|
| Empilhar | `push` | `unshift` |
| Desempilhar | `pop` | `shift` |
| Ver o topo | `peek` | `getElementAt(0)` |
| Verificar se está vazia | `isEmpty` | `isEmpty` |
| Posição de um elemento | `search` | `findIndex` |
| Limpar | `clear` | `clear` |
| Inverter | `reverse` | `reverse` |
| Exibir | `toString` | `toString` |

Como o topo fica no início da lista, o `findIndex` já devolve a posição contando a partir do topo.

A lista exige que os elementos implementem a interface `IComparable` (`equals` e `compareTo`). A classe `Peca` faz isso comparando pelo código da peça.

### Estrutura do projeto

```
src/
├── IComparable.ts       Interface exigida pela lista
├── DoublyLinkedList.ts  Lista duplamente encadeada das aulas
├── Stack.ts             Pilha genérica construída sobre a DoublyLinkedList
├── Peca.ts              Peça do aparelho (código e descrição)
└── index.ts             Menu da aplicação no terminal
```

## Como instalar

Pré-requisitos:

- [Node.js](https://nodejs.org/) 18 ou superior
- npm (já vem com o Node.js)

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/AlexandreVenturini/pilha-manutencao-aparelhos.git
cd pilha-manutencao-aparelhos
npm install
```

O `npm install` instala apenas dependências de desenvolvimento: `typescript`, `ts-node`, `nodemon` e `@types/node`.

## Como executar

```bash
npm start
```

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm start` | Executa a aplicação |
| `npm run dev` | Executa com o nodemon, reiniciando a cada alteração no código |
| `npm run build` | Compila o TypeScript para JavaScript na pasta `dist` |

## Como usar

A aplicação já inicia com um notebook de 8 peças carregado:

| Código | Peça |
|---|---|
| 1 | Carcaça inferior (base) |
| 2 | Placa-mãe |
| 3 | Processador |
| 4 | Pasta térmica e cooler |
| 5 | Memória RAM |
| 6 | SSD |
| 7 | Bateria |
| 8 | Tampa traseira (topo) |

Digite o número da opção e pressione Enter:

| Opção | Descrição |
|---|---|
| 1 | Montar peça (empilhar no topo) |
| 2 | Remover a peça do topo (desempilhar) |
| 3 | Ver a peça do topo |
| 4 | Verificar se o aparelho está vazio |
| 5 | Buscar a posição de uma peça a partir do topo |
| 6 | Exibir as peças na ordem de desmontagem |
| 7 | Ver o manual de montagem (pilha invertida, da base para o topo) |
| 8 | Fazer a manutenção de uma peça defeituosa |
| 9 | Descartar o aparelho (limpar a pilha) |
| 10 | Carregar novamente o notebook de exemplo |
| 0 | Sair |

### Exemplo de manutenção

Ao escolher a opção 8 e informar o código `6` (SSD), a aplicação:

1. Desmonta a Tampa traseira e a Bateria, guardando-as em uma segunda pilha.
2. Retira o SSD defeituoso.
3. Pede a descrição da peça nova (Enter mantém o mesmo nome).
4. Remonta a Bateria e depois a Tampa traseira.

```
1) Desmontando até chegar na peça defeituosa:
   Desmontou [8] Tampa traseira e guardou na pilha de peças removidas
   Desmontou [7] Bateria e guardou na pilha de peças removidas

2) Peça defeituosa retirada: [6] SSD
   Descrição da peça nova (Enter para manter "SSD"): SSD NVMe 1TB

3) Peça nova instalada: [6] SSD NVMe 1TB

4) Remontando as peças, da última retirada para a primeira:
   Remontou [7] Bateria
   Remontou [8] Tampa traseira

Manutenção concluída. 2 peça(s) desmontada(s) e remontada(s).
```

## Tecnologias

- TypeScript
- Node.js (módulo `readline` para a entrada no terminal)
- ts-node e nodemon
