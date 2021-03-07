function Pergunta(pergunta, op1, op2, op3, resp) {
    this.alternativas = [op1, op2, op3, resp].sort()
    this.resposta = resp
    this.pergunta = pergunta

}

const pergunta_harry           = new Pergunta('Quem é o protagonista do filme harry potter?', 'ronie', 'hermione', 'voldemort', 'harry')
const pergunta_num_vingadores1 = new Pergunta('Quantos vingadores apareceram no primeiro Avengers?', '4', '5', '7', '6')
 
const perguntas = [pergunta_harry, pergunta_num_vingadores1]

id_pergunta_a_escolher = function(id) {
    return perguntas[id]
}

function rodar_pergunta(id=0) {
    pergunta_escolhida = id_pergunta_a_escolher(id)
    imprimir_a_pergunta(pergunta_escolhida)

    opcoes_html = document.querySelectorAll('li')

    contador_alternativas = 0
    for (let opcao of opcoes_html) {
        opcao.textContent = pergunta_escolhida.alternativas[contador_alternativas]
        contador_alternativas++
    }

    for (let opcao of opcoes_html) {
        opcao.addEventListener('click', check)

        function check() {
            resultado = document.querySelector('.resultado')
            if (opcao.textContent === pergunta_escolhida.resposta) {
                resultado.style.display = 'block'
                resultado.style.color = 'green'
                resultado.textContent = 'Certa resposta'
            } else {
                resultado.style.display = 'block'
                resultado.style.color = 'red'
                resultado.textContent = 'Resposta errada'
            }
        }
    }
}

rodar_pergunta()

botao_proximo = document.querySelector('.botao-proximo')
var contador_id = 0 
botao_proximo.addEventListener('click', function() {
    contador_id++
    rodar_pergunta(contador_id)
    resultado.style.display = 'none'
})

function imprimir_a_pergunta(pergunta_escolhida) {
    frase_pergunta_html = document.querySelector('.frase-pergunta')
    frase_pergunta_html.textContent = pergunta_escolhida.pergunta
}
