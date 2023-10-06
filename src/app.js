const exp = require('express')
require('dotenv').config()

const Routes = require('./src/routes')
const Serve = require('./src/serve')
require('./src/modules/bot/main')

const app = exp()

Routes(app, __dirname)
Serve(app)
