---
theme: seriph
class: 'text-center'
highlighter: shiki
lineNumbers: true
info: |
    ECommerce store as demo
background: 'https://source.unsplash.com/random/1080x720'
---

# Intro to Web Dev

造一个周边商店

---

# 周边商店项目简介

> 设计图参考：https://v0.dev/r/VT1ooZI0UVX

<br />

<div class="w-full h-84" flex items-center justify-center>
  <img class="h-84 aspect-video object-cover" src="/slides/lesson-06/preview.png" />
</div>

---

# 周边商店项目简介

> 周边商店是什么？我们怎么做？

<br />

#### 项目的需求

- 商品概览页面（标题、价格、“添加到购物车”按钮）
- 购物车页面（显示已添加的商品、结账按钮）
- 用户登录页面（允许登录/注销）

<br>

#### 技术栈的选择

- [vue.js](https://cn.vuejs.org/)
  + [Pinia](https://pinia.vuejs.org/zh/) - 全局状态管理
  + [Vue Router](https://router.vuejs.org/) - 路由管理
- [tailwind.css](https://tailwindcss.com/) - CSS 框架
- [Django](https://www.djangoproject.com/) 及 [Django Rest Framework](https://www.django-rest-framework.org/)

---

# 周边商店项目简介

> 项目开发规划及周期

<br />

#### 前端

- 实现商品概览页（今晚）
- 实现购物车页面（今晚）
- 用户登录页面（作业）
- 订单管理页面（可选）

<br />

#### 后端

- 用户登录（下周） 
- 购物车管理（下周）
- 商品管理（下周）
- 订单管理（可选）

---

# 前端实现（详细版）

1. 实现商品概览页
    + 使用纯 HTML、CSS 实现，复习网页基本结构
    + 网页基本布局（上中下）
    + 实现 header 及 footer
    + 实现商品展示卡片
2. 将商品概览页迁移到 Vue
3. 实现商品概览页的 “添加到购物车” 功能
    + 使用 `localStorage` 实现数据保存
4. 实现购物车页面
    + 完成 “这个页面空空如也”
    + 使用 `pinia` 实现全局状态管理

---

# 项目设置（临时）

#### 1. 安装 `pnpm`（可选）

`pnpm` 是一个快速、高效的包管理器，能够替代 `npm`

```bash
# 参考：https://pnpm.io/installation#using-npm
npm install -g pnpm
```

<br>

#### 2. 使用 Vite 新建临时项目

`vite` 能够监控 `.css`、`.html` 等文件的变更，并实时更新页面，能提供更好的开发体验

```bash
# 参考：https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project
pnpm create vite nimostore
```

<br>

#### 3. 使用 VSCode 打开项目

找到刚刚新建的 `nimostore` 文件夹，然后用 `vscode` 打开

---

# 项目设置（临时） - Style Reset

#### 4. 安装 Tailwind.css

Tailwind.css 是一个 utility first 的框架，将很多常用的 CSS 设置封装了成 `class`，使得开发者可以直接写 `class` 而不需要单独写 CSS 文件。

本项目中仅使用 Tailwind 提供的 Style Reset。

```bash
# 参考：https://tailwindcss.com/docs/installation/using-postcss
pnpm install -D tailwindcss postcss autoprefixer
pnpx tailwindcss init
```

在项目根目录新建一个 `postcss.config.js` 文件，输入以下内容：

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

---

# 项目设置（临时） - Style Reset

#### 4. 安装 Tailwind.css

修改 `tailwind.config.js` 文件：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

修改 `style.css` 文件：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

# 项目设置（Vue）

> 迁移商品概览页

<br>

#### 参照下列教程完成项目设置：

1. [创建新的 Vue 项目](https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application)
2. [在 Vue 项目中加入 TailwindCSS 的支持](https://tailwindcss.com/docs/guides/vite#vue)

<br>

#### 迁移

1. 将刚刚写好的 HTML 移动到 `index.html` 中
2. 将刚刚写好的 `style.css` 复制到 `src/style.css`
3. 在 `src/main.js` 文件最前面加入 `import 'style.css'` 一行

<br>

#### 迁移组件

1. 将 `index.html` 中的内容和 `style.css` 中的样式迁移到 `src/App.vue` 组件中
2. 将商品卡片迁移到独立组件（`src/components/GoodCard.vue`）中

---
layout: section
---

# 谢谢