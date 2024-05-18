---
theme: seriph
class: 'text-center'
highlighter: shiki
lineNumbers: true
info: |
  The Vue.js Framework
background: 'https://source.unsplash.com/random/1080x720'
---

# Intro to Web Dev

Vue.js 前端框架概览

---

# 什么是前端框架？为什么大家都在用？

> 推荐阅读：[MDN 客户端框架介绍](https://developer.mozilla.org/zh-CN/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks)

- 框架（Framework）和库（Library）有什么区别？
  + 框架是屋子的结构，建筑工人需要在框架的基础上施工
  + 库是砖头，一般用于实现某个特定功能
- 为什么用前端框架
  + 响应式（Reactivity）
  + 组件化
  + 更丰富的组件库
- 常见的前端框架

<!-- <div h-6 w-full block /> -->


<div grid="~ cols-3 gap-4" font-mono px-24>

<div flex flex-col items-center text-green-600>
  <mdi-vuejs w-24 h-24 />
  <span>Vue.js</span>
</div>

<div flex flex-col items-center text-blue-600>
  <mdi-react w-24 h-24 />
  <span>React</span>
</div>

<div flex flex-col items-center text-red-600>
  <mdi-angularjs w-24 h-24 />
  <span>Angular</span>
</div>

</div>

---

# 什么是前端框架？为什么大家都在用？

> 响应式（Reactivity）是什么意思？以计数器（Counter）为例

<div grid="~ cols-2 gap-4">

<div>

**纯 JavaScript 写法**

```js
const state = { counter: 0 }

const counter = document.querySelector('#counter')
function render() {
  counter.innerText = state.counter;
}

const incButton = document.querySelector('#inc')
const decButton = document.querySelector('#dec')
incButton.onclick = function() {
  state.counter++;
  render();
}
decButton.onclick = function() {
  state.counter--;
  render();
}
```

</div>

<div>

**Vue.js 写法**

```vue
<template>
  <div id="app">
    <div>Current count is {{ counter }}</div>
    <button v-on:click="inc">Plus</button>
    <button v-on:click="dec">Minus</button>
  </div>
</template>
<script>
export default {
  data: {
    counter: 0
  },
  methods: {
    inc: function() { this.counter++ },
    dec: function() { this.counter-- }
  }
}
</script>
```

</div>

</div>

---

# 什么是前端框架？为什么大家都在用？

> 响应式（Reactivity）是什么意思？以计数器（Counter）为例

<br />

- 计数器的响应式（Reactivity）
  + **纯 JS 方案：** `state.counter` 修改时需要手动调用 `render()` 更新页面
  + **Vue.js 方案：** `counter` 修改后页面会自动更新
- 响应式有什么好处？
  + 自动捕获对数据变量（`data` / `state`）的修改并更新页面
  + 框架可以判断有哪些部分需要更新，而不是更新整个页面（扩展阅读：[Vue.js 渲染机制](https://cn.vuejs.org/guide/extras/rendering-mechanism)）
- 响应式本质是什么？
  + 对于一个变量 `state`，我们可以给出一个回调函数 `Callback(newValue, oldValue)`，<br>当`state` 的值被改变时会触发 `Callback`

---

# 什么是 Vue.js？为什么用这个？

> 推荐阅读：[Vue.js](https://cn.vuejs.org/guide/introduction)

- 主要作者：[Evan You](https://evanyou.me)
- 最初发布日期：2014 年 2 月，目前最新版是 `v3.4.27`
- 个人体验：
  + 容易上手
  + 中文文档写得很好
  + ~~你部在用所以当然教这个~~
- 有什么不够好的地方：
  + 完全依赖开源，背后没有大公司支持
  + 社区相对 React 来说比较小，生态环境没有 React 丰富

---

# 其他关于 Vue.js 的知识

- Vue.js 有两种写法：选项式（Options API）和组合式（Composition API），在本课程中我们将用**选项式**
- 我们可以在网页中直接引入 `Vue.js`，但是这种方法不常用

--- 

# 你的第二个 Vue 应用

> 本文内容来自：[Vue.js 快速上手](https://cn.vuejs.org/guide/quick-start.html)

<br />

1. 打开命令行窗口（Powershell 或者 iTerm）

```bash
npm create vue@latest
```

填写项目名称（随便填）后会有一系列的选项，可以全部选 `No`。命令完成后，一个新的文件夹（与项目名称同名）将会出现。

2. 安装依赖

```bash
# ⚠ 注意：请将下面的 projectName 改为你刚刚填入的项目名称
cd projectName
npm install
npm run dev
```

命令行窗口中应当包含一个以 `localhost` 开头的网址，访问这个网址就可以看见项目的网站内容。

---

# 你的第二个 Vue 应用

3. Vue 应用默认采用组合式 API，我们可以手动将其改为选项式。

<div grid="~ cols-2 gap-4">

<div>

**修改前**

```vue
<!-- App.vue -->
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>
```

</div>

<div>

**修改后**

```vue
<!-- App.vue -->
<script>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

export default {
  components: {
    HelloWorld,
    TheWelcome,
  }
}
</script>
```

</div>

</div>

---

# Vue 项目结构介绍

```bash
.
├── index.html  # HTML 页面模板
├── jsconfig.json  # 配置文件
├── node_modules  # NPM 安装的包（Package）
├── package.json  # NPM 安装的包的描述
├── package-lock.yaml  # NPM 安装的包的版本
├── public  # 公共目录，能被直接访问
├── README.md  # 项目的 README 文件
├── src  # 主要代码目录
│   ├── App.vue  # Vue 组件入口
│   ├── assets  # 用来放图片 / CSS 等资源
│   │   ├── base.css
│   │   ├── logo.svg
│   │   └── main.css
│   ├── components  # 用来放不同的组件
│   │   ├── HelloWorld.vue
│   │   ├── icons/
│   │   ├── TheWelcome.vue
│   │   └── WelcomeItem.vue
│   └── main.js  # JS 文件入口
```

---

# 你的第二个 Vue 应用

- **Task** 将 Counter 移植到 Vue 项目中

---

# 第三个 Vue 应用

### 基础需求

- 设计并实现一个 TODO App
- TODO 分为三类：**紧急**、**一般**、**完全不急**，分别用红色、黄色、绿色表示
- 每一类的 TODO 需要分组展示，不能混在一起
- 允许用户完成 TODO（即从列表中删除）
- 允许用户新建 TODO

### 中级需求

- 允许用户编辑 TODO
- 浏览器刷新后保留原本的 TODO 信息（使用 `localStorage`）

### 高级需求

- 学习使用 [Pinia](https://pinia.vuejs.org/zh/)，将 TODO 存储为全局状态
- 学习使用 [VueRouter](https://router.vuejs.org/zh/)，新建一个以列表方式（不分组）展示 TODO 的页面

---
layout: section
---

# Happy Coding 🚀