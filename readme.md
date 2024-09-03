# 🎬 FilmFinder

### 🌟 Visão Geral
O **FilmFinder** é uma aplicação web que permite aos usuários **buscar**, **favoritar** e **compartilhar** filmes. A aplicação consiste em um frontend construído com **React** e **TypeScript** e um backend utilizando **Java** com **Spring Boot**. O banco de dados utilizado é o **PostgreSQL**, e o projeto é **containerizado** utilizando **Docker**.

### 🚀 Funcionalidades
- **🔍 Busca de filmes**: Os usuários podem buscar filmes usando a API do TMDb.
- **⭐ Favoritar filmes**: Os usuários podem salvar filmes em uma lista de favoritos.
- **🔗 Compartilhamento de listas**: Geração de links para compartilhamento de listas de filmes favoritos.

### 🛠️ Tecnologias Utilizadas
- **Frontend**: React, TypeScript, Vite, Bootstrap
- **Backend**: Java, Spring Boot
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker, Docker Compose

### 📊 Diagrama de Relacionamento de Entidades
![Diagrama MER](/MER.png)

### 🌐 Deploy na Nuvem do Render
A aplicação **FilmFinder** está disponível online e pode ser acessada diretamente através do link abaixo:

🔗 **[Acesse o FilmFinder na Nuvem](https://frontend-bzi6.onrender.com/)**

### 🧩 Requisitos
- **Docker** e **Docker Compose** instalados na máquina.

### ⚙️ Configuração do Ambiente

1. **Clonar o Repositório**
   ```bash
   git clone https://github.com/seu-usuario/FilmFinder.git

2. **Cadastro no site do Tmdb**
   Acesse o site do **[Acesse o site do tmdb](https://developer.themoviedb.org/reference/intro/getting-started)** e faça o seu cadastro para gerar a API KEY.
3. **Configuração do .env no Backend**
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (Essas variáveis estão por default, mude caso necessário):

    ```bash
    DATABASE_HOST=db
    DATABASE_PORT=5432
    DATABASE_NAME=filmfinder
    DATABASE_USERNAME=postgres
    DATABASE_PASSWORD=123
    TMDB_API_KEY=96b2227903ddc79337303ec7ebeb4b1e
    BACKEND_PORT=8080
    FRONTEND_PORT=3000
    FRONTEND_URL=http://localhost:3000
1. **Configuração do .env no Frontend**
    ```bash
    VITE_REACT_APP_API_BASE_URL=http://localhost:8080/api/movies

2. **Build e Start dos Contêineres**
   Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina:
    ```bash
    docker-compose up -d --build

📑 Endpoints da API
 - GET /api/movies/search?query={nome_do_filme}: Busca por filmes.
 - GET /api/movies/favorites: Retorna os filmes favoritos.
 - POST /api/movies/favorites: Salva um filme como favorito.
 - DELETE /api/movies/favorites/{id}: Remove um filme dos favoritos.
 - POST /api/movies/share: Gera um link para compartilhar uma lista de favoritos.