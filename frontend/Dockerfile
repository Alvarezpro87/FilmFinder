# Usando uma imagem base do Node.js
FROM node:18-alpine

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalando as dependências do projeto
RUN npm install

# Copiando o restante dos arquivos do projeto
COPY . .

# Compilando o projeto
RUN npm run build

# Servindo o aplicativo
EXPOSE 3000
CMD ["npx", "serve", "-s", "dist"]
