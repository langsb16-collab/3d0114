import type { Project, LocalizedProject, Language } from '../types';

/**
 * Localize project data based on language
 */
export function localizeProject(project: Project, lang: Language): LocalizedProject {
  const getLocalizedField = (ko: string, en: string | null, zh: string | null): string => {
    if (lang === 'en' && en) return en;
    if (lang === 'zh' && zh) return zh;
    return ko; // Fallback to Korean
  };

  // Parse JSON fields
  const detail_images = project.detail_images
    ? (typeof project.detail_images === 'string'
        ? JSON.parse(project.detail_images)
        : project.detail_images
      ).filter((img: string) => img && img.trim() !== '')
    : [];

  const youtube_urls = project.youtube_urls
    ? (typeof project.youtube_urls === 'string'
        ? JSON.parse(project.youtube_urls)
        : project.youtube_urls
      ).filter((url: string) => url && url.trim() !== '')
    : [];

  const tech_stack = project.tech_stack
    ? project.tech_stack.split(',').map(tech => tech.trim())
    : [];

  return {
    id: project.id,
    title: getLocalizedField(project.title_ko, project.title_en, project.title_zh),
    description: getLocalizedField(
      project.description_ko,
      project.description_en,
      project.description_zh
    ),
    thumbnail_image: project.thumbnail_image,
    detail_images,
    youtube_urls,
    tech_stack,
    dev_scope: getLocalizedField(
      project.dev_scope_ko || '',
      project.dev_scope_en,
      project.dev_scope_zh
    ) || null,
    is_published: Boolean(project.is_published),
    display_order: project.display_order,
    created_at: project.created_at,
    updated_at: project.updated_at,
  };
}

/**
 * Extract YouTube video ID from URL
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  
  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  return null;
}

/**
 * Generate unique filename for R2 storage
 */
export function generateImageFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop() || 'jpg';
  return `${timestamp}-${random}.${extension}`;
}

/**
 * Validate image file type
 */
export function isValidImageType(contentType: string): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(contentType);
}

/**
 * Get language from cookie or default to 'ko'
 */
export function getLanguage(cookieHeader: string | null): Language {
  if (!cookieHeader) return 'ko';
  
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  const lang = cookies['lang'];
  if (lang === 'en' || lang === 'zh') return lang;
  return 'ko';
}
