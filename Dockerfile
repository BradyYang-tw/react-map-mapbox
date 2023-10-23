From node:18.18.0 AS build

# 複製應用程式文件到容器中
WORKDIR /app
COPY . .

# 安裝依賴和建置應用程式
RUN npm install --legacy-peer-deps
RUN npm run build

# 使用 Nginx 映像作為最終映像
FROM nginx:latest

# 複製前端應用程式建置結果到 Nginx 的目錄中
COPY --from=build /app/build /usr/share/nginx/html

# 設定 Nginx 設定文件（可選）
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露 80 端口
EXPOSE 80

# 啟動 Nginx 服務
CMD ["nginx", "-g", "daemon off;"]