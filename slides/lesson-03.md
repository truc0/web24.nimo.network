---
theme: seriph
class: 'text-center'
highlighter: shiki
lineNumbers: true
info: |
  The Javascript Language
background: 'https://source.unsplash.com/random/1080x720'
---

# Intro to Web Dev

JavaScritp 基础

---
layout: section
---

# JavaScript 是从哪里来的

---

# JavaScript 的历史

- JavaScript 是 1995 年由 `Netscape 2` 开发
- JavaScript 设计初衷是为网页加入动态特性
- JavaScript 同其他语言一样，最初并没有统一的标准，在 1996 年 ECMA 正式基于 JavaScript 制定了 `ECMAScript` 标准规范
- JavaScript 与 Java 的关系类似于雷峰塔和雷锋的关系，即除了名字相似以外没有什么关系
- ECMAScript 在2015年开始飞速发展，几乎一年迭代一个版本
    + ES5, ES6, ... 最新版是 ES13
    + 逐渐加入 `async/await`、`Promise` 等等特性
    + 很多原本的糟糕特性也被保留了下来

<div grid="~ cols-3 gap-4" class="mt-4">

<div class="rounded shadow flex items-center justify-center py-2">
  <img class="h-20" src="https://miro.medium.com/max/1200/0*NAqwY1429cCNAGxo" alt="coffeescript">
</div>

<div class="rounded shadow flex items-center justify-center py-2">
  <img class="h-20" src="https://i.pinimg.com/originals/c3/8e/e8/c38ee8475ee7f3680f706c56c3a1194c.png" alt="typescript">
</div>

<div class="rounded shadow flex items-center justify-center py-2">
  <img class="h-20" src="https://ucarecdn.com/3310b79a-2119-4a99-b939-68f80128a2b8/" alt="typescript">
</div>

</div>

---

# JavaScript 的运行环境

> JavaScript 的运行依赖于执行引擎

<br />

## 浏览器

- 一般浏览器中都内置了 JavaScript 执行环境，用户在访问网页时会加载 JavaScript 代码执行
- 我们也可以在 `开发者工具` 中的 `控制台（Console）` 执行 JavaScript 代码
- 网页中的 JavaScript 会在沙箱（Sandbox）中执行，一般可以认为是安全的，不会影响到系统环境

## Node.js

- Node.js 是一个跨平台的 JavaScript 执行环境
- 基于 Node.js，我们可以使用 JavaScript 进行系统软件开发
- 现代的前端框架（如 `Vue.js` 和 `React.js`）都需要对程序员编写的代码进行编译，这个过程通常会用到 Node.js 作为执行环境

---

# 在网页中运行 JavaScript

## `script` 标签

```html
<script>
  alert('Run javacript here!')
</script>
```

<br />

## 在网页中引用一个 `.js` 文件

<div grid="~ cols-2 gap-4">

<div>

#### `index.html`

```html
<!-- load index.js -->
<script src="./index.js">
alert(1); // this will not be executed if `src` property is provided
</script>
<!-- load non-exist script won't stop the rendering process of browser -->
<script src="./non-exist.js"></script>
```

</div>

<div>

#### `index.js`

```javascript
alert('Hahahah!')
```

</div>

</div>

---
layout: section
---

# JavaScript 语法

