-- Add JSON fields for images and YouTube URLs
ALTER TABLE projects ADD COLUMN detail_images TEXT; -- JSON array
ALTER TABLE projects ADD COLUMN youtube_urls TEXT;  -- JSON array

-- Migrate existing data from individual columns to JSON arrays
UPDATE projects SET detail_images = (
  SELECT json_array(
    COALESCE(detail_image_1, ''),
    COALESCE(detail_image_2, ''),
    COALESCE(detail_image_3, ''),
    COALESCE(detail_image_4, '')
  )
  WHERE detail_image_1 IS NOT NULL OR detail_image_2 IS NOT NULL 
     OR detail_image_3 IS NOT NULL OR detail_image_4 IS NOT NULL
);

UPDATE projects SET youtube_urls = (
  SELECT json_array(
    COALESCE(youtube_url_1, ''),
    COALESCE(youtube_url_2, ''),
    COALESCE(youtube_url_3, '')
  )
  WHERE youtube_url_1 IS NOT NULL OR youtube_url_2 IS NOT NULL OR youtube_url_3 IS NOT NULL
);

-- Drop old individual columns
-- Note: SQLite doesn't support DROP COLUMN directly, so we keep them for backward compatibility
