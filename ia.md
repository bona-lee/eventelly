# Eventelly Admin UI - Information Architecture

This document defines the domain boundaries and screen hierarchy used as the structural reference for development.
It focuses on information architecture only.

---

# Domain Principles

## Structural Rules

- All screens follow a strict 3-depth hierarchy.
- 1depth = Domain boundary
- 2depth = Functional grouping
- 3depth = Executable screen
- Operations and Settings are strictly separated at Event level.
- Object menus use plural nouns where applicable.

---

# 1. Outside Workspace (워크스페이스 외부)

Account-level domain before entering a workspace.

```
├── Sign In (로그인)
│   ├── Sign In (로그인)
│   ├── Create Account (회원가입)
│   └── Reset Password (비밀번호 재설정)
│
├── Dashboard (대시보드)
│
└── Account Settings (계정 관리)
    ├── Profile (내 정보)
    ├── Password (비밀번호)
    └── Email Preferences (이메일 설정)
```

---

# 2. Inside Workspace (워크스페이스 내부)

Workspace-level administration domain.

```
├── Home (홈)
│
├── Events (이벤트)
│   ├── Event Series (이벤트 시리즈)
│   └── All Events (모든 이벤트)
│
├── Users (회원)
│   ├── All Users (모든 회원)
│   ├── Companies (기업)
│   ├── Signup Forms (회원가입 폼)
│   └── Terms & Policies (약관 및 정책)
│
├── Team (팀)
│   ├── Members (구성원)
│   ├── Groups (그룹)
│   └── Roles (역할)
│
├── Settings (설정)
│   ├── Data Fields (분류 설정)
│   └── Localization (다국어 설정)
│
└── Billing (청구)
    ├── Usage (사용량)
    ├── Payment Methods (결제수단)
    └── Billing History (청구 내역)
```

Domain Notes:
- Users = Workspace-level account holders.
- Members = Internal administrative users.
- Events = Container of all event-level domains.

---

# 3. Inside Workspace > Event Selected (워크스페이스 내부 > 사업 선택)

Event-level domain after selecting a specific event.

Event Level is divided into:
- Operations (운영 영역)
- Settings (설정 영역)

---

## 3.1 Operations (운영)

Operational data creation and management domain.

```
├── Overview (이벤트 개요)
│
├── Participants (참가자)
│   ├── All Participants (모든 참가자)
│   │   ├── Individuals (참가자)
│   │   └── Companies (참가기업)
│   └── Marketing (마케팅)
│       └── Lead Management (잠재고객 관리)
│       └── Newsletter Subscribers (뉴스레터 구독자)
│
├── Registration (등록)
│   ├── Registrations (등록자)
│   │   └── All Registrations (모든 등록자)
│   ├── Tickets (티켓)
│   │   └── Orders (구매자)
│   └── Access Codes (등록코드)
│       ├── Usage (사용 내역)
│       └── Inventory (잔여 수량)
│
├── Exhibition (전시)
│   ├── Exhibitors (전시업체)
│   │   ├── Applications (신청서)
│   │   ├── Booths (부스)
│   │   ├── Exhibitor Services (부대사용)
│   │   ├── Company Profiles (기업 프로필)
│   │   └── Products (제품)
│   └── Invoicing (인보이스)
│       ├── Issue Invoices (인보이스 발행)
│       └── Invoice Records (인보이스 내역)
│
├── Meetings (비즈매칭)
│   ├── Participants (참가자)
│   │   └── All Participants (모든 참가자)
│   ├── Scheduling (매칭 관리)
│   │   ├── Availability Management (미팅가능시간 관리)
│   │   ├── Auto Matching (자동 매칭)
│   │   └── Manual Matching (수동 매칭)
│   └── Matching Results (매칭 결과)
│       ├── Schedule (전체 시간표)
│       ├── Meetings (미팅 목록)
│       ├── Waiting List (대기 목록)
│       └── Consultation Reports (상담일지)
│
└── Extra Forms (추가신청)
    └── Submissions (제출 내역)
        └── All Submissions (모든 제출 내역)
```

Operational Domain Notes:
- Registration = Result data domain (tickets + codes).
- Meetings = Matching and scheduling domain.
- Extra Forms = Generic authenticated form submission module.
- Exhibition = Exhibitor lifecycle management.

---

## 3.2 Settings (설정)

Configuration, templates, policies, and reporting domain.

```
├── Overview (이벤트 개요)
│
├── Settings (설정)
│   │
│   ├── Main Settings (주요 설정)
│   │   ├── Exhibition (전시)
│   │   ├── Tickets (티켓)
│   │   ├── Access Codes (등록 코드)
│   │   ├── Sessions (세션)
│   │   ├── Meetings (비즈매칭)
│   │   ├── Extra Forms (추가신청)
│   │   └── Newsletter (뉴스레터)
│   │
│   ├── Forms & Terms (폼 및 약관)
│   │   ├── Forms (폼)
│   │   └── Terms & Policies (약관 및 정책)
│   │
│   └── Communication (알림 관리)
│       ├── Templates (알림 템플릿)
│       ├── Scheduled Sends (예약 발송)
│       └── Sending History (발송 내역)
│    
├── Design (디자인)
│   └── Site Design (사이트 디자인)
│       ├── Theme (테마)
│       ├── Pages (페이지)
│       └── Sitemap (사이트맵)
│
└── Reports (보고서)
    ├── Statistics (통계)
    │   ├── Overview (종합 현황)
    │   ├── Registrations (등록 통계)
    │   ├── Exhibitions (전시 통계)
    │   ├── Sessions (세션 통계)
    │   └── Meetings (비즈매칭 통계)
    └── Analytics (분석)
        └── Data Analytics (데이터 분석)
```

Settings Domain Notes:
- Settings define configuration only. No operational data manipulation.
- Reports and Analytics are read-only domains.
- Design controls public-facing site structure and appearance.

---

End of IA definition.
This structure is the authoritative reference for screen generation and routing alignment.

