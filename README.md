시작 전 요구사항 고민

# 필수 기술 요건

Mysql 을 사용, TypeORM을 이용해 진행할 것입니다.

# 평가 요소

모델링에 대한 고민
가독성 및 컨벤션

# 기술 점수 가산점 요소

## UnitTest

간단한 API이기에, TDD를 통해서 진행하려고 함.

## 요구사항 분석, 구현 과정 작성

Git Convention : Commit Lint라고 하는 패키지와 husky의 githook 을 통해서 자동적으로 모든 커밋은 컨벤션을 검사받도록 설정해두었습니다
\[feat, docs, refac, chore]: 내용
같은 느낌으로 진행될 것
간단한 api이기에, master, feat/이름 형태의 간단한 것을 통해 만들 예정.
issue는 만들지 않음

폴더 구조는 NestJS의 cli가 생성해주는 방식 그대로 진행하려고 함

ERD
회사
회사에는 기본적으로 이름만 있고, 나머지는 다 additional Info 로 따로 저장하려고 함

- 채용 공고와 1:n 조인 예정

채용 공고
공고 포지션(제목)
내용

- 기술 스택 테이블과 n:m 조인 예정
  나머지는 additional Info

기술 스택 테이블
id
기술 명이 있을 예정

이 부분은 앞으로 추가가 될 것으로 예상됨. 하지만 지금 단계에서는 db에 바로 생성하기에
간단한 api로 그냥 바로 생성하도록 만들어 둘 예정

지원자 테이블
지원자 이름
채용 공고와 n:m으로 join할 예정

![image](https://user-images.githubusercontent.com/80899085/195292088-96d02c18-033d-4abe-84c2-86cf0b59f4d9.png)
