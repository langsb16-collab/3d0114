import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Bindings } from './types';
import portfolio from './routes/portfolio';
import images from './routes/images';

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for API routes
app.use('/api/*', cors());

// API routes
app.route('/api/portfolio', portfolio);
app.route('/api/images', images);

// Language switcher
app.get('/api/set-lang/:lang', (c) => {
  const lang = c.req.param('lang');
  if (!['ko', 'en', 'zh'].includes(lang)) {
    return c.json({ error: 'Invalid language' }, 400);
  }

  c.header('Set-Cookie', `lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`);
  return c.json({ success: true, lang });
});

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
