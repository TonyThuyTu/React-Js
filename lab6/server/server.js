const jsonServer = require('json-server')
const auth = require('json-server-auth')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// /!\ Must be a middleware to set router.db
server.db = router.db

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(auth)
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
})