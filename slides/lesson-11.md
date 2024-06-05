---
theme: seriph
class: 'text-center'
highlighter: shiki
lineNumbers: true
info: |
    ECommerce store as demo - Part II
background: 'https://source.unsplash.com/random/1080x720'
---

# Intro to Web Dev

造一个周边商店

---

# 周边商店项目简介

> 周边商店是什么？我们怎么做？

<br />

#### 项目的需求

- [x] 商品概览页面（标题、价格、“添加到购物车”按钮）
- 用户登录页面（允许登录/注销）
- 购物车页面（显示已添加的商品、结账按钮）

<br>

#### 技术栈的选择

- [vue.js](https://cn.vuejs.org/)
  + [Pinia](https://pinia.vuejs.org/zh/) - 全局状态管理
  + [Vue Router](https://router.vuejs.org/) - 路由管理
- [tailwind.css](https://tailwindcss.com/) - CSS 框架
- [Django](https://www.djangoproject.com/) 及 [Django Rest Framework](https://www.django-rest-framework.org/)

---
layout: section
---

# 用户认证

Token-based Authentication

---

# 用户认证后端 - DRF

> 参考文档：https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication

<br>

1. 使用 DRF 内置的 `TokenAuthentication`

```python
# hydrogen/settings.py
INSTALLED_APPS = [
  ...,
  'rest_framework.authtoken',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ]
}
```

2. 修改数据库：

```bash
python manage.py migrate
```

---

# 用户认证后端 - DRF

> 参考文档：https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication

<br>

3. 增加获取 `token` 的路由：

```python
# hydrogen/urls.py
from rest_framework.authtoken import views
urlpatterns = [
  ...,
  path('token/', views.obtain_auth_token),
]
```

4. 增加获取用户本身的路由

```python
# hydrogen/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view['GET']
@permission_classes([IsAuthenticated])
def get_user(request):
    return Response({ 'user': request.user })
```

---

# 用户认证前端 - NIMOStore

1. 新建用户登录页面

2. 使用环境变量存储后端地址

```ini
# .env
VITE_BACKEND_BASE=http://localhost:8000
```

3. 获取 `token` 并使用 `localStorage` 存储

```js
// src/api/auth.js
function login(credentials) {
  const { username, password } = credentials
  const backendBase = import.meta.env.VITE_BACKEND_BASE
  return fetch(`${backendBase}/token`, {
    method: 'POST',
    data: JSON.stringify({
      username,
      password,
    })
  }).then(resp => resp.json()).then(data => {
    localStorage.setItem('TOKEN', data.token)
  })
}
```

---

# 用户认证前端 - NIMOStore

4. 将 `login()` 接入登录页面

5. 安装 `pinia`，在全局储存用户信息

> 参考：https://pinia.vuejs.org/zh/getting-started.html

```bash
# 安装 pinia
pnpm install pinia
```

```js
// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

---

# 歪个楼，`Pinia` 是什么？

- 全局状态管理，可以理解成每个组件都能访问的 `data`
- 每个 `store` 可以理解为全局状态的模块，例如：
    + `userStore` 可以存储当前用户的相关信息
    + `goodsStore` 可以存储当前缓存的所有商品
- 每个 `store` 都由 `state`、`getters`、`actions` 三个部分组成：
    + `state` 类似 Options API 中的 `data`，定义“有什么数据”
    + `getters` 类似 Options API 中的 `computed`，定义“怎么获取数据”
    + `actions` 类似 Options API 中的 `methods`，主要用于修改数据

**⚠ 注1：** 数据的修改必须由 `actions` 完成

**⚠ 注2：** 本项目会使用 Options API 版本的接口，实际实践中建议使用 Composition API 版本

---

# 用户认证前端 - NIMOStore

5. 定义 `userStore`，存储用户信息

```js
// 新建 src/stores/user.js
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    name: '', 
  }),

  getters: {
    isAuthenticated() {
      return !!this.username
    }
  },

  actions: {
    async login(username, password) {
      // 登录逻辑...
    },
    async logout() {},
  }
})
```

---

# 用户认证前端 - NIMOStore

6. 新建辅助函数，在请求的时候带上 `token`

```js
// src/auth.js
function request(url, options) {
  const token = localStorage.getItem('TOKEN')
  const { data, ...rest } = options
  return fetch(url, {
    data: data ? JSON.stringify(data) : data,
    ...rest,
  })
}
```

---
layout: section
---

# 购物车

了解数据库中的常见关系

---

# 购物车后端 - 数据库的关系

<div rounded border border-blue-200 bg-blue-50 px-2 mb-4>

**Q：** 每个用户都有一个购物车，如何表示用户和购物车的关系？

**A：** 用户和购物车构成“一对一”（**One-to-One**）的关系，可以在购物车中增设 `userId` 字段标识用户

</div>

<div rounded border border-orange-200 bg-orange-50 px-2 mb-4>

**Q：** 每个用户都有多个订单，如何表示用户和订单的关系？

**A：** 用户和订单构成“一对多”（**One-to-Many**）的关系，可以在订单中增设 `userId` 字段标识用户

</div>

<div rounded border border-blue-200 bg-blue-50 px-2>

**Q：** 一个购物车中有多个商品，每个商品可以属于多个购物车，如何在数据库中表示购物车与商品的关系？

**A：** 购物车和商品构成“多对多”（**Many-to-Many**）关系，需要一个新的数据表存储这种关系

</div>

---

# 购物车后端 - Django 模型定义

<br>

```python
# nimostore/models.py 中新增内容
from django.contrib.auth import get_user_model()


class Cart(models.Model):
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    products = models.ManyToMany(Product)


class Order(models.Model):
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    products = models.ManyToMany(Product)
```

---

# 购物车后端 - 后端 Serializer 实现

> 参考：https://www.django-rest-framework.org/api-guide/relations/

```python
# nimostore/serializers.py 中新增内容
from django.contrib.auth import get_user_model
from .models import Cart, Order

class UserSerializer(serializers.ModelSerializer):
    name = serializers.Field(source='full_name')
    class Meta:
        model = get_user_model()
        fields = ['id', 'name', 'username']


class OrderSerializer(serializers.ModelSerializer):
    owner = UserSerializer()
    products = ProductSerializer(many=True)
    class Meta:
        model = Order
        fields = ['id', 'owner', 'products']


class CartSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)
    class Meta:
        model = Cart
        fields = ['products']
```

--- 

# 购物车后端 - 后端 Permission 实现

> 实现自定义 permission，参考：https://www.django-rest-framework.org/api-guide/permissions/

```python
# 新建 nimostore/permissions.py
from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # request.user === obj.owner
        user = getattr(request, 'user', None)
        owner = getattr(obj, 'owner', None)
        return user is not None and user == owner
```

---
layout: section
---

# 谢谢