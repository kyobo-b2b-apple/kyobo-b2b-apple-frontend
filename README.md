
# 교보정보통신 Apple B2B web 
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)


#

## 커밋규칙
```
feat : 새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정
fix : 기능에 대한 버그 수정
build : 빌드 관련 수정
chore : 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore
ci : CI 관련 설정 수정
docs : 문서(주석) 수정
style : 코드 스타일, 포맷팅에 대한 수정
refactor : 기능의 변화가 아닌 코드 리팩터링 ex) 변수 이름 변경
test : 테스트 코드 추가/수정
release : 버전 릴리즈
```
병합 완료된 브랜치는 삭제
git push origin -d test2

#

#

## 구조

> 폴더구조
```
.
├── .idea/
| └── .gitignore
├── public/
| ├── favicon.ico
| ├── index.html
| └── manifest.json
├── src/
| ├── assets/
| ├── components/
| ├── dataManager/
| ├── layout/
| ├── pages/
| | ├── dashboard/
| | ├── home/
| | ├── login/
| | └── 도메인/
| ├── store/
| | ├── actions
| | └── reducers
| ├── utils/
| ├── App.js
| ├── index.js
| └── routes.js
├── .gitignore/
├── .env
├── package.json
└── README.md
```

----

배포 => vercel 
qlfem => yarn

> src > assets 폴더
```

< (파일 이름이 들어갑니다.) >

(설명이 들어갑니다.)


```

----

> src > components 폴더
```

< (파일 이름이 들어갑니다.) >

(설명이 들어갑니다.)


```

----

> src > dataManager 폴더
```

< (파일 이름이 들어갑니다.) >

(설명이 들어갑니다.)


< (파일 이름이 들어갑니다.) >

(설명이 들어갑니다.)


< (파일 이름이 들어갑니다.) >

(설명이 들어갑니다.)


```

----

> src > layout 폴더
```

< (파일 이름이 들어갑니다.) >

(설명이 들어갑니다.)


```

----

> src > pages 폴더
```

< (파일/폴더 이름이 들어갑니다.) >

(설명이 들어갑니다.)

< (파일/폴더 이름이 들어갑니다.) >

(설명이 들어갑니다.)

< (파일/폴더 이름이 들어갑니다.) >

(설명이 들어갑니다.)


```

----

> src > store 폴더
```

store 폴더는 ~~하는 코드들이 위치해 있습니다.

(설명이 들어갑니다.)

- actions : (설명이 들어갑니다.)
- reducers : (설명이 들어갑니다.)

```

> src > utils 폴더
```

< (파일/폴더 이름이 들어갑니다.) >

(설명이 들어갑니다.)

```

----

> src > 그밖의 파일들
```
- App.js : (설명이 들어갑니다.)
- index.js : (설명이 들어갑니다.)
- routes.js : (설명이 들어갑니다.)

```
