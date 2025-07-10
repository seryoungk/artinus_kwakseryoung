# 상품 목록 및 상세 페이지 구현

## 개발 환경

- **Framework**: Next.js 14
- **언어**: JavaScript
- **스타일링**: CSS Modules (`*.module.css`)
- **라이브러리**
  - Axios: API 요청
  - React Spinners: 로딩 스피너
  - Next/Image: 이미지 최적화

---

## 개발 내용

- `https://dummyjson.com/products` API를 활용하여 상품 목록 페이지 및 상세 페이지 구현
- **기능**:
  - 상품 목록 조회 및 정렬 (가격/별점 오름차순·내림차순)
  - 카테고리 필터링
  - discount를 적용하기 전과 후의 price 표시
  - 별점을 별 아이콘 및 숫자로 표현
  - 반응형 카드 레이아웃 (4개, 3개, 2개, 1개 열)
  - 각 상품 클릭 시 상세 페이지 이동
  - 상세 페이지에서는 이미지 + 할인 적용 전후 가격 + 태그들 + 별점 + 설명 출력
  - 모바일, 태블릿, 웹 어디서든 일관적인 스타일을 갖추도록 반응형으로 제작
  - 존재하지 않는 상품 접근 시 404 에러 이미지 및 메인 페이지로 돌아가기 버튼 표시

---

# 빌드 및 실행 방법

## 개발 서버 실행
npm run dev

---

# 배포한 정적 사이트 URL

## VERCEL을 사용해 배포
 https://artinus-kwakseryoung.vercel.app

