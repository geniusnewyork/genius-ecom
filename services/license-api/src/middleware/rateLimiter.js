// MONTY GENIUS LICENSE API — Memory Rate Limiter

const requestCounts = new Map(); // ip_endpoint -> { count, resetTime }

export function rateLimit(limit = 60, windowMs = 60000) {
  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const key = `${ip}_${req.url}`;
    const now = Date.now();

    const record = requestCounts.get(key);

    if (!record || now > record.resetTime) {
      requestCounts.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (record.count >= limit) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          success: false,
          error: {
            code: 'RATE_LIMITED',
            message: 'Too many requests. Please wait a minute and retry.',
          },
        })
      );
      return;
    }

    record.count++;
    next();
  };
}
