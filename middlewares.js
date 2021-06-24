function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

const proxy = require('http-proxy-middleware');

function proxySet (app) {
    app.use(
        proxy('/api', {
            target: 'http://localhost:3001/'
        })
    );
}

module.exports = {
  notFound,
  errorHandler,
  proxySet
};
