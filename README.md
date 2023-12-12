<img width="1440" alt="스크린샷 2023-12-12 오후 6 43 41" src="https://github.com/rmdnps10/ETA-client/assets/87219998/6f9b0314-20d4-4719-a0ed-c5987eb716c4"><div align='center'>
<img src="https://github.com/rmdnps10/ETA-client/assets/87219998/32dfecfa-3fd3-4b92-8280-de9c9aee8598" width="100px"/>
  

# Project ETA
**구글 캘린더에 일정을 등록하면, 목적지까지의 소요시간에 따라 적절한 시간에 출발 알림을 주는 웹서비스**

</div>


## 📚프로젝트 소개 
(소개사진?) <br/>
우리는 종종 약속에 늦지 않기 위해 일정 시작 시간과, 집에서 목적지까지의 이동 시간, 준비시간등을 어림잡아 지정한 출발 시간에 알람을 맞추곤 합니다.
그러나 항상 일이 예상대로 흘러가지는 않습니다 😅  알람을 맞추는 것을 잊어버리거나, 일정이 있다는 사실조차 잊어버리는 경우가 종종 있기 때문이죠. <br/>
**ETA는 정해진 시간에 일정 개최지에 도착할 수 있도록 사용자가 캘린더에 일정을 저장하는 것에서부터 첫 대중교통을 탑승하기 전까지의 시나리오 안에서 최적의 사용자 경험을 제공하고자 합니다.**

## Installation
Server
```
npm install
node index
```

Client
```
npm install
npm start
```



## Tech Stacks
### Server 
<div>
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=black">  
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">  
</div>

### Frontend
<div >
<img src="https://img.shields.io/badge/react.js-61DAFB?style=for-the-badge&logo=react&logoColor=black">  
  <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black">
</div>


### API
- 구글 파이어베이스 API
- 구글 캘린더 API
- tmap 지도 API
- tmap 길찾기 API



## ETA 사용 가이드

### 0. 구글 캘린더에 일정 올리기
<img width="500" alt="스크린샷 2023-12-12 오후 6 10 33" src="https://github.com/rmdnps10/ETA-client/assets/87219998/af511bda-4f30-434f-92c5-5ddb90902660">

- 캘린더에 일정을 등록할 때 **⏰시간**과 **📍장소** 를 꼭 등록해주세요!

### 1. 첫 메인페이지 접속 (->로그인페이지) 
<div>
<img width="400" height="220" alt="스크린샷 2023-12-12 오후 6 05 55" src="https://github.com/rmdnps10/ETA-client/assets/87219998/c12f2973-cb1e-42cc-ae7b-486844c75bdd">
<img width="400"height="220"  alt="스크린샷 2023-12-12 오후 6 06 14" src="https://github.com/rmdnps10/ETA-client/assets/87219998/0a8625e6-76bf-46d2-a396-817d4cddf22c">

</div>

- 메인페이지에 접속했을 시, 로그인되어있지 않을 경우 로그인 페이지로 이동합니다.
- Continuge with google 버튼을 눌러 나오는 팝업창에서 로그인을 하면 자동으로 메인페이지로 이동합니다.


### 2. 메인페이지
<img width="100%" alt="스크린샷 2023-12-12 오후 6 20 15" src="https://github.com/rmdnps10/ETA-client/assets/87219998/999baad8-bb4f-4c6f-94cf-261640497aef">

<br/>

**🗒️일정 확인**

- **오늘**을 기준으로 구글 캘린더 상에 등록되어 있는 일정을 한눈에 볼 수 있습니다. 
-  길찾기 API를 조회하여 `설정페이지`에서 유저가 등록한 home에서부터 구글 캘린더에 등록된 장소까지의 길찾기 시간과 준비시간을 표시합니다.
-  일정 카드의 하단에는 목적지에 도착하기 위해 요구되는 시간과 알림을 제공할 시간이 표시됩니다.

**🔔 알림 기능** 
-  각 카드에 있는 토글 버튼 활성화에 따라 일정의 알림 기능 제공 여부를 선택할 수 있습니다.
-  카드 하단의 시간이 되었을 시, 유저에게 알림이 오게 됩니다.
<img width="370" alt="Untitled" src="https://github.com/rmdnps10/ETA-client/assets/87219998/cb0cc2ad-1183-4655-9674-a91b80fe3362">



| ☠️ 메인페이지 스켈레톤 UI  | 오늘 일정이 없을 경우 |
|------|------|
| <img width="400" alt="image" src="https://github.com/rmdnps10/ETA-client/assets/87219998/1fc7ff0a-7d51-4997-9a15-7beb4fa80c3a">| <img width="400" alt="스크린샷 2023-12-12 오후 6 43 52" src="https://github.com/rmdnps10/ETA-client/assets/87219998/72e03793-30fe-4a75-bbec-6873117dc1d7"> | 

 

### 3. 일정 상세페이지 

