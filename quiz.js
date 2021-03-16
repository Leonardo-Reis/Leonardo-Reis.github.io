function Pergunta (pergunta, op1, op2, op3, resp) {
    this.alternativas = [op1, op2, op3, resp].sort()
    this.resposta   = resp
    this.pergunta   = pergunta
    this.respondida = false
    this.escolhida
    this.acertou
}

const pergunta_num_vingadores1 = new Pergunta('Quantos vingadores apareceram no primeiro Avengers?', '5', '4', '7', '6')
const pergunta_vilao1          = new Pergunta('Qual é o nome do vilão do primeiro Avengers?', 'Thanos', 'Zemo', 'Ultron', 'Loki')
const pergunta_vilao2          = new Pergunta('Qual é o nome do vilão do segundo Avengers?', 'Thanos', 'Zemo', 'Loki', 'Ultron')
const pergunta_strongest       = new Pergunta('Quem é o vingador mais forte de acordo com Tony Stark?', 'Thor', 'Capitão América', 'Homem de Ferro', 'Hulk')

const quiz = {
    perguntas: [pergunta_num_vingadores1, pergunta_vilao1, pergunta_vilao2, pergunta_strongest],

    opcoes_html: document.querySelectorAll('li'),
    resultado: document.querySelector('.resultado'),
    botao_proximo: document.querySelector('.botao-proximo'),
    botao_anterior: document.querySelector('.botao-anterior'),
    contador_acertos: document.querySelector('.contador'),

    contador_id: 0,
    contador_rodadas: 0,
    numero_de_acertos: 0,

    pergunta_atual: function () {return this.perguntas[this.contador_id]},
    
    init: function (contador_id=0) {
        this.imprimir_pergunta(contador_id)
        this.imprimir_cor_alternativas(contador_id)
        this.imprimir_alternativas(contador_id) 
        this.setar_aparição_das_setas(contador_id)
        this.setar_funcionamento_respostas(contador_id)
        this.setar_contador_acertos()
        
        if (this.contador_rodadas === 0) {
            this.adicionar_listeners_setas()
        }
        
        this.contador_rodadas++
    },

    contar_numero_de_acertos: function () {
        let num_de_acertos = this.numero_de_acertos
        this.perguntas.forEach( (pergunta) => {
            if (pergunta.acertou === true) {
                num_de_acertos += 1
            }
        })
        return num_de_acertos
    },

    setar_contador_acertos: function () {
        this.contador_acertos.textContent = this.contar_numero_de_acertos() + '/' + this.perguntas.length
    },

    adicionar_listeners_setas: function () {
        this.botao_proximo.addEventListener('click', () => {
            if (this.contador_id < this.perguntas.length - 1){
                this.contador_id++
            }

            this.resultado.style.display = 'none'

            this.init(this.contador_id)
        })

        this.botao_anterior.addEventListener('click', () => {
            if (this.contador_id > 0) {
                this.contador_id--
            }

            this.resultado.style.display = 'none'

            this.init(this.contador_id)
        })
    },

    setar_aparição_das_setas: function (contador_id) {
        if (contador_id == 0) {
            this.botao_anterior.style.display = 'none'
        } else {
            this.botao_anterior.style.display = 'block'
        }
        if (contador_id == this.perguntas.length - 1) {
            this.botao_proximo.style.display = 'none'
        } else {
            this.botao_proximo.style.display = 'block'
        }
    },

    setar_funcionamento_respostas: function () {
        this.opcoes_html.forEach( (opcao, id_alternativa=0) => {
            opcao.addEventListener('click', () => {
                
                this.pergunta_atual().escolhida = this.opcoes_html[id_alternativa]
                this.resultado.style.display = 'block'

                if (this.pergunta_atual().escolhida.textContent === this.pergunta_atual().resposta && this.pergunta_atual().respondida === false) {
                    this.resultado.textContent    = 'Resposta certa!'
                    this.resultado.style.color    = 'green'
                    this.pergunta_atual().acertou = true
                } else if (this.pergunta_atual().escolhida.textContent !== this.pergunta_atual().resposta && this.pergunta_atual().respondida === false) {
                    this.resultado.textContent    = 'Resposta errada...'
                    this.resultado.style.color    = 'red'
                    this.pergunta_atual().acertou = false
                }
                //Cor do fundo da escolhida
                if (this.pergunta_atual().acertou === true && this.pergunta_atual().respondida === false) {
                    this.pergunta_atual().escolhida.style.background = 'lightgreen'
                } else if (this.pergunta_atual().respondida === false && this.pergunta_atual().acertou === false) {
                    this.pergunta_atual().escolhida.style.background = 'red'
                }

                this.pergunta_atual().respondida = true
                this.setar_contador_acertos()
            })
        })
    },

    imprimir_cor_alternativas: function () {
        this.opcoes_html.forEach( (opcao) => {
            opcao.style.background = 'rgb(255, 124, 124)'
        })
    },

    imprimir_alternativas: function () {
        this.opcoes_html.forEach((opcao, id_alternativa=0) => {
            
            opcao.textContent = this.pergunta_atual().alternativas[id_alternativa]

            if (this.pergunta_atual().respondida === true && this.pergunta_atual().acertou === true) {
                this.resultado.style.display = 'block'
                this.resultado.textContent   = 'Resposta certa!'
                this.resultado.style.color   = 'green'

                this.pergunta_atual().escolhida.style.background = 'lightgreen'
            } else if (this.pergunta_atual().respondida === true && this.pergunta_atual().acertou === false) {
                this.resultado.style.display = 'block'
                this.resultado.textContent   = 'Resposta errada...'
                this.resultado.style.color   = 'red'

                this.pergunta_atual().escolhida.style.background = 'red'
            } else if (this.pergunta_atual().respondida === false) {
                this.resultado.style.display = 'none'
            }
        })
    },

    imprimir_pergunta: function (id=0) {
        frase_pergunta_html = document.querySelector('.frase-pergunta')
        
        frase_pergunta_html.textContent = this.pergunta_atual().pergunta
    },
}
