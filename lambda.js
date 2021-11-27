const serverless = require('serverless-http')
const app = require('./build/infraestructure/app')
exports.handler = serverless(app.default);
