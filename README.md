# 검색어 자동완성 및 판매 내역 관리 보고서

- 과제 기간: 12월 06일(월) ~ 12월 13일(월)

## 요구사항

### 필수 요구사항

- [x] Naver API 실제 호출은 Server에 적용 합니다.(3점)
  - routes/shopping.js에서 호출합니다.
- [x] Naver API 검색어 연관 내용이 적절히 표현 되며 Click 되어야 합니다.(3점)
- [x] Naver API 상품 조회 API를 이용해 상품 목록 조회 합니다. (3점)
- [x] 구매 버튼을 이용해서 조회된 상품을 구매합니다.(3점)
- [x] 구매 내역을 차트를 이용해 표현 및 상세 내용을 나타냅니다.(3점)

### 선택 요구사항

- [x] Naver API KEY 와 Secret 키는 중요 정보로 별도 관리합니다.(4점)
  - 로컬 환경 config폴더에서 관리하고 있습니다.
- [x] Component를 하나로 만들지말고 분리해서 만들어 보세요. (3점)
- [x] Component는 Function 방식으로 개발. (2점)
- [x] Material UI 또는 **reactstrap** 등을 이용하세요.(2점)
- [x] 상품 등록, 통계, 상품 조회 쿼리를 직접 작성해보세요.(1점)
- [x] 통계 화면에 검색어 조건(날짜)를 넣어보세요.(1점)
- [ ] Server가 왜 필요한지 조사해 보세요.(1점)

### TODO

- [x] 페이지 이동 기능 구현
  - 마지막 페이지 이동 제외하고 구현
- [x] 구매시 sweetalert2 적용
- [x] 통계 화면 검색어 조건 구현
  - 구매일자, 구매 건수 클릭시 내림차순, 오름차순 순서로 정렬

## API 사용법

- 참고 사이트: [Naver 개발자 포럼](https://developers.naver.com/main/)
- 개인마다 회원 가입
- application 등록
- Naver Key, Secret Key 발급

### 1. 검색어 자동 완성 Naver API

요청 예시:

```url
'https://mac.search.naver.com/mobile/ac?_q_enc=UTF-8&st=1&frm=mobile_nv&r_format=json&r_enc=UTF-8&r_unicode=0&t_koreng=1&ans=1&run=2&rev=4&q='+encodeURI(연관검색어)
```

응답 예시:

```json
{
  "query": [
    "플스5"
  ],
  "answer": [],
  "intend": [],
  "items": [
    [
      [
        "플스5 사전예약",
        "0"
      ],
      [
        "플스5",
        "0"
      ],
      [
        "플스5 사전예약 11월",
        "0"
      ],
      [
        "플스5 게임",
        "0"
      ],
      ....
    ]
  ]
}
```

### 2. 상품 목록 조회 API

| 메소드 | 요청 URL                                      | 출력 포맷 |
| ------ | --------------------------------------------- | --------- |
| `GET`  | https://openapi.naver.com/v1/search/shop.json | JSON      |

| 요청 변수 | 타입    | 필수여부 | 기본값                      | 설명                                                                           |
| --------- | ------- | -------- | --------------------------- | ------------------------------------------------------------------------------ |
| query     | string  | Y        | -                           | 검색을 원하는 문자열로서 UTF-8로 인코딩한다.                                   |
| display   | integer | N        | 10(기본값), 100(최대)       | 검색 결과 출력 건수 지정                                                       |
| start     | integer | N        | 1(기본값), 1000(최대)       | 검색 시작 위치로 최대 1000까지 가능                                            |
| sort      | string  | N        | sim(기본값), date, asc, dsc | 정렬 옵션: sim (유사도순), date (날짜순), asc(가격오름차순) ,dsc(가격내림차순) |

요청 예시:

```url
'https://openapi.naver.com/v1/search/shop.json?query=' + encodeURI(req.body.query);
```

응답 예시:

- `Search`: 영화 목록, 1페이지(`page`) 당 최대 10개
- `totalResults`: 검색 가능한 모든 영화 개수

```json
{
  "lastBuildDate": "Sun, 05 Dec 2021 11:23:59 +0900",
  "total": 62722,
  "start": 1,
  "display": 10,
  "items": [
    {
      "title": "제목",
      "link": "https://search.shopping.naver.com/....",
      "image": "https://shopping-.......jpg",
      "lprice": "가격",
      "hprice": "",
      "mallName": "네이버",
      "productId": "12345612",
      "productType": "1",
      "brand": "",
      "maker": "SIE",
      "category1": "디지털/가전",
      "category2": "게임기/타이틀",
      "category3": "가정용게임기",
      "category4": ""
    },
    {
      "title": "플레이역5",
      "link": "https://search.shopping.naver.com/...",
      "image": "https://shopping-.....jpg",
      "lprice": "12345",
      "hprice": "",
      "mallName": "네이버",
      "productId": "123456789",
      "productType": "1",
      "brand": "SIE",
      "maker": "SIE",
      "category1": "디지털/가전",
      "category2": "게임기/타이틀",
      "category3": "가정용게임기",
      "category4": ""
    }
  ]
}
```

### 3. 차트, 상품 등록 조회 Table 정보는 PDF로 제공합니다.
