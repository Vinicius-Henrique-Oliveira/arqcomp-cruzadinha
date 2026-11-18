"use strict";

(() => {
  const palavras = [
    { resposta: "CPU", pista: "É o chip que executa os programas, da calculadora ao navegador." },
    { resposta: "ULA", pista: "Dentro do processador, faz contas e decide se um número é maior que outro." },
    { resposta: "UC", pista: "Dentro do processador, interpreta cada instrução e diz às outras partes quando agir." },
    { resposta: "REGISTRADORES", pista: "São pequenos espaços dentro do processador onde ficam os números usados na conta atual." },
    { resposta: "RAM", pista: "Guarda os programas abertos enquanto você os usa. Ao desligar, perde o conteúdo." },
    { resposta: "ROM", pista: "Na versão gravada na fábrica, o computador pode ler seu conteúdo, mas não alterá-lo." },
    { resposta: "EEPROM", pista: "Guarda ajustes mesmo sem energia e permite regravar um byte por vez." },
    { resposta: "FLASH", pista: "Guarda fotos em cartões de câmera e arquivos em pendrives, mesmo sem energia." },
    { resposta: "CACHE", pista: "Guarda cópias perto do processador para ele encontrar mais rápido o que usa com frequência." },
    { resposta: "MEMORIADEMASSA", pista: "Que tipo de armazenamento guarda seus arquivos em HDs e SSDs mesmo após desligar?" },
    { resposta: "DMA", pista: "Permite que um dispositivo envie dados à memória sem a CPU copiar cada parte." },
    { resposta: "ADDRESSBUS", pista: "Se a memória fosse uma rua, esse caminho indicaria o número da casa procurada." },
    { resposta: "DATABUS", pista: "Enquanto um caminho indica onde procurar, este transporta o valor que foi encontrado." },
    { resposta: "MICROCONTROLADOR", pista: "Um único chip reúne processador, memória e entradas para ler sensores e comandar aparelhos." },
    { resposta: "DUALCORE", pista: "Como se chama um processador com uma dupla de núcleos físicos?" },
    { resposta: "QUADCORE", pista: "Como se chama um processador que reúne dois pares de núcleos físicos?" }
  ];
  const obter = id => document.getElementById(id);
  const boasVindas = "Bem-vindo ao laboratório! Prepare-se para testar seus conhecimentos.";
  const vitoria = "Missão concluída! Seus conhecimentos foram validados.";
  const cores = ["#a3f58b", "#c0e97c", "#efdb76", "#ffb769", "#ff926c", "#ff7777"];
  let modo = "cpu";
  const jogos = { cpu: iniciarJogo("cpu"), bits: iniciarJogo("bits") };

  function embaralhar(resposta) {
    const letras = [...resposta];
    for (let i = letras.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letras[i], letras[j]] = [letras[j], letras[i]];
    }
    // Todas as palavras da lista têm ao menos duas letras diferentes.
    if (letras.join("") === resposta) letras.push(letras.shift());
    return letras;
  }

  function criarRodada(indice, ordem) {
    const { resposta } = ordem[indice];
    return {
      usadas: new Set(), erros: 0, palpite: "", banco: embaralhar(resposta),
      casas: Array(resposta.length).fill(null), encerrada: false, aviso: "",
      mensagem: indice === 0 ? boasVindas : "Nova palavra! Observe a pista do sistema.",
      expressao: "feliz"
    };
  }

  function iniciarJogo(modoDoJogo) {
    // Inverta uma cópia para preservar a ordem da forca.
    const ordem = modoDoJogo === "bits" ? [...palavras].reverse() : palavras;
    return { ordem, indice: 0, historico: [], rodada: criarRodada(0, ordem), concluido: false };
  }

  function jogo() { return jogos[modo]; }
  function rodada() { return jogo().rodada; }
  function termo() { return jogo().ordem[jogo().indice]; }
  function temperatura() { return 35 + 13 * rodada().erros; }

  function feedback(aviso, mensagem, expressao) {
    Object.assign(rodada(), { aviso, mensagem, expressao });
  }

  function encerrar(acertou) {
    if (rodada().encerrada) return;
    rodada().encerrada = true;
    jogo().historico.push({ palavra: termo().resposta, acertou });
    if (acertou) {
      feedback("Resposta correta! " + termo().resposta, "Clock estabilizado! Resposta correta.", "feliz");
    } else {
      feedback("TEMPERATURA CRÍTICA! SISTEMA INTERROMPIDO. Resposta: " + termo().resposta,
        "Temperatura crítica! A CPU não resistiu.", "triste");
    }
  }

  function erroCpu() {
    rodada().erros++;
    if (rodada().erros === 5) encerrar(false);
    else feedback("Tentativa incorreta. CPU a " + temperatura() + " °C.", "Falha de barramento! Tente novamente.", "triste");
  }

  function tentarLetra(letra) {
    const r = rodada();
    if (r.encerrada || r.usadas.has(letra)) return;
    r.usadas.add(letra);
    if (!termo().resposta.includes(letra)) erroCpu();
    else if ([...termo().resposta].every(item => r.usadas.has(item))) encerrar(true);
    else feedback("Letra " + letra + " revelada.", "Sistema funcionando perfeitamente!", "feliz");
    atualizar();
  }

  // Guardar o índice da peça distingue duas letras iguais no banco.
  function colocar(peca) {
    const r = rodada();
    const vaga = r.casas.indexOf(null);
    if (r.encerrada || vaga < 0 || peca < 0 || r.casas.includes(peca)) return;
    r.casas[vaga] = peca;
    r.aviso = "";
    atualizar();
  }

  function remover(posicao) {
    if (rodada().encerrada || posicao < 0) return;
    rodada().casas[posicao] = null;
    rodada().aviso = "";
    atualizar();
  }

  function conferir() {
    const r = rodada();
    if (r.encerrada || jogo().concluido) return;
    if (modo === "bits") {
      if (r.casas.includes(null)) r.aviso = "Preencha todas as casas antes de conferir.";
      else if (r.casas.map(i => r.banco[i]).join("") === termo().resposta) encerrar(true);
      else feedback("Ordem incorreta. Selecione uma casa para retirar a letra.", "Erro de processamento! Revise sua resposta.", "triste");
    } else {
      const tentativa = r.palpite.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "").toUpperCase();
      if (!/^[A-Z]+$/.test(tentativa)) r.aviso = "Digite uma palavra usando apenas letras.";
      else if (tentativa === termo().resposta) encerrar(true);
      else { erroCpu(); r.palpite = ""; }
    }
    atualizar();
  }

  function avancar() {
    if (!rodada().encerrada || jogo().concluido) return;
    if (jogo().historico.length === palavras.length) jogo().concluido = true;
    else {
      jogo().indice++;
      jogo().rodada = criarRodada(jogo().indice, jogo().ordem);
    }
    atualizar();
    if (jogo().concluido) obter("resumo").querySelector("h2").focus();
    else obter("numero").focus();
  }

  function botao(texto, classe, id, nome, acao, desativado) {
    const b = document.createElement("button");
    b.type = "button";
    b.id = id;
    b.className = classe;
    b.textContent = texto;
    b.setAttribute("aria-label", nome);
    b.disabled = desativado;
    b.addEventListener("click", acao);
    return b;
  }

  function desenharLetras() {
    const r = rodada();
    const cpu = modo === "cpu";
    const casas = obter("casas");
    casas.replaceChildren();
    [...termo().resposta].forEach((letra, i) => {
      if (cpu) {
        const campo = document.createElement("span");
        campo.className = "casa";
        campo.textContent = r.encerrada || r.usadas.has(letra) ? letra : "_";
        casas.append(campo);
      } else {
        const valor = r.banco[r.casas[i]] || "_";
        casas.append(botao(valor, "casa", "casa-" + i, "Casa " + (i + 1) + ": " + valor + ". Remover letra.",
          () => remover(i), r.casas[i] === null || r.encerrada));
      }
    });
    const teclado = obter("letras");
    teclado.replaceChildren();
    const linhas = cpu ? ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"] : [r.banco];
    for (const linha of linhas) {
      const grupo = document.createElement("div");
      grupo.className = "fileira";
      [...linha].forEach((letra, i) => {
        const usada = cpu ? r.usadas.has(letra) : r.casas.includes(i);
        let marca = "";
        if (usada) marca = cpu ? (termo().resposta.includes(letra) ? "acerto" : "erro") : "usada";
        const sinal = cpu && usada ? (marca === "acerto" ? "✓" : "×") : "";
        grupo.append(botao(letra + sinal, "tecla " + marca, "tecla-" + (cpu ? letra : i),
          letra + " " + marca, () => cpu ? tentarLetra(letra) : colocar(i), usada || r.encerrada));
      });
      teclado.append(grupo);
    }
  }

  function atualizarAvatar() {
    const img = obter("avatar");
    const expressao = jogo().concluido ? "feliz" : rodada().expressao;
    const caminho = "./assets/prof-" + expressao + ".png";
    if (img.getAttribute("src") !== caminho) {
      img.hidden = false;
      obter("alternativa").hidden = true;
      img.src = caminho;
    }
    img.alt = expressao === "feliz" ? "Professor sorridente" : "Professor preocupado";
    obter("mensagem").textContent = jogo().concluido ? vitoria : rodada().mensagem;
  }

  function atualizarPlacar() {
    const historico = jogo().historico;
    const acertos = historico.filter(item => item.acertou).length;
    obter("placar").textContent = acertos + " de " + palavras.length + " palavras corretas";
    obter("total").textContent = obter("placar").textContent + ". Palavras não acertadas: " + (historico.length - acertos) + ".";
    obter("percentual").textContent = historico.length + " / " + palavras.length;
    obter("progresso").replaceChildren(...palavras.map((_, i) => {
      const segmento = document.createElement("b");
      if (i < historico.length) segmento.className = "fim";
      return segmento;
    }));
    obter("termico").hidden = modo !== "cpu";
    obter("graus").textContent = temperatura() + " °C";
    obter("graus").style.color = cores[rodada().erros];
    const barra = obter("barra").firstElementChild;
    barra.style.width = temperatura() + "%";
    barra.style.backgroundColor = cores[rodada().erros];
  }

  function atualizar() {
    const foco = document.activeElement.id;
    const cpu = modo === "cpu";
    const r = rodada();
    obter("cpu").setAttribute("aria-pressed", cpu);
    obter("bits").setAttribute("aria-pressed", !cpu);
    obter("tipo").textContent = cpu ? "MODO FORCA" : "MODO ANAGRAMA";
    obter("titulo").textContent = cpu ? "Superaquecimento\nda CPU" : "Decodificador\nde Bits";
    obter("chip").textContent = cpu ? "CPU" : "101";
    obter("rodada").hidden = jogo().concluido;
    obter("resumo").hidden = !jogo().concluido;
    obter("numero").textContent = "RODADA " + String(jogo().indice + 1).padStart(2, "0") + " / 16";
    obter("pista").textContent = termo().pista;
    obter("letrasTitulo").textContent = cpu ? "TECLADO" : "LETRAS DISPONÍVEIS";
    obter("erros").textContent = cpu ? r.erros + " de 5 erros" : "Toque na casa para remover";
    desenharLetras();
    obter("formulario").querySelector("label").hidden = !cpu;
    obter("palpite").hidden = !cpu;
    obter("palpite").value = r.palpite;
    obter("formulario").hidden = r.encerrada;
    obter("resultado").textContent = r.aviso;
    obter("proxima").hidden = !r.encerrada;
    obter("proxima").textContent = jogo().indice === palavras.length - 1 ? "Ver resumo" : "Próxima Palavra";
    atualizarPlacar();
    atualizarAvatar();
    if (r.encerrada && !jogo().concluido && foco !== "cpu" && foco !== "bits") obter("proxima").focus();
    else if (foco.startsWith("tecla-") || foco.startsWith("casa-")) {
      const anterior = obter(foco);
      const destino = anterior && !anterior.disabled ? anterior : obter("letras").querySelector("button:enabled") || obter("conferir");
      destino.focus();
    }
  }

  function alternar(novoModo) { modo = novoModo; atualizar(); }
  function reiniciar() {
    jogos[modo] = iniciarJogo(modo);
    atualizar();
    obter("numero").focus();
  }

  obter("numero").tabIndex = -1;
  obter("cpu").addEventListener("click", () => alternar("cpu"));
  obter("bits").addEventListener("click", () => alternar("bits"));
  obter("reiniciar").addEventListener("click", reiniciar);
  obter("novamente").addEventListener("click", reiniciar);
  obter("proxima").addEventListener("click", avancar);
  obter("palpite").addEventListener("input", evento => { rodada().palpite = evento.target.value; });
  obter("formulario").addEventListener("submit", evento => { evento.preventDefault(); conferir(); });

  function avatarIndisponivel() {
    obter("avatar").hidden = true;
    obter("alternativa").textContent = obter("avatar").alt + " · imagem indisponível";
    obter("alternativa").hidden = false;
  }
  obter("avatar").addEventListener("error", avatarIndisponivel);
  document.addEventListener("keydown", evento => {
    if (evento.ctrlKey || evento.altKey || evento.metaKey || evento.repeat ||
      evento.target === obter("palpite") || jogo().concluido || rodada().encerrada) return;
    if (/^[a-z]$/i.test(evento.key)) {
      const letra = evento.key.toUpperCase();
      if (modo === "cpu") tentarLetra(letra);
      else colocar(rodada().banco.findIndex((item, i) => item === letra && !rodada().casas.includes(i)));
    } else if (modo === "bits" && evento.key === "Backspace") {
      evento.preventDefault();
      remover(rodada().casas.findLastIndex(item => item !== null));
    }
  });
  atualizar();
  if (obter("avatar").complete && !obter("avatar").naturalWidth) avatarIndisponivel();
})();
