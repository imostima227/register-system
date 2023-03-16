const fs = require('fs')

//调用列表数据的方法
exports.getList = (ctx,next) =>{
    const list = JSON.parse(fs.readFileSync('../data/list.json'))
    ctx.body = {
        status: 0,
        message: '获取成功！',
        info: list
    }
}

//添加用户的接口
exports.addUser = (ctx,next) =>{
    console.log('add')
    const userInfo = ctx.request.body
    const local = JSON.parse(fs.readFileSync('../data/list.json'))
    local.push(userInfo)
    const content = JSON.stringify(local)
    
    fs.writeFileSync('../data/list.json',content)
    ctx.body = {
        status: 0,
        message: '写入成功！',
        info: content
    }
}

//更新用户的接口
exports.updateUser = (ctx,next) =>{
    console.log('update')
    const userInfo = ctx.request.body
    const local = JSON.parse(fs.readFileSync('../data/list.json'))
    let flag = false
    for(let i=0; i<local.length; i++){
        if(local[i].id === userInfo.id){
            local[i] = {...userInfo}
            flag = true
        }
    }

    if(!flag){
        return ctx.app.emit("error",new Error("未找到该用户!"))
    }
    const content = JSON.stringify(local)
    fs.writeFileSync('../data/list.json',content)
    ctx.body = {
        status: 0,
        message: '更新成功！',
        info: content
    }
}

//删除用户的接口
exports.delUser = (ctx,next) =>{
    const userInfo = ctx.request.body
    const local = JSON.parse(fs.readFileSync('../data/list.json'))
    let flag = false
    for(let i=0; i<local.length; i++){
        if(local[i].id === userInfo.id){
            local.splice(i,1)
            flag = true
        }
    }
    if(!flag){
        return ctx.app.emit("error",new Error("未找到该用户!"))
    }
    const content = JSON.stringify(local)
    fs.writeFileSync('../data/list.json',content)
    ctx.body = {
        status: 0,
        message: '删除成功！',
        info: content
    }
}