function Pergunta(pergunta, op1, op2, op3, resp) {
    this.alternativas = [op1, op2, op3, resp].sort()
    this.resposta = resp
    this.pergunta = pergunta

}

pergunta_harry = new Pergunta('Quem é o protagonista do filme harry potter?', 'ronie', 'hermione', 'voldemort', 'harry')

pergunta_num_vingadores1 = new Pergunta('Quantos vingadores apareceram no primeiro Avengers?')

perguntas = [pergunta_harry, pergunta_num_vingadores1]

pergunta_html = document.querySelector('.frase-pergunta')
pergunta_html.textContent = pergunta_harry.pergunta

opcoes_html = document.querySelectorAll('li')

contador = 0

for (let opcao of opcoes_html) {
    opcao.textContent = pergunta_harry.alternativas[contador]
    contador++
}

for (let opcao of opcoes_html) {
    opcao.addEventListener('click', check)

    function check() {
        resultado = document.querySelector('.resultado')
        if (opcao.textContent == pergunta_harry.resposta) {
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
