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
      const thumbnailUrl = project.thumbnail_image || 'https://via.placeholder.com/400x300?text=No+Image';
      
      return `
        <div class="glass-effect rounded-xl overflow-hidden card-hover">
          <div class="aspect-video overflow-hidden">
            <img src="${thumbnailUrl}" 
                 alt="${project.title}" 
                 class="w-full h-full object-cover"
                 onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
          </div>
          <div class="p-6">
            <h3 class="text-2xl font-bold mb-3">${project.title}</h3>
            <p class="text-gray-300 mb-4 line-clamp-3">${project.description}</p>
            
            ${project.tech_stack.length > 0 ? `
              <div class="mb-4">
                ${project.tech_stack.map(tech => `
                  <span class="tech-tag">${tech}</span>
                `).join('')}
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

// Make loadContent available globally for language switching
window.loadContent = loadPortfolio;

// Load portfolio on page load
document.addEventListener('DOMContentLoaded', loadPortfolio);
