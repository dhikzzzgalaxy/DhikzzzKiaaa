// Routing & Navigation Handler untuk Single Page Application (SPA)

async function fetchAppsData() {
  try {
    const res = await fetch('/data/apps.json');
    if (!res.ok) throw new Error('Gagal mengambil data aplikasi');
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function handleRoute() {
  const appContainer = document.getElementById('app');
  const path = window.location.pathname; // mengambil path/slug dari URL
  
  // Menghilangkan trailing slash jika ada
  const cleanPath = path === '/' ? '/' : path.replace(/\/+$/, '');

  if (cleanPath === '/' || cleanPath === '/index.html') {
    appContainer.innerHTML = `
      <h1>Selamat Datang</h1>
      <p>Ini adalah halaman utama aplikasi web.</p>
    `;
  } else if (cleanPath === '/apps') {
    const apps = await fetchAppsData();
    let html = '<h1>Daftar Aplikasi</h1><ul class="app-list">';
    apps.forEach(app => {
      html += `
        <li>
          <a href="/app/${app.slug}"><strong>${app.name}</strong></a>
          <p>${app.description}</p>
        </li>
      `;
    });
    html += '</ul>';
    appContainer.innerHTML = html;
  } else if (cleanPath.startsWith('/app/')) {
    const slug = cleanPath.replace('/app/', '');
    const apps = await fetchAppsData();
    const appData = apps.find(a => a.slug === slug);

    if (appData) {
      appContainer.innerHTML = `
        <article class="app-detail">
          <h1>${appData.name}</h1>
          <p class="category">Kategori: ${appData.category || 'Umum'}</p>
          <p>${appData.description}</p>
          <a href="/apps">&larr; Kembali ke Daftar Aplikasi</a>
        </article>
      `;
    } else {
      renderNotFound();
    }
  } else if (cleanPath === '/about') {
    appContainer.innerHTML = `
      <h1>Tentang Kami</h1>
      <p>Halaman tentang pembuat website ini.</p>
    `;
  } else {
    renderNotFound();
  }
}

function renderNotFound() {
  const appContainer = document.getElementById('app');
  appContainer.innerHTML = `
    <div class="not-found">
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, slug URL yang Anda tuju tidak ditemukan.</p>
      <a href="/">&larr; Kembali ke Beranda</a>
    </div>
  `;
}

// Menangani event klik link secara internal (mencegah reload)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('/')) {
    e.preventDefault();
    const targetUrl = link.getAttribute('href');
    
    // Perbarui URL browser tanpa reload halaman
    history.pushState(null, '', targetUrl);
    
    // Jalankan logika routing
    handleRoute();
  }
});

// Menangani navigasi tombol Back / Forward browser
window.addEventListener('popstate', handleRoute);

// Inisialisasi saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', handleRoute);
