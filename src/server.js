const path = require('path')
const Koa = require('koa')
const render = require('koa-ejs')

const app = new Koa()
render(app, {
  root: path.join(__dirname, 'view'),
  async: true
})

app.use((ctx) => {
  ctx.body = ctx.req.url
})

const Host = 'localhost'
const Port = 3001
app.listen(Port, Host, () => console.log('client is starting'))

/*

https: //expat-ins.com/#id_token=eyJ...Lx_&expires_in=3600
  &
  token_type = Bearer &
  session_state = efab0776b4d1c3312cb924414590853eb27656ad78eb2c7cbdd0440f885437c4

  */
