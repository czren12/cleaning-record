# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

基于 uni-app 的家庭清洁记录应用，使用 Vue 3 + TypeScript 开发。

## 技术栈

- uni-app + Vue 3 + TypeScript
- SQLite 本地存储（uni.sqliteDatabase）
- 纯 CSS 无 UI 组件库

## 常用命令

```bash
# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建安卓应用
npm run build
```

## 目录结构

- `pages/index/index.vue` - 首页，展示清洁记录列表，支持按日期筛选
- `pages/add/add.vue` - 添加页，录入清洁项目和时间
- `utils/database.ts` - SQLite 数据库操作封装
  - `initDatabase()` - 初始化表
  - `insertRecord()` - 插入记录
  - `getAllRecords()` - 获取所有记录
  - `getRecordsByDate(date)` - 按日期筛选
  - `deleteRecord(id)` - 删除记录

## 数据库表结构

```sql
CREATE TABLE cleaning_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  cleaned_at TEXT NOT NULL,
  created_at TEXT NOT NULL
)
```

## 备注

- SQLite 操作在 uni-app 中通过 `uni.sqliteDatabase()` 获取数据库实例，使用回调风格
- 页面间通过 `uni.switchTab` 切换 tabBar 页面
