# Aula 1

**Visão integrada entre os temas**

- Clean Code
- Code Smells
- Refactoring
- Testes
- TDD
- Test Patterns
- Arquitetura Hexagonal
- Clean Architecture
- DDD
- Microsserviços
- Design Patterns
- SOLID Principles
- Event Driven
- CQRS

## Porque estamos aqui?

Como usar bem aquilo que eu conheço para tanto resolver o problema mas também tornar factível de trabalhar ao longo do tempo.

## Porque o projeto que você trabalha tem o design e a arquitetura que tem?

- [ ] Não sei, **já estava assim quando eu cheguei** (rotatividade alta)
- [ ] **Copiamos de outro projeto** que já existia pra seguir o padrão (risco de estacionar tecnologicamente, melhor focar em princípios)
- [ ] **Seguimos um tutorial** que encontramos na internet
- [ ] A **documentação do framework** disse que era pra fazer assim
- [ ] Não sei exatamente, **foi aleatório**

> Ter uma linha de raciocínio para além apenas copiar e colar, mas se tornar o mais independente possível da tecnologia

## Quem já trabalhou em um projeto onde

- O código era tão bagunçado que **você não sabia nem por onde começar** (começar a task com `Ctrl+F`)
- Existiam partes do projeto que **só uma pessoa sabia mexer** (dependência ruim)
- Era normal mexer **em uma coisa e estragar outra** (alto acoplamento)
- **Tinha mais defeitos para corrigir** do que funcionalidades para implementar (equipe de manutenção e evolução)
- Tudo era urgente e tinha que **parar uma coisa para resolver outra o tempo todo** (dívidas técnicas, chaveamento de contexto)
- Ninguém tinha coragem **de fazer deploy na sexta-feira ou em véspera de feriado** (falta de testes automatizados)

> A qualidade do código é **determinante** na produtividade

### Produtividade x Conveniência

- Mouse pode ser confortável, Vim e emacs também, que podem levar a produtividade
- Produtividade é vazão de valor, não é linha de código nem número de commits
- O gargalo não é escrita de código ou volume
- Luz colorida não faz você entragar mais 😆
- Entregar mais está relacionado ao que você já construiu, como você usa aquilo que você sabe, o quanto de teste que você automatiza, o quanto de efeito colateral você gera.

> Uma das principais virtudes é a boa comunicação pelo código. Clareza para quem ninguém tenha dúvida do que aquele código faz.

> Deve existir um equilíbrio entre comportamento e estrutura

> _Refactoring_ é um **investimento**, torna o software sustentável e competitivo

### Testes

Os testes automatizados são a **única forma** que temos para garantir que o código funciona e continuará funcionando

#### Estrutura

- **Given/Arrange**: Definição de todas as informações necessárias para executar o comportamento que será testado
- **When/Act**: Executar o comportamento
- **Then/Assert**: Verficar o que aconteceu após a execução, comparando as informações retornadas com a expectativa que foi criada

#### Devem ser FIRST

- **Fast**: devem rodar rápido
- **Independent**: devem poder ser executados isoladamente
- **Repeatable**: devem prover o mesmo resultado todas as vezes que forem executados
- **Self-validating**: devem ter uma saída bem definida indicando sucesso ou falha
- **Timely**: devem ser escritos antes do código-fonte

> TDD é um métdo para **construir software**, não para testá-lo
