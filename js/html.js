const div_opcs = document.getElementById("opcs");

function gerarInputs() {
    let inputs = "";

    for (let index = 0; index < qtd_tentativas; index++) {
        inputs += `
            <div class="row justify-content-center" id="tentativa${index}">
        `;

        for (let idx = 0; idx < 5; idx++) {
            const funcao = `keyTecladoInput(event, ${index}, ${idx}, value)`;

            inputs += `
                <div class="col-2">
                    <input type="text" maxlength="1" class="form-control" id="input${index}_${idx}"
                        onKeyUp="${funcao}" disabled
                    />
                </div>
            `;
        }

        inputs += `
            </div>
        `;
    }

    div_opcs.innerHTML = inputs;
}

function gerarDivTentativas() {
    let badges = ``;
    const num_tentativa = tentativas.length - 1;

    tentativas[num_tentativa].map((letra, idx) => {
        let color = "dark";

        if (letra == palavra[idx]) {
            color = "success";
            if (!letras_corretas.includes(letra)) {
                letras_corretas.push(letra);

                document
                    .getElementById(letra)
                    .classList.add("badge", `bg-${color}`);
            }
        } else if (palavra.includes(letra)) {
            color = "warning";
        }

        badges += `
            <div class="col-2">
                <h2>
                    <span class="border border-light badge bg-${color} tentativa">
                        ${tentativas_com_chars_especiais[num_tentativa][idx]}
                    </span>
                </h2>
            </div>
        `;

        if (!letras_corretas.includes(letra)) {
            document
                .getElementById(letra)
                .classList.add("badge", `bg-${color}`);
        }
    });

    document.getElementById("tentativa" + num_tentativa).innerHTML = badges;
}

gerarInputs();