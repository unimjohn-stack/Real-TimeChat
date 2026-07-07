# Use Node.js 22
FROM node:22-bookworm-slim

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend source
COPY backend/ .

# Copy the built frontend into public
COPY frontend/dist ./public

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["npm", "start"]