function Pergunta(pergunta, op1, op2, op3, resp) {
    this.alternativas = [op1, op2, op3, resp].sort()
    this.resposta = resp
    this.pergunta = pergunta

}

const pergunta_num_vingadores1 = new Pergunta('Quantos vingadores apareceram no primeiro Avengers?', '4', '5', '7', '6')
const pergunta_vilao1          = new Pergunta('Qual é o nome do vilão do primeiro Avengers?', 'Thanos', 'Zemo', 'Ultron', 'Loki')
 
const perguntas = [pergunta_num_vingadores1, pergunta_vilao1]

id_pergunta_a_escolher = function(id) {
    return perguntas[id]
}

function rodar_pergunta(id=0) {
    const pergunta_escolhida = id_pergunta_a_escolher(id)
    imprimir_a_pergunta(pergunta_escolhida)

    var opcoes_html = document.querySelectorAll('li')

    var contador_alternativas = 0
    for (let opcao of opcoes_html) {
        opcao.textContent = pergunta_escolhida.alternativas[contador_alternativas]
        contador_alternativas++
    }

    for (let opcao of opcoes_html) {
        opcao.addEventListener('click', check)

        function check() {
            var resultado = document.querySelector('.resultado')
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

const botao_proximo  = document.querySelector('.botao-proximo')
const botao_anterior = document.querySelector('.botao-anterior')

var contador_id = 0 
botao_proximo.addEventListener('click', () => {
    if (contador_id < perguntas.length - 1) {  
      contador_id++
    }
    rodar_pergunta(contador_id)
    var resultado = document.querySelector('.resultado')
    resultado.style.display = 'none'
})

botao_anterior.addEventListener('click', () => {
    if (contador_id > 0) {
        contador_id--
    }
    rodar_pergunta(contador_id)
    var resultado = document.querySelector('.resultado')

    resultado.style.display = 'none'
})

function imprimir_a_pergunta(pergunta_escolhida) {
    frase_pergunta_html = document.querySelector('.frase-pergunta')
    frase_pergunta_html.textContent = pergunta_escolhida.pergunta
}

