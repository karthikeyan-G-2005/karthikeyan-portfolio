/* Karthikeyan G – portfolio interactions (vanilla JS + GSAP) */
(() => {
  'use strict';
  const cfg = window.SITE_CONFIG || {};
  const PROJECTS = window.PROJECTS || [];
  const CERTS = window.CERTS || [];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const hasGsap = !!window.gsap;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icons = () => window.lucide && window.lucide.createIcons();

  // If GSAP failed to load, make sure nothing stays hidden.
  if (!hasGsap) document.documentElement.classList.remove('js');

  /* ---------------- toast ---------------- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ---------------- config-driven links ---------------- */
  function setLinks() {
    $$('[data-link]').forEach(a => {
      const k = a.dataset.link, v = (cfg[k] || '').trim();
      const label = $('[data-label]', a);
      if (v) {
        a.href = k === 'email' ? 'mailto:' + v : v;
        if (label) label.textContent = k === 'email' ? v : k === 'resume' ? 'Download PDF' : v.replace(/^https?:\/\/(www\.)?/, '');
      } else {
        a.setAttribute('href', '#');
        a.setAttribute('aria-disabled', 'true');
        a.removeAttribute('download'); a.removeAttribute('target');
        a.classList.add('is-disabled', 'is-empty');
        a.addEventListener('click', e => { e.preventDefault(); toast(k.charAt(0).toUpperCase() + k.slice(1) + ' link coming soon'); });
      }
    });
    const av = $('#availability');
    if (cfg.showAvailability !== false && cfg.availabilityText) { $('#availText').textContent = cfg.availabilityText; av.hidden = false; }
    $('#yr').textContent = new Date().getFullYear();
  }

  /* ---------------- projects ---------------- */
  const grid = $('#projectGrid');
  function btn(href, icon, text, extra) {
    return href
      ? `<a class="btn btn-ghost" href="${esc(href)}" target="_blank" rel="noopener noreferrer"><i data-lucide="${icon}"></i>${text}</a>`
      : `<span class="btn btn-ghost is-disabled" aria-disabled="true" title="Coming soon" aria-label="${text}, coming soon"><i data-lucide="${icon}"></i>${text}</span>`;
  }
  function buildProjects() {
    grid.dataset.reveal = 'cards';
    grid.innerHTML = PROJECTS.map(p => {
      const tech = p.tech.length ? p.tech.map(t => `<li>${esc(t)}</li>`).join('') : '<li class="muted">Stack to be added</li>';
      const feats = p.features.length ? p.features.slice(0, 2).map(f => `<li>${esc(f)}</li>`).join('') : '<li>Feature details coming soon</li>';
      return `<article class="proj" data-id="${p.id}" data-cats="${p.cats.join(' ')}">
        <div class="proj-inner">
          <button class="grip" type="button" aria-label="Drag ${esc(p.title)} card"><i data-lucide="grip"></i></button>
          <div class="pbody">
            <p class="pcat">${esc(p.catLabel)}</p>
            <h3>${esc(p.title)}</h3>
            <p class="short">${esc(p.short)}</p>
            <ul class="tech" aria-label="Technologies">${tech}</ul>
            <ul class="feat" aria-label="Main features">${feats}</ul>
            <div class="pactions">
              ${btn(p.github, 'github', 'GitHub')}
              <button class="btn btn-primary" type="button" data-details="${p.id}"><i data-lucide="maximize-2"></i>View Details</button>
            </div>
          </div>
        </div></article>`;
    }).join('');
  }

  const pm = $('#projectModal');
  function openProject(id) {
    const p = PROJECTS.find(x => x.id === id); if (!p) return;
    $('#pmCat').textContent = p.catLabel; $('#pmTitle').textContent = p.title; $('#pmDesc').textContent = p.short;
    $('#pmTech').innerHTML = p.tech.length ? p.tech.map(t => `<li class="tag">${esc(t)}</li>`).join('') : '<li class="text-muted text-sm">Technology stack to be added.</li>';
    $('#pmFeat').innerHTML = p.features.length ? p.features.map(f => `<li>${esc(f)}</li>`).join('') : '<li>Feature details coming soon.</li>';
    const certLink = p.cert ? `<button class="btn btn-ghost" type="button" data-cert="${p.cert}"><i data-lucide="award"></i>View Certificate</button>` : '';
    $('#pmLinks').innerHTML = btn(p.github, 'github', 'GitHub') + certLink;
    icons(); openDialog(pm);
  }

  /* ---------------- certificates ---------------- */
  const certGrid = $('#certGrid');
  function buildCerts() {
    certGrid.dataset.reveal = 'cards';
    certGrid.innerHTML = CERTS.map((c, i) => {
      const thumb = c.img
        ? `<button class="cert-thumb" type="button" data-cert="${c.img}" aria-label="View ${esc(c.title)} certificate full size"><img src="assets/certs/${c.img}-thumb.jpg" alt="${esc(c.title)} certificate from ${esc(c.org)}" loading="lazy" width="640" height="480"><span class="zoom"><i data-lucide="zoom-in"></i></span></button>`
        : `<div class="cert-empty"><i data-lucide="award"></i><span>Certificate image coming soon</span></div>`;
      const action = c.img
        ? `<button class="btn btn-ghost" type="button" data-cert="${c.img}"><i data-lucide="eye"></i>View Certificate</button>`
        : `<span class="btn btn-ghost is-disabled" aria-disabled="true">Image coming soon</span>`;
      return `<article class="cert-card">${thumb}<div class="cert-body"><h3>${esc(c.title)}</h3><p class="org">${esc(c.org)}</p>
        <p class="meta">Issued: ${esc(c.date)}</p>${c.id ? `<p class="meta">ID: ${esc(c.id)}</p>` : ''}<span class="spacer"></span>${action}</div></article>`;
    }).join('');
  }
  const lb = $('#lightbox');
  function openCert(img) {
    const c = CERTS.find(x => x.img === img); if (!c) return;
    $('#lbImg').src = `assets/certs/${img}.jpg`; $('#lbImg').alt = `${c.title} – ${c.org}`;
    $('#lbCap').textContent = `${c.title} · ${c.org} · ${c.date}`;
    if (pm.open) pm.close();
    openDialog(lb);
  }

  /* ---------------- dialogs ---------------- */
  function openDialog(d) { document.body.style.overflow = 'hidden'; d.showModal(); }
  [pm, lb].forEach(d => {
    d.addEventListener('close', () => { document.body.style.overflow = ''; });
    d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) d.close(); });
  });
  document.addEventListener('click', e => {
    const det = e.target.closest('[data-details]'); if (det) return openProject(det.dataset.details);
    const ce = e.target.closest('[data-cert]'); if (ce) return openCert(ce.dataset.cert);
  });

  /* ---------------- nav ---------------- */
  const nav = $('#nav'), menuBtn = $('#menuBtn'), mobile = $('#mobileMenu'), bar = $('.scroll-progress');
  menuBtn.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open); menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  $$('a', mobile).forEach(a => a.addEventListener('click', () => { mobile.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }));
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
      nav.classList.toggle('scrolled', scrollY > 30); ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const links = $$('.nav-link, .mobile-menu a');
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) links.forEach(l => { const on = l.getAttribute('href') === '#' + en.target.id; l.classList.toggle('active', on); on ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current'); });
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main > section').forEach(s => io.observe(s));

  /* ---------------- filters ---------------- */
  function applyFilter(f) {
    $$('.filter').forEach(b => { const on = b.dataset.filter === f; b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on); });
    const cards = $$('.proj', grid), show = [];
    cards.forEach(c => { const ok = f === 'all' || c.dataset.cats.split(' ').includes(f); c.classList.toggle('hide', !ok); if (ok) show.push(c); });
    if (hasGsap && !reduce) gsap.fromTo(show, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .5, stagger: .06, ease: 'power3.out', clearProps: 'transform' });
    else show.forEach(c => c.style.opacity = 1);
    if (window.ScrollTrigger) setTimeout(() => ScrollTrigger.refresh(), 60);
  }
  $$('.filter').forEach(b => b.addEventListener('click', () => applyFilter(b.dataset.filter)));

  /* ---------------- typewriter ---------------- */
  function prepType(el) {
    if (el._tw) return el._tw;
    const text = el.textContent.trim();
    el.textContent = '';
    const sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = text;
    const ghost = document.createElement('span'); ghost.className = 'tw-ghost'; ghost.setAttribute('aria-hidden', 'true'); ghost.textContent = text;
    const live = document.createElement('span'); live.className = 'tw-live'; live.setAttribute('aria-hidden', 'true');
    el.append(sr, ghost, live); el.style.visibility = 'visible';
    return (el._tw = { text, live });
  }
  function typeTween(el, ms = 18) {
    const { text, live } = prepType(el);
    const o = { n: 0 };
    return gsap.to(o, {
      n: text.length, duration: text.length * ms / 1000, ease: 'none',
      onUpdate() { live.textContent = text.slice(0, Math.round(o.n)); live.insertAdjacentHTML('beforeend', '<span class="tw-caret"></span>'); },
      onComplete() { live.textContent = text; }
    });
  }

  /* ---------------- hero roles ---------------- */
  const roles = ['Aspiring Data Scientist', 'Machine Learning Enthusiast', 'AI Explorer', 'Python Programmer', 'Data Analytics Enthusiast'];
  const roleEl = $('#roleText');
  let rolesOn = false, heroVisible = true;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  async function roleLoop() {
    if (rolesOn) return; rolesOn = true; let i = 0;
    while (true) {
      const w = roles[i % roles.length];
      for (let c = 1; c <= w.length; c++) { while (!heroVisible || document.hidden) await sleep(300); roleEl.textContent = w.slice(0, c); await sleep(50); }
      await sleep(1400);
      for (let c = w.length - 1; c >= 0; c--) { roleEl.textContent = w.slice(0, c); await sleep(24); }
      await sleep(250); i++;
    }
  }
  new IntersectionObserver(es => { heroVisible = es[0].isIntersecting; }).observe($('#home'));

  /* ---------------- particles ---------------- */
  function particles() {
    const cv = $('#particles'), ctx = cv.getContext('2d');
    let w, h, dpr = Math.min(devicePixelRatio || 1, 2), pts = [], run = true;
    const N = innerWidth < 700 ? 22 : 46;
    function size() { w = cv.clientWidth; h = cv.clientHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); addEventListener('resize', size);
    for (let i = 0; i < N; i++) pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.6 + .6 });
    new IntersectionObserver(es => { run = es[0].isIntersecting; if (run) frame(); }).observe(cv);
    function frame() {
      if (!run) return; ctx.clearRect(0, 0, w, h);
      for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; ctx.fillStyle = 'rgba(255,89,100,.7)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) { const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y); if (d < 110) { ctx.strokeStyle = `rgba(229,57,69,${.18 * (1 - d / 110)})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } }
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ---------------- tilt (inner element, so Draggable on outer stays clean) ---------------- */
  function tilt() {
    $$('.proj-inner').forEach(el => {
      el.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse') return;
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        gsap.to(el, { rotationY: x * 9, rotationX: -y * 9, transformPerspective: 900, duration: .4, ease: 'power2.out' });
      });
      el.addEventListener('pointerleave', () => gsap.to(el, { rotationX: 0, rotationY: 0, duration: .6, ease: 'power3.out' }));
    });
  }

  /* ---------------- draggable ---------------- */
  function draggables() {
    if (!window.Draggable) return;
    $$('.chip').forEach(c => Draggable.create(c, { type: 'x,y', bounds: '#home', minimumMovement: 4, zIndexBoost: true }));
    $$('.proj').forEach(card => {
      Draggable.create(card, {
        type: 'x,y', trigger: fine ? card : $('.grip', card), dragClickables: false, minimumMovement: 8, zIndexBoost: true,
        onPress() { card.style.zIndex = 30; },
        onRelease() { gsap.to(card, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1,.55)', onComplete() { card.style.zIndex = ''; } }); }
      });
    });
  }

  /* ---------------- scroll motion ---------------- */
  const GAP = 0.2; // extra pause after each tween (tweens are ~0.8s → ~1s between major elements)
  function reveal(g) {
    const t = g.dataset.reveal;
    if (t === 'stagger') { gsap.set(g, { opacity: 1 }); return gsap.fromTo($$('[data-stagger]', g), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .7, stagger: .1, ease: 'power3.out', clearProps: 'transform' }); }
    if (t === 'cards') { gsap.set(g, { opacity: 1 }); return gsap.fromTo(Array.from(g.children), { opacity: 0, y: 50, scale: .96 }, { opacity: 1, y: 0, scale: 1, duration: .7, stagger: .1, ease: 'power3.out', clearProps: 'transform' }); }
    const from = { opacity: 0 };
    if (t === 'up') from.y = 40; if (t === 'left') from.x = -60; if (t === 'right') from.x = 60; if (t === 'scale') from.scale = .9;
    return gsap.fromTo(g, from, { opacity: 1, x: 0, y: 0, scale: 1, duration: .8, ease: 'power3.out', clearProps: 'transform' });
  }
  function scrollMotion() {
    $$('[data-type]').forEach(prepType);
    $$('[data-section]').forEach(sec => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 70%', once: true } });
      const title = $('.sec-title', sec), sub = $('.sec-sub', sec);
      if (title) tl.add(typeTween(title, 16));
      if (sub) tl.add(typeTween(sub, 14), '>+0.2');
      $$('[data-reveal]', sec).forEach(g => tl.add(reveal(g), '>+' + GAP));
    });
    $$('.timeline').forEach(t => {
      const line = document.createElement('span'); line.className = 'tl-line'; line.setAttribute('aria-hidden', 'true'); t.prepend(line);
      gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: t, start: 'top 70%', end: 'bottom 70%', scrub: true } });
    });
    $$('[data-tl]').forEach(it => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: it, start: 'top 88%', once: true } });
      tl.fromTo(it, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: .8, ease: 'power3.out', clearProps: 'transform' })
        .fromTo($('.tl-dot', it), { scale: 0 }, { scale: 1, duration: .5, ease: 'back.out(3)' }, 0.1);
    });
    // parallax
    const st = { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('.hero-glow', { yPercent: 35, ease: 'none', scrollTrigger: st });
    gsap.to('.bg-grid', { yPercent: 12, ease: 'none', scrollTrigger: st });
    gsap.to('.portrait', { yPercent: -8, ease: 'none', scrollTrigger: st });
  }

  function heroIntro() {
    const hello = $('#heroHello'); prepType(hello);
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: .2 });
    tl.fromTo('.portrait-wrap', { opacity: 0, scale: .85 }, { opacity: 1, scale: 1, duration: 1.1, clearProps: 'transform' }, 0)
      .set(hello, { opacity: 1 }, 0.1).add(typeTween(hello, 20), 0.1)
      .fromTo('.hero-name', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: .8 }, '>+0.1')
      .fromTo($$('.hero-copy > .hero-in').slice(2), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .6, stagger: .18 }, '>-0.3')
      .fromTo('.chip', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: .6, stagger: .12, ease: 'back.out(2.5)' }, '>-0.8')
      .call(roleLoop, null, '>-1');
  }

  /* ---------------- init ---------------- */
  setLinks(); buildProjects(); buildCerts(); icons();
  if (reduce || !hasGsap) {
    $$('.proj').forEach(c => c.style.opacity = 1);
    roleEl.textContent = roles[0];
    if (hasGsap) draggables();
  } else {
    gsap.registerPlugin(ScrollTrigger, window.Draggable);
    heroIntro(); scrollMotion(); tilt(); draggables(); particles();
    addEventListener('load', () => ScrollTrigger.refresh());
  }
})();
