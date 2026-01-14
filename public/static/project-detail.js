// Project detail functionality
async function loadProjectDetail() {
  const lang = window.i18n.getCurrentLanguage();
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  
  const loading = document.getElementById('loading');
  const content = document.getElementById('project-content');
  const notFound = document.getElementById('not-found');
  
  if (!projectId) {
    loading.style.display = 'none';
    notFound.classList.remove('hidden');
    return;
  }
  
  try {
    const response = await axios.get(`/api/portfolio/${projectId}?lang=${lang}`);
    
    // Check if response is valid and has project data
    if (!response.data || !response.data.project) {
      console.error('No project data in response:', response.data);
      loading.style.display = 'none';
      notFound.classList.remove('hidden');
      return;
    }
    
    const { project } = response.data;
    
    loading.style.display = 'none';
    
    // Extract YouTube video IDs
    const youtubeEmbeds = (project.youtube_urls || []).map(url => {
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
    }).filter(url => url !== null);
    
    content.innerHTML = `
      <h1 class="text-4xl md:text-5xl font-bold mb-8">${project.title || '제목 없음'}</h1>
      
      ${(project.detail_images && project.detail_images.length > 0) ? `
        <div class="glass-effect p-8 rounded-xl mb-8">
          <h2 class="text-2xl font-bold mb-4">📷 프로젝트 이미지</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${project.detail_images.map(img => `
              <div class="rounded-lg overflow-hidden">
                <img src="${img}" 
                     alt="${project.title}" 
                     class="w-full h-full object-cover"
                     onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'">
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      ${youtubeEmbeds.length > 0 ? `
        <div class="glass-effect p-8 rounded-xl mb-8">
          <h2 class="text-2xl font-bold mb-4">🎥 프로젝트 영상</h2>
          <div class="space-y-6">
            ${youtubeEmbeds.map(embedUrl => `
              <div class="youtube-embed">
                <iframe src="${embedUrl}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                </iframe>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
    
    // Update i18n after content is loaded
    window.i18n.updatePageTranslations();
    
  } catch (error) {
    console.error('Error loading project:', error);
    loading.style.display = 'none';
    notFound.classList.remove('hidden');
  }
}

// Make loadContent available globally for language switching
window.loadContent = loadProjectDetail;

// Load project detail on page load
document.addEventListener('DOMContentLoaded', loadProjectDetail);
