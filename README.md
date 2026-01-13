# WebApp - Software Development Company Website

## 📋 프로젝트 개요

**소프트웨어 개발회사**를 위한 고급스럽고 세련된 포트폴리오 웹사이트입니다.
- **3D 인터랙티브 디자인** (Spline 3D 모델 적용)
- **다국어 지원** (한국어/영어/중국어)
- **포트폴리오 관리 시스템** (이미지, YouTube 영상, 다국어 콘텐츠)
- **Cloudflare Pages** 엣지 배포

## 🚀 현재 완성된 기능

### ✅ 사용자 페이지
- ✅ **메인 페이지** - 3D Spline 인터랙티브 히어로 섹션
- ✅ **포트폴리오 목록** - 프로젝트 카드형 레이아웃
- ✅ **포트폴리오 상세** - 이미지 갤러리, YouTube 영상 임베드
- ✅ **About Us** - 회사 소개
- ✅ **Services** - 제공 서비스
- ✅ **Technology** - 기술 스택
- ✅ **Contact** - 문의 페이지
- ✅ **다국어 전환** - 실시간 언어 전환 (KO/EN/ZH)

### ✅ 관리자 페이지
- ✅ **프로젝트 CRUD** - 생성, 수정, 삭제
- ✅ **이미지 업로드** - 대표 이미지 1장, 상세 이미지 최대 4장
- ✅ **YouTube 영상** - 최대 3개 영상 링크
- ✅ **다국어 입력** - 한국어/영어/중국어 탭별 입력
- ✅ **공개/비공개 설정** - 프로젝트 노출 제어
- ✅ **정렬 순서 설정** - 우선순위 기반 정렬

### ✅ 기술 스택
- **Frontend**: HTML, TailwindCSS, Vanilla JavaScript
- **Backend**: Hono Framework (TypeScript)
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (이미지 저장소)
- **Deployment**: Cloudflare Pages
- **3D Graphics**: Spline Design

## 🌐 URL 정보

### 개발 환경
- **로컬 서버**: http://localhost:3000
- **Sandbox URL**: https://3000-i1v2gt5g9onn6cpengemm-b32ec7bb.sandbox.novita.ai

### 주요 페이지
- **메인**: `/` 또는 `/index.html`
- **포트폴리오**: `/portfolio.html`
- **프로젝트 상세**: `/project-detail.html?id={id}`
- **관리자**: `/admin.html` (인증 없음, URL로 직접 접근)
- **API Health**: `/api/health`
- **API Portfolio**: `/api/portfolio` (다국어 지원: `?lang=ko|en|zh`)

## 📊 데이터 구조

### Projects 테이블
```sql
- id: 프로젝트 ID (자동 증가)
- title_ko/en/zh: 다국어 제목
- description_ko/en/zh: 다국어 설명
- thumbnail_image: 대표 이미지 URL
- detail_image_1~4: 상세 이미지 URL (최대 4장)
- youtube_url_1~3: YouTube 영상 URL (최대 3개)
- tech_stack: 기술 스택 (콤마 구분)
- dev_scope_ko/en/zh: 개발 범위 (다국어)
- is_published: 공개/비공개 (boolean)
- display_order: 정렬 순서 (integer)
- created_at/updated_at: 타임스탬프
```

## 🛠️ 로컬 개발 가이드

### 1. 의존성 설치
```bash
cd /home/user/webapp
npm install
```

### 2. 데이터베이스 마이그레이션
```bash
npm run db:migrate:local
npm run db:seed
```

### 3. 빌드
```bash
npm run build
```

### 4. 개발 서버 시작
```bash
# PM2로 백그라운드 실행
pm2 start ecosystem.config.cjs

# 또는 직접 실행
npm run dev:sandbox
```

### 5. 테스트
```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/portfolio
```

## 📝 API 엔드포인트

### Portfolio API
- `GET /api/portfolio?lang=ko` - 공개 프로젝트 목록
- `GET /api/portfolio/:id?lang=ko` - 프로젝트 상세
- `GET /api/portfolio/admin/all` - 전체 프로젝트 목록 (관리자)
- `POST /api/portfolio` - 프로젝트 생성
- `PUT /api/portfolio/:id` - 프로젝트 수정
- `DELETE /api/portfolio/:id` - 프로젝트 삭제

### Image API
- `POST /api/images` - 이미지 업로드 (multipart/form-data)
- `GET /api/images/:filename` - 이미지 조회
- `DELETE /api/images/:filename` - 이미지 삭제

### Language API
- `GET /api/set-lang/:lang` - 언어 설정 (ko/en/zh)

## 🎨 사용자 가이드

### 관리자 페이지 사용법
1. 브라우저에서 `/admin.html` 접속
2. "새 프로젝트 생성" 버튼 클릭
3. 언어별 탭에서 정보 입력:
   - 🇰🇷 한국어 (필수): 제목, 설명
   - 🇺🇸 English (선택): Title, Description
   - 🇨🇳 中文 (선택): 标题, 描述
4. 이미지 업로드 (대표 1장, 상세 최대 4장)
5. YouTube URL 입력 (최대 3개)
6. 기술 스택 입력 (콤마로 구분, 예: React, Node.js, MongoDB)
7. 공개/비공개 설정 및 정렬 순서 지정
8. "저장" 버튼 클릭

### 포트폴리오 관리 팁
- **정렬 순서**: 숫자가 클수록 상단에 표시됩니다
- **이미지**: 최적 해상도 1200x800 권장
- **YouTube**: 전체 URL 또는 공유 링크 모두 지원
- **기술 스택**: 쉼표로 구분하여 입력 (자동으로 태그 생성)

