// ============================================
// 정원 베이커리 카페 - 메인 JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 초기화
    initNavigation();

    // 페이지별 초기화
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    switch (currentPage) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'menu.html':
            initMenuPage();
            break;
        case 'gallery.html':
            initGalleryPage();
            break;
        case 'blog.html':
            initBlogPage();
            break;
        case 'blog-detail.html':
            initBlogDetailPage();
            break;
        case 'about.html':
            initAboutPage();
            break;
        case 'admin.html':
            initAdminPage();
            break;
    }
});

// ============================================
// 네비게이션
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // 스크롤 시 네비게이션 스타일 변경
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // 페이지 로드 시 초기 상태 확인
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        }
    }

    // 모바일 메뉴 토글
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // 메뉴 클릭 시 닫기
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ============================================
// 홈페이지
// ============================================
function initHomePage() {
    loadGalleryPreview();
    loadBlogPreview();
}

function loadGalleryPreview() {
    const container = document.getElementById('galleryPreview');
    if (!container) return;

    const gallery = DataManager.getGallery().slice(0, 4);

    if (gallery.length === 0) {
        container.innerHTML = `
            <div class="gallery-item">
                <div class="image-placeholder"><i class="fas fa-image"></i></div>
            </div>
            <div class="gallery-item">
                <div class="image-placeholder"><i class="fas fa-image"></i></div>
            </div>
            <div class="gallery-item">
                <div class="image-placeholder"><i class="fas fa-image"></i></div>
            </div>
            <div class="gallery-item">
                <div class="image-placeholder"><i class="fas fa-image"></i></div>
            </div>
        `;
        return;
    }

    container.innerHTML = gallery.map(item => `
        <div class="gallery-item" data-id="${item.id}">
            ${item.image
                ? `<img src="${item.image}" alt="${item.title}">`
                : `<div class="image-placeholder"><i class="fas fa-image"></i></div>`
            }
            <div class="gallery-overlay">
                <h4>${item.title}</h4>
            </div>
        </div>
    `).join('');
}

function loadBlogPreview() {
    const container = document.getElementById('blogPreview');
    if (!container) return;

    const blogs = DataManager.getBlogs('published').slice(0, 3);

    if (blogs.length === 0) {
        container.innerHTML = '<p class="text-center">등록된 게시글이 없습니다.</p>';
        return;
    }

    container.innerHTML = blogs.map(blog => `
        <article class="blog-card" onclick="location.href='blog-detail.html?id=${blog.id}'">
            <div class="blog-image">
                ${blog.image
                    ? `<img src="${blog.image}" alt="${blog.title}">`
                    : `<div class="image-placeholder"><i class="fas fa-newspaper"></i></div>`
                }
            </div>
            <div class="blog-content">
                <span class="blog-category">${blog.category}</span>
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <span class="blog-meta">${formatDate(blog.createdAt)}</span>
            </div>
        </article>
    `).join('');
}

// ============================================
// 메뉴 페이지
// ============================================
function initMenuPage() {
    loadMenuItems();
    initMenuFilter();
}

function loadMenuItems(category = 'all') {
    const container = document.getElementById('menuGrid');
    if (!container) return;

    const menus = DataManager.getMenus(category);

    if (menus.length === 0) {
        container.innerHTML = '<p class="text-center">등록된 메뉴가 없습니다.</p>';
        return;
    }

    container.innerHTML = menus.map(menu => `
        <div class="menu-card" data-category="${menu.category}">
            <div class="menu-image">
                ${menu.image
                    ? `<img src="${menu.image}" alt="${menu.name}">`
                    : `<div class="image-placeholder ${menu.category}">
                        <i class="${categoryIcons[menu.category]}"></i>
                       </div>`
                }
                ${menu.badge ? `<span class="menu-badge">${menu.badge}</span>` : ''}
            </div>
            <div class="menu-info">
                <h3>${menu.name}</h3>
                <p>${menu.description}</p>
                <span class="menu-price">${formatPrice(menu.price)}원</span>
            </div>
        </div>
    `).join('');
}

function initMenuFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 활성화 상태 변경
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 메뉴 필터링
            const category = this.dataset.category;
            loadMenuItems(category);
        });
    });
}

