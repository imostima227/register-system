### 实现思路

这次后端的代码编写比较简单，不过熟悉koa还是花了一点时间。我的完成思路如下：

- 添加路由文件夹router和其对应的处理函数文件夹router_handler，在router_handler中实现简单的响应信息，然后将路由挂载到app上。用PostMan测试能否正确发送post和get请求。
- 完成router和router_hander的编写。这两个文件夹分别包含两个文件：user.js和list.js，前者是用户登录登出相关的接口，后者是获取和修改用户列表相关的接口。
- 测试相关接口功能的正确性
- 使用jsonwebtoken包为登录的接口设置token验证，并使用ctx.cookies.set方法将token传给客户端
- 在app.js中使用jwt包来拦截非法请求，只有当用户的请求的header中包含了Bearer + token才能正确访问。以/api开头的接口（即登录登出接口）不受保护
- 设计schema，使用joi包，为用户登录、修改列表等接口设置格式验证
- 实现中间件函数validateSchemaJoi，以校验输入的请求并返回错误信息

#### 接口说明

登录相关的接口

- url:http://127.0.0.1:3001/api/login
- 主要功能：传入客户输入的用户名和密码，和本地data文件夹中的user.json中的信息校对，如果正确，则返回生成的token和用户的昵称和头像信息。如果失败也抛出异常

登出相关的接口

- url:http://127.0.0.1:3001/api/logout
- 主要功能：将用户本地的token删除

得到用户列表的接口

- url:http://127.0.0.1:3001/list/getList
- 主要功能：从data文件夹中的list.json中读取本地数据，并回传给客户端

添加用户的接口

- url:http://127.0.0.1:3001/list/addUser
- 主要功能：从data文件夹中的list.json中读取本地数据保存到local变量中，然后将传入的对象添加到local中，并写入本地文件

修改用户的接口

- url:http://127.0.0.1:3001/list/updateUser
- 主要功能：和添加接口类似，不过只是修改和传入对象id相同的项

删除用户的接口

- url:http://127.0.0.1:3001/list/delUser
- 主要功能：找到和传入对象id相同的项并删除

### 问题记录

- 如何解决跨域问题
  - 使用cors中间件即可
- 如何处理json格式的报文
  - 使用bodyparser中间件
- 本地登出时使用cookie.remove('token')无法正确删除本地cookie中的token
  - 原因：user_login方法中 ctx.cookies.set中设置了httponly
  - 解决办法：新增user_logout方法（对应用户登出接口），其中ctx.cookies.set中将token设置为none