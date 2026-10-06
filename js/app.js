(function() {
      // ----- DARK MODE TOGGLE (with localStorage) -----
      const themeToggle = document.getElementById('themeToggle');
      const body = document.body;
      const icon = themeToggle.querySelector('i');

      // check saved theme
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        body.classList.add('dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }

      themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (body.classList.contains('dark')) {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
          localStorage.setItem('theme', 'dark');
        } else {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
          localStorage.setItem('theme', 'light');
        }
      });

      // ----- TOAST NOTIFICATION HELPER -----
      const toast = document.getElementById('toast');
      let toastTimeout;

      function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
          toast.classList.remove('show');
        }, 2200);
      }

      // ----- PROJECT CARD CLICKS (interactive) -----
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
          e.preventDefault(); // prevent any link behaviour (they are divs, but safe)
          const project = card.dataset.project || 'this project';
          showToast(`🔍 Opening ${project} case study…`);
        });
      });

      // ----- SOCIAL LINKS (preview) -----
      const socialLinks = document.querySelectorAll('.social-link');
      socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();

          const network = link.dataset.social || 'social';
          const url = link.href;

          showToast(`🔗 Redirecting to ${network} profile…`);

          // Force the browser to open the external profile immediately in a new tab.
          // This avoids the toast click handler blocking navigation.
          if (url && url !== '#') {
            window.open(url, '_blank', 'noopener,noreferrer');
          }
        });
      });

      // ----- CTA BUTTON -----
      const ctaBtn = document.getElementById('ctaBtn');
      ctaBtn.addEventListener('click', () => {
        showToast(`📬 Thanks! Let's build something great — check your inbox.`);
        // optional: copy email to clipboard
        if (navigator.clipboard) {
          navigator.clipboard.writeText('alex.rivera@example.dev').catch(() => {});
        }
      });

      // ----- ADD A TINY WELCOME TOAST ON FIRST LOAD (optional) -----
      window.addEventListener('load', () => {
        setTimeout(() => {
          showToast('👋 Welcome to my portfolio — explore & say hi!');
        }, 1200);
      });
    })();
