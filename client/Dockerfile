# ---------------- Development Stage ----------------
FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json .npmrc ./

RUN npm ci --legacy-peer-deps

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json .npmrc ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

# ---------- Production Stage ----------
FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]