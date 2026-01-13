import { Hono } from 'hono';
import type { Bindings, Project, ProjectInput, Language } from '../types';
import { localizeProject, getLanguage } from '../utils/helpers';

const portfolio = new Hono<{ Bindings: Bindings }>();

/**
 * Get all published projects
 * GET /api/portfolio?lang=ko|en|zh
 */
portfolio.get('/', async (c) => {
  try {
    const langParam = c.req.query('lang') as Language | undefined;
    const lang = langParam || getLanguage(c.req.header('cookie'));

    const { results } = await c.env.DB.prepare(`
      SELECT * FROM projects 
      WHERE is_published = 1 
      ORDER BY display_order DESC, created_at DESC
    `).all<Project>();

    const localizedProjects = results.map(project => localizeProject(project, lang));

    return c.json({ projects: localizedProjects, lang });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return c.json({ error: 'Failed to fetch projects' }, 500);
  }
});

/**
 * Get single project by ID
 * GET /api/portfolio/:id?lang=ko|en|zh
 */
portfolio.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const langParam = c.req.query('lang') as Language | undefined;
    const lang = langParam || getLanguage(c.req.header('cookie'));

    if (isNaN(id)) {
      return c.json({ error: 'Invalid project ID' }, 400);
    }

    const result = await c.env.DB.prepare(`
      SELECT * FROM projects WHERE id = ? AND is_published = 1
    `).bind(id).first<Project>();

    if (!result) {
      return c.notFound();
    }

    const localizedProject = localizeProject(result, lang);

    return c.json({ project: localizedProject, lang });
  } catch (error) {
    console.error('Error fetching project:', error);
    return c.json({ error: 'Failed to fetch project' }, 500);
  }
});

/**
 * Create new project (Admin)
 * POST /api/portfolio
 */
portfolio.post('/', async (c) => {
  try {
    const body = await c.req.json<ProjectInput>();

    // Validate required fields
    if (!body.title_ko || !body.description_ko) {
      return c.json({ error: 'title_ko and description_ko are required' }, 400);
    }

    const result = await c.env.DB.prepare(`
      INSERT INTO projects (
        title_ko, title_en, title_zh,
        description_ko, description_en, description_zh,
        tech_stack, dev_scope_ko, dev_scope_en, dev_scope_zh,
        is_published, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      body.title_ko,
      body.title_en || null,
      body.title_zh || null,
      body.description_ko,
      body.description_en || null,
      body.description_zh || null,
      body.tech_stack || null,
      body.dev_scope_ko || null,
      body.dev_scope_en || null,
      body.dev_scope_zh || null,
      body.is_published !== undefined ? (body.is_published ? 1 : 0) : 1,
      body.display_order || 0
    ).run();

    return c.json({
      success: true,
      id: result.meta.last_row_id,
      message: 'Project created successfully'
    }, 201);
  } catch (error) {
    console.error('Error creating project:', error);
    return c.json({ error: 'Failed to create project' }, 500);
  }
});

/**
 * Update project (Admin)
 * PUT /api/portfolio/:id
 */
portfolio.put('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json<Partial<Project>>();

    if (isNaN(id)) {
      return c.json({ error: 'Invalid project ID' }, 400);
    }

    // Build dynamic update query
    const updates: string[] = [];
    const bindings: any[] = [];

    const fields = [
      'title_ko', 'title_en', 'title_zh',
      'description_ko', 'description_en', 'description_zh',
      'thumbnail_image', 'detail_image_1', 'detail_image_2', 'detail_image_3', 'detail_image_4',
      'youtube_url_1', 'youtube_url_2', 'youtube_url_3',
      'tech_stack', 'dev_scope_ko', 'dev_scope_en', 'dev_scope_zh',
      'is_published', 'display_order'
    ];

    for (const field of fields) {
      if (field in body) {
        updates.push(`${field} = ?`);
        bindings.push((body as any)[field]);
      }
    }

    if (updates.length === 0) {
      return c.json({ error: 'No fields to update' }, 400);
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    bindings.push(id);

    await c.env.DB.prepare(`
      UPDATE projects SET ${updates.join(', ')} WHERE id = ?
    `).bind(...bindings).run();

    return c.json({
      success: true,
      message: 'Project updated successfully'
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return c.json({ error: 'Failed to update project' }, 500);
  }
});

/**
 * Delete project (Admin)
 * DELETE /api/portfolio/:id
 */
portfolio.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));

    if (isNaN(id)) {
      return c.json({ error: 'Invalid project ID' }, 400);
    }

    await c.env.DB.prepare(`
      DELETE FROM projects WHERE id = ?
    `).bind(id).run();

    return c.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return c.json({ error: 'Failed to delete project' }, 500);
  }
});

/**
 * Get all projects including unpublished (Admin)
 * GET /api/portfolio/admin/all
 */
portfolio.get('/admin/all', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM projects 
      ORDER BY display_order DESC, created_at DESC
    `).all<Project>();

    return c.json({ projects: results });
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return c.json({ error: 'Failed to fetch projects' }, 500);
  }
});

export default portfolio;