// ============================================
// 갤러리 페이지
// ============================================
function initGalleryPage() {
    loadGalleryItems();
    initLightbox();
    initImageUpload();
}

function loadGalleryItems() {
    const container = document.getElementById('galleryGrid');
    if (!container) return;

    const gallery = DataManager.getGallery();

    if (gallery.length === 0) {
        container.innerHTML = '<p class="text-center">등록된 이미지가 없습니다.</p>';
        return;
    }

    container.innerHTML = gallery.map((item, index) => `
        <div class="gallery-item" data-index="${index}" data-id="${item.id}">
            ${item.image
                ? `<img src="${item.image}" alt="${item.title}">`
                : `<div class="image-placeholder"><i class="fas fa-image"></i></div>`
            }
            <div class="gallery-overlay">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');

    // 라이트박스 이벤트 바인딩
    container.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            openLightbox(parseInt(this.dataset.index));
        });
    });
}

let currentLightboxIndex = 0;
let galleryData = [];

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    galleryData = DataManager.getGallery();

    // 닫기 버튼
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

    // 이전/다음 버튼
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));

    // 배경 클릭 시 닫기
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // 키보드 이벤트
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    currentLightboxIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;

    if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryData.length - 1;
    } else if (currentLightboxIndex >= galleryData.length) {
        currentLightboxIndex = 0;
    }

    updateLightboxImage();
}

function updateLightboxImage() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const item = galleryData[currentLightboxIndex];
    const img = lightbox.querySelector('.lightbox-content img');

    if (item.image) {
        img.src = item.image;
        img.alt = item.title;
    } else {
        img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect fill="%23F5EDE4" width="400" height="400"/><text fill="%238B6F5C" font-family="sans-serif" font-size="20" x="50%" y="50%" text-anchor="middle" dy=".3em">' + item.title + '</text></svg>';
        img.alt = item.title;
    }
}

function initImageUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');

    if (!uploadArea || !imageInput) return;

    // 클릭 시 파일 선택
    uploadArea.addEventListener('click', () => imageInput.click());

    // 드래그 앤 드롭
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--color-primary)';
        uploadArea.style.backgroundColor = 'rgba(139, 111, 92, 0.1)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '';
        uploadArea.style.backgroundColor = '';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '';
        uploadArea.style.backgroundColor = '';

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageUpload(files[0]);
        }
    });

    // 파일 선택
    imageInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleImageUpload(e.target.files[0]);
        }
    });
}

function handleImageUpload(file) {
    if (!file.type.startsWith('image/')) {
        showToast('이미지 파일만 업로드 가능합니다.', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const title = prompt('이미지 제목을 입력하세요:', '새 이미지');
        if (!title) return;

        const description = prompt('이미지 설명을 입력하세요:', '');

        DataManager.addGalleryItem({
            title: title,
            description: description || '',
            image: e.target.result
        });

        showToast('이미지가 업로드되었습니다.', 'success');
        loadGalleryItems();
        galleryData = DataManager.getGallery();
    };
    reader.readAsDataURL(file);
}

// ============================================
// 블로그 페이지
// ============================================
function initBlogPage() {
    loadBlogItems();
}

function loadBlogItems() {
    const container = document.getElementById('blogGrid');
    if (!container) return;

    const blogs = DataManager.getBlogs('published');

    if (blogs.length === 0) {
        container.innerHTML = '<p class="text-center">등록된 게시글이 없습니다.</p>';
        return;
    }

    container.innerHTML = blogs.map(blog => `
        <article class="blog-card" onclick="location.href='blog-detail.html?id=${blog.id}'">
            <div class="blog-image">
                ${blog.image
                    ? `<img src="${blog.image}" alt="${blog.title}">`
                    : `<div class="image-placeholder"><i class="fas fa-newspaper"></i></div>`
                }
            </div>
            <div class="blog-content">
                <span class="blog-category">${blog.category}</span>
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <span class="blog-meta">${formatDate(blog.createdAt)}</span>
            </div>
        </article>
    `).join('');
}

// ============================================
// 블로그 상세 페이지
// ============================================
function initBlogDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = parseInt(urlParams.get('id'));

    if (!blogId) {
        window.location.href = 'blog.html';
        return;
    }

    const blog = DataManager.getBlogById(blogId);

    if (!blog) {
        window.location.href = 'blog.html';
        return;
    }

    // 페이지 내용 채우기
    document.getElementById('blogCategory').textContent = blog.category;
    document.getElementById('blogTitle').textContent = blog.title;
    document.getElementById('blogMeta').textContent = `${formatDate(blog.createdAt)} · ${blog.author}`;
    document.getElementById('blogContent').innerHTML = blog.content;

    const imageContainer = document.getElementById('blogImage');
    if (blog.image) {
        imageContainer.innerHTML = `<img src="${blog.image}" alt="${blog.title}">`;
    } else {
        imageContainer.innerHTML = `<div class="image-placeholder"><i class="fas fa-newspaper"></i></div>`;
    }

    // 문서 제목 변경
    document.title = `${blog.title} - 정원 베이커리 카페`;
}

// ============================================
// 소개 페이지
// ============================================
function initAboutPage() {
    // 카페 정보 로드
    const cafeInfo = DataManager.getCafeInfo();
    // 필요시 추가 초기화
}

// ============================================
// 관리자 페이지
// ============================================
function initAdminPage() {
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');

    if (DataManager.isLoggedIn()) {
        showDashboard();
    } else {
        showLogin();
    }

    // 로그인 폼 처리
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (DataManager.login(username, password)) {
                showToast('로그인 되었습니다.', 'success');
                showDashboard();
            } else {
                showToast('아이디 또는 비밀번호가 올바르지 않습니다.', 'error');
            }
        });
    }

    // 로그아웃
    document.querySelectorAll('.logout-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            DataManager.logout();
            showToast('로그아웃 되었습니다.', 'success');
            showLogin();
        });
    });

    // 사이드바 네비게이션
    initAdminNav();
}

function showLogin() {
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');

    if (loginSection) loginSection.classList.remove('hidden');
    if (dashboardSection) dashboardSection.classList.add('hidden');
}

function showDashboard() {
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');

    if (loginSection) loginSection.classList.add('hidden');
    if (dashboardSection) dashboardSection.classList.remove('hidden');

    // 대시보드 초기화
    loadDashboardStats();
    loadAdminMenus();
    loadAdminGallery();
    loadAdminBlogs();
}

function loadDashboardStats() {
    const stats = DataManager.getStats();

    const totalMenusEl = document.getElementById('totalMenus');
    const totalGalleryEl = document.getElementById('totalGallery');
    const totalBlogsEl = document.getElementById('totalBlogs');

    if (totalMenusEl) totalMenusEl.textContent = stats.totalMenus;
    if (totalGalleryEl) totalGalleryEl.textContent = stats.totalGallery;
    if (totalBlogsEl) totalBlogsEl.textContent = stats.totalBlogs;
}

function initAdminNav() {
    const navLinks = document.querySelectorAll('.admin-nav a[data-section]');
    const sections = document.querySelectorAll('.admin-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // 활성화 상태 변경
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // 섹션 표시
            const targetSection = this.dataset.section;
            sections.forEach(section => {
                section.classList.add('hidden');
                if (section.id === targetSection + 'Section') {
                    section.classList.remove('hidden');
                }
            });
        });
    });
}

function loadAdminMenus() {
    const tbody = document.getElementById('menuTableBody');
    if (!tbody) return;

    const menus = DataManager.getData().menus;

    tbody.innerHTML = menus.map(menu => `
        <tr>
            <td>${menu.id}</td>
            <td>${menu.name}</td>
            <td>${categoryNames[menu.category]}</td>
            <td>${formatPrice(menu.price)}원</td>
            <td>
                <span class="status-badge ${menu.isActive ? 'status-published' : 'status-draft'}">
                    ${menu.isActive ? '활성' : '비활성'}
                </span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn-edit" onclick="editMenu(${menu.id})">수정</button>
                    <button class="btn-delete" onclick="deleteMenu(${menu.id})">삭제</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadAdminGallery() {
    const tbody = document.getElementById('galleryTableBody');
    if (!tbody) return;

    const gallery = DataManager.getGallery();

    tbody.innerHTML = gallery.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>
                ${item.image
                    ? `<img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">`
                    : '<span style="color: var(--color-text-muted);">이미지 없음</span>'
                }
            </td>
            <td>${item.title}</td>
            <td>${formatDate(item.createdAt)}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-edit" onclick="editGallery(${item.id})">수정</button>
                    <button class="btn-delete" onclick="deleteGallery(${item.id})">삭제</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadAdminBlogs() {
    const tbody = document.getElementById('blogTableBody');
    if (!tbody) return;

    const blogs = DataManager.getData().blogs;

    tbody.innerHTML = blogs.map(blog => `
        <tr>
            <td>${blog.id}</td>
            <td>${blog.title}</td>
            <td>${blog.category}</td>
            <td>${formatDate(blog.createdAt)}</td>
            <td>
                <span class="status-badge ${blog.status === 'published' ? 'status-published' : 'status-draft'}">
                    ${blog.status === 'published' ? '게시됨' : '임시저장'}
                </span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn-edit" onclick="editBlog(${blog.id})">수정</button>
                    <button class="btn-delete" onclick="deleteBlog(${blog.id})">삭제</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 메뉴 관리 함수
function openMenuModal(menu = null) {
    const modal = document.getElementById('menuModal');
    const form = document.getElementById('menuForm');
    const title = document.getElementById('menuModalTitle');

    if (menu) {
        title.textContent = '메뉴 수정';
        document.getElementById('menuId').value = menu.id;
        document.getElementById('menuName').value = menu.name;
        document.getElementById('menuCategory').value = menu.category;
        document.getElementById('menuPrice').value = menu.price;
        document.getElementById('menuDescription').value = menu.description;
        document.getElementById('menuBadge').value = menu.badge || '';
        document.getElementById('menuActive').checked = menu.isActive;
    } else {
        title.textContent = '새 메뉴 추가';
        form.reset();
        document.getElementById('menuId').value = '';
        document.getElementById('menuActive').checked = true;
    }

    modal.classList.add('active');
}

function closeMenuModal() {
    document.getElementById('menuModal').classList.remove('active');
}

function saveMenu(e) {
    e.preventDefault();

    const id = document.getElementById('menuId').value;
    const imageInput = document.getElementById('menuImage');
    const file = imageInput && imageInput.files[0];

    const processMenu = (imageData) => {
        const menuData = {
            name: document.getElementById('menuName').value,
            category: document.getElementById('menuCategory').value,
            price: parseInt(document.getElementById('menuPrice').value),
            description: document.getElementById('menuDescription').value,
            badge: document.getElementById('menuBadge').value || null,
            isActive: document.getElementById('menuActive').checked,
            image: imageData
        };

        if (id) {
            if (imageData === null) {
                const existing = DataManager.getMenuById(parseInt(id));
                if (existing) menuData.image = existing.image;
            }
            DataManager.updateMenu(parseInt(id), menuData);
            showToast('메뉴가 수정되었습니다.', 'success');
        } else {
            DataManager.addMenu(menuData);
            showToast('메뉴가 추가되었습니다.', 'success');
        }

        closeMenuModal();
        loadAdminMenus();
        loadDashboardStats();
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => processMenu(e.target.result);
        reader.readAsDataURL(file);
    } else {
        processMenu(null);
    }
}

function editMenu(id) {
    const menu = DataManager.getMenuById(id);
    if (menu) {
        openMenuModal(menu);
    }
}

function deleteMenu(id) {
    if (confirm('정말 이 메뉴를 삭제하시겠습니까?')) {
        DataManager.deleteMenu(id);
        showToast('메뉴가 삭제되었습니다.', 'success');
        loadAdminMenus();
        loadDashboardStats();
    }
}

// 갤러리 관리 함수
function openGalleryModal(item = null) {
    const modal = document.getElementById('galleryModal');
    const form = document.getElementById('galleryForm');
    const title = document.getElementById('galleryModalTitle');

    if (item) {
        title.textContent = '이미지 수정';
        document.getElementById('galleryId').value = item.id;
        document.getElementById('galleryTitle').value = item.title;
        document.getElementById('galleryDescription').value = item.description;
    } else {
        title.textContent = '새 이미지 추가';
        form.reset();
        document.getElementById('galleryId').value = '';
    }

    modal.classList.add('active');
}

function closeGalleryModal() {
    document.getElementById('galleryModal').classList.remove('active');
}

function saveGallery(e) {
    e.preventDefault();

    const id = document.getElementById('galleryId').value;
    const imageInput = document.getElementById('galleryImage');
    const file = imageInput.files[0];

    const processGallery = (imageData) => {
        const galleryData = {
            title: document.getElementById('galleryTitle').value,
            description: document.getElementById('galleryDescription').value,
            image: imageData
        };

        if (id) {
            DataManager.updateGalleryItem(parseInt(id), galleryData);
            showToast('이미지가 수정되었습니다.', 'success');
        } else {
            DataManager.addGalleryItem(galleryData);
            showToast('이미지가 추가되었습니다.', 'success');
        }

        closeGalleryModal();
        loadAdminGallery();
        loadDashboardStats();
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => processGallery(e.target.result);
        reader.readAsDataURL(file);
    } else if (id) {
        const existing = DataManager.getGalleryById(parseInt(id));
        processGallery(existing.image);
    } else {
        processGallery(null);
    }
}

function editGallery(id) {
    const item = DataManager.getGalleryById(id);
    if (item) {
        openGalleryModal(item);
    }
}

function deleteGallery(id) {
    if (confirm('정말 이 이미지를 삭제하시겠습니까?')) {
        DataManager.deleteGalleryItem(id);
        showToast('이미지가 삭제되었습니다.', 'success');
        loadAdminGallery();
        loadDashboardStats();
    }
}

// 블로그 관리 함수
function openBlogModal(blog = null) {
    const modal = document.getElementById('blogModal');
    const form = document.getElementById('blogForm');
    const title = document.getElementById('blogModalTitle');

    if (blog) {
        title.textContent = '게시글 수정';
        document.getElementById('blogId').value = blog.id;
        document.getElementById('blogTitleInput').value = blog.title;
        document.getElementById('blogCategoryInput').value = blog.category;
        document.getElementById('blogExcerpt').value = blog.excerpt;
        document.getElementById('blogContentInput').value = blog.content.replace(/<[^>]*>/g, '');
        document.getElementById('blogStatus').value = blog.status;
    } else {
        title.textContent = '새 게시글 작성';
        form.reset();
        document.getElementById('blogId').value = '';
    }

    modal.classList.add('active');
}

function closeBlogModal() {
    document.getElementById('blogModal').classList.remove('active');
}

function saveBlog(e) {
    e.preventDefault();

    const id = document.getElementById('blogId').value;
    const content = document.getElementById('blogContentInput').value;
    const imageInput = document.getElementById('blogImage');
    const file = imageInput && imageInput.files[0];

    const processBlog = (imageData) => {
        const blogData = {
            title: document.getElementById('blogTitleInput').value,
            category: document.getElementById('blogCategoryInput').value,
            excerpt: document.getElementById('blogExcerpt').value,
            content: content.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join(''),
            status: document.getElementById('blogStatus').value,
            image: imageData
        };

        if (id) {
            if (imageData === null) {
                const existing = DataManager.getBlogById(parseInt(id));
                if (existing) blogData.image = existing.image;
            }
            DataManager.updateBlog(parseInt(id), blogData);
            showToast('게시글이 수정되었습니다.', 'success');
        } else {
            DataManager.addBlog(blogData);
            showToast('게시글이 작성되었습니다.', 'success');
        }

        closeBlogModal();
        loadAdminBlogs();
        loadDashboardStats();
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => processBlog(e.target.result);
        reader.readAsDataURL(file);
    } else {
        processBlog(null);
    }
}

function editBlog(id) {
    const blog = DataManager.getBlogById(id);
    if (blog) {
        openBlogModal(blog);
    }
}

function deleteBlog(id) {
    if (confirm('정말 이 게시글을 삭제하시겠습니까?')) {
        DataManager.deleteBlog(id);
        showToast('게시글이 삭제되었습니다.', 'success');
        loadAdminBlogs();
        loadDashboardStats();
    }
}

// ============================================
// 유틸리티 함수
// ============================================
function formatPrice(price) {
    return price.toLocaleString('ko-KR');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer') || createToastContainer();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // 3초 후 제거
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// 모달 외부 클릭 시 닫기
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});
