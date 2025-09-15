# Pitiza

Pitiza é uma aplicação web para gerenciamento de pedidos de pizza, composta por um frontend em React (Vite) e um backend em Node.js (Express).

## Demonstração

[Assista ao vídeo demo](https://www.youtube.com/watch?v=Esd3CZ3J6OE)

## Estrutura do Projeto

```
backend/
  api/
    db.js
    index.js
    package.json
    controllers/
      loginController.js
      orderController.js
      userController.js
  db/
    script.sql
frontend/
  eslint.config.js
  index.html
  package.json
  vite.config.js
  public/
    vite.svg
  src/
    App.jsx
    main.jsx
    assets/
      pitiza.svg
      react.svg
      showing-pizza.png
      showing-pizza2.png
    components/
      Dashboard/
        CreateOrderModal.jsx
        Dashboard.jsx
        Dashboard.module.css
        DashboardHeader.jsx
        OrderTable.jsx
        SearchModal.jsx
        UpdateModal.jsx
        Footer/
          Footer.jsx
          Footer.module.css
        Navbar/
          Navbar.jsx
          Navbar.module.css
      Login/
        Login.jsx
        Login.module.css
      Register/
        Register.jsx
        Register.module.css
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
- **Banco de Dados:** SQL
