function Pergunta(pergunta, op1, op2, op3, resp) {
    this.alternativas = [op1, op2, op3, resp].sort()
    this.resposta = resp
    this.pergunta = pergunta

}

const pergunta_num_vingadores1 = new Pergunta('Quantos vingadores apareceram no primeiro Avengers?', '4', '5', '7', '6')
const pergunta_vilao1          = new Pergunta('Qual é o nome do vilão do primeiro Avengers?', 'Thanos', 'Zemo', 'Ultron', 'Loki')
const pergunta_vilao2          = new Pergunta('Qual é o nome do vilão do segundo Avengers?', 'Thanos', 'Zemo', 'Loki', 'Ultron')
const pergunta_strongest       = new Pergunta('Quem é o vingador mais forte de acordo com Tony Stark?', 'Thor', 'Capitão América', 'Homem de Ferro', 'Hulk')
 
const perguntas = [pergunta_num_vingadores1, pergunta_vilao1, pergunta_vilao2, pergunta_strongest]

id_pergunta_a_escolher = (id) => {
    return perguntas[id]
}

var botao_proximo  = document.querySelector('.botao-proximo')
var botao_anterior = document.querySelector('.botao-anterior')

var contador_id = 0


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

    if (contador_id == 0) {
        botao_anterior.style.display = 'none'
    } else {
        botao_anterior.style.display = 'block'
    }

    if (contador_id == perguntas.length - 1) {
        botao_proximo.style.display = 'none'
    } else {
        botao_proximo.style.display = 'block'
    }
}

rodar_pergunta()

contador_id = 0 

botao_proximo.addEventListener('click', () => {
    contador_id++

    rodar_pergunta(contador_id)

    var resultado = document.querySelector('.resultado')
    resultado.style.display = 'none'
})

botao_anterior.addEventListener('click', () => {
    contador_id--

    rodar_pergunta(contador_id)

    var resultado = document.querySelector('.resultado')
    resultado.style.display = 'none'
})

function imprimir_a_pergunta(pergunta_escolhida) {
    frase_pergunta_html = document.querySelector('.frase-pergunta')
    frase_pergunta_html.textContent = pergunta_escolhida.pergunta
}
