# Arq. Comp Game

Dois minigames em pixel art para revisar 16 termos de Arquitetura Computacional. Na forca, cada erro esquenta a CPU. No anagrama, o desafio é colocar as letras na ordem certa. O professor reage aos seus palpites nos dois modos.

**Jogue aqui:** https://vinicius-henrique-oliveira.github.io/arqcomp-cruzadinha/

## Como jogar

### Superaquecimento da CPU

1. Leia a pista e escolha uma letra na tela ou no teclado. Se acertar, todas as ocorrências dessa letra aparecem.
2. Para tentar a palavra inteira, digite no campo e clique em **Conferir**.
3. A CPU começa em **35 °C**. Cada letra errada inédita ou palpite completo incorreto soma **13 °C**. No quinto erro, ela chega a **100 °C** e a resposta aparece. Essa escala de temperatura faz parte do jogo.
4. Descubra a palavra antes do quinto erro para ganhar um ponto. Clique em **Próxima Palavra** para começar outra rodada a 35 °C.

### Decodificador de Bits

1. Leia a pista e use as letras embaralhadas para montar a resposta. Clique nas peças ou digite as letras para preencher as casas.
2. Para mudar uma letra de lugar, clique na casa preenchida. A peça volta a ficar disponível.
3. Clique em **Conferir**. Se a ordem estiver errada, reorganize as peças e tente de novo. Ao acertar, você ganha um ponto e pode avançar.

Você pode trocar de modo e voltar à mesma rodada. **Reiniciar** zera apenas a partida aberta. Depois da 16ª palavra, clique em **Ver resumo** para consultar o resultado.

### Atalhos de teclado

| Tecla | Ação |
|---|---|
| A–Z | Na forca, tenta uma letra. No anagrama, coloca uma peça disponível na primeira casa livre. |
| Backspace | No anagrama, retira a letra da última casa ocupada. |
| Tab | Avança ou volta entre os controles. |
| Enter | Envia a palavra digitada no campo da forca ou aciona o botão em foco. |

## Palavras e pistas

A forca segue a tabela de cima para baixo. O anagrama percorre os mesmos termos de baixo para cima.

<details>
<summary>Ver as 16 respostas e suas pistas</summary>

| Rodada na forca | Palavra | Pista |
|---:|---|---|
| 1 | CPU | É o chip que executa os programas, da calculadora ao navegador. |
| 2 | ULA | Dentro do processador, faz contas e decide se um número é maior que outro. |
| 3 | UC | Dentro do processador, interpreta cada instrução e diz às outras partes quando agir. |
| 4 | REGISTRADORES | São pequenos espaços dentro do processador onde ficam os números usados na conta atual. |
| 5 | RAM | Guarda os programas abertos enquanto você os usa. Ao desligar, perde o conteúdo. |
| 6 | ROM | Na versão gravada na fábrica, o computador pode ler seu conteúdo, mas não alterá-lo. |
| 7 | EEPROM | Guarda ajustes mesmo sem energia e permite regravar um byte por vez. |
| 8 | FLASH | Guarda fotos em cartões de câmera e arquivos em pendrives, mesmo sem energia. |
| 9 | CACHE | Guarda cópias perto do processador para ele encontrar mais rápido o que usa com frequência. |
| 10 | MEMORIADEMASSA | Que tipo de armazenamento guarda seus arquivos em HDs e SSDs mesmo após desligar? |
| 11 | DMA | Permite que um dispositivo envie dados à memória sem a CPU copiar cada parte. |
| 12 | ADDRESSBUS | Se a memória fosse uma rua, esse caminho indicaria o número da casa procurada. |
| 13 | DATABUS | Enquanto um caminho indica onde procurar, este transporta o valor que foi encontrado. |
| 14 | MICROCONTROLADOR | Um único chip reúne processador, memória e entradas para ler sensores e comandar aparelhos. |
| 15 | DUALCORE | Como se chama um processador com uma dupla de núcleos físicos? |
| 16 | QUADCORE | Como se chama um processador que reúne dois pares de núcleos físicos? |

</details>

## Tecnologias

HTML5, CSS3 e JavaScript puro. Os avatares ficam na pasta do projeto e o jogo funciona offline.

