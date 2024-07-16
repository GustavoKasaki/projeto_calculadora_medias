const form = document.getElementById('formAtividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="aprovado">'
const imgReprovado = '<img src="./images/reprovado.png" alt="reprovado">'
const atividades = []; /* cria uma string "[]" para registrar o nome das atividades */
const notas = []; /* cria uma string "[]" para registrar a nota das atividades */
const aprovado = '<span class="resultado aprovado">Aprovado</span>';
const reprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt('Digite a nota mínima:'));

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nomeAtividade');
    const inputNotaAtividade = document.getElementById('notaAtividade');

    if (atividades.includes(inputNomeAtividade.value)) { /* Verifica se a atividade ja foi incluida anteriormente */
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida!`);
    }

    else { /* Se não foi inserida, a função segue normalmente */
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
    
        let linha = '<tr>';
        linha += `<td id="tNome">${inputNomeAtividade.value}</td>`;
        linha += `<td id="tNota">${inputNotaAtividade.value}</td>`;
        linha += `<td id="tAprovado">${inputNotaAtividade.value >= 7 ? imgAprovado : imgReprovado}</td>`; /* (? = if) (: = else) */
    
        linhas += linha;
    
        inputNomeAtividade.value = '';
        inputNotaAtividade.value = '';
    }
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();
    
    document.getElementById('tMediaFinal').innerHTML = mediaFinal;
    document.getElementById('tResultado').innerHTML = mediaFinal >= notaMinima ? aprovado : reprovado;
}

function calculaMediaFinal() {
    let somaNotas = 0;

    for(let i=0; i < notas.length; i++) {
        somaNotas += notas[i]
    }

    return Math.round((somaNotas / notas.length)/0.5)*0.5; /* Objeto estático usado para arredondar os valores decimais */
}