function validateSchemaJoi(method, schema) {
    async function validateSchema (ctx, next) {
      let data = undefined;
      if (method === 'get') {
        data = ctx.request.query;
      } else {
        data = ctx.request.body;
      }
      const { value, error } = schema.validate(data);
      if (error) {
        console.log(error.message)
        ctx.body = {
          status: 1,
          message: '存在不符合规范的输入！',
          info: error.message
        };
      } else {
        next();
      }
    }
    return validateSchema;
  }
  
module.exports = validateSchemaJoi;
  
