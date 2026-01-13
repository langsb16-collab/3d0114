-- Portfolio projects table
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- Titles (multi-language)
  title_ko TEXT NOT NULL,
  title_en TEXT,
  title_zh TEXT,
  
  -- Descriptions (multi-language)
  description_ko TEXT NOT NULL,
  description_en TEXT,
  description_zh TEXT,
  
  -- Images
  thumbnail_image TEXT, -- R2 URL for thumbnail
  detail_image_1 TEXT,  -- R2 URL
  detail_image_2 TEXT,  -- R2 URL
  detail_image_3 TEXT,  -- R2 URL
  detail_image_4 TEXT,  -- R2 URL
  
  -- YouTube videos
  youtube_url_1 TEXT,
  youtube_url_2 TEXT,
  youtube_url_3 TEXT,
  
  -- Technology stack (comma-separated)
  tech_stack TEXT,
  
  -- Development scope (multi-language)
  dev_scope_ko TEXT,
  dev_scope_en TEXT,
  dev_scope_zh TEXT,
  
  -- Status
  is_published BOOLEAN DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(display_order DESC);
CREATE INDEX IF NOT EXISTS idx_projects_created ON projects(created_at DESC);
