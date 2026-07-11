document.addEventListener('DOMContentLoaded', () => {
    // State Management
    let galleryData = [];
    let filteredData = [];
    let currentPhotoIndex = 0;
    let favorites = JSON.parse(localStorage.getItem('dhikzzz_favorites')) || [];

    // DOM Elements
    const loadingScreen = document.getElementById('loading-screen');
    const header = document.getElementById('main-header');
    const mobileMenu = document.getElementById('mobile-menu');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const galleryContainer = document.getElementById('gallery-container');
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const photoCountSpan = document.getElementById('photo-count');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    // Lightbox Elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxLocation = document.getElementById('lightbox-location');
    const lightboxDate = document.getElementById('lightbox-date');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const favBtn = document.getElementById('fav-btn');
    const shareBtn = document.getElementById('share-btn');
    const downloadBtn = document.getElementById('download-btn');
    const toast = document.getElementById('toast');

    // 1. Loading Screen
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.style.display = 'none', 500);
            startCounters();
            revealOnScroll();
        }, 1500);
    });

    // 2. Fetch Data from gallery.json
    async function fetchGallery() {
        try {
            // Simulate network delay for skeleton effect
            showSkeletons();
            const response = await fetch('data/gallery.json');
            galleryData = await response.json();
            filteredData = [...galleryData];
            renderGallery(filteredData);
        } catch (error) {
            console.error('Error fetching gallery:', error);
            showToast('Gagal memuat data galeri.');
        }
    }

    function showSkeletons() {
        galleryContainer.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            galleryContainer.innerHTML += `
                <div class="photo-card skeleton" style="height: 350px;"></div>
            `;
        }
    }

    function renderGallery(data) {
        galleryContainer.innerHTML = '';
        photoCountSpan.textContent = data.length;

        if (data.length === 0) {
            galleryContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 50px;">Tidak ada foto ditemukan.</p>';
            return;
        }

        data.forEach((photo, index) => {
            const card = document.createElement('div');
            card.className = 'photo-card scroll-reveal';
            card.innerHTML = `
                <div class="photo-img-wrapper">
                    <img src="${photo.image}" alt="${photo.title}" loading="lazy">
                    <span class="badge-mini">${photo.category}</span>
                </div>
                <div class="photo-info">
                    <h4>${photo.title}</h4>
                    <div class="photo-meta">
                        <span><svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${photo.location}</span>
                        <span><svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${photo.date}</span>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => openLightbox(index));
            galleryContainer.appendChild(card);
        });
        
        // Trigger reveal for new elements
        setTimeout(revealOnScroll, 100);
    }

    // 3. Search & Filter
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        filterData(term, document.querySelector('.filter-btn.active').dataset.filter);
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterData(searchInput.value.toLowerCase(), btn.dataset.filter);
        });
    });

    function filterData(searchTerm, category) {
        filteredData = galleryData.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm) || 
                                 item.location.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'Semua' || item.category === category;
            return matchesSearch && matchesCategory;
        });
        renderGallery(filteredData);
    }

    // 4. Lightbox Functionality
    function openLightbox(index) {
        currentPhotoIndex = index;
        const photo = filteredData[index];
        
        lightboxImg.src = photo.image;
        lightboxTitle.textContent = photo.title;
        lightboxCategory.textContent = photo.category;
        lightboxLocation.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${photo.location}`;
        lightboxDate.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${photo.date}`;
        downloadBtn.href = photo.image;
        
        updateFavoriteButton(photo.id);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    prevBtn.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex - 1 + filteredData.length) % filteredData.length;
        openLightbox(currentPhotoIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex + 1) % filteredData.length;
        openLightbox(currentPhotoIndex);
    });

    // 5. Favorite System (LocalStorage)
    favBtn.addEventListener('click', () => {
        const photo = filteredData[currentPhotoIndex];
        const index = favorites.indexOf(photo.id);
        
        if (index === -1) {
            favorites.push(photo.id);
            showToast('Ditambahkan ke Favorite ❤️');
        } else {
            favorites.splice(index, 1);
            showToast('Dihapus dari Favorite');
        }
        
        localStorage.setItem('dhikzzz_favorites', JSON.stringify(favorites));
        updateFavoriteButton(photo.id);
    });

    function updateFavoriteButton(id) {
        if (favorites.includes(id)) {
            favBtn.classList.add('active');
            favBtn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> Favorited`;
        } else {
            favBtn.classList.remove('active');
            favBtn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> Favorite`;
        }
    }

    // Favorite Filter from Nav
    document.getElementById('nav-favorite').addEventListener('click', (e) => {
        e.preventDefault();
        filteredData = galleryData.filter(item => favorites.includes(item.id));
        renderGallery(filteredData);
        closeSidebarFunc();
        showToast('Menampilkan Foto Favorite');
    });

    // 6. Share Functionality
    shareBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: filteredData[currentPhotoIndex].title,
                text: 'Lihat foto keren ini di DhikzzzKiaaa Gallery!',
                url: window.location.href
            }).catch(console.error);
        } else {
            showToast('Link disalin ke clipboard!');
            navigator.clipboard.writeText(window.location.href);
        }
    });

    // 7. UI Helpers (Scroll, Sidebar, Toast, Ripple)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            scrollToTopBtn.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            scrollToTopBtn.classList.remove('show');
        }
        revealOnScroll();
    });

    mobileMenu.addEventListener('click', () => {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
    });

    function closeSidebarFunc() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    }

    closeSidebar.addEventListener('click', closeSidebarFunc);
    sidebarOverlay.addEventListener('click', closeSidebarFunc);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // Ripple Effect
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('ripple')) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            e.target.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    });

    // Scroll Reveal
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.scroll-reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top;
            const revealPoint = 150;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });
    }

    // Counter Animation
    function startCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200;
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Initialize
    fetchGallery();
});
