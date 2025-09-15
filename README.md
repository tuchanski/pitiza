# Pitiza

Pitiza é uma aplicação web para gerenciamento de pedidos de pizza, composta por um frontend em React (Vite) e um backend em Node.js (Express).

## Demonstração

[Assista ao vídeo demo](https://www.youtube.com/watch?v=Esd3CZ3J6OE)

## Estrutura do Projeto

```
pitiza/
├── backend/
│   ├── api/
│   │   ├── controllers/   # Lógica das rotas (login, usuário, pedido)
│   │   ├── db.js          # Conexão com o banco de dados
│   │   ├── index.js       # Servidor Express principal
│   └── db/
│       └── script.sql     # Script de criação do banco
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes React (Dashboard, Login, Register)
│   │   ├── assets/        # Imagens e ícones
│   │   ├── App.jsx        # Componente principal
│   │   └── main.jsx       # Ponto de entrada do app
│   ├── public/            # Arquivos públicos
│   └── package.json       # Dependências do frontend
└── README.md
```

## Funcionalidades

## Endpoints da API

### Usuários

- `GET /users` — Lista todos os usuários
- `GET /users/:id` — Busca usuário por ID
- `POST /users` — Cria um novo usuário
- `PATCH /users/:id` — Atualiza dados do usuário
- `DELETE /users/:id` — Remove usuário

### Pedidos

- `GET /users/:user_id/orders` — Lista todos os pedidos de um usuário
- `GET /users/:user_id/orders/:id` — Busca pedido por ID
- `POST /users/:user_id/orders` — Cria um novo pedido para o usuário
- `PATCH /users/:user_id/orders/:id` — Atualiza pedido
- `DELETE /orders/:id` — Remove pedido

### Autenticação

- `POST /login` — Realiza login
- `GET /me` — Retorna dados do usuário autenticado (token necessário)

## Como executar

### Backend

1. Acesse a pasta `backend/api`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```

### Frontend

1. Acesse a pasta `frontend`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Banco de Dados

- O script de criação do banco está em `backend/db/script.sql`.
- Configure a conexão no arquivo `backend/api/db.js`.

## Tecnologias Utilizadas

- **Frontend:** React, Vite, CSS Modules
- **Backend:** Node.js, Express
- **Banco de Dados:** MySQL
