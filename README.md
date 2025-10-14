# 📦 Call Rider v19 Monorepo

Bem-vindo ao repositório do **Call Rider v19**!  
Aqui organizamos todo o projeto — backend, frontend e infraestrutura — em um **monorepo** simples, escalável e padronizado.

## 📋 Índice

- [📦 Call Rider v19 Monorepo](#-call-rider-v19-monorepo)
  - [📋 Índice](#-índice)
  - [🏩️ Estrutura do Projeto](#️-estrutura-do-projeto)
  - [🚀 Como Rodar o Projeto](#-como-rodar-o-projeto)
    - [Pré-requisitos](#pré-requisitos)
    - [Instalação (uma vez)](#instalação-uma-vez)
    - [Rodar tudo](#rodar-tudo)
    - [Rodar todos os testes](#rodar-todos-os-testes)
  - [🛠️ Scripts Globais](#️-scripts-globais)
  - [Como Adicionar Dependências no Monorepo](#como-adicionar-dependências-no-monorepo)
    - [1. Adicionar uma dependência de **runtime** a um app específico](#1-adicionar-uma-dependência-de-runtime-a-um-app-específico)
    - [2. Adicionar uma dependência de **desenvolvimento** a um app específico](#2-adicionar-uma-dependência-de-desenvolvimento-a-um-app-específico)
  - [3. Adicionar uma dependência **global** para todos os apps](#3-adicionar-uma-dependência-global-para-todos-os-apps)
  - [Regras de Boas Práticas para Dependências](#regras-de-boas-práticas-para-dependências)
  - [📦 Atualizando Pacotes](#-atualizando-pacotes)
    - [Como atualizar todos os pacotes](#como-atualizar-todos-os-pacotes)
    - [Verificar pacotes desatualizados](#verificar-pacotes-desatualizados)
    - [Forçar major updates](#forçar-major-updates)
    - [⚠️ Possíveis Problemas e Soluções](#️-possíveis-problemas-e-soluções)
    - [🔄 Rotina Recomendada](#-rotina-recomendada)
  - [Status Atual do Projeto](#status-atual-do-projeto)
  - [🧱 Boas Práticas](#-boas-práticas)
  - [🛡️ Contribuindo](#️-contribuindo)
  - [📚 Recursos Úteis](#-recursos-úteis)

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

## 📦 Atualizando Pacotes

### Como atualizar todos os pacotes

Para manter o projeto sempre atualizado com as versões mais recentes:

```bash
# Atualizar pacotes do backend
pnpm update --filter backend

# Atualizar pacotes do frontend
pnpm update --filter frontend

# Atualizar pacotes globais (root)
pnpm update -w
```

### Verificar pacotes desatualizados

```bash
# Ver todos os pacotes desatualizados
pnpm outdated

# Ver pacotes desatualizados por workspace
pnpm outdated --filter backend
pnpm outdated --filter frontend
```

### Forçar major updates

Por padrão, o `pnpm update` não atualiza major versions. Para forçar:

```bash
# Atualizar para a versão mais recente (incluindo major)
pnpm add package-name@latest --filter backend

# Exemplo prático:
pnpm add -D typescript@latest --filter frontend
```

### ⚠️ Possíveis Problemas e Soluções

**1. Conflitos de versão entre workspaces:**

```bash
# Limpar node_modules e reinstalar
rm -rf node_modules apps/*/node_modules
pnpm install
```

**2. Lockfile desatualizado:**

```bash
# Regenerar o lockfile
rm pnpm-lock.yaml
pnpm install
```

**3. Breaking changes em major updates:**

- ⚠️ Sempre teste após major updates
- 📚 Consulte o CHANGELOG dos pacotes
- 🧪 Execute todos os testes: `pnpm test -r`

**4. Problemas com TypeScript após updates:**

```bash
# Verificar compatibilidade de tipos
pnpm --filter frontend run build
pnpm --filter backend run build
```

**5. Cache corrompido:**

```bash
# Limpar cache do pnpm
pnpm store prune
```

### 🔄 Rotina Recomendada

1. **Semanalmente:** `pnpm outdated` para verificar updates
2. **Mensalmente:** Atualizar minor/patch versions
3. **Trimestralmente:** Avaliar major updates
4. **Sempre:** Testar após atualizações

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
