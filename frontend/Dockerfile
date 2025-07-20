# ใช้ Node base image
FROM node:20

# ตั้ง working directory
WORKDIR /app

# คัดลอก package.json และ lock file
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมด
COPY . .

# build Next.js (สำหรับ production)
RUN npm run build

# รันแอป
CMD ["npm", "run", "start"]

# เปิดพอร์ต 3000
EXPOSE 3000