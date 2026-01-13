import type { Context } from 'hono';

// Read HTML files from dist directory
const htmlFiles: Record<string, string> = {};

export async function serveHTML(c: Context, filename: string) {
  try {
    // In Cloudflare Pages, static files are served automatically
    // This is mainly for local development with wrangler
    const path = filename === '/' ? 'index.html' : filename.replace(/^\//, '');
    
    // Try to read from dist directory
    // Note: In production (Cloudflare Pages), files are served directly
    // This handler will be bypassed by Cloudflare's CDN
    
    return c.notFound();
  } catch (error) {
    return c.notFound();
  }
}
