# Usamos Node 22 (Alpine) para garantizar compatibilidad con Prisma
FROM node:22-alpine

# Instalamos Bun globalmente
RUN npm install -g bun

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package.json ./
# Ignoramos el bun.lock local por ahora para evitar errores de versión
# COPY bun.lock ./

# Instalar dependencias con Bun
RUN bun install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 8000

# Comando para generar Prisma y arrancar
CMD ["sh", "-c", "bunx prisma generate && bun run start:dev"]
