// Static counterpart of the published site's client interactions.
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('navigation');
  if (toggle && navigation) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
      navigation.classList.toggle('open', open);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
        navigation.classList.remove('open');
      }
    });
  }
  document.querySelectorAll('.tilt').forEach(element => {
    element.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch' || reduced.matches) return;
      const r = element.getBoundingClientRect();
      element.style.transform = `perspective(1000px) rotateX(${-(event.clientY-r.top-r.height/2)/60}deg) rotateY(${(event.clientX-r.left-r.width/2)/60}deg)`;
    });
    element.addEventListener('pointerleave', () => { element.style.transform = ''; });
  });
  document.querySelectorAll('.motion-video').forEach(container => {
    const video = container.querySelector('video');
    const button = container.querySelector('.video-pause');
    if (!video || !button) return;
    const update = () => { button.textContent = video.paused ? 'Play animation' : 'Pause animation'; };
    if (reduced.matches) { video.autoplay = false; video.pause(); update(); }
    video.addEventListener('pause', update);
    video.addEventListener('play', update);
    button.addEventListener('click', () => {
      if (video.paused) video.play().catch(() => { update(); });
      else video.pause();
    });
  });
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      if (data.get('website')) return;
      const fields = [['Name','name'],['Email','email'],['Company','company'],['Interest','interest'],['Estimated quantity','quantity'],['Message','message']];
      const body = fields.map(([label,key]) => `${label}: ${data.get(key) || ''}`).join('\n\n');
      const mailto = `mailto:t.butler@dipitbrand.com?subject=${encodeURIComponent('Dipit inquiry: '+(data.get('interest') || 'Product information'))}&body=${encodeURIComponent(body)}`;
      const status = form.querySelector('[role="status"]');
      if (status) status.textContent = 'Your email draft is ready. Send it from your email app to complete your inquiry. Nothing has been submitted or saved by this demo.';
      window.location.href = mailto;
    });
  }
})();
