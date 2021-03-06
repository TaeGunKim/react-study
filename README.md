Node JS

1. 소개
2. NodeJs와 ExpressJs다운로드
3. Mongo DB 연결
4. Mongo Db model & Schema
5. GIT 설치
6. SSH를 이용해 GitHub 연결
7. BodyParser  & PostMan & 회원가입기능
8. NodMon설치
9. 비밀 설정 정보 관리
10. Bcrypt로 비밀번호 암호화
11. 로그인기능 with Bcrypt
12. 토큰생성 with jsonwebtoken
13. Auth 기능 만들기
14. 로그아웃 기능


React JS
1. 소개
- library, made by facebook, released in 2013
- Components, module과 비슷하게  컴포넌트로 이뤄져있어 re-useable이 뛰어남
- Virtual DOM (서버부하X,변경된 내용만update)
- (1) JSX를 랜더링
- (2) Virtual DOM이 이전 Virtual DOM에서  찍어둔 Snapshot과 비교를 해서 바뀐부분을 찾는다.
- (3) 바뀐 부분을 찾는 과정을 diffing 라고 부름
- (4) 그 바뀐 부분만 RealDom에서 바꿔준다.
- angular랑 비슷한 라이브러리

2. Create React App으로 리액트 시작하기
- babel : 최신 자바스크립트 문법을 지원하지 않는 브라우져를 위해, 최신 자바 스크립트 문법을 구형 브라우져에서도 돌수 있게 변환 시켜줌
- webpack : bundle해서 복잡한 모듈을 합쳐줌
- npx create-react-app . 
- .은 해당 디렉토리에 받겠다는 것
- 강의상에선 client와 server(node)로 폴더를 나누고 client 폴더에 다운받음

3. npm npx 
- 기존엔 npm install -g create-react-app 으로 다운받음(global 디렉토리로 = 머신)
- 이제는 npx로 사용가능
- npm : 라이브러리를 담고있음, 디팬던시 설치 
- npx가 npm registry에서 create-react-app을 찾아서 (look up) 다운로드 없이 실행시켜준다.
- npx를 사용하면 disk space낭비를 줄임, 항상 최신버전을 사용할 수 있음

4. 구조설명
- client에 react-app을 받았다고 판단하여 설명
- run run start : client/src에 package.json에 script에 설정되어있음, 실행명령어
- client/src 에 넣어야 webpack이 번들화함, 이미지파일등을 넣을땐 src 폴더에 넣어야함
- client/src index.js에서 ReactDOM.render 에 <app />이 root id를 가진, 즉 public/index.html 으로 보여줌
- 만약 client/src에서 index.js 에서 <app /> 부분에 <div>hello world</div>로 입력하면 입력한 대로 화면이 바뀜

5. CRA to Our Bolierplate
- rfce 하면 create a reacet func.. 뜨면서 기본 뜨는데 난 안뜸..

6. react router DOM

7. data flow & axios

8. CORS 이슈, proxy 설정
- Cross-Origin resource Sharing, 보안을 위한 정책

9. proxy server
기존 : server (localhost:5000)   <- request, response -> client(localhost:3000)
proxy : 유저 <-> proxy Server <-> 인터넷 
- 아이피를 proxy 서버에서 임의로 바꿀 수 있다. 그래서 접근한느사람의 ip를 모름
- 보내느 데이터도 임의로 바꿀수있음
- 방화벽기능, 웹필터기능, 캐쉬데이터,공유데이터제공기능
사용이유
- 회사에서 직원들이나집안에서 아이들 인터넷 사용 제어
- 캐쉬를 이용해 더 빠른 인터넷 제공
- 더 나은 보안제공
- 이용 제한된 사이트 접근 가능

10.Concurrently 이용해서 front와 backend 서버 동시에 가동
- root 폴더에서 npm install concurrently --save
- root의 package.json 에서 "dev":"concurrently \"npm run backend\" \"npm run start --prefix client\""    
- 폴더경로 기준으로 값을 줄땐
"dev": "concurrently \"npm run start:dev\" \"cd ../client && npm run start\"",

11.  Antd Css
- css framework를 쓰는 이유 -> 기능만드는데 집중
- 종류 for react js 
- material Ui, react bootstarp, semantic ui, and design, materialize ...
- 여기선 antdesin 사용 https://ant.design/
- npm install antd

12. Redux
- state 관리 라이브러리 , store가 감싸고 있음.

13. Redux up
- redux, react-redux, redux-promise, redux-thunk 다운
- npm install redux react-redux redux-promise redux-thunk --save
- redux-promis, redux-thunk 는 미들웨어(redux 사용을 쉽게 해줌)
redux 데이터 flow
action -> reducer -> store -> [subscribe] -> react Component -> [dispatch(action)] -> action
- action (plain object,객체여야함)
- 근데 promise와 functions로 액션을 받게 될 수도 있기 때문에 해당 미들웨어를 설치

14. React vs React Hook
- class component 와 function component가 있는데, class는 기능을 더 많이 쓸수있지만 코드가 길고 성능이 좋지 않음
- function은  제한되고, 짧지만 성능이 좋음
- 최근 hook이 생겨서 function component로도 기능을 넣어서 쓸수가 있음

15. 로그인 페이지 
- formik, yup 라이브러리를 이용해서 다이나믹하게 만들수있음
- 강의 완료한 뒤에 업그레이드 해보자.

16. 회원가입 페이지
- redux 활용

17. 로그아웃 페이지

18. 인증체크
- all user page : Landing page, About Page
- only user page : Detail page
- not user page : Register Page, Login Page
- only admin page : Admin Page
- 이외에도 댓글작성, 파일전송, 파일업로드 등.. 
const EnhancedComponent = higherOrderComponent(WrappedComponent);



강의 git https://github.com/jaewonhimnae/boiler-plate-ko
내작업 git  https://github.com/TaeGunKim/react-study
