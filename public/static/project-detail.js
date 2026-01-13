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
    const { project } = response.data;
    
    loading.style.display = 'none';
    
    // Extract YouTube video IDs
    const youtubeEmbeds = project.youtube_urls.map(url => {
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
      <h1 class="text-4xl md:text-5xl font-bold mb-6">${project.title}</h1>
      
      <div class="glass-effect p-8 rounded-xl mb-8">
        <h2 class="text-2xl font-bold mb-4" data-i18n="project.description">Project Description</h2>
        <p class="text-gray-300 leading-relaxed whitespace-pre-line">${project.description}</p>
      </div>
      
      ${project.tech_stack.length > 0 ? `
        <div class="glass-effect p-8 rounded-xl mb-8">
          <h2 class="text-2xl font-bold mb-4" data-i18n="project.techStack">Technology Stack</h2>
          <div>
            ${project.tech_stack.map(tech => `
              <span class="tech-tag">${tech}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      ${project.dev_scope ? `
        <div class="glass-effect p-8 rounded-xl mb-8">
          <h2 class="text-2xl font-bold mb-4" data-i18n="project.devScope">Development Scope</h2>
          <p class="text-gray-300 leading-relaxed whitespace-pre-line">${project.dev_scope}</p>
        </div>
      ` : ''}
      
      ${project.detail_images.length > 0 ? `
        <div class="glass-effect p-8 rounded-xl mb-8">
          <h2 class="text-2xl font-bold mb-4" data-i18n="project.gallery">Image Gallery</h2>
          <div class="image-gallery">
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
          <h2 class="text-2xl font-bold mb-4" data-i18n="project.videos">Project Videos</h2>
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
