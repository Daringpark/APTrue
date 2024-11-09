# 기본 이미지로 OpenJDK 17 사용
FROM openjdk:21-jdk-slim

# 작업 디렉토리 설정
WORKDIR /app

# 빌드 인수 정의
#ARG SPRING_DATASOURCE_PASSWORD
#ARG CLOUD_AWS_CREDENTIALS_ACCESSKEY
#ARG CLOUD_AWS_CREDENTIALS_SECRETKEY
#ARG SPRING_DATA_REDIS_PASSWORD
#ARG JWT_SECRET

# 빌드 인수 확인
#RUN echo "SPRING_DATASOURCE_PASSWORD: ${SPRING_DATASOURCE_PASSWORD}" \
#    && echo "CLOUD_AWS_CREDENTIALS_ACCESSKEY: ${CLOUD_AWS_CREDENTIALS_ACCESSKEY}" \
#    && echo "CLOUD_AWS_CREDENTIALS_SECRETKEY: ${CLOUD_AWS_CREDENTIALS_SECRETKEY}" \
#    && echo "SPRING_DATA_REDIS_PASSWORD: ${SPRING_DATA_REDIS_PASSWORD}" \
#    && echo "JWT_SECRET: ${JWT_SECRET}"

# Gradle Wrapper와 설정 파일을 복사
COPY gradlew ./gradlew
COPY gradle ./gradle
COPY build.gradle ./build.gradle
COPY settings.gradle ./settings.gradle

# gradlew 파일에 실행 권한 부여
RUN chmod +x gradlew

# 의존성 설치
RUN ./gradlew dependencies

# 나머지 소스 코드 복사
COPY src ./src

# 애플리케이션 포트 설정
EXPOSE 8080

# Gradle 빌드 전에 환경 변수 확인
RUN echo "SPRING_DATASOURCE_PASSWORD: $SPRING_DATASOURCE_PASSWORD"
RUN echo "CLOUD_AWS_CREDENTIALS_ACCESSKEY: $CLOUD_AWS_CREDENTIALS_ACCESSKEY"
RUN echo "CLOUD_AWS_CREDENTIALS_SECRETKEY: $CLOUD_AWS_CREDENTIALS_SECRETKEY"
RUN echo "SPRING_DATA_REDIS_PASSWORD: $SPRING_DATA_REDIS_PASSWORD"
RUN echo "JWT_SECRET: $JWT_SECRET"

# Gradle 빌드 후 생성된 JAR 파일 복사
RUN ./gradlew build --no-daemon --stacktrace

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "/app/build/libs/backend-0.0.1-SNAPSHOT.jar"]
