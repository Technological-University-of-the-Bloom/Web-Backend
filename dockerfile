# Usa la imagen base de Node.js
FROM node:20.17.0-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install
RUN npm i -g @nestjs/cli
#RUN npm install -g localtunnel

# Instala las dependencias para Cloudflared en Alpine y luego descarga Cloudflared
RUN apk add --no-cache curl \
    && curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared \
    && chmod +x /usr/local/bin/cloudflared

# Copia el resto del código al contenedor
COPY . .

# Compila el proyecto
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Ejecuta Cloudflared en segundo plano y luego la app
CMD sh -c "cloudflared tunnel --no-autoupdate --url http://localhost:3000 & npm run start:prod"
