# Etapa de build
FROM openjdk:17-jdk-slim AS build
WORKDIR /app

# Copia todos os arquivos do projeto para o diretório de trabalho do contêiner
COPY . .

# Garante que o script Maven Wrapper tem permissões de execução
RUN chmod +x ./mvnw

# Executa o Maven Wrapper para limpar e empacotar o projeto
RUN ./mvnw clean package -DskipTests

# Verifique se o arquivo .jar foi gerado
RUN ls -l target/

# Etapa de execução
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copia o arquivo JAR gerado na etapa de build para o diretório de trabalho do contêiner de execução
COPY --from=build /app/target/*.jar app.jar

# Define o comando de entrada para executar o aplicativo JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
