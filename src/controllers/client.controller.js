const Router = require('koa-router')
const Client = require('../data/client')
const ApplicationError = require('../helpers/applicationError')

const router = new Router({
  prefix: '/api/clients'
})

async function getAll (ctx, next) {
  try {
    const {
      kind,
      role,
      name,
      pick = ['name']
    } = ctx.query

    let query = Client.find()

    if (kind) {
      query = query.find({
        kind: kind
      })
    }

    if (role) {
      let roles = Array.isArray(role) ? [...role] : [role]
      query = query.find({
        roles: {
          $in: roles
        }
      })
    }
    if (name) {
      const regExp = new RegExp(`${name}`, 'ig')

      query = query.find({
        $or: [{
          name: regExp
        },
        {
          names: regExp
        }
        ]
      })
    }

    let picks = Array.isArray(pick) ? pick : [pick]
    picks = picks.includes('name') ? picks : ['name', ...picks]
    query.select(picks.join(' '))

    const clients = await query.exec()
    ctx.body = clients
  } catch (error) {
    ctx.throw(500)
  }
}

async function Add (ctx, next) {
  try {
    await (new Client(ctx.request.body)).save()
    ctx.status = 201
  } catch (error) {
    const err = new ApplicationError('something goes wrong', 'client.controller', 64, error)
    err.status = 400
    err.expose = true
    throw err
  }
}

router.get('/', getAll)

router.post('/', Add)

module.exports = router
