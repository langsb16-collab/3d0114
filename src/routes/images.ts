import { Hono } from 'hono';
import type { Bindings } from '../types';
import { generateImageFilename, isValidImageType } from '../utils/helpers';

const images = new Hono<{ Bindings: Bindings }>();

/**
 * Upload image to R2 storage
 * POST /api/images
 */
images.post('/', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return c.json({ error: 'No image file provided' }, 400);
    }

    // Validate file type
    if (!isValidImageType(file.type)) {
      return c.json({ error: 'Invalid image type. Only JPEG, PNG, GIF, and WebP are allowed' }, 400);
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return c.json({ error: 'File size exceeds 10MB limit' }, 400);
    }

    // Generate unique filename
    const filename = generateImageFilename(file.name);

    // Upload to R2
    const arrayBuffer = await file.arrayBuffer();
    await c.env.PORTFOLIO_IMAGES.put(filename, arrayBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    // Return the filename (will be used to construct URL)
    return c.json({
      success: true,
      filename,
      url: `/api/images/${filename}`,
    });
  } catch (error) {
    console.error('Image upload error:', error);
    return c.json({ error: 'Failed to upload image' }, 500);
  }
});

/**
 * Get image from R2 storage
 * GET /api/images/:filename
 */
images.get('/:filename', async (c) => {
  try {
    const filename = c.req.param('filename');
    const object = await c.env.PORTFOLIO_IMAGES.get(filename);

    if (!object) {
      return c.notFound();
    }

    return new Response(object.body, {
      headers: {
        'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Image retrieval error:', error);
    return c.json({ error: 'Failed to retrieve image' }, 500);
  }
});

/**
 * Delete image from R2 storage
 * DELETE /api/images/:filename
 */
images.delete('/:filename', async (c) => {
  try {
    const filename = c.req.param('filename');
    await c.env.PORTFOLIO_IMAGES.delete(filename);

    return c.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Image deletion error:', error);
    return c.json({ error: 'Failed to delete image' }, 500);
  }
});

export default images;
