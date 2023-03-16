//导入包
const Koa = require("koa");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const userRouter = require("./router/user");
const listRouter = require("./router/list");
const jwt = require("koa-jwt");
const config = require("./config");

const app = new Koa();
//解决跨域问题
app.use(cors());
//处理json格式的报文
app.use(bodyParser());

app.use(
  jwt({
    secret: config.jwtSecretKey,
    cookie: "token", // 从 cookie 中获取token
    debug: true, // 开启debug可以看到准确的错误信息
  }).unless({ path: [/^\/api/] }) // 以 public 开头的请求地址不使用 jwt 中间件
);

app.use(userRouter.routes());
app.use(listRouter.routes());

app.use(userRouter.allowedMethods());
app.use(listRouter.allowedMethods());

app.on("error", (err, ctx) => {
  ctx.response.body = {
    status: 1,
    message: err.message,
  };
});

app.listen(3001, () => {
  console.log("koa server running at http://localhost:3001");
});
