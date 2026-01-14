-- Clear existing data
DELETE FROM projects;

-- Sample portfolio projects with images and YouTube URLs
INSERT INTO projects (
  id,
  title_ko, title_en, title_zh,
  description_ko, description_en, description_zh,
  thumbnail_image,
  detail_images,
  youtube_urls,
  tech_stack,
  dev_scope_ko, dev_scope_en, dev_scope_zh,
  is_published, display_order
) VALUES 
(
  1,
  'AI 기반 헬스케어 플랫폼',
  'AI-powered Healthcare Platform',
  '基于AI的医疗健康平台',
  '의료 데이터를 분석하여 맞춤형 건강 관리 솔루션을 제공하는 AI 플랫폼입니다.',
  'An AI platform that analyzes medical data to provide personalized health management solutions.',
  '分析医疗数据以提供个性化健康管理解决方案的AI平台。',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
  '["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800", "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800"]',
  '["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "https://www.youtube.com/watch?v=9bZkp7q19f0"]',
  'React, Node.js, TensorFlow, PostgreSQL, AWS',
  '프론트엔드 및 백엔드 개발, AI 모델 개발',
  'Frontend and backend development, AI model development',
  '前端和后端开发、AI模型开发',
  1, 1
),
(
  2,
  '글로벌 이커머스 플랫폼',
  'Global E-commerce Platform',
  '全球电子商务平台',
  '다국어 및 다통화를 지원하는 글로벌 이커머스 플랫폼입니다.',
  'A global e-commerce platform supporting multiple languages and currencies.',
  '支持多语言和多货币的全球电子商务平台。',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
  '["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800"]',
  '["https://www.youtube.com/watch?v=ScMzIvxBSi4"]',
  'Next.js, TypeScript, Stripe, MongoDB, Vercel',
  '풀스택 개발, 결제 시스템 통합',
  'Full-stack development, payment system integration',
  '全栈开发、支付系统集成',
  1, 2
),
(
  4,
  '바이낸스 업비트 빗썸 코인원 "코인 자동 매매 프로그램 "',
  'Cryptocurrency Auto Trading Program',
  '加密货币自动交易程序',
  '바이낸스, 업비트, 빗썸, 코인원 등 주요 거래소를 지원하는 자동 매매 프로그램입니다.',
  'An automated trading program supporting major exchanges like Binance, Upbit, Bithumb, and Coinone.',
  '支持币安、Upbit、Bithumb和Coinone等主要交易所的自动交易程序。',
  'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800',
  '["https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800", "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800"]',
  '["https://www.youtube.com/watch?v=kJQP7kiw5Fk", "https://www.youtube.com/watch?v=2Bjy5YQ5xPc"]',
  'Python, FastAPI, WebSocket, Redis, Docker',
  '트레이딩 봇 개발, 실시간 데이터 처리',
  'Trading bot development, real-time data processing',
  '交易机器人开发、实时数据处理',
  1, 3
);
