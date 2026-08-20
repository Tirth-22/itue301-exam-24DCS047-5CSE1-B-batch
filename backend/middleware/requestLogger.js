// Global middleware that logs every incoming request.
function requestLogger(request, response, next) {
  console.log(`[${request.method}] ${request.originalUrl} [${new Date().toISOString()}]`)
  next()
}

module.exports = requestLogger
