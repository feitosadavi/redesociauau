# Etapa 1: Builder
FROM node:24.1-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./
# Etapa 1: Builder
FROM node:24.1-alpine AS builder

WORKDIR /app

# Instala dependências de build
RUN apk add --no-cache python3 make g++

# Copia os arquivos de definição de dependências primeiro
COPY package.json package-lock.json* ./

# Instala dependências (incluindo devDependencies)
RUN npm ci

# Copia o schema do Prisma
COPY prisma ./prisma

# Gera o Prisma Client
RUN npx prisma generate

# Copia todo o código fonte
COPY . .

# Compila o TypeScript
RUN npm run build

# Etapa 2: Runtime
FROM node:24.1-alpine

WORKDIR /app

# Instala dependências de runtime (apenas produção)
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copia arquivos necessários do builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .env
COPY --from=builder /app/prisma ./prisma

# Reexecuta generate para garantir compatibilidade
RUN npx prisma generate

EXPOSE 3000

CMD ["node", "dist/server.js"]