参考：[现代JavaScript教程](https://zh.javascript.info)

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# 一个简单的 js 程序

```js
let x = 1000
/**
 * 一个语句的结尾不一定要用分号，也可以换行
 */
let y = 2000; // 或者用分号也可以

alert(x
+ y)
/**
 * 一个语句也可以分开多行写
 */
var exp = 3 // `var` 关键字也可以用来定义变量
```

<br>
<hr>
<br>

### 动态编程语言
- 一个变量的类型在运行的时候可以改变
- 我们可以给对象动态地添加类型

---

# 变量

定义变量可以使用 `var`、`let` 和 `const` 关键字

```js
let x = 100,
    y = 200
    
let $ = 'dollar',
    _ = 'underscore';
    
let 变量 = '变量'
const constant = 'constant'
```

变量的名称可以包含字母、数字和一些特殊符号（`$`和`_`）

#### 尽量避免用 `var`

```js
console.log(var_let) // 会报错，因为 `var_let` 没有声明和定义
let var_let = 'let'

console.log(var_var) // 会输出 undefined，因为 `var` 会将变量的声明提前，但变量还未赋值
var var_var = 'var'
```

---
layout: image-left
image: https://source.unsplash.com/collection/94734566/1920x1080
---

## JavaScript 中的数据类型

<br />

- Number
- Boolean
- String
- null
- undefined
- Object
- Symbol

---

# 数字

Number ranges from `2^53 - 1` to `-2^53`

```js
let n = 123 // number
n = 123.456 // number
n = 100 / 0 // number: Infinity
n = NaN     // number: NaN
n = 'hello' / 5 // number: NaN
```

<br>

## BigInt

```js
let n = 999n // BigInt: suffix with n
n = BigInt('0x1') // BigInt: construct from string
```

---

# 常见数据类型
String, Boolean, null and undefined

```js
let str = "this is a string"
str = 'another string'

let template = `str is ${str}` // output: str is another string
template = `1 + 2 = ${2 + 1}`
```

```js
let b = true
b = false
b = Boolean(0)  // false
b = Boolean([]) // true
```

```js
let n = null
```

```js
// undefined is the init value of var
let u
console.log(u) // undefined
```

```js
typeof 10n // bigint
typeof true // boolean
```

---

# 与浏览器交互

```js
let answer = prompt('7 + 2 = ?') // pop up a prompt
let confirmed = confirm(`Is your answer ${answer}?`)
if (confirmed) {
  alert(`Your answer is ${answer}`)
} else {
  alert(confirmed)
}
```

<br>

## 练习 1

- 询问用户 `1+2+3+4+...+50 = ?`
- 用 `confirm` 确认用户的答案
- 如果回答正确，输出 `Bingo!`
- 如果回答错误，输出 `0ops!`

---

# 类型转换

显式转换和隐式转换

```js
/* 显式转换 */
let x = 1000
let str_x = String(x)
let bool_x = Boolean(x)
let bigint_x = BigInt(x)

let n = Number('100') // 100
let nan = Number('not a number') // NaN
let n_undefined = Number(undefined) // NaN
let n_null = Number(null) // 0

let b = Boolean(0) // false
let b_str_false = Boolean("") // false
let b_str_true = Boolean("dfda") // true
let b_arr = Boolean([]) // true
```

```js
/* 隐式转换 */
console.log(1 + '1')
console.log('1' + 1)
console.log(1 == '1')
```

---

# 运算符

JavaScript 的语法与 C++ 类似

```js
// examples
let x = 100
let y = 200

// if 语句
if (x > y) {
  x = x ^ y;
  y = x ^ y;
  x = x ^ y;
}

x = 2 ** 10; // 幂 pow(2, 10)

// 链式赋值
x = y = '100'

// for 循环
let y = 0;
for (let x = 1; x <= 50; ++x) { y =+ x; }
```

---

# JavaScript 不得不说的那些事

当运算符遇上两个不同类型的变量...

```js
console.log([] + 1)
console.log(1 + '0')

// checkout https://jsfuck.com for more info
console.log(![] + [])
console.log([! + []])
console.log([! + [] + ! + []])

// try this
console.log(0 == '0')
console.log(0 == [])
console.log('0' == [])
```

<br>

#### 强类型语言和弱类型语言

- 强类型语言中，变量类型的转换必须使用显式转换（如 `Python`）
- 弱类型语言中，变量类型可能会悄悄被隐式转换（如 `C++`）

---

# 比较运算符

```js
// number
console.log(1 > 2)
if (1 > 0) { console.log('always run') }
else { console.log('never run') }

if (1) { /* will cast 1 to boolean */ }

// string
console.log('apple' < 'banana')
// if ('apple' < 'google') { x = 'apple' } else { x = 'google' }
let x = ('apple' < 'google') ? 'apple' : 'google'
```

#### 严格比较

```js
console.log(1 === '1')
console.log(undefined == null)
console.log(undefined === null)
```

---

# 循环

JavaScript 中的循环与 `C/C++` 类似

```js
for (let i = 0; i < 50; ++i) {
  if (i === 10)  { continue }
  console.log(i)
}

let x = 0
while (x == 0) {
  break
}
```

<br />

## 练习

<div grid="~ cols-2 gap-2">
<div>

```js
// 判断字符串 `str` 中是否包含 `ch` 这个字符
function contains(str, ch) {
  // 在这里填代码
  // 字符串的长度可以通过 str.length 获得
}
```

</div>

<div>

```js
// 测试，如果浏览器或 Node.js 中没有报错即为测试通过
console.assert(!contains('hello', '1'))
console.assert(contains('54745261', '1'))
console.assert(contains('hell0', '0'))
console.assert(!contains('', 'H'))
```

</div>
</div>

---

# 数组

> 推荐阅读： https://javascript.info/array

```js
// 定义一个数组
let x = new Array() // 
let arr = [1, 2, 30, 10, 15] // 可以用中括号定义
let mixed = [1, '2', 3, null] // 数组中可以有不同类型

arr[1] // 2
mixed[3] // null
mixed[99999] // undefined

a.length // 5

arr.push(10) // 新增元素
arr.findIndex(10) // 寻找元素的下标，没有时返回 -1
```

<br>

### 遍历数组的多种方式

```js
let arr = ['hello', 'world']
for (let element of arr) { console.log(element) }
```

---

# 函数

```js
let status = 'fine'
function howru() {
  let askBack = 'And you?'
  return `I'm ${status}, thank you. ` + askBack
}

