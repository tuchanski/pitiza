# Pitiza

Um pequeno sistema de gerenciamento de pedidos para pizzarias, composto por um backend em Node.js/Express com MySQL e um frontend em React.

## Visão geral

- Backend: Node.js + Express.
- Frontend: React + Vite.
- Autenticação: JWT (token armazenado no localStorage no frontend).

O app permite criar, listar, buscar, atualizar e deletar pedidos atrelados a usuários/restaurantes.

## Pré-requisitos

- Node.js (>=16)
- npm ou yarn
- MySQL

## Estrutura do repositório (resumida)

```
pitiza-remake/
├─ backend/
│  ├─ controllers/       # controllers: user, order, login
│  ├─ routes/            # routes (mounted under /api)
│  ├─ db.js              # connection pool mysql2
│  ├─ index.js           # express app entry
│  ├─ package.json
│  └─ .env               # (não comitado) DB env vars
├─ frontend/
│  ├─ src/
│  │  ├─ components/     # React components (Card, Modal, Header...)
│  │  ├─ pages/          # pages (Dashboard, Login, Register)
│  │  ├─ main.jsx        # app entry
│  │  └─ App.jsx
│  ├─ package.json
│  └─ vite.config.js
└─ README.md
```

## Banco de Dados

O projeto usa MySQL. Não há script SQL incluído neste repositório, então abaixo vai um snippet mínimo para criar o schema/tabelas usados pelo backend.

Observação: adapte `pitiza` como nome do database (ou o que você usar em `DB_NAME`).

```sql
CREATE DATABASE IF NOT EXISTS pitiza;
USE pitiza;

CREATE TABLE IF NOT EXISTS `user` (
  `id_user` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `restaurant_name` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `order` (
  `id_order` INT AUTO_INCREMENT PRIMARY KEY,
  `customer_name` VARCHAR(255) NOT NULL,
  `items` TEXT NOT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  `id_user` INT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES `user` (id_user) ON DELETE CASCADE
);
```

Cole esse SQL num arquivo e execute no MySQL antes de iniciar o backend, ou crie as tabelas manualmente.

## Variáveis de ambiente

No diretório `backend/` crie um arquivo `.env` com as variáveis abaixo:

```
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=pitiza
JWT_SECRET=uma_chave_secreta
```

Ajuste `PORT` e `JWT_SECRET` conforme necessário.

## Executando o projeto

1. Backend

```bash
cd backend
npm install
npm start
```

- O script `start` no `backend/package.json` usa `nodemon index.js` para desenvolvimento.
- O servidor roda por padrão em `http://localhost:3000`.

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

- O frontend usa Vite e por padrão abre em `http://localhost:5173`.

## Endpoints principais

Observação: todas as rotas estão montadas em `/api` (veja `backend/index.js`).

Usuários

- GET /api/users/:id — retorna dados do usuário
- POST /api/users — cria usuário (registro)
- PATCH /api/users/:id — atualiza usuário
- DELETE /api/users/:id — remove usuário

Pedidos

- GET /api/users/:id_user/orders — lista pedidos do usuário
- GET /api/users/:id_user/orders/:id_order — busca pedido específico
- POST /api/users/:id_user/orders — cria pedido para o usuário
- PATCH /api/users/:id_user/orders/:id_order — atualiza pedido do usuário
- DELETE /api/orders/:id — deleta pedido por id

Autenticação

- POST /api/login — login, retorna JWT

## Demonstração

> Login Screen

> Dashboard Screen

> Create Screen

> Search Screen

> Update Screen

## Autor

Guilherme Tuchanski Rocha
