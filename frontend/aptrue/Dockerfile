# 베이스 이미지로 Node.js 사용
FROM node:18.20.4 AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일을 먼저 복사하여 의존성 설치 최적화
COPY package.json package-lock.json ./ 

# 의존성 설치
RUN npm install

# 애플리케이션 소스 코드를 복사
COPY .. .

# Next.js 애플리케이션 빌드
RUN npm run build

# 프로덕션 이미지 설정
FROM node:18.20.4 AS runner

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 파일 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./ 

# 프로덕션 의존성 설치
RUN npm install --only=production

# Next.js 애플리케이션 실행
CMD ["npm", "start"]
