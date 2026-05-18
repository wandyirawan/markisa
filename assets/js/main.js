// Markisa — Bangun Skills
// Theme toggle & interactions

(function() {
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');

  const saved = localStorage.getItem('markisa-theme');
  if (saved) {
    html.setAttribute('data-theme', saved);
    icon.textContent = saved === 'dark' ? '☀️' : '🌙';
  }

  window.toggleTheme = function() {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    icon.textContent = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('markisa-theme', next);
  };

  // Load More — Trainer cards on mobile
  const grid = document.getElementById('trainer-grid');
  if (grid) {
    const cards = grid.querySelectorAll('.trainer-card');
    const total = cards.length;
    const limit = 3;

    function handleResize() {
      const isMobile = window.innerWidth <= 768;

      // Remove existing load-more btn
      const oldBtn = document.getElementById('load-more-trainers');
      if (oldBtn) oldBtn.remove();

      // Reset visibility
      cards.forEach((c, i) => {
        c.style.display = '';
        c.classList.remove('hidden-mobile');
      });

      if (isMobile && total > limit) {
        // Hide cards beyond limit
        let hidden = [];
        cards.forEach((c, i) => {
          if (i >= limit) {
            c.style.display = 'none';
            hidden.push(c);
          }
        });

        // Show load more button
        const btn = document.createElement('button');
        btn.id = 'load-more-trainers';
        btn.className = 'outline contrast';
        btn.textContent = 'Lihat Semua (' + (total - limit) + ' lagi)';
        btn.style.margin = '1rem auto';
        btn.style.display = 'block';
        btn.onclick = function() {
          hidden.forEach(c => c.style.display = '');
          btn.textContent = 'Semua ditampilkan';
          btn.disabled = true;
          btn.style.opacity = '0.5';
        };
        grid.parentNode.appendChild(btn);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
  }
})();
