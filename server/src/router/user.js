const Router =require('@koa/router')
const router = new Router({prefix:'/api'})
const router_handler = require('../router_handler/user')
const userSchema = require('../schema/user')
const validate = require('../middlewares/user')

router.post('/login',validate('post',userSchema.userLoginSchema),router_handler.user_login)

router.post('/logout',router_handler.user_logout)

module.exports = router


