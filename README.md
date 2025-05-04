# Sobre o projeto
API REST para gerenciamento de tarefas, desenvolvida como parte de um desafio técnico para a vaga de Desenvolvedor(a) Júnior.

## Tecnologias Utilizadas
- NestJS - Framework Node.js para construção de aplicações escaláveis.
- PostgreSQL - Banco de dados relacional.
- Kysely - QueryBuilder para SQL com tipagem.
- Docker - Para orquestração do banco de dados.
- Swagger - Documentação da API.

## Endpoints Disponíveis
- POST /tasks: Cria uma nova tarefa.
- GET /tasks: Lista todas as tarefas.
- GET /tasks/status/:status: Lista tarefas por status (pending, in-progress, completed).
- GET /tasks/:id: Busca uma tarefa por ID.
- PATCH /tasks/:id: Atualiza os dados de uma tarefa.
- DELETE /tasks/:id: Remove uma tarefa.

## Links Úteis
- Swagger no localhost: http://localhost:3000/api
- Documentação Swagger: https://swagger.io/docs
- Documentação Nest JS: https://docs.nestjs.com
- Documentação Postegressql: https://www.postgresql.org/docs
- Documentação Kysely: https://kysely.dev/docs/intro
- Documentação Docker: https://docs.docker.com/build-cloud

# Instruções
1. Clonar o Repositório
git clone https://github.com/seu-usuario/gbm-tasks-api.git
cd gbm-tasks-api

2. Subir o Banco de Dados com Docker
docker-compose up -d
Isso iniciará um container PostgreSQL acessível na porta padrão (5432).

3. Instalar Dependências
npm install

4. Criar as Tabelas (Rodar Migrations)
psql -h localhost -U postgres -d tasks_db -f src/database/migrations/init.sql

5. Rodar o Projeto
npm run start:dev

6. Acessar a Documentação da API (Swagger)
http://localhost:3000/api

# Participante:
Nome: Jonatan Ismael dos Santos
Email: jonatan.ismael996@gmail.com
Telefone: (13) 99666-2857
Linkedin: https://www.linkedin.com/in/jonatan-ismael-dos-santos-182326219/

## Obrigado!
Obrigado pela oportunidade, foi muito divertido! 🚀
