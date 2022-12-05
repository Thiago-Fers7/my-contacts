module.exports = (req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3010',
  ]

  const origin = req.header('Origin')
  const isAllowed = allowedOrigins.includes(origin)

  if (isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*'); // Or 'POST, GET, DELETE...'
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Max-Age', '10');
  }

  next();
};
