const main_display = document.querySelector('main');
const div_escolher_cores = document.getElementById('selecao-de-cores');
const botao_validacao = document.getElementById('validar-btn');
const tamanhoSequenciaInput = document.getElementById('tamanhoSequencia');
const maxTentativasInput = document.getElementById('maxTentativas');

let tamanhoDaSequencia = parseInt(tamanhoSequenciaInput.value);
let maxTentativas = parseInt(maxTentativasInput.value);
let cores = ['blue', 'yellow', 'orange', 'green', 'purple'];


let sequenciaAleatoria = [];
let quantidade_tentativas = 1;

tamanhoSequenciaInput.addEventListener('input', function () {
    tamanhoDaSequencia = parseInt(this.value);
    reiniciarJogo();
});

maxTentativasInput.addEventListener('input', function () {
    maxTentativas = parseInt(this.value);
    reiniciarJogo();
});

function criarSequenciaAleatoria() {
    for (let i = 1; i <= tamanhoDaSequencia; i++) {
        let cor_aleatoria = cores[Math.floor(Math.random() * cores.length)]
        sequenciaAleatoria.push(cor_aleatoria);
    }
}

botao_validacao.addEventListener('click', (e) => {
    let input_cores = document.querySelectorAll('.selecionar-cor>select');
    let input_ListaDeCores = [];
    for (let v of input_cores) {
        input_ListaDeCores.push(v.value);
    }
    mostrarTentativa('left', input_ListaDeCores);
    correcaoTentativa = correcaoDeSequencia(input_ListaDeCores);
    mostrarTentativa('right', correcaoTentativa);
    ChecarAcertos(correcaoTentativa);
});

function mostrarTentativa(type, cores) {
    let visualizarTentativa = document.querySelectorAll('#tentativa-' + quantidade_tentativas + '>.' + type + '>div');
    visualizarTentativa.forEach((v, i) => {
        v.setAttribute('style', 'background-color:' + cores[i]);
    });
}

function correcaoDeSequencia(input_ListaDeCores) {
    let registroCoresAleatorias = [...sequenciaAleatoria];
    let correcaoTentativa = [];

    for (let i in registroCoresAleatorias) {
        if (registroCoresAleatorias[i] == input_ListaDeCores[i]) {
            registroCoresAleatorias[i] = null;
            input_ListaDeCores[i] = null;
            correcaoTentativa.push('Green');
        }
    }
    for (let i in registroCoresAleatorias) {
        for (j in input_ListaDeCores) {
            if (registroCoresAleatorias[i] != null && registroCoresAleatorias[i] == input_ListaDeCores[j]) {
                registroCoresAleatorias[i] = null;
                input_ListaDeCores[j] = null;
                correcaoTentativa.push('Orange');
            }
        }
    }
    return correcaoTentativa;
}

function ChecarAcertos(correcaoTentativa) {
    let QtdAcertos = correcaoTentativa.filter(cor => cor === 'Green').length;

    if (QtdAcertos === tamanhoDaSequencia) {
        alert('Parabéns, você venceu!');
        reiniciarJogo();
    } else if (quantidade_tentativas >= maxTentativas) {
        alert('Não fique Triste, tente novamente!');
        reiniciarJogo();
    } else {
        quantidade_tentativas++;
    }
}



function reiniciarJogo() {
    sequenciaAleatoria = [];
    quantidade_tentativas = 1;
    main_display.innerHTML = '';
    div_escolher_cores.innerHTML = '';

    for (let i = 1; i <= maxTentativas; i++) {
        let div_tentativa = document.createElement('div');
        div_tentativa.setAttribute('id', 'tentativa-' + i);
        div_tentativa.setAttribute('class', 'tentativa');
        let div_left = document.createElement('div');
        div_left.setAttribute('class', 'left');
        let div_right = document.createElement('div');
        div_right.setAttribute('class', 'right');

        for (let i = 1; i <= tamanhoDaSequencia; i++) {
            let div_l = document.createElement('div');
            let div_r = document.createElement('div');
            div_left.append(div_l);
            div_right.append(div_r);
        }

        div_tentativa.append(div_left);
        div_tentativa.append(div_right);
        main_display.prepend(div_tentativa);
    }

    for (let i = 1; i <= tamanhoDaSequencia; i++) {
        let div_selecionar_cores = document.createElement('div');
        div_selecionar_cores.setAttribute('class', 'selecionar-cor');
        let select = document.createElement('select');

        for (let cor of cores) {
            let option = document.createElement('option');
            let textoCor = document.createTextNode(cor);
            option.appendChild(textoCor);
            option.setAttribute('style', 'background-color:' + cor);
            option.setAttribute('value', cor);
            select.append(option);
        }
        select.setAttribute('style', 'background-color:' + cores[0]);

        select.addEventListener('change', (e) => {
            e.target.setAttribute('style', 'background-color:' + e.target.value);
        });

        div_selecionar_cores.append(select);
        div_escolher_cores.append(div_selecionar_cores);
    }

    criarSequenciaAleatoria();
    console.log('Sequência correta para vencer: ', sequenciaAleatoria);
}

reiniciarJogo();