function print(x, y) {
  console.log(x)
  console.log(y)
}

print(1) // 1, undefined
print(1, 2) // 1, 2
print(1, 2, 3) // 1, 2
```

### 练习 - Numbal 1

- 编写一个函数 `userAttempt(answer, input)`，两个参数都是字符串，两个字符串长度相等，记为 `N`
- 返回一个长度为 `N` 的数组 `result`，`result[i]` 的取值为 `0`, `1`, `2`
- 如果 `input[i]` 与 `answer[i]` 则 `result[i]` 为 `0`，若 `input[i]` 在 `answer` 出现但与 `answer[i]` 不同即为 `1`，否则为 `2`


---

# 函数的其他写法

```js
function add(x, y) { return x + y }

// 有默认值的参数
function add(x, y = 0) { return x + y }

// 变量可以是一个函数
let add = function (x, y = 0) { return x + y }

// 箭头函数：函数的简写，以下两个函数的效果是相同的
let add_arrow_1 = (x, y = 0) => { return x + y }
let add_arrow_2 = (x, y = 0) => x + y
```

<br>

### 闭包（Closure）

<div grid="~ cols-2 gap-4">

```js
function createCounter() {
    let counter = 0
    return function () {
        counter++
        return counter
    }
}
```

```js
const count1 = createCounter()
const count2 = createCounter()
console.log(count1()) // 1
console.log(count1()) // 2
console.log(count1()) // 3
console.log(count2()) // 1
```

</div>

---

# 对象（Objects）

> 推荐阅读： https://javascript.info/object

```js
let obj = new Object()
let eobj = {}

let user = {
  age: 99999,
  name: 'Jiang',
  interview: function () {
    console.log('you are too young, too simple')
  },
  'hello': 'world'
}

user.age = user.age + 1
user.prop = 'newProp'
console.log(user)

