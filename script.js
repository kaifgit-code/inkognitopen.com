document.addEventListener('DOMContentLoaded', () => {

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const tabs = document.getElementById('tabs');

  if (hamburger && tabs) {
    hamburger.addEventListener('click', () => {
      const isOpen = tabs.classList.toggle('open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    tabs.querySelectorAll('.tab').forEach(link => {
      link.addEventListener('click', () => {
        tabs.classList.remove('open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- scroll-spy active tab ---------- */
  const sections = document.querySelectorAll('section[id]');
  const tabLinks = document.querySelectorAll('.tab');

  const spy = () => {
    let current = sections[0] ? sections[0].id : '';
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop) current = sec.id;
    });
    tabLinks.forEach(link => {
      link.classList.toggle('tab--active', link.dataset.tab === current);
    });
  };
  window.addEventListener('scroll', spy, { passive: true });
  spy();

  /* ---------- toast + cart ---------- */
  const toast = document.getElementById('toast');
  const cartCount = document.getElementById('cartCount');
  let count = 0;
  let toastTimer;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      count += 1;
      if (cartCount) cartCount.textContent = String(count);
      const name = btn.dataset.name || 'Item';
      showToast(`Added to cart: ${name} 🕶️`);
    });
  });

  /* ---------- ink test bench ---------- */
  const swatches = document.querySelectorAll('.ink-swatch');
  const sample = document.getElementById('inkSample');
  const inkLabel = document.getElementById('inkLabel');

  swatches.forEach(sw => {
    sw.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('is-active'));
      sw.classList.add('is-active');
      const color = sw.dataset.ink;
      if (sample) sample.style.setProperty('--current-ink', color);
      if (sample) sample.style.color = color;
      if (inkLabel) inkLabel.textContent = sw.dataset.label;
    });
  });

  /* ---------- unlock the code ---------- */
  const unlockBtn = document.getElementById('unlockBtn');
  const unlockReveal = document.getElementById('unlockReveal');
  const copyBtn = document.getElementById('copyBtn');
  const unlockCode = document.getElementById('unlockCode');

  if (unlockBtn && unlockReveal) {
    unlockBtn.addEventListener('click', () => {
      unlockReveal.hidden = false;
      unlockBtn.textContent = 'Code Cracked ✅';
    });
  }

  if (copyBtn && unlockCode) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(unlockCode.textContent.trim());
        copyBtn.textContent = 'Copied!';
        showToast('Code copied — go flex that 10% off 🕶️');
        setTimeout(() => (copyBtn.textContent = 'Copy'), 1800);
      } catch (e) {
        showToast('Copy failed — code is ' + unlockCode.textContent.trim());
      }
    });
  }

});
