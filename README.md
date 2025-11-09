# 🌐 Networking Platform

Uma plataforma de **gestão de membros e intenções de associação**, construída em um **monorepo** com **Next.js (frontend)** e **NestJS (backend)**.
O sistema permite que novos usuários enviem intenções de associação, que **administradores aprovem ou recusem**, e que membros **completem o cadastro** após aprovação via link seguro com token.

---

## 🚀 Tecnologias Utilizadas

* **Next.js 16** — Interface administrativa e página pública de registro de membros
* **NestJS** — API backend com regras de negócio e controle de fluxo
* **Prisma ORM** — Modelagem e acesso ao banco de dados
* **PostgreSQL** — Banco de dados relacional principal
* **shadcn/ui + TailwindCSS** — Componentes e estilização moderna
* **Docker Compose** — Ambiente de banco de dados isolado
* **pnpm Workspaces** — Gerenciamento eficiente de pacotes no monorepo

---

## ⚙️ Configuração Inicial

### 1. Clonar o repositório

```bash
git clone https://github.com/thaliszambarda/networking-platform.git
cd networking-platform
```

### 2. Instalar as dependências

```bash
pnpm install
```

> 🔊 Certifique-se de ter o **Node.js 20+** e o **pnpm** habilitado com `corepack enable`.

---

## 🛳️ Banco de Dados (PostgreSQL via Docker)

A aplicação utiliza um container Docker para o PostgreSQL.

### 1. Subir o banco de dados

```bash
docker compose up -d
```

Isso criará um container chamado `networking-db` na porta **5432**.

### 2. Verificar se o container está rodando

```bash
docker ps
```

---

## 🔑 Variáveis de Ambiente

Cada app (`client` e `server`) possui um arquivo `.env.example` com variáveis de exemplo.

### 1. Copiar os exemplos

```bash
cp .env.example .env
cp apps/server/.env.example apps/server/.env
cp apps/client/.env.example apps/client/.env
```

### 2. Configurar os valores

#### 🧬 Backend (`apps/server/.env`)

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/networking"
ADMIN_SECRET="my_secret_123"
```

#### 🖥️ Frontend (`apps/client/.env`)

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_ADMIN_SECRET="my_secret_123"
```

---

## 🧱️ Rodando a Aplicação

Com os comandos já definidos no `package.json`, basta usar:

### 1. Iniciar **frontend** e **backend** juntos

```bash
pnpm dev
```

Isso executará:

* **Client (Next.js)** em [http://localhost:3000](http://localhost:3000)
* **Server (NestJS)** em [http://localhost:3001](http://localhost:3001)

### 2. Rodar individualmente

```bash
pnpm --filter client dev
pnpm --filter server dev
```

---

## 🥮 Banco de Dados (Prisma)

### Aplicar migrações

```bash
pnpm prisma:migrate
```

### Abrir o Prisma Studio

```bash
pnpm prisma:studio
```

---

## 🔐 Fluxo da Aplicação

1. **Usuário** envia uma intenção de associação (`/`);
2. **Administrador** visualiza intenções em `/admin/intentions`;
3. Ao aprovar, o sistema gera um **token** e exibe um **toast (Sonner)** com o link `/member/:token`;
4. O **membro** acessa o link e **finaliza o cadastro** com informações adicionais.

---

## 🧹 Comandos Útéis

| Comando                  | Descrição                                     |
| ------------------------ | --------------------------------------------- |
| `pnpm dev`               | Roda client e server em modo desenvolvimento  |
| `pnpm build`             | Cria build de produção para todos os pacotes  |
| `pnpm lint`              | Executa o ESLint em todo o projeto            |
| `pnpm format`            | Formata o código usando a configuração global |
| `pnpm test`              | Executa os testes no backend                  |
| `pnpm test:watch`        | Executa testes em modo observador             |
| `docker compose down -v` | Remove containers e volumes do Docker Compose |

---