delete user.prop
delete user['hello'] // same as delete user.hello
console.log(user)
```

---

# 练习 2 - Numbal 2

- 编写 `randomPassword(k)` 函数，该函数返回一个 `k` 位的字符串
    + `k` 的默认值是 `4`
    + 返回的字符串中只包含 `0` - `9`
    + 返回的字符串中不包含重复的数字
- 定义一个全局的对象 `state`
    + `state` 中包含名为 `answer` 的属性，该属性是字符串，默认为空字符串
    + `state` 中包含名为 `isWin` 的属性，该属性是一个布尔值，默认为 `false`
    + `state` 中包含名为 `attempts` 的属性，该属性是一个数组，默认为 `[]`
    + `state` 中包含名为 `results` 的属性，该属性是一个数组，默认为 `[]`
- 修改 `userAttempt(answer, input)` 的代码
    + 将每次用户的输入 `input` 存到 `attempts` 数组中
    + 将每次处理的结果 `result` 存到 `results` 数组中
    + 如果用户尝试的次数超过 `6` 次，函数直接返回 `false`

---
layout: section
---

# 与 HTML 元素交互

---

# 获取 HTML 元素

获取元素

```js
// 老方法，根据 id 和 class 选择元素
let id_name = document.getElementById('name') // get #name
let class_name = document.getElementsByClass('name') // get .name
// 新方法，可以使用 CSS 选择器方式
let x = document.querySelector('#name')
let y = document.querySelectorAll('.name')
let complex = document.querySelectorAll('.container .card > img')
```

与元素交互

```js
let app = document.querySelector('#app')

app.classList // get all class
app.innerText = '<h1>hello</h1>' // 会以文字形式展示
app.innerHTML = '<h1>hello</h1>' // 会以 HTML 形式展示
app.style.background = '#000' // 修改元素的属性
```

---

# 监听事件 - 以点击为例

三种不同的方法

#### 元素的 `onclick` 属性

<div grid="~ cols-2 gap-4">

```html
<button id="button">Click me!</button>
```

```js
let btn = document.querySelector('#button') // the element we want to bind

btn.onclick = function (el) {
  // do something
}
```

</div>

<div grid="~ cols-2 gap-4">

```html
<button id="button" onclick="do_something()">Click me!</button>
```

```js
function doSomething() {
  // do something
}
```

</div>


#### `addEventListener` 方法

<div grid="~ cols-2 gap-4">

```html
<button id="button">Click me!</button>
```

```js
let btn = document.querySelector('#button') // the element we want to bind

btn.addEventListen('click', () => {
  // do something
})
```

</div>

---

# 任务 3 - Numbal 3

```html
<h1>Guess Password! You have `6` chances!</h1>
<div id="attempts"></div>
<div>
  <input id="input" type="text">
  <button>Try</button>
</div>
```

- 创建 `index.html`，输入上面的内容
- 将之前写的 `userAttempt` 函数和 `state` 对象放在 `index.js` 文件中，在页面中引用 `index.js`
- 写一个 `resetChallenge` 函数，该函数会将 `state` 对象重置为默认值
    + `answer` 重置为 `randomPassword(4)`
    + 在初次加载时调用 `resetChallenge` 
- 为 `button` 按钮绑定事件，当 `button` 被按下时：
    + 从 `input` 中提取出用户的输入，当用户的输入长度不是`4`时弹窗提醒（`alert`函数可以用于弹窗）
    + 调用 `userAttempt`，将结果拼接成字符串输出到 id 为 `attempts` 的元素中
    + 如果用户回答正确，弹窗提示；如果用户回答次数超过 `6` 次，弹窗提示

---

# 作业 - Numbal UI 优化

参考优化方案：

- 将用户的输入换成 `4` 个小方框，点击回车时执行 `userAttempt` 判断
    + 可能会用到 `element.addEventListener('keydown')`
    + 需要处理用户输入：
        + 数字输入：填充并将输入位置设置为下一个方块
        + 退格键：删除当前块的内容并回退到上一个方块
        + 其他字符输入：无效果
    + 用户输入不足 `4` 个字符时可以用除弹窗外其他方法标示
    + 可以考虑不显示光标（CSS 中设置 `cursor: none`），改用其他方式显示当前输入的位置
- 用户回答正确和回答次数过多时用**弹窗以外**的方式展示，可直接展示在页面上
    + 游戏结束后可显示一个 `再来一次` 的按钮
- 用户的回答记录（`attempts`）用小方块展示，可以用颜色标示是否回答正确