## 🌍 다국어 지원

### 언어 전환
- 우측 상단 언어 버튼 (🇰🇷 🇺🇸 🇨🇳) 클릭
- 자동으로 쿠키에 저장되어 다음 방문 시 유지
- API는 `?lang=ko|en|zh` 파라미터로 제어

### Fallback 로직
- 영어/중국어 미입력 시 한국어로 자동 fallback
- 사용자는 빈 화면을 보지 않음

## 🚀 프로덕션 배포 (Cloudflare Pages)

### 사전 준비
1. Cloudflare API 키 설정 필요
2. D1 데이터베이스 생성 필요
3. R2 버킷 생성 필요

### 배포 명령어
```bash
# 1. D1 데이터베이스 생성 (프로덕션)
npx wrangler d1 create webapp-production

# 2. wrangler.jsonc에 database_id 입력

# 3. 마이그레이션 실행
npm run db:migrate:prod

# 4. 배포
npm run deploy:prod
```

## 📦 프로젝트 구조
```
webapp/
├── public/                 # 정적 파일
│   ├── index.html          # 메인 페이지
│   ├── portfolio.html      # 포트폴리오 목록
│   ├── project-detail.html # 프로젝트 상세
│   ├── admin.html          # 관리자 페이지
│   ├── about.html          # 회사 소개
│   ├── services.html       # 서비스
│   ├── technology.html     # 기술 스택
│   ├── contact.html        # 문의
│   └── static/             # JavaScript 파일
│       ├── i18n.js         # 다국어 시스템
│       ├── app.js          # 메인 페이지 로직
│       ├── portfolio.js    # 포트폴리오 목록 로직
│       ├── project-detail.js # 프로젝트 상세 로직
│       └── admin.js        # 관리자 로직
├── src/
│   ├── index.tsx           # Hono 애플리케이션 엔트리
│   ├── routes/
│   │   ├── portfolio.ts    # 포트폴리오 API
│   │   └── images.ts       # 이미지 업로드 API
│   ├── types/
│   │   └── index.ts        # TypeScript 타입 정의
│   └── utils/
│       └── helpers.ts      # 유틸리티 함수
├── migrations/
│   └── 0001_initial_schema.sql # D1 스키마
├── seed.sql                # 샘플 데이터
├── ecosystem.config.cjs    # PM2 설정
├── wrangler.jsonc          # Cloudflare 설정
├── package.json
└── README.md
```

## ✨ 주요 특징

### 1. 3D 인터랙티브 디자인
- Spline 3D 로봇 캐릭터 메인 히어로 섹션
- 부드러운 애니메이션 및 호버 효과
- Glass morphism 디자인 스타일

### 2. 완전한 다국어 지원
- 클라이언트 사이드 다국어 전환
- API 레벨 다국어 데이터 제공
- 쿠키 기반 언어 유지

### 3. 강력한 관리자 시스템
- 직관적인 UI/UX
- Drag & Drop 이미지 업로드
- 실시간 미리보기
- 언어별 탭 입력

### 4. 엣지 최적화
- Cloudflare Pages 글로벌 배포
- D1 분산 데이터베이스
- R2 글로벌 이미지 스토리지
- 빠른 로딩 속도

## 🔧 개발 도구

### 유용한 npm 스크립트
```bash
npm run dev          # Vite 개발 서버
npm run dev:sandbox  # Wrangler 개발 서버 (D1, R2 포함)
npm run build        # 프로덕션 빌드
npm run deploy       # Cloudflare Pages 배포
npm run db:migrate:local   # 로컬 DB 마이그레이션
npm run db:migrate:prod    # 프로덕션 DB 마이그레이션
npm run db:seed      # 샘플 데이터 삽입
npm run db:reset     # DB 초기화
npm run clean-port   # 포트 3000 정리
npm run test         # API 테스트
```

## 🐛 문제 해결

### 포트 3000이 사용 중일 때
```bash
npm run clean-port
# 또는
fuser -k 3000/tcp
```

### D1 데이터베이스가 비어있을 때
```bash
npm run db:reset
```

### 이미지 업로드 실패 시
- 파일 크기: 10MB 이하
- 지원 형식: JPEG, PNG, GIF, WebP
- R2 바인딩 확인: `wrangler.jsonc`

## 📝 향후 개발 계획

### Phase 2 - 추가 기능
- [ ] 프로젝트 카테고리 분류
- [ ] 고객사 로고 슬라이더
- [ ] 프로젝트 성과 지표 (트래픽, 사용자 수)
- [ ] SEO 다국어 메타 자동 생성
- [ ] 관리자 AI 번역 보조
- [ ] Contact Form 구현 (이메일 전송)
- [ ] Blog 섹션 추가

### Phase 3 - 고급 기능
- [ ] 관리자 인증 시스템
- [ ] 프로젝트 검색 및 필터링
- [ ] 이미지 자동 최적화
- [ ] 다크/라이트 모드 전환
- [ ] 애널리틱스 대시보드

## 📄 라이선스

MIT License - 자유롭게 사용 가능

## 👥 개발자

- **프로젝트**: WebApp Software Company Website
- **개발 기간**: 2026-01-13
- **기술 스택**: Hono + Cloudflare + TypeScript
- **상태**: ✅ MVP 완료, 프로덕션 배포 가능

## 📞 문의

- **Email**: contact@webapp.com
- **관리자 페이지**: `/admin.html`
- **API 문서**: 이 README 참조

---

**🎉 프로젝트 완료! 로컬 테스트 성공, 프로덕션 배포 준비 완료**
