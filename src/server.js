const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-body')
const render = require('koa-ejs')
const mongoose = require('mongoose')

const clientController = require('./controllers/client.controller')

mongoose.connect('mongodb://localhost:27017/miasystem')
  .then(m => console.log('mongodb connected'))

const app = new Koa()
render(app, {
  root: path.join(__dirname, 'view'),
  async: true
})

app.use(bodyParser())
app.use(clientController.routes())

app.on('error', (err, ctx) => {
  console.log(err.expose)
  ctx.body = {
    message: err
  }
})

const Host = 'localhost'
const Port = process.env.PORT || 5757
app.listen(Port, Host, () => console.log(`client is starting at port ${Port}`))
