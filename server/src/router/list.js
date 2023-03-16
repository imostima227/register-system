const Router = require("@koa/router");
const router = new Router({ prefix: "/list" });
const router_handler = require("../router_handler/list");
const listSchema = require("../schema/list");
const validate = require("../middlewares/user");

router.get("/getList", router_handler.getList);

router.post(
  "/addUser",
  validate("post", listSchema.UserInfoSchema),
  router_handler.addUser
);

router.post(
  "/updateUser",
  validate("post", listSchema.UserInfoSchema),
  router_handler.updateUser
);

router.post(
  "/delUser",
  router_handler.delUser
);

module.exports = router;
