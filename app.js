let lista = [];
let apagados = [];


function botaoLimpar() {
    event.stopPropagation();
    window.location.reload();  // recarrega a página
};


function botaoVoltar() {
    event.stopPropagation();
    if (lista.length === 0) {
        // pass
    } else {
        apagados.push(lista[lista.length-1]);

        const pegarP = document.getElementById(`${lista[lista.length-1]['id']}`);
        pegarP.remove();  // deleta o P de último id

        lista.pop();  // apaga ultimo elemento
    };
};


function botaoAvancar() {
    event.stopPropagation();
    if (apagados.length === 0) {
        // pass
    } else {
        function hasDuplicates(array) {
            return new Set(array).size !== array.length;
        };

        let verificacao = [];

        for (let c = 0; c < lista.length; c++) {
            verificacao.push(lista[c]['id']);  // joga os ids em outro array
        };

        for (let c = 0; c < apagados.length; c++) {
            verificacao.push(apagados[c]['id']);
        };

        if (hasDuplicates(verificacao)) {
            verificacao = [];  // caso true
            apagados = [];
        } else {
            lista.push(apagados[apagados.length-1]);
            apagados.pop();

            criarPonto();
        };
    };
};


function criarPonto() {
    const newDot = document.createElement('p');
    newDot.id = lista[lista.length-1]['id'];
    newDot.style.top = `${lista[lista.length-1]['posY']}px`;
    newDot.style.left = `${lista[lista.length-1]['posX']}px`;
    divContainer.appendChild(newDot);

    // console.log(lista);
    // console.log(apagados);
};


const divContainer = document.querySelector('.container');
divContainer.onclick = function(event) {
    let pegarCoordenadaX = event.pageX;
    let pegarCoordenadaY = event.pageY;

    dicionario = {
        id: null,
        posX: pegarCoordenadaX,
        posY: pegarCoordenadaY,
    };

    if (lista.length === 0) {
        dicionario['id'] = 1;
    } else {
        dicionario['id'] = lista[lista.length-1]['id'] + 1;
    };

    lista.push(dicionario);  // insere os dados no array

    criarPonto();
};
