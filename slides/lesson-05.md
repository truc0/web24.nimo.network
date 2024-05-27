---
theme: seriph
class: 'text-center'
highlighter: shiki
lineNumbers: true
info: |
    Django Web Framework Getting Started
background: 'https://source.unsplash.com/random/1080x720'
---

# Intro to Web Dev

Django 后端框架

---

# 从 CRUD 了解后端

CRUD 分别代表 **C**reate、**R**ead、**U**pdate 和 **D**elete

- 前端只能做数据的展示，业务的逻辑部分通常由后端完成
- 后端一般需要负责：
    + 认证和鉴权（Authentication & Authorization）：用户的登录及权限判断
    + 数据验证（Verification）：判断用户上传的数据是否符合规则
    + 数据处理
    + 数据存储及提取
- 数据（比如 TODO、用户信息等）常见的操作有：
    + 存储资料（Create）
    + 查询资料（Read）
    + 更新资料（Update）
    + 删除资料（Delete）

---

# Ex01: 写一个 ToDo 管理程序

- 建立四个函数 `create`、`index`、 `detail`、`update`、`delete`
- 维护一个 ToDo 列表，支持用户创建、查询、更新、删除 ToDo
- ToDo 中包含 `pk`、`title`、`content`、`category` 四个字段，分别对应 id、标题、内容和类别
- 你可以使用自己喜欢的方式创建 ToDo
- `create` 函数能够创建一个新 Todo 并加入 ToDo 列表
- `index` 函数以列表形式返回当前所有 ToDo
- `detail` 函数接受一个参数 `pk` (Primary Key)，返回对应 `pk` 的 ToDo
- `update` 函数接受两个参数 `pk` 和 `update_todo`，更新对应 `pk` 的 ToDo
- `delete` 函数接受一个参数 `pk`，从列表中删除这个 ToDo

---
layout: section
---

# 挑战1：数据持久化

---

# 数据库：数据持久化工具

- **挑战：** 目前的 ToDo 存储在内存里
    + 程序意外关闭后无法恢复
    + 数据规模很大的时候（千万甚至更多的 ToDo 记录）内存可能不够
- **解决方案：** 使用数据库，
    + 高效存储数据
    + 快速读取数据
    + 分布式数据库的优化、数据库同步、……
- **SQL及相关问题：** 数据库的插入、查询等操作是通过 SQL（Structured Query Language）完成的，但：
    + 手写 SQL 不容易写出高性能的 SQL
    + 手写 SQL 容易写出 SQL 注入（SQL Injection）漏洞
    + 数据插入的操作（数据验证、写 SQL）具有一定的重复性
    + SQL 与开发语言不同，不易上手
- **优化方案：** 使用 ORM（Object-relational mapping）框架，将数据库操作转化为函数操作

---

# 数据库：Django 中的 ORM 模块

> 从新建 Django 项目开始

0. 安装 Django
    ```bash
    pip install django
    ```

1. 新建一个 Django 项目
    ```bash
    django-admin startproject hydrogen  # hydrogen 是项目名称
    # 验证安装
    cd hydrogen
    python manage.py runserver
    # 打开网址应当能够看到安装成功页面
    ```

2. 在项目中新建一个 App
    ```bash
    cd hydrogen
    python manage.py startapp todo
    ```

---

# 数据库：Django 中的 ORM 模块

3. 初始化数据库
    ```bash
    python manage.py migrate
    ```

4. 将新建的 App 加入 `INSTALLED_APPS`
    ```python
    # 编辑 hydrogen/setting.py
    INSTALLED_APPS = [
        ...,
        'todo.apps.TodoConfig'
    ]
    ```

5. 创建 Todo 模型
    ```python
    # 编辑 todo/models.py
    from django.db import models
    class Todo(models.Model):
        # id 默认是有的，所以不需要定义
        title = models.CharField(max_length=255)
        content = models.TextField(blank=True, default='')
        category = models.CharField(max_length=255)
    ```

---

# 数据库：Django 中的 ORM 模块

6. 创建对应的数据库更新
    ```bash
    python manage.py makemigrations todo
    # （可选）查看对应的 SQL
    python manage.py sqlmigrate todo 0001
    ```

7. 更新数据库
    ```bash
    python manage.py migrate
    ```

8. 数据库读写
    ```python
    from todo.models import Todo
    # 读取全部
    todos = Todo.objects.all()
    # 读取单个
    todo = Todo.objects.get(pk=pk)
    # 创建新 Todo
    Todo.objects.create(title='标题', content='内容', category='normal')
    # 删除 todo
    todo.delete()
    ```

---

# 数据库：Django 中的 ORM 模块

8. 数据库读写
    ```python
    # 更新数据
    todo.title = '新标题'
    todo.save()

    # 筛选数据
    todos = Todo.objects.filter(category='normal').all()
    ```

---

# Django 中的调试模块

1. （可选）安装 IPython
    ```bash
    pip install ipython
    ```

2. 打开 Django 交互式调试框
    ```bash
    python manage.py shell
    >>> from todo.models import Todo
    >>> Todo.objects.all()
    ```

---

# Django 的后台与管理模块

1. 创建用户
    ```bash
    python manage.py createsuperuser
    # 填入（虚假的）用户名和密码
    ```

2. 创建 Todo 对应的管理页面
    ```python
    # todo/admin.py
    from django.contrib import admin
    from .models import Todo
    admin.site.register(Todo)
    ```

3. 访问 `/admin`

---
layout: section
---

# 挑战2：通过 HTTP 提供服务

---

# Django 中的路由系统

1. 创建视图（View）函数
    ```python
    # todo/views.py
    from django.http import HttpResponse

    def index(request):
        return HttpResponse('hello world')        
    ```

2. 创建 URL 映射
    ```python
    # todo/urls.py （需要新建）
    from . import views
    urlpatterns = [
        path('', views.index, name='index'),
    ]

    # hydrogen/urls.py
    urlpatterns = [
        path("todo/", include("todo.urls")),
        path("admin/", admin.site.urls),
    ]
    ```

---

# Django 中的路由系统

3. 创建带参数的视图（View）函数
    ```python
    # todo/views.py
    def detail(request, todo_id):
        return HttpResponse(f"Current todo id: {todo_id}")
    ```

4. 创建 URL 映射
    ```python
    # todo/urls.py
    urlpatterns = [
        path("", views.index, name="index"),
        path("<int:todo_id>/", views.detail, name="detail"), 
    ]
    ```

5. 尝试访问 `/todo/1`
6. **Ex02** 将之前的 ToDo 应用改写为 `HttpResponse` 形式

---

# Django 中的模板系统

> Django 也能够返回网页

1. 创建模板
    ```html
    <!-- todo/templates/todo/index.html -->
    <ul>
    {% for question in latest_question_list %}
        <li><a href="/polls/{{ question.id }}/">{{ question.question_text }}</a></li>
    {% endfor %}
    </ul>
    ```

---

# Django 中的模板系统

> https://docs.djangoproject.com/en/5.0/intro/tutorial04/

2. 修改视图函数
    ```python
    # todo/views.py
    from django.template import loader
    from .models import Todo

    def index(request):
        todos = Todo.objects.all()
        context = {'todos': todos}
        # 写法1：
        template = loader.get_template('todo/index.html')
        return HttpResponse(template.render(context, request))
        # 写法2：
        # return render(request, 'todo/index.html', context)
    ```

3. **Ex03** 用 HTML 模板展示 ToDo

---
layout: section
---

# 谢谢