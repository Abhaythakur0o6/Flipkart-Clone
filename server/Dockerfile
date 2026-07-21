# ---------------- Development Stage ----------------
FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]

# ---------------- Production Stage ----------------
FROM node:20-alpine AS production

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci --legacy-peer-deps

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]