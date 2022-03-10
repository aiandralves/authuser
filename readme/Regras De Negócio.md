## Documentação

### Requisitos

- [x] Deve ser possível cadastrar um usuário
- [x] Deve ser possível acessar sua conta
- [x] Deve ser possível visualizar o nome e o e-mail do usuário
- [x] Deve ser possível deletar sua conta

### Regras de Negócio

- [x] Não deve ser possível cadastrar o usuário com o E-mail já existente
- [x] Não deve ser possível acessar sua conta com um E-mail que não existe ou um E-mail inválido
- [x] Não deve ser possível cadastrar o usuário sem antes confirmar a senha
- [x] Não deve ser possível deletar uma conta não existente

### Modelo Conceitual

- Users (id, name, email, password, confirmPassword)