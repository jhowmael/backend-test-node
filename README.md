# Sobre o Projeto  
API REST para gerenciamento de tarefas, desenvolvida como parte de um desafio técnico para a vaga de Desenvolvedor(a) Júnior.

---
## Tecnologias Utilizadas  
- **NestJS** – Framework Node.js para construção de aplicações escaláveis.  
- **PostgreSQL** – Banco de dados relacional.  
- **Kysely** – QueryBuilder para SQL com tipagem.  
- **Docker** – Para orquestração do banco de dados.  
- **Swagger** – Ferramente de documentação de API.  
- **Jest** – Framework de testes.  

---
## Endpoints Disponíveis  
- `POST /tasks` – Cria uma nova tarefa.  
- `GET /tasks` – Lista todas as tarefas.  
- `GET /tasks/status/:status` – Lista tarefas por status (`pending`, `in-progress`, `completed`).  
- `GET /tasks/:id` – Busca uma tarefa por ID.  
- `PATCH /tasks/:id` – Atualiza os dados de uma tarefa.  
- `DELETE /tasks/:id` – Remove uma tarefa.

---
## Links Úteis  
- [Documentação Swagger](https://swagger.io/docs)  
- [Documentação NestJS](https://docs.nestjs.com)  
- [Documentação PostgreSQL](https://www.postgresql.org/docs)  
- [Documentação Kysely](https://kysely.dev/docs/intro)  
- [Documentação Docker](https://docs.docker.com/build-cloud)
- [Documentação Jest](https://jestjs.io/docs/getting-started)

---
## Instruções de Execução

### 1. Clonar o Repositório  
Clone o repositório e acesse a pasta do projeto:  
```bash
git clone https://github.com/seu-usuario/gbm-tasks-api.git
```
```bash
cd backend-test-node  
```

### 2. Subir os Containers com Docker  
Inicie os serviços (PostgreSQL e a aplicação NestJS):  
```bash
docker-compose up -d --build
```

### 3. Verificar se os Containers Estão Ativos  
Execute o comando:
```bash
docker ps
```

A saída esperada será parecida com:

```
CONTAINER ID   IMAGE                   ...   PORTS                    NAMES
xxxxxx         backend-test-node-api   ...   0.0.0.0:3000->3000/tcp   backend-test-node-api-1
yyyyyy         postgres:15             ...   0.0.0.0:5432->5432/tcp   postgres_db
```

### 4. Criar a Tabela Manualmente (Migration SQL)

**Copie o arquivo SQL para dentro do container do banco de dados:**
```bash
docker cp src/database/migrations/001_create_tasks_table.sql postgres_db:/tmp/001_create_tasks_table.sql
```

**Acesse o container do PostgreSQL:**
```bash
docker exec -it postgres_db bash
```

**Dentro do container, execute o script SQL:**
```bash
psql -U user -d gbm  
```
```bash  
\i /tmp/001_create_tasks_table.sql  
```

**Utilize o seguinte comando para verficar se as tabelas estão criadas**
```bash  
\dt 
```
> ⚠️ Lembre-se de que os valores `user` e `gbm` devem coincidir com os definidos nas variáveis `POSTGRES_USER` e `POSTGRES_DB` no `docker-compose.yml`.


### 5. Retornar a raiz do projeto  

**Utilize os seguintes comandos para retornar a raiz do projeto**  
```bash
\q  
```
```bash
exit  
```

### 6. Instalar Dependências da Aplicação  
Na raiz do projeto exevute o comando para instalar os pacotes necessários:  
```bash
npm install
```

### 7. Rodar Testes do Jest  
Execute o comando:  
```bash
npm run test
```

### 8. Acessar a Documentação da API (Swagger)  
Abra no navegador e acesse:
```
http://localhost:3000/api
```
---
## Participante  
**Nome:** Jonatan Ismael dos Santos  
**Email:** jonatan.ismael996@gmail.com  
**Telefone:** (13) 99666-2857  
**LinkedIn:** [jonatan-ismael-dos-santos](https://www.linkedin.com/in/jonatan-ismael-dos-santos-182326219/)

---
## 🙏 Agradecimento  
Obrigado pela oportunidade, foi muito divertido! 🚀