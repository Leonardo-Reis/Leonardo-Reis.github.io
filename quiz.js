function Pergunta(pergunta, op1, op2, op3, resp) {
    this.alternativas = [op1, op2, op3, resp].sort()
    this.resposta = resp
    this.pergunta = pergunta

}

const pergunta_harry           = new Pergunta('Quem é o protagonista do filme harry potter?', 'ronie', 'hermione', 'voldemort', 'harry')
const pergunta_num_vingadores1 = new Pergunta('Quantos vingadores apareceram no primeiro Avengers?', '4', '5', '7', '6')

perguntas = [pergunta_harry, pergunta_num_vingadores1]

id_pergunta = 0

pergunta_html = document.querySelector('.frase-pergunta')
pergunta_html.textContent = perguntas[id_pergunta].pergunta

opcoes_html = document.querySelectorAll('li')

contador = 0

for (let opcao of opcoes_html) {
    opcao.textContent = perguntas[id_pergunta].alternativas[contador]
    contador++
}

for (let opcao of opcoes_html) {
    opcao.addEventListener('click', check)

    function check() {
        resultado = document.querySelector('.resultado')
        if (opcao.textContent == perguntas[id_pergunta].resposta) {
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
