function Pergunta (pergunta, op1, op2, op3, resp) {
    this.alternativas = [op1, op2, op3, resp].sort()
    this.resposta   = resp
    this.pergunta   = pergunta
    this.respondida = false
    this.escolhida
    this.acertou
}

const pergunta_num_vingadores1 = new Pergunta('Quantos vingadores apareceram no primeiro Avengers?', '4', '5', '7', '6')
const pergunta_vilao1          = new Pergunta('Qual é o nome do vilão do primeiro Avengers?', 'Thanos', 'Zemo', 'Ultron', 'Loki')
const pergunta_vilao2          = new Pergunta('Qual é o nome do vilão do segundo Avengers?', 'Thanos', 'Zemo', 'Loki', 'Ultron')
const pergunta_strongest       = new Pergunta('Quem é o vingador mais forte de acordo com Tony Stark?', 'Thor', 'Capitão América', 'Homem de Ferro', 'Hulk')

const quiz = {
    perguntas: [pergunta_num_vingadores1, pergunta_vilao1, pergunta_vilao2, pergunta_strongest],

    opcoes_html: document.querySelectorAll('li'),
    resultado: document.querySelector('.resultado'),
    botao_proximo: document.querySelector('.botao-proximo'),
    botao_anterior: document.querySelector('.botao-anterior'),

    contador_id: 0,
    contador_rodadas: 0,

    init: function (contador_id=0) {
        this.imprimir_pergunta(contador_id)
        this.imprimir_alternativas(contador_id) 
        this.setar_aparição_das_setas(contador_id)
        this.setar_funcionamento_respostas(contador_id)
        
        if (this.contador_rodadas === 0) {
            this.adicionar_listeners_setas()
        }
        

        this.imprimir_cor_respondida(contador_id)

        this.contador_rodadas++
    },

    adicionar_listeners_setas: function () {
        this.botao_proximo.addEventListener('click', () => {
            if (this.contador_id < this.perguntas.length - 1){
                this.contador_id++
            }

            this.resultado.style.display = 'none'

            this.init(this.contador_id)

            //this.opcoes_html.forEach( (opcao) => {opcao.style.background = 'rgb(255, 124, 124)'})
        })

        this.botao_anterior.addEventListener('click', () => {
            if (this.contador_id > 0) {
                this.contador_id--
            }

            this.resultado.style.display = 'none'

            this.init(this.contador_id)

            //this.opcoes_html.forEach( (opcao) => {opcao.style.background = 'rgb(255, 124, 124)'})
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

    setar_funcionamento_respostas: function (id=0) {
        this.opcoes_html.forEach( (opcao, id_alternativa=0) => {
            opcao.addEventListener('click', () => {
                let pergunta_atual = this.perguntas[id]
                
                pergunta_atual.escolhida = this.opcoes_html[id_alternativa]
                this.resultado.style.display = 'block'

                if (pergunta_atual.escolhida.textContent === pergunta_atual.resposta && pergunta_atual.respondida === false) {
                    this.resultado.textContent = 'Resposta certa!'
                    this.resultado.style.color = 'green'
                    pergunta_atual.acertou     = true
                } else if (pergunta_atual.escolhida.textContent !== pergunta_atual.resposta && pergunta_atual.respondida === false) {
                    this.resultado.textContent = 'Resposta errada...'
                    this.resultado.style.color = 'red'
                    pergunta_atual.acertou     = false
                }
                //Cor do fundo da escolhida
                if (pergunta_atual.acertou === true && pergunta_atual.respondida === false) {
                    opcao.style.background = 'lightgreen'
                }

                pergunta_atual.respondida = true
            })
        })
    },

    imprimir_cor_respondida: function (id=0) {
        this.opcoes_html.forEach( (opcao) => {
            let pergunta_atual = this.perguntas[id]

            opcao.style.background = 'rgb(255, 124, 124)'
        })
    },

    imprimir_alternativas: function (id=0) {
        this.opcoes_html.forEach((opcao, id_alternativa=0) => {
            let pergunta_atual = this.perguntas[id]
            
            opcao.textContent = pergunta_atual.alternativas[id_alternativa]

            if (pergunta_atual.respondida === true && pergunta_atual.acertou === true) {
                this.resultado.style.display = 'block'
                this.resultado.textContent   = 'Resposta certa!'
                this.resultado.style.color   = 'green'

                pergunta_atual.escolhida.style.background = 'lightgreen'
            } else if (pergunta_atual.respondida === true && pergunta_atual.acertou === false) {
                this.resultado.style.display = 'block'
                this.resultado.textContent   = 'Resposta errada...'
                this.resultado.style.color   = 'red'
            } else if (pergunta_atual.respondida === false) {
                this.resultado.style.display = 'none'
            }
        })
    },

    imprimir_pergunta: function (id=0) {
        frase_pergunta_html = document.querySelector('.frase-pergunta')
        
        frase_pergunta_html.textContent = this.perguntas[id].pergunta
    },
}

//O bug de todas as perguntas anteriores receberem respondida como true provavelmente está acontenco porque a variavel "pergunta atual" foi declarada dentro dos .forEach(), cria uma propriedade chamada pergunta_atual que receba perguntas[contador_id] juntos com as declarações das propriedades no inicio do objeto quiz.
