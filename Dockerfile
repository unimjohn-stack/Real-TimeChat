# ---------- Stage 1: Build Frontend ----------
FROM node:22-bookworm-slim AS frontend-builder

WORKDIR /frontend

COPY Frontend/package*.json ./
RUN npm install

COPY Frontend/ .
RUN env
RUN npm run build

# ---------- Stage 2: Backend ----------
FROM node:22-bookworm-slim

WORKDIR /app

COPY Backend/package*.json ./
RUN npm install

COPY Backend/ .

# Copy the frontend build into the backend public folder
COPY --from=frontend-builder /frontend/dist ./public

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["npm", "start"]