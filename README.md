# Trackfy API

API para gerenciamento de áreas, pessoas e presenças desenvolvida com NestJS.

## 🚀 Começando

Siga estas instruções para executar o projeto em sua máquina local.

### 📋 Pré-requisitos

- Docker
- Docker Compose
- Conta no Google Developers Console (para autenticação OAuth)

### 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd trackfy
```

2. Copie o arquivo de ambiente de exemplo:
```bash
cp .env.example .env
```

3. Configure as variáveis de ambiente no arquivo `.env`:
```bash
# Configurações do PostgreSQL
POSTGRES_DB=trackfy
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_PORT=5432
DATABASE_URL="postgresql://root:root@localhost:5432/trackfy"

# Configurações JWT
JWT_SECRET=jwtsecret

# Configurações do Google OAuth (obtenha em https://console.developers.google.com)
GOOGLE_CLIENT_ID=sua_google_client_id_aqui
GOOGLE_CLIENT_SECRET=sua_google_client_secret_aqui

# Configurações da aplicação
PORT=3001
BASE_URL=http://localhost:3001
```

4. Execute a aplicação com Docker Compose:
```bash
docker-compose up -d --build
```

5. A aplicação estará disponível em: http://localhost:3001

6. Acesse a documentação da API (Swagger) em: http://localhost:3001/docs

## 🏗️ Decisões Técnicas

### Arquitetura e Framework
- **NestJS**: Framework escolhido por sua arquitetura modular, TypeScript nativo e ecossistema robusto
- **Padrão de camadas**: Separação clara entre controllers, services e repositories
- **Injeção de dependência**: Utilização do sistema de injeção de dependência do NestJS para melhor testabilidade e manutenção

### Banco de Dados e ORM
- **PostgreSQL**: Banco de dados relacional escolhido por sua confiabilidade e recursos avançados
- **Prisma**: ORM moderno com type safety, migrações e fácil integração com NestJS
- **Docker**: Conteinerização do banco de dados e aplicação para consistência entre ambientes

### Documentação e Autenticação
- **Swagger**: Documentação automática da API para facilitar o consumo pelos clientes
- **Google OAuth**: Autenticação via Google para simplificar o processo de login e aumentar a segurança

## 📊 Decisões de Regras de Negócio

### Validações e Restrições
- **Campo name em Area é único**: Garante que não haja áreas duplicadas no sistema
- **Campo name em Person não é único**: Permite pessoas com nomes iguais
- **occurredAt em presenças**: Registro temporal preciso das presenças
- **Não é possível cadastrar presenças no futuro**: Validação para manter a integridade temporal dos dados

### Flexibilidade de Acesso
- **Pessoas podem visitar áreas que não são a dela**: Permite maior flexibilidade no registro de movimentação

## 🔮 Melhorias Futuras

### Estrutura de Dados
- **Tabelas de domínio**: Implementação de tabelas para role, type e location para normalização do modelo de dados
- **Paginação**: Adição de paginação nos endpoints de listagem para melhor performance

### Qualidade de Código
- **Testes automatizados**: Implementação de testes unitários, de integração e e2e
- **Tratativas melhores de datas**: Melhorias na manipulação e validação de datas

### Funcionalidades
- **Restante dos CRUDs das entidades**: Completar todas as operações CRUD para todas as entidades
- **Deploy**: Configuração de pipeline CI/CD e deploy em ambiente de produção

## 🛠️ Tecnologias Utilizadas

- NestJS
- PostgreSQL
- Prisma
- Docker
- Docker Compose
- Swagger
- Google OAuth
- JWT