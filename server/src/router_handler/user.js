const fs = require('fs')

const {sign} = require('jsonwebtoken')

const config = require('../config')

//用户登录的处理方法
exports.user_login = (ctx,next) =>{
    const userInfo = ctx.request.body
    const local = JSON.parse(fs.readFileSync('../data/user.json'))
    
    //判断用户名是否正确
    if(local.username !== userInfo.username){
        return ctx.app.emit("error",new Error("用户名错误！"),ctx)
    }

    //判断密码是否正确
    if(local.password !== userInfo.password){
        return ctx.app.emit("error",new Error("密码错误！"),ctx)
    } 
        
    const user = {...local,password:''}
    //生成token
    const token = sign(user,config.jwtSecretKey,{expiresIn:config.expireIn})

    ctx.cookies.set(
        'token',
        token,
        {
            domain: 'localhost', // 设置 cookie 的域
            path: '/', // 设置 cookie 的路径
            maxAge: 10 * 60 * 60 * 1000, // cookie 的有效时间 ms
            expires: new Date('2023-12-30'), // cookie 的失效日期，如果设置了 maxAge，expires 将没有作用
            httpOnly: true, // 是否要设置 httpOnly
            overwrite: true // 是否要覆盖已有的 cookie 设置
        }
    )
    ctx.body = {
        status: 0,
        message: '登陆成功！',
        token: 'Bearer '+token,
        nickname: local.nickname,
        avatar: local.avatar
    }
}

//用户退出登录的处理方法
exports.user_logout = (ctx,next) =>{
    ctx.cookies.set(
        'token','none',
        {
            domain: 'localhost', // 设置 cookie 的域
            path: '/', // 设置 cookie 的路径
            maxAge: 10 * 60 * 60 * 1000, // cookie 的有效时间 ms
            expires: new Date('2022-12-30'), // cookie 的失效日期，如果设置了 maxAge，expires 将没有作用
            httpOnly: true, // 是否要设置 httpOnly
            overwrite: true // 是否要覆盖已有的 cookie 设置
        }
    )
    ctx.body = {
        status: 0,
        message: '退出登录成功！'
    }
}