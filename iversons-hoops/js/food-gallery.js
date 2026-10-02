(() => {
  const tiles = [...document.querySelectorAll('.food-tile')];
  if (!tiles.length) return;
  const modal = document.querySelector('.food-modal');
  const player = modal.querySelector('video');
  const close = modal.querySelector('.food-close');
  const visible = new Map();
  const near = new Set();
  const queue = [];
  let loading = 0;
  let returnFocus;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = navigator.connection?.saveData;
  const limit = () => window.innerWidth <= 800 ? 2 : 4;
  function playVisible() {
    const selected = [...visible.entries()].filter(([t,r]) => r >= .35 && t.dataset.ready)
      .sort((a,b) => b[1]-a[1]).slice(0,limit()).map(([t])=>t);
    tiles.forEach(tile => {
      const video = tile.querySelector('video');
      if (selected.includes(tile) && !document.hidden && !modal.open && !reduced.matches && !saveData) {
        video.play().then(()=>tile.classList.add('is-playing')).catch(()=>{});
      } else { video.pause(); tile.classList.remove('is-playing'); }
    });
  }
  function drain() {
    while(loading < 2 && queue.length) {
      const tile = queue.shift();
      if(!near.has(tile) || tile.dataset.loaded) continue;
      const video = tile.querySelector('video');
      tile.dataset.loaded = 'true';
      loading++;
      let finished = false;
      const done = () => {
        if(finished) return;
        finished = true; loading--;
        if(video.readyState >= 2) tile.dataset.ready = 'true';
        playVisible(); drain();
      };
      video.addEventListener('loadeddata',done,{once:true});
      video.addEventListener('error',done,{once:true});
      video.src = video.dataset.src;
      video.preload = 'auto';
      video.load();
    }
  }
  const approach = new IntersectionObserver(entries => {
    entries.forEach(({target,isIntersecting}) => {
      if(isIntersecting) {near.add(target); if(!saveData) queue.push(target);}
      else near.delete(target);
    });
    drain();
  },{rootMargin:'160px 0px'});
  const playback = new IntersectionObserver(entries => {
    entries.forEach(({target,intersectionRatio})=>visible.set(target,intersectionRatio));
    playVisible();
  },{threshold:[0,.35,.6,1]});
  tiles.forEach(tile => {
    approach.observe(tile); playback.observe(tile);
    tile.addEventListener('click',() => {
      returnFocus = tile;
      player.src = tile.querySelector('video').dataset.src;
      player.poster = tile.querySelector('img').src;
      player.muted = true;
      modal.showModal(); playVisible();
      player.play().catch(()=>{});
      close.focus();
    });
  });
  close.addEventListener('click',()=>modal.close());
  modal.addEventListener('click',event=>{if(event.target===modal)modal.close();});
  modal.addEventListener('close',()=>{
    player.pause(); player.removeAttribute('src'); player.load();
    returnFocus?.focus(); playVisible();
  });
  document.addEventListener('visibilitychange',playVisible);
  window.addEventListener('resize',playVisible);
})();
