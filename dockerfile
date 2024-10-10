FROM node:20.17.0-alpine

WORKDIR /app

COPY package*.json ./
#COPY pnpm-lock.yaml ./

# RUN npm install -g pnpm
 # RUN pnpm install
 RUN npm install
 RUN npm i -g @nestjs/cli
 RUN npm install localtunnel
 
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
