# 검색어 자동완성 및 판매 내역 관리 보고서

## 구현사항

- 네이버 API를 이용한 검색어 자동완성 기능
- 네이버 API를 이용한 상품 조회 기능
- 네이버 API를 이용한 페이지 이동 기능
- 서버 통신을 통한 구매목록 추가, 조회, 업데이트, 정렬 기능
- recharts를 이용한 통계 차트
- sweetalert2를 이용한 알림

## 세부 구현 내용

### 검색어 자동완성 기능

> 입력값에 따라 검색어를 자동완성하여 최대 10개의 자동완성된 단어를 보여주며 이를 클릭 또는 검색 버튼 클릭 시 그 단어에 맞는 상품이 조회됨

![Search](https://user-images.githubusercontent.com/60686984/146388177-c7fde7a9-a71b-4f89-b29f-87860c1c2264.gif)

<br />

### 페이지 이동 기능

1. 숫자버튼 페이지 이동
   > 기본 5 페이지로 구성 되어 있고 숫자 버튼 클릭 시 그에 맞는 상품리스트가 조회되도록 구현  
   > 차트 클릭시 카테고리별 구매내역이 조회되도록 구현

![pagination](https://user-images.githubusercontent.com/60686984/146389055-874b2a87-1032-43ca-9204-11d04cc075e9.gif)

2. 화살표버튼 페이지 이동
   > \>, \< 버튼 클릭시 다음 5페이지로 이동하며 \>>, \<< 버튼 클릭시 가장 끝 페이지로 이동하도록 구현  
   > 현재 \>>버튼은 마지막페이지가 아닌 마지막페이지가 포함된 5개의 숫자 중 가장 첫번째 숫자 페이지로 이동함 추후 수정할 예정

![arrowPage](https://user-images.githubusercontent.com/60686984/146391034-14c55344-d125-4a7e-ad0e-1d7045257a2a.gif)

3. 마지막 페이지
   > API를 이용하여 호출 가능한 최대 페이지 수는 100페이지 이다. 따라서 전체 결과가 100 \* 10 개 보다 많을 경우 100페이지까지 표현하며 전체 결과가 더 적을 경우에는 조회된 전체 결과를 보여주며 이때 전체 결과를 초과하는 페이지 클릭시 알림창이 나오도록 구현  
   > 아래 예시처럼 깃허브의 마지막페이지는 49페이지로 그 이후 페이지를 클릭하게되면 알림창이 나오도록 구현

![lastPage](https://user-images.githubusercontent.com/60686984/146392280-7c307dd1-29a8-4b09-9ce0-6b011d07a9fb.gif)

<br />

### 구매 통계 차트

> 구매한 data를 받아와 recharts 라이브러리를 통해 총 구매 통계 차트 구현

![chart](https://user-images.githubusercontent.com/60686984/146392854-3fc260c5-828d-43d9-800e-4c9238e74e81.gif)

<br />

### 상품 구매

> 상품 구매는 구매버튼 클릭시 sweetalert2를 이용하여 구매 확인을 하며 취소시 아무일도 일어나지 않고 구매 시 상품 이미지와 상품명을 보여주며 구매완료를 나타냄

![buy](https://user-images.githubusercontent.com/60686984/146393815-d73b1321-cd84-4514-9243-7ac2eba7993e.gif)

> 상품 구매시 처음 구매하는 상품은 새롭게 등록이 되며 이미 구매한 상품은 구매 건수가 1씩 증가한다.

![new](https://user-images.githubusercontent.com/60686984/146395315-42bd692b-cf73-4836-925c-b57a55443559.gif)

![update](https://user-images.githubusercontent.com/60686984/146395226-678d7688-73bc-40ac-905d-70b18df36b55.gif)

<br />

### 구매 목록 정렬

1. 구매 일자별 정렬
   > 구매 일자 타이틀 클릭시 내림차순, 오름차순 순으로 정렬되도록 구현

![order](https://user-images.githubusercontent.com/60686984/146395961-b8fa6e26-3880-4260-961a-409c7f52c46e.gif)

2. 구매 건수별 정렬
   > 구매 건수 타이틀 클릭시 내림차순, 오름차순 순으로 정렬되도록 구현

![orderCount](https://user-images.githubusercontent.com/60686984/146396608-14accc9e-6281-4430-9eed-88674a3b739a.gif)

<br />

## TODO

- redux같은 상태관리 도구 도입하여 리팩토링
- \>>버튼 제대로 구현되도록 수정
- 기존 강사님 DB 서버에서 내 DB 서버로 연결
