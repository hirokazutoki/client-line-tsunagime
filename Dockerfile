FROM node:20-alpine

WORKDIR /app

# 依存関係インストール
COPY package.json package-lock.json* ./
RUN npm install

# 開発用はホットリロードしたいので、ソースは volume でマウント
CMD ["npm", "run", "dev"]
