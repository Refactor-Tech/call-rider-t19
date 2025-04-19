# 📦 Call Rider v19 Monorepo

Bem-vindo ao repositório do **Call Rider v19**!  
Aqui organizamos todo o projeto — backend, frontend e infraestrutura — em um **monorepo** simples, escalável e padronizado.

---

## 🏩️ Estrutura do Projeto

```plaintext
apps/
  backend/   → Código do servidor (API REST)
  frontend/  → Código do cliente (Vue 3 + Vite)

infra/       → Arquivos de infraestrutura (Docker, etc.)

docs/        → Documentação adicional

.gitignore   → Ignore padrão do projeto
pnpm-workspace.yaml → Configura o monorepo
package.json → Scripts globais
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/) (instalar: `npm install -g pnpm`)

---

### Instalação (uma vez)

```bash
pnpm install
```

_(Isso instala todas as dependências do backend e frontend de uma vez.)_

---

### Rodar tudo

**Frontend:**

```bash
pnpm --filter frontend run dev
```

**Backend:**

```bash
pnpm --filter backend run dev
```

---

### Rodar todos os testes

```bash
pnpm test -r
```

---

## 🛠️ Scripts Globais

| Comando         | O que faz                                          |
| :-------------- | :------------------------------------------------- |
| `pnpm install`  | Instala todas as dependências (backend + frontend) |
| `pnpm dev -r`   | Roda os modos de desenvolvimento de todos os apps  |
| `pnpm build -r` | Gera builds de produção para todos os apps         |
| `pnpm test -r`  | Roda todos os testes unitários                     |

_Dica: use o filtro `--filter [nome]` para rodar um app específico._

## Como Adicionar Dependências no Monorepo

### 1. Adicionar uma dependência de **runtime** a um app específico

**Exemplo:** adicionar `express` ao backend:

```bash
pnpm add express --filter backend
```

**Explicação:**

- `--filter backend` → instala somente no workspace `backend`.
- `express` é uma dependência que será usada em tempo de execução.

---

### 2. Adicionar uma dependência de **desenvolvimento** a um app específico

**Exemplo:** adicionar `@types/express` ao backend:

```bash
pnpm add -D @types/express --filter backend
```

**Explicação:**

- `-D` é o atalho para `--save-dev` (dependência de desenvolvimento).
- `--filter backend` instala no `backend` apenas.

---

## 3. Adicionar uma dependência **global** para todos os apps

**Exemplo:** adicionar `typescript`, `vitest` e `tsx` no root:

```bash
pnpm add -D -w typescript vitest tsx
```

**Explicação:**

- `-w` ou `--workspace-root` instala no `package.json` da raiz.
- Usado para ferramentas compartilhadas em todo o monorepo.

---

## Regras de Boas Práticas para Dependências

| Tipo                                              | Onde adicionar                            |
| :------------------------------------------------ | :---------------------------------------- |
| Dependência específica de backend/frontend        | `--filter backend` ou `--filter frontend` |
| Dependência global de toolchain (build/test/lint) | `-w` (root)                               |
| Dependência só de dev (tipagens, tests)           | Adicionar com `-D`                        |

**Não polua apps com dependências desnecessárias!**

---

## Status Atual do Projeto

- Monorepo configurado com pnpm workspaces.
- Backend rodando com Express + PostgreSQL.
- Testes automáticos com Vitest.
- Cobertura de código suportada.
- Docker-compose para infraestrutura.

---

---

## 🧱 Boas Práticas

- Cada aplicativo (`backend/`, `frontend/`) tem seu próprio `package.json` e controle de dependências.
- Nunca instale pacotes diretamente dentro de `apps/backend` ou `apps/frontend` — sempre use o root (`pnpm install`).
- Mantenha o padrão de scripts (`dev`, `build`, `test`) para todos os apps.
- Documente mudanças importantes no `docs/` quando necessário.

---

## 🛡️ Contribuindo

1. Crie uma branch a partir da `dev`:
   ```bash
   git checkout -b feature/minha-feature
   ```
2. Faça seus commits seguindo boas práticas.
3. Abra um Pull Request para `dev`.

_(Branch `main` é reservada para versões de produção.)_

---

## 📚 Recursos Úteis

- [Documentação do PNPM](https://pnpm.io/)
- [Padrão de Monorepo](https://pnpm.io/workspaces)

---

> 🚀 _Juntos, construímos rápido. Juntos, construímos certo._
