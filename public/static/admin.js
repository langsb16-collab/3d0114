// Admin page functionality - Simplified version
let currentEditingId = null;
let uploadedImages = {
  image1: null,
  image2: null
};

async function loadAllProjects() {
  try {
    const response = await axios.get('/api/portfolio/admin/all');
    const { projects } = response.data;
    
    const tbody = document.getElementById('projects-tbody');
    tbody.innerHTML = projects.map(project => `
      <tr class="border-b border-gray-700">
        <td class="px-4 py-3">${project.id}</td>
        <td class="px-4 py-3">${project.title_ko}</td>
        <td class="px-4 py-3">
          <span class="px-2 py-1 rounded ${project.is_published ? 'bg-green-600' : 'bg-red-600'}">
            ${project.is_published ? '공개' : '비공개'}
          </span>
        </td>
        <td class="px-4 py-3">${project.display_order}</td>
        <td class="px-4 py-3">
          <button onclick="editProject(${project.id})" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded mr-2">
            <i class="fas fa-edit"></i>
          </button>
          <button onclick="deleteProject(${project.id})" class="px-3 py-1 bg-red-600 hover:bg-red-700 rounded">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading projects:', error);
    alert('프로젝트 로딩 실패');
  }
}

async function editProject(id) {
  try {
    const response = await axios.get(`/api/portfolio/admin/all`);
    const project = response.data.projects.find(p => p.id === id);
    
    if (!project) {
      alert('프로젝트를 찾을 수 없습니다');
      return;
    }
    
    currentEditingId = id;
    
    // Fill form with project data
    document.getElementById('title-ko').value = project.title_ko || '';
    document.getElementById('title-en').value = project.title_en || '';
    document.getElementById('title-zh').value = project.title_zh || '';
    document.getElementById('youtube-1').value = project.youtube_url_1 || '';
    document.getElementById('youtube-2').value = project.youtube_url_2 || '';
    document.getElementById('youtube-3').value = project.youtube_url_3 || '';
    document.getElementById('is-published').checked = Boolean(project.is_published);
    document.getElementById('display-order').value = project.display_order || 0;
    
    // Store existing image URLs
    uploadedImages.image1 = project.detail_image_1;
    uploadedImages.image2 = project.detail_image_2;
    
    // Show form
    document.getElementById('form-section').classList.remove('hidden');
    document.getElementById('form-title').textContent = '프로젝트 수정';
    window.scrollTo(0, 0);
  } catch (error) {
    console.error('Error editing project:', error);
    alert('프로젝트 로딩 실패');
  }
}

async function deleteProject(id) {
  if (!confirm('정말 삭제하시겠습니까?')) return;
  
  try {
    await axios.delete(`/api/portfolio/${id}`);
    alert('삭제되었습니다');
    loadAllProjects();
  } catch (error) {
    console.error('Error deleting project:', error);
    alert('삭제 실패');
  }
}

async function uploadImage(file, type) {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await axios.post('/api/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    uploadedImages[type] = response.data.url;
    return response.data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

async function saveProject(event) {
  event.preventDefault();
  
  const projectData = {
    title_ko: document.getElementById('title-ko').value,
    title_en: document.getElementById('title-en').value,
    title_zh: document.getElementById('title-zh').value,
    description_ko: document.getElementById('title-ko').value, // Use title as description
    description_en: document.getElementById('title-en').value,
    description_zh: document.getElementById('title-zh').value,
    detail_image_1: uploadedImages.image1,
    detail_image_2: uploadedImages.image2,
    youtube_url_1: document.getElementById('youtube-1').value,
    youtube_url_2: document.getElementById('youtube-2').value,
    youtube_url_3: document.getElementById('youtube-3').value,
    is_published: document.getElementById('is-published').checked,
    display_order: parseInt(document.getElementById('display-order').value) || 0
  };
  
  try {
    if (currentEditingId) {
      await axios.put(`/api/portfolio/${currentEditingId}`, projectData);
      alert('수정되었습니다');
    } else {
      await axios.post('/api/portfolio', projectData);
      alert('생성되었습니다');
    }
    
    cancelEdit();
    loadAllProjects();
  } catch (error) {
    console.error('Error saving project:', error);
    alert('저장 실패: ' + (error.response?.data?.error || error.message));
  }
}

function cancelEdit() {
  currentEditingId = null;
  uploadedImages = {
    image1: null,
    image2: null
  };
  document.getElementById('project-form').reset();
  document.getElementById('form-section').classList.add('hidden');
}

function showNewProjectForm() {
  cancelEdit();
  document.getElementById('form-section').classList.remove('hidden');
  document.getElementById('form-title').textContent = '새 프로젝트 생성';
  window.scrollTo(0, 0);
}

// Setup image upload handlers
document.addEventListener('DOMContentLoaded', function() {
  loadAllProjects();
  
  // Image upload handlers (2장만)
  const imageInputs = ['image1', 'image2'];
  imageInputs.forEach(type => {
    const input = document.getElementById(`${type}-upload`);
    if (input) {
      input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
          try {
            const url = await uploadImage(file, type);
            alert(`이미지 업로드 완료: ${url}`);
          } catch (error) {
            alert('이미지 업로드 실패');
          }
        }
      });
    }
  });
  
  // Form submit handler
  document.getElementById('project-form').addEventListener('submit', saveProject);
});

// Expose functions globally
window.editProject = editProject;
window.deleteProject = deleteProject;
window.showNewProjectForm = showNewProjectForm;
window.cancelEdit = cancelEdit;
