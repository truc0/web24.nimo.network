---
theme: seriph
class: 'text-center'
highlighter: shiki
lineNumbers: true
info: |
    Introduction to Web Development, Chapter 01 Web Basic
    HTML & CSS Basics
background: 'https://source.unsplash.com/collection/94734566/1920x1080'
---

# Intro to Web Dev

HTML & CSS 基础

---

# 第一个网页

> Reference: https://nimo.network/post/get-started/

创建一个名为 `index.txt` 的文件，用 `VSCode` 打开并输入以下内容：

```html
<!doctype html>
<html>
  <head>
    <title>Hello! Web!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
```

保存，然后将文件重命名为 `index.html`，用浏览器打开这个文件。

<v-click>
Bingo！一个简单到不能再简单的网页完成了！
</v-click>

---

# 网页到底是什么？

一个网页就是一个 `HTML` 文件。

<style>
  .HTML-container {
    margin-top: 8rem;
    font-size: 2rem;
  }
  .HTML {
    font-size: 6rem;
    color: orange;
  }
  .spacer {
    width: 3rem;
    display: inline-block;
  }
</style>

<div class="HTML-container text-center">
  <span class="HTML">H</span><span>yper</span>
  <span class="HTML">T</span><span>ext</span> <span class="spacer"></span>
  <span class="HTML">M</span><span>arkup</span> <span class="spacer"></span>
  <span class="HTML">L</span><span>anguage</span>
</div>

<!-- The process of building a website will be introduced in the next lesson -->

---
clicks: 5
---

# 网页到底是什么？

一个网页就是一个 `HTML` 文件。

一个 `HTML` 文件是由什么组成的呢？

```html {all|1|2,9|3-5|6,8|7|all}
<!doctype html>
<html>
  <head>
    <title>Wow! Web!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
```

<v-clicks at="1">

第一行是文件类型，告诉我们这是一个 `HTML` 文件。每一个完整的网页都以这一行开头。

</v-clicks>

<v-clicks at="2">

一个 `HTML` 由标签和标签中的内容组成。
标签是指用 `<` 和 `>` 括住的部分，`<>` 表示标签的开始，`</>` 表示标签的结束。
标签可以出现在其他标签里面。

</v-clicks>

<v-clicks at="3">

`head` 标签定义了这个网页的一些元信息（metadata），例如网站的标题。

</v-clicks>

<v-clicks at="4">

`body` 标签是我们能够看到网页内容。

</v-clicks>

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# 标签

## `head` 中的标签

- `<title>`
- `<meta>`
  + `<meta name="description" content="">`
  + `<meta name="viewport" content="">`
- `<link>`
  + `<link ref="stylesheet" href="xxx">`
  + `<link ref="icon" href="xxx">`
- `<script>`


---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# 标签

## `body` 中的标签

- 标题: h1, h2, h3, h4, h5, h6
- 通用: div, span, p, img, a, section
- 表格: table, thead, tbody, tr, td
- HTML5 新增的语义化标签: header, footer, main, aside

<!-- examples -->

---
layout: section
---

# 这个网页...有点点单调！

---
layout: section
---

# Have a short break first! 

---

# 做点微小的装饰

CSS is what you need

<style>
  .CSS-container {
    margin-top: 8rem;
    font-size: 2rem;
  }
  .CSS {
    font-size: 6rem;
    color: orange;
  }
  .spacer {
    width: 3rem;
    display: inline-block;
  }
</style>

<div class="CSS-container text-center">
  <span class="CSS">C</span><span>ascading</span> <span class="spacer"></span>
  <span class="CSS">S</span><span>tyle</span> <span class="spacer"></span>
  <span class="CSS">S</span><span>heets</span>
</div>

<div class="text-center">
中文名为层叠样式表，是网页中进行元素排版的工具
</div>

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# CSS 长啥样

```css
<selector> {
  <prop1> : <value1>;
  <prop2> : <value2>;
  ...
}
```

