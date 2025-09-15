# Pitiza

Pitiza é uma aplicação web para gerenciamento de pedidos de um restaurante, composta por um frontend em React (Vite) e um backend em Node.js (Express).

## Demonstração

[Assista ao vídeo demo](https://www.youtube.com/watch?v=Esd3CZ3J6OE)

> Login Screen
> <img width="1913" height="935" alt="login" src="https://github.com/user-attachments/assets/53a73856-e10f-422e-90f0-9f4ef7541ab3" />

> Dashboard Screen
> <img width="1917" height="943" alt="dashboard" src="https://github.com/user-attachments/assets/dc65d9ed-55e7-4cc6-a528-548e026158c7" />

> Create Screen
> <img width="1913" height="940" alt="create" src="https://github.com/user-attachments/assets/a982c8fc-37d8-4f23-ac80-2f852c92f9d1" />

> Search Screen
> <img width="1915" height="940" alt="search" src="https://github.com/user-attachments/assets/4c0a9744-862e-40b6-b63f-03675f46d40b" />

> Update Screen
> <img width="1913" height="938" alt="update" src="https://github.com/user-attachments/assets/6a408462-5398-45bd-b881-a821e2e43170" />

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

O banco de dados utilizado é **MySQL**.

O script de criação do banco está em `backend/db/script.sql`.

A configuração de acesso ao banco deve ser feita no arquivo `.env` na pasta `backend/`, seguindo o exemplo abaixo:

```
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=pitiza
```

Certifique-se de criar o banco e as tabelas executando o script SQL antes de iniciar o backend.

## Tecnologias Utilizadas

- **Frontend:** React, Vite, CSS Modules
- **Backend:** Node.js, Express
- **Banco de Dados:** MySQL
