FROM node:22-bookworm-slim

# ---------- Build Frontend ----------
WORKDIR /frontend

COPY Frontend/package*.json ./
RUN npm install

COPY Frontend/ .
RUN npm run build

# ---------- Build Backend ----------
WORKDIR /app

COPY Backend/package*.json ./
RUN npm install

COPY Backend/ .

# Copy built frontend into backend/public
COPY --from=0 /frontend/dist ./public

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["npm", "start"]