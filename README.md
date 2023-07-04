### nest js study

### 1. 개발환경 세팅
- NODE 18 버전
- mysql
- vscode


### 1.2 소스 셋팅
1. .env.default 파일을 복사 .env 파일을 개발환경에 맞게 수정
2. config/database.json.sample 파일을 복사하여 database.json 파일을 만든 후 개발 환경에 맞게 정보 수정

### commend
```bash
#개발환경 구축
npm run setup:dev
```

### 로직 생성 명령
```bash
npx nest g res modules/sample
#What transport layer do you use? REST API
#Would you like to generate CRUD entry points? No     // ORM 을 사용하지 않기 떄문에 사용 안함

npm i --save @nestjs/config
#관련 패키지 다운로드
```

### 참고 사이트

- https://db-migrate.readthedocs.io/
- https://docs.nestjs.com/
- https://ramdajs.com/docs/
- https://github.com/typestack/class-validator
- https://gitlab.com/aa900031/nestjs-command
- https://jakekwak.gitbook.io/nestjs/techniques/file-upload
- https://sjh9708.tistory.com/52