CSS 由**选择器**和**属性**组成。**属性** 是指具体的样式，包括文字的大小、颜色和背景的颜色等等，**选择器**的作用是选择被改变样式的元素（比如所有的 h1 标签）。

### 样例

```css
h1 {
  color: red;
}
```

上面的 CSS 含义是将 `文字颜色是红色` 这一属性套用在所有内容 `h1` 标签上。

---

# 等一下...CSS 应该放在哪里

设置元素样式的方法一共有三种，分别是内联式（`inline`）、`style`标签和外部文件引入

- 内联式（`inline`）

```html
<h1 style="font-size: 100px">I want to be larger</h1>
```

样式直接写在元素的 `style` 属性上。

- `style` 标签
```html
<!doctype html>
<html>
  <head>
    <style>
      h1 { font-size: 100px; }
    </style>
  </head>
  <body><h1>Hello, world!</h1></body>
</html>
```

样式写在 `style` 标签上， `style` 标签通常位于 `head` 标签内。

---
clicks: 2
---

# 等一下...CSS 应该放在哪里

- 通过 `link` 标签从外部文件引入

<div grid="~ cols-2 gap-4">

<div>

> index.html

```html {all|5}
<!doctype html>
<html>
  <head>
    <title>Wow! Web!</title>
    <link ref="stylesheet" href="./style.css" type="text/css">
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
```

</div>

<div>

> style.css

```css
h1 {
  font-size: 100px;
}
```

</div>
</div>

`link` 标签一般也位于 `head` 标签内部，`href` 属性为 `style.css` 的地址，`link` 标签的其他属性不能改变。

---

# 常见属性

CSS 支持设置的属性很多，在此不能一一列举，建议在学习过程中多利用搜索引擎查询。

- 文字相关
  + `text-align`: 文字对齐方向
  + `font-size`: 字体大小
  + `font-family`: 字体
  + `font-weight`: 字体是否加粗
  + `color`: 字体颜色
  
- 其他
  + `width` / `max-width` / `min-width`: 宽度相关
  + `height` / `max-height` / `min-height`: 高度相关
  + `display` / `visibility`: 可见性
  + `background` / `background-color` / `background-image`: 背景相关
  
--- 
  
# 常见属性

CSS 支持设置的属性很多，在此不能一一列举，建议在学习过程中多利用搜索引擎查询。

- 排版相关
  + margin / margin-left / margin-right / margin-top / margin-bottom
  + padding
  + box-sizing
  
- 形状
  + border
    * border-radius
  + box-shadow

- （还有很多，不一一列举了）  
  
<!-- should be an example -->

---

# 练习1

参照下面的网页，做一个长相一模一样的！

<div>
<iframe height="400" style="width: 100%;" scrolling="no" title="Nine-square" src="https://codepen.io/truco/embed/NWvbyRN?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/truco/pen/NWvbyRN">
  Nine-square</a> by Bill (<a href="https://codepen.io/truco">@truco</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
</div>

---
layout: image-left
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# CSS 选择器

- 选择器有三种：标签、ID 和 class
- 他们可以组合形成更复杂的选择器
  + div img
  + div > img
  + \*
  + div + img
  + h1 ~ a
- pseudo classes
  + a:hover
  + a:visited
  + ...

---

# Exercise 02

CSS 选择器小练习，做题过程中可查看右方提示一边学一边做

> https://flukeout.github.io/

<br>

<iframe height="320" style="width: 100%;" scrolling="no" title="CSS Diner" src="https://flukeout.github.io/" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

---

# 谢谢！

### 课后作业

做一个 **自我介绍** 页面，提交时间为下节课前。

要求:

- 应当是一些独立的 HTML、CSS 文件，本作业不建议使用 `Codepen` 完成
- 网页入口应命名为 `index.html`

**注意**：我们会在第二节课将这节课的内容放到互联网上，如果你不想其他人看到你的个人信息，请在写自我介绍页面时传递虚假情报。

祝假期愉快~