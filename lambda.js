const awsServerlessExpress = require('aws-serverless-express')
const app = require('./build/infraestructure/app')
const server = awsServerlessExpress.createServer(app)
exports.handler.app = (event, context) => awsServerlessExpress.proxy(server, event, context)
