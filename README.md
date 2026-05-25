# 帳號管理系統 - Vue 前端工程師面試測驗

水星防火工程顧問有限公司 Vue 前端工程師職位面試測驗專案。

## 📋 專案概述

一個使用 **Vue 3 + TypeScript + Pinia + Tailwind CSS** 開發的帳號管理系統，展示現代化的前端架構與最佳實踐。

### ✨ 主要功能
- 🔐 登入系統與 Token 管理
- 📊 帳號列表展示與統計
- 🔍 即時搜尋與過濾
- ➕ 新增帳號
- ✏️ 編輯帳號
- 🗑️ 刪除帳號
- 📱 完整 RWD 響應式設計

---

## 🛠️ 技術棧

- **Vue 3** - Composition API + `<script setup>`
- **TypeScript** - 完整型別標註
- **Pinia** - 狀態管理
- **Vite** - 輕量級構建工具
- **Tailwind CSS** - 工具類 CSS 框架
- **Axios** - HTTP 客戶端
- **Vue Router** - 路由管理

---

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 開發環境執行
```bash
npm run dev
```
應用將在 `http://localhost:5173` 啟動

### 生產構建
```bash
npm run build
```

### 預覽生產版本
```bash
npm run preview
```

---

## 📂 專案結構

```
src/
├── assets/           # SVG 圖標與靜態資源
├── components/       # 可復用元件
│   ├── Header.vue
│   ├── AccountCard.vue
│   ├── StatisticsCard.vue
│   ├── CreateAccountModal.vue
│   └── EditAccountModal.vue
├── pages/            # 頁面
│   ├── Login.vue
│   └── Accounts.vue
├── stores/           # Pinia 狀態管理
│   ├── auth.ts       # 認證狀態
│   └── account.ts    # 帳號列表狀態
├── utils/            # 工具函數
│   └── api.ts        # Axios 實例與攔截器
├── router/           # Vue Router 配置
├── App.vue
├── main.ts
└── style.css         # Tailwind 入口
```

---

## 🔧 環境變量

```bash
# .env (開發環境)
VITE_API_BASE_URL=http://localhost:3000

# .env.production (生產環境)
VITE_API_BASE_URL=https://api.production.com
```

---

## 📌 核心特性

- ✅ 組件化架構 - 高內聚、低耦合
- ✅ TypeScript 型別安全
- ✅ Pinia 集中式狀態管理
- ✅ Tailwind CSS 響應式設計
- ✅ Axios 請求攔截器
- ✅ Modal 打開時背景禁止滾動
- ✅ 完整的表單驗證與錯誤處理
