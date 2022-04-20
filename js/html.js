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
                <div class="col-2" style="margin-left:-15px">
                    <input type="text" maxlength="1" class="form-control input-tentativa" id="input${index}_${idx}"
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

        const btn_letra = document.getElementById(letra);

        if (letra == palavra[idx]) {
            color = "success";

            if (!letras_corretas.includes(letra)) {
                letras_corretas.push(letra);

                btn_letra.classList.remove(`btn-warning`);
                btn_letra.classList.add(`btn-${color}`);
            }
        } else if (palavra.includes(letra)) {
            color = "warning";
        }

        badges += `
            <div class="col-2" style="margin-left:-15px; margin-bottom:-5px; margin-top:4px">
                <h2>
                    <span class="input-tentativa badge bg-${color} tentativa" style="height: 60px; width: 60px;">
                        ${tentativas_com_chars_especiais[num_tentativa][idx]}
                    </span>
                </h2>
            </div>
        `;

        if (!letras_corretas.includes(letra)) {
            btn_letra.classList.add(`btn-${color}`);
            if (color === "dark") btn_letra.disabled = true;
        }
    });

    document.getElementById("tentativa" + num_tentativa).innerHTML = badges;
    document.getElementById("tentativa" + num_tentativa).style.marginLeft = "-9px";
}

gerarInputs();
