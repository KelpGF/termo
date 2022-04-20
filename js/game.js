let palavra = [];
let palavra_com_chars_especiais = [];
let tentativas = [];
let tentativas_com_chars_especiais = [];
let qtd_tentativas = 6;
let tentativa_incompleta = true;
let letras_corretas = [];
const special_chars = {
    a: ["á", "â", "ã"],
    e: ["é", "ê"],
    i: ["í", "î"],
    o: ["ó", "ô", "õ"],
    u: ["ú", "û"],
    c: ["ç"],
};

function pegarPalavra() {
    const idx = Math.floor(Math.random() * palavras.length);

    const palavra_sorteada = palavras[idx];

    palavra = palavra_sorteada.split("");
    palavra_com_chars_especiais = palavra_sorteada.split("");

    palavra.map((char, idx) => {
        for (const letra in special_chars) {
            if (special_chars[letra].includes(char)) {
                palavra[idx] = letra;
            }
        }
    });
}

function enableInputs(num_tentativa, enable = false) {
    const inputs = document.querySelectorAll(`#tentativa${num_tentativa} input`);

    for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index];
        input.disabled = enable;
    }

    document.getElementById("input" + num_tentativa + "_0").focus();
}

function selecionarLetraTecladoDigital(e) {
    let num_tentativa;
    let posicao_letra;

    const letra = e.target.value;
    const condicao_limpar = letra !== "Backspace";

    if (tentativas.length == 0) {
        num_tentativa = 0;
        posicao_letra = 0;
    } else {
        num_tentativa = tentativas.length - 1;

        const tentativa = tentativas[tentativas.length - 1];

        posicao_letra = tentativa.indexOf("");

        if (posicao_letra == -1) posicao_letra = 4;

        if (!condicao_limpar && posicao_letra > 0 && tentativas[num_tentativa][posicao_letra] == "") posicao_letra--;
    }

    const objectEvent = {
        code: condicao_limpar ? "Key" + letra.toUpperCase() : letra,
        key: letra,
    };

    let input = document.getElementById(`input${num_tentativa}_${posicao_letra}`);

    if (!input) input = document.getElementById(`input${++num_tentativa}_${(posicao_letra = 0)}`);
    input.value = condicao_limpar ? letra : "";

    keyTecladoInput(objectEvent, num_tentativa, posicao_letra, input.value);
}

function validarTentativa() {
    const tentativa = tentativas[tentativas.length - 1];

    return tentativa.includes("");
}

function keyTecladoInput(e, num_tentativa, posicao_letra, letra) {
    const tentativa = tentativas[num_tentativa];

    const arrowsFunctions = {
        ArrowRight: () => {
            document.getElementById(`input${num_tentativa}_${posicao_letra == 4 ? posicao_letra : posicao_letra + 1}`).focus();
        },
        ArrowDown: () => {
            document.getElementById(`input${num_tentativa}_${posicao_letra == 4 ? posicao_letra : posicao_letra + 1}`).focus();
        },

        ArrowLeft: () => {
            document.getElementById(`input${num_tentativa}_${posicao_letra == 0 ? posicao_letra : posicao_letra - 1}`).focus();
        },
        ArrowUp: () => {
            document.getElementById(`input${num_tentativa}_${posicao_letra == 0 ? posicao_letra : posicao_letra - 1}`).focus();
        },
    };

    if (e.code == "Enter") {
        tentar();
        return;
    }

    if (tentativa && e.code == "Backspace" && posicao_letra > 0 && tentativa[posicao_letra] == "") {
        document.getElementById("input" + num_tentativa + "_" + (posicao_letra - 1)).focus();
        return;
    }

    if (e.code.includes("Arrow")) {
        arrowsFunctions[e.code]();

        return;
    }

    if (!e.code.includes("Key") && e.key !== "ç" && e.code !== "Backspace") {
        document.getElementById("input" + num_tentativa + "_" + posicao_letra).value = tentativa ? tentativa[posicao_letra] : "";

        return;
    }

    if (letra != "") letra = letra.toLowerCase();

    if (typeof tentativa == "undefined") {
        tentativas.push(["", "", "", "", ""]);
        tentativas_com_chars_especiais.push(["", "", "", "", ""]);
    }

    tentativa_incompleta = validarTentativa();
    tentativas_com_chars_especiais[num_tentativa][posicao_letra] = letra;

    if (letra != "") {
        for (const char_normal in special_chars) {
            const chars_especiais = special_chars[char_normal];

            if (chars_especiais.includes(letra)) {
                letra = char_normal;
                break;
            }
        }
    }

    tentativas[num_tentativa][posicao_letra] = letra;

    if (letra != "") {
        if (posicao_letra != 4) {
            document.getElementById("input" + num_tentativa + "_" + (posicao_letra + 1)).focus();
        } else {
            tentativa_incompleta = false;
        }
    }
}

function compararRespostas() {
    let correta = true;

    const tentativa = tentativas[tentativas.length - 1];

    for (let index = 0; index < palavra.length; index++) {

        if (tentativa[index] != palavra[index]) {
            correta = false;
            break;
        }
    }

    if (correta) {
        document.getElementsByName("input").disabled = true;

        setTimeout(() => {
            alert("Parabéns krai");
            reiniciar();
        }, 1000);
    } else {
        if (tentativas.length == qtd_tentativas) {
            setTimeout(() => {
                alert("perdeu otário, era " + palavra_com_chars_especiais.join(""));
                reiniciar();
            }, 500);
        } else {
            tentativa_incompleta = true;
            enableInputs(tentativas.length);
        }
    }
}

function tentar() {
    if (!tentativa_incompleta /*&& palavras.includes(tentativas[tentativas.length - 1].join(''))*/) {
        compararRespostas();
        gerarDivTentativas();
    }
}

function reiniciar() {
    tentativas = [];
    letras_corretas = [];
    tentativa_incompleta = true;

    gerarInputs();
    pegarPalavra();
    enableInputs(tentativas.length);

    const letras = document.getElementsByClassName("letra");

    for (let index = 0; index < letras.length; index++) {
        const badge_letra = letras[index];

        badge_letra.classList.remove("bg-dark", "bg-success", "bg-warning");
    }
}

setTimeout(() => {
    enableInputs(tentativas.length);
    pegarPalavra();
    // gerarDivTentativas();
    // compararRespostas();
}, 500);

const letras_teclado = document.querySelectorAll(".letra");

for (const element of letras_teclado) {
    element.addEventListener("click", selecionarLetraTecladoDigital);
}
