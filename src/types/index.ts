// TypeScript types for the application

export type Bindings = {
  DB: D1Database;
  PORTFOLIO_IMAGES: R2Bucket;
};

export type Language = 'ko' | 'en' | 'zh';

export interface Project {
  id: number;
  
  // Titles
  title_ko: string;
  title_en: string | null;
  title_zh: string | null;
  
  // Descriptions
  description_ko: string;
  description_en: string | null;
  description_zh: string | null;
  
  // Images
  thumbnail_image: string | null;
  detail_image_1: string | null;
  detail_image_2: string | null;
  detail_image_3: string | null;
  detail_image_4: string | null;
  
  // YouTube videos
  youtube_url_1: string | null;
  youtube_url_2: string | null;
  youtube_url_3: string | null;
  
  // Technology stack
  tech_stack: string | null;
  
  // Development scope
  dev_scope_ko: string | null;
  dev_scope_en: string | null;
  dev_scope_zh: string | null;
  
  // Status
  is_published: boolean;
  display_order: number;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface ProjectInput {
  title_ko: string;
  title_en?: string;
  title_zh?: string;
  description_ko: string;
  description_en?: string;
  description_zh?: string;
  tech_stack?: string;
  dev_scope_ko?: string;
  dev_scope_en?: string;
  dev_scope_zh?: string;
  is_published?: boolean;
  display_order?: number;
}

export interface LocalizedProject {
  id: number;
  title: string;
  description: string;
  thumbnail_image: string | null;
  detail_images: string[];
  youtube_urls: string[];
  tech_stack: string[];
  dev_scope: string | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
