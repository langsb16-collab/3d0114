-- Sample portfolio projects
INSERT OR IGNORE INTO projects (
  title_ko, title_en, title_zh,
  description_ko, description_en, description_zh,
  tech_stack,
  dev_scope_ko, dev_scope_en, dev_scope_zh,
  is_published, display_order
) VALUES 
(
  'AI 기반 헬스케어 플랫폼',
  'AI-powered Healthcare Platform',
  '基于AI的医疗健康平台',
  '의료 데이터를 분석하여 맞춤형 건강 관리 솔루션을 제공하는 AI 플랫폼입니다. 환자 데이터 분석, 질병 예측, 개인화된 치료 계획 수립 등의 기능을 제공합니다.',
  'An AI platform that analyzes medical data to provide personalized health management solutions. Features include patient data analysis, disease prediction, and personalized treatment planning.',
  '分析医疗数据以提供个性化健康管理解决方案的AI平台。功能包括患者数据分析、疾病预测和个性化治疗计划。',
  'React, Node.js, TensorFlow, PostgreSQL, AWS',
  '프론트엔드 및 백엔드 개발, AI 모델 개발, 클라우드 인프라 구축',
  'Frontend and backend development, AI model development, cloud infrastructure setup',
  '前端和后端开发、AI模型开发、云基础设施搭建',
  1, 1
),
(
  '글로벌 이커머스 플랫폼',
  'Global E-commerce Platform',
  '全球电子商务平台',
  '다국어 및 다통화를 지원하는 글로벌 이커머스 플랫폼입니다. 실시간 재고 관리, 결제 시스템 통합, 물류 추적 등의 기능을 제공합니다.',
  'A global e-commerce platform supporting multiple languages and currencies. Features include real-time inventory management, payment system integration, and logistics tracking.',
  '支持多语言和多货币的全球电子商务平台。功能包括实时库存管理、支付系统集成和物流跟踪。',
  'Next.js, TypeScript, Stripe, MongoDB, Vercel',
  '풀스택 개발, 결제 시스템 통합, DevOps',
  'Full-stack development, payment system integration, DevOps',
  '全栈开发、支付系统集成、DevOps',
  1, 2
),
(
  '스마트 팩토리 IoT 솔루션',
  'Smart Factory IoT Solution',
  '智能工厂IoT解决方案',
  '제조 공정을 실시간으로 모니터링하고 최적화하는 IoT 기반 스마트 팩토리 솔루션입니다. 센서 데이터 수집, 예측 유지보수, 생산성 분석 등의 기능을 제공합니다.',
  'An IoT-based smart factory solution that monitors and optimizes manufacturing processes in real-time. Features include sensor data collection, predictive maintenance, and productivity analysis.',
  '基于IoT的智能工厂解决方案，实时监控和优化制造流程。功能包括传感器数据采集、预测性维护和生产力分析。',
  'Python, MQTT, InfluxDB, Grafana, Docker',
  'IoT 시스템 개발, 데이터 파이프라인 구축, 대시보드 개발',
  'IoT system development, data pipeline construction, dashboard development',
  'IoT系统开发、数据管道搭建、仪表板开发',
  1, 3
);
