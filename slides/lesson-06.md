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

数据库设计 & Django Rest Framework

---

# 前后端分离和 RESTful API

- 前后端分离指前端作为一个独立于后端的模块存在，而不是使用模板语言等工具和后端强绑定
    + 动态加载数据的需求增加
    + 前端的代码量++++
- 前端作为一个独立项目，需要一种方法跟后端 “交流”
    + 分离前：在模板语言中直接传参
    + 分离后：通过在浏览器发起 HTTP 请求获得数据

- RESTful API 是其中一种 API 设计规范，也是目前常用的规范
    + 约定 CRUD 操作的请求方式

---

# RESTful API & CRUD

> 来开周边商品店

<br>

- CRUD（增删改查）的对象在 RESTful API 中被称为 Resource（资源）
- 以商品（product）为例，常见的 URL 如下：
    + `GET /products` 获取商品列表
    + `GET /products/156` 获取 id 为 156 的商品
    + `POST /products` 创建新的商品
    + `PUT /products/156` 修改 id 为 156 的商品
    + `DELETE /products/156` 删除 id 为 156 的商品
- `GET`、`POST`、`PUT`、`DELETE` 是常见的 HTTP 方法（method）

---

# 什么是 Django Rest Framework？为什么要用它？

> Django Rest Framework 可以帮助我们在 Django 上快速完成 RESTful API 的开发

<br>

#### 安装 Django Rest Framework (DRF)

> 参考：https://www.django-rest-framework.org/#installation

```bash
pip install djangorestframework
pip install django-filter
pip install django-cors-headers
```

编辑两个文件：

```python
# hydrogen/settings.py
INSTALLED_APPS = [
    ...
    'rest_framework',
]
# hydrogen/urls.py
urlpatterns = [
    ...
    path('api-auth/', include('rest_framework.urls'))
]
```

---

# 周边商店 Step 01：新建一个 Django App

1. 新建一个 Django App

```bash
python manage.py startapp nimostore
```

2. 定义 Model

```python
# nimostore/models.py
from django.db import Models

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.IntegerField()
```

3. 加入 Admin Panel

```python
# nimostore/admin.py
from django.contrib import admin
from .models import Product

admin.site.register(Product)
```

---

# 周边商店 Step 02：年轻人的第一个 API

1. 定义一个新的 Serializer

> Serializer 可用于验证用户输入、指定用户输出

```python
# 新建 nimostore/serializers.py
from rest_framework import serializers
from .models import Product
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price']
```

2. 定义一个视图函数（View）

```python
# nimostore/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
```

---

# 周边商店 Step 02：年轻人的第一个 API

3. 加入路由规则

```python
# 新建 nimostore/urls.py
from django.urls import path
from .views import product_list
urlpatterns = [
  path('', views.product_list),
]

# 编辑 hydrogen/urls.py
urlpatterns = [
  ...
  path('products/', views.product_list),
]
```

4. 在管理后台加入一些产品，然后访问 `http://127.0.0.1:8000/products` 看看效果

---

# 周边商店 Step 03：年轻人的第二个 API

1. 通过 API 新增一个 Product

```python
# 编辑 nimostore/views.py
from rest_framework import status
@api_view(['GET', 'POST'])
def product_list(request):
    if request.method == 'GET':
        ...
    elif request.method == 'POST':
        serializer = ProductSerialier(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

2. 在浏览器中发送 `POST` 请求到 `/products`看看效果

---

# 周边商店 Step 04：Class-based Views

1. 修改视图函数

```python
# 修改 nimostore/views.py
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer

class ProductList(APIView):
    def get(self, request, format=None):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    def post(self, request, format=None):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

---

# 周边商店 Step 04：Class-based Views

2. 修改 `urls.py`

```python
# 修改 nimostore/urls.py
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import ProductList

urlpatterns = [
    path('', ProductList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
```

---

# 周边商店 Step 04: Class-based Views

3. 进一步简化视图函数

```python
# 修改 nimostore/views.py
from rest_framework import mixins
from rest_framework import generics
...
class ProductList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
    return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
```

---
layout: section
---

# 谢谢