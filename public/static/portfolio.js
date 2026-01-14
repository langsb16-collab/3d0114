// Portfolio list functionality
async function loadPortfolio() {
  const lang = window.i18n.getCurrentLanguage();
  const loading = document.getElementById('loading');
  const grid = document.getElementById('portfolio-grid');
  const noProjects = document.getElementById('no-projects');
  
  try {
    const response = await axios.get(`/api/portfolio?lang=${lang}`);
    const { projects } = response.data;
    
    loading.style.display = 'none';
    
    if (projects.length === 0) {
      noProjects.classList.remove('hidden');
      return;
    }
    
    grid.innerHTML = projects.map(project => {
      // Get first available image
      const firstImage = project.detail_images[0] || 'https://via.placeholder.com/400x300?text=No+Image';
      
      // Get YouTube thumbnail if available
      const youtubeThumb = project.youtube_urls[0] ? getYouTubeThumbnail(project.youtube_urls[0]) : null;
      
      return `
        <div class="glass-effect rounded-xl overflow-hidden card-hover">
          <div class="aspect-video overflow-hidden">
            <img src="${youtubeThumb || firstImage}" 
                 alt="${project.title}" 
                 class="w-full h-full object-cover"
                 onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
          </div>
          <div class="p-6">
            <h3 class="text-2xl font-bold mb-3">${project.title}</h3>
            
            ${project.detail_images.length > 0 || project.youtube_urls.length > 0 ? `
              <div class="flex items-center gap-3 mb-4 text-sm text-gray-400">
                ${project.detail_images.length > 0 ? `
                  <span><i class="fas fa-image mr-1"></i>${project.detail_images.length} 사진</span>
                ` : ''}
                ${project.youtube_urls.length > 0 ? `
                  <span><i class="fas fa-video mr-1"></i>${project.youtube_urls.length} 영상</span>
                ` : ''}
              </div>
            ` : ''}
            
            <a href="/project-detail.html?id=${project.id}" 
               class="inline-flex items-center text-blue-400 hover:text-blue-300 transition">
              <span data-i18n="portfolio.viewDetails">View Details</span>
              <i class="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      `;
    }).join('');
    
    // Update i18n after content is loaded
    window.i18n.updatePageTranslations();
    
  } catch (error) {
    console.error('Error loading portfolio:', error);
    loading.innerHTML = `
      <i class="fas fa-exclamation-triangle text-4xl text-red-500"></i>
      <p class="mt-4 text-red-400">Failed to load projects. Please try again later.</p>
    `;
  }
}

// Extract YouTube thumbnail
function getYouTubeThumbnail(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
  }
  return null;
}

// Make loadContent available globally for language switching
window.loadContent = loadPortfolio;

// Load portfolio on page load
document.addEventListener('DOMContentLoaded', loadPortfolio);
