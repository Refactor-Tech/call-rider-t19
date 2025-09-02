# Aula 2

## Arquitetura Hexagonal

- Foco na separação de responsabilidades

Regras de negócios devem ser desacopladas de:

- **Drivers**: Tudo aquilo que trás interação externa para a aplicação)
  - usuário
  - SPA
  - App Mobile
  - Filas
  - Testes
- **Resources**:
  - Base de dados
  - File System
  - Servidor SMTP

> Em resumo, o foco é permitir que a aplicação possa ser dirigida tanto por usuários, outros programas, testes automatizados ou scripts e que também possa ser desenvolvida e testada em isolamento de _runtime devices_ e banco de dados

## Test Patterns

Testar nem sempre é simples

### Test double

É um padrão que tem por objetivo **substituir um DOC (depended-on component)** em um determinado tipo de teste por motivos de performance ou segurança
