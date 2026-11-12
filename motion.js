/* A small, dependency-free presentation enhancement. No network requests or data changes. */
(() => {
  'use strict';
  const root = document.documentElement;
  const paths = {
    arrowDown: '<path d="M12 4v16m-6-6 6 6 6-6"/>',
    arrowUp: '<path d="M12 20V4m-6 6 6-6 6 6"/>',
    arrowUpRight: '<path d="M6 18 18 6M6 6h12v12"/>',
    download: '<path d="M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4"/>',
    code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16"/>',
    file: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z"/><path d="M14 3v5h5M9 12h6m-6 4h6"/>',
    stepRead: '<path d="M4 8V6.5A2.5 2.5 0 0 1 6.5 4H8M16 4h1.5A2.5 2.5 0 0 1 20 6.5V8M20 16v1.5a2.5 2.5 0 0 1-2.5 2.5H16M8 20H6.5A2.5 2.5 0 0 1 4 17.500V16"/><path d="M8 9.500h8M8 12.500h8M8 15.500h4.500"/>',
    stepLearn: '<path d="M19.800 10.500A8 8 0 0 0 5.600 7.200M4.200 13.500a8 8 0 0 0 14.200 3.300"/><path d="M5 3.500v4h4M19 20.500v-4h-4"/><path d="m9 12.200 2.200 2.200 4-4.400"/>',
    stepAdapt: '<path d="m12 3.500 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16.500 8 4 2.500-1.250"/><path d="M19 15.500v5M16.500 18h5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
    feedback: '<path d="M8 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-6l-5 3v-3Z"/><path d="m8 11 3 3 5-6"/>',
    repeat: '<path d="M3 8h14a4 4 0 0 1 4 4v1M7 4 3 8l4 4M21 16H7a4 4 0 0 1-4-4v-1m14 1 4 4-4 4"/>',
    text: '<path d="M4 5h16M8 10h12M4 15h16M8 20h8"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5"/><path d="m3 16 5-5 5 5 3-3 5 5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trend: '<path d="m3 17 6-6 4 4 8-10m-6 0h6v6"/>',
    braces: '<path d="M9 3H7a2 2 0 0 0-2 2v4l-2 3 2 3v4a2 2 0 0 0 2 2h2m6-18h2a2 2 0 0 1 2 2v4l2 3-2 3v4a2 2 0 0 1-2 2h-2"/><circle cx="12" cy="12" r=".6"/>',
    source: '<path d="M9 5h11M9 12h11M9 19h11"/><circle cx="4" cy="5" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="19" r="1"/>',
    route: '<rect x="3" y="9" width="5" height="6" rx="1"/><rect x="16" y="3" width="5" height="6" rx="1"/><rect x="16" y="15" width="5" height="6" rx="1"/><path d="M8 12h3a2 2 0 0 0 2-2V8a2 2 0 0 1 2-2h1m-5 6a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h1"/>',
    copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    moon: '<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.7 8.7 0 1 0 11 11Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>'
  };
  const icon = name => `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name] || paths.arrowUpRight}</svg>`;
  const one = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const chinese = () => root.lang.startsWith('zh');
  const labelIcon = (node, name) => {
    if (!node) return;
    const text = node.textContent.replace(/[↗↓＋]/g, '').trim();
    node.replaceChildren(Object.assign(document.createElement('span'), { textContent: text }));
    node.insertAdjacentHTML('beforeend', icon(name));
  };
  const topButton = document.createElement('button');
  topButton.className = 'back-to-top';
  topButton.type = 'button';
  topButton.innerHTML = icon('arrowUp');
  document.body.append(topButton);
  const header = one('.site-header');
  const navLinks = all('.nav-links a');
  const navSections = ['method','continual','pool','results','analysis','resources'].map(id => ({
    node: document.getElementById(id),
    hash: '#' + ({pool:'continual',analysis:'results'}[id] || id)
  }));
  function alignInputConnector() {
    const stack = one('.request-stack');
    const svg = one('.routing-visual>.connector:nth-child(2) .connector-horizontal');
    const router = one('.router-node');
    const examples = all('.request-example');
    if (!stack || !svg || !router || examples.length !== 2 || !svg.getBoundingClientRect().width) return;
    const height = stack.offsetHeight;
    svg.style.height = `${height}px`;
    svg.setAttribute('viewBox', `0 0 100 ${height}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    const top = svg.getBoundingClientRect().top;
    const center = node => { const r = node.getBoundingClientRect(); return r.top + r.height / 2 - top; };
    const middle = center(router);
    const branch = node => {
      const y = center(node);
      const bend = y < middle ? Math.min(y + 10, middle) : Math.max(y - 10, middle);
      return `M0 ${y}H30Q50 ${y} 50 ${bend}V${middle}H95`;
    };
    svg.querySelector('path').setAttribute('d', examples.map(branch).join(''));
    svg.querySelector('path.arrow').setAttribute('d', `M87 ${middle - 6}l8 6-8 6`);
  }
  function refreshIcons() {
    labelIcon(one('.nav-actions [data-i18n="paperButton"]'), 'arrowUpRight');
    one('#theme-toggle').innerHTML = icon(root.dataset.theme === 'dark' ? 'sun' : 'moon');
    one('#theme-toggle').setAttribute('aria-label', chinese() ? '切换明暗主题' : 'Toggle color theme');
    all('.action-icon').forEach(node => { node.innerHTML=icon(node.dataset.icon || 'arrowUpRight'); });
    all('.input-symbol').forEach((node, index) => { node.innerHTML = icon(index ? 'image' : 'text'); });
    all('.new-task>span:first-child,.new-expert>span:first-child').forEach(node => { node.innerHTML = icon('plus'); });
    all('.method-columns .step-number').forEach((node,index) => {
      node.innerHTML = `<span class="step-icon">${icon(['stepRead','stepLearn','stepAdapt'][index])}</span><span class="step-label">${chinese() ? '第 ' + (index+1) + ' 步' : 'Step ' + (index+1)}</span>`;
    });
    all('.resource-icon').forEach(node => { node.innerHTML=icon(node.dataset.icon || 'file'); });
    all('[data-download-chart]').forEach(node => labelIcon(node, 'download'));
    labelIcon(one('#download-current'), 'download');
    all('.inline-link').forEach(node => labelIcon(node,'arrowUpRight'));
    all('.table-scroll').forEach(node => { node.setAttribute('tabindex','0'); node.setAttribute('role','region'); node.setAttribute('aria-label',chinese()?'可横向滚动的数据表':'Horizontally scrollable data table'); });
    all('.chart-host').forEach(node => { node.setAttribute('tabindex','0'); node.setAttribute('role','region'); node.setAttribute('aria-label',chinese()?'交互图表，可横向滚动':'Interactive chart, horizontally scrollable'); });
    topButton.setAttribute('aria-label', chinese() ? '返回顶部' : 'Back to top');
    alignInputConnector();
  }
  refreshIcons();
  let iconFrame = 0;
  new MutationObserver(() => {
    cancelAnimationFrame(iconFrame);
    iconFrame = requestAnimationFrame(refreshIcons);
  }).observe(root,{ attributes:true, attributeFilter:['lang','data-theme'] });

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const revealNodes = all('.hero-intro,.hero-board,.hero-stats>a,.section-intro,.method-columns article,.stage-rail,.chart-card,.finding-strip,.details-line,.selection-block>div,.resource,.paper-block');
  revealNodes.forEach(node => node.classList.add('reveal'));
  const nearby = new Set();
  const smooth = n => { const v = Math.max(0, Math.min(1, n)); return v*v*(3-2*v); };
  let frame = 0;
  let pageHeight = document.documentElement.scrollHeight;
  function update(allNodes = false) {
    frame = 0;
    const vh = window.innerHeight;
    const navHeight = header.offsetHeight;
    const y = window.scrollY;
    let activeHash = '';
    navSections.forEach(({node,hash}) => {
      if (node.getBoundingClientRect().top <= Math.max(navHeight+30,vh*.36)) activeHash = hash;
    });
    navLinks.forEach(link => {
      const active = link.hash === activeHash;
      link.classList.toggle('active',active);
      if (active) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    const range = Math.max(1,pageHeight-vh);
    header.classList.toggle('is-scrolled', y > 12);
    topButton.classList.toggle('is-visible', y > vh * .8);
    if (reducedMotion.matches) return;
    // Read geometry first, then write styles: scrolling never re-renders the charts.
    const frames = [...(allNodes ? revealNodes : nearby)].map(node => {
      const rect = node.getBoundingClientRect();
      const enter = smooth((vh - rect.top - 14) / Math.max(1,Math.min(170,vh*.21,rect.height*.8)));
      const leave = smooth((rect.bottom - navHeight - 5) / Math.max(1,Math.min(110,vh*.14,rect.height*.65)));
      const alpha = enter * leave;
      return { node, alpha, y: node.classList.contains('footer') ? 0 : 10*(1-enter)-6*(1-leave), scale: 1 };
    });
    frames.forEach(({node,alpha,y:offset,scale}) => {
      node.style.setProperty('--reveal-alpha', alpha.toFixed(3));
      node.style.setProperty('--reveal-y', `${offset.toFixed(2)}px`);
      node.style.setProperty('--reveal-scale', scale.toFixed(4));
    });
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(() => update()); };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? nearby.add(entry.target) : nearby.delete(entry.target));
      schedule();
    },{rootMargin:'60% 0px',threshold:0});
    revealNodes.forEach(node => observer.observe(node));
  } else {
    revealNodes.forEach(node => nearby.add(node));
  }
  // Start only once the visible positions are initialized, avoiding a hidden first frame.
  update(true);
  root.classList.add('motion-ready');
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', () => { pageHeight = root.scrollHeight; schedule(); }, {passive:true});
  addEventListener('pageshow', () => { pageHeight = root.scrollHeight; update(true); });
  if ('ResizeObserver' in window) new ResizeObserver(() => { pageHeight = root.scrollHeight; schedule(); }).observe(document.body);
  document.fonts?.ready.then(() => { alignInputConnector(); pageHeight = root.scrollHeight; update(true); });
  if ('ResizeObserver' in window && one('.request-stack')) new ResizeObserver(alignInputConnector).observe(one('.request-stack'));
  reducedMotion.addEventListener('change', () => update(true));
  topButton.addEventListener('click', () => scrollTo({top:0,behavior:reducedMotion.matches?'instant':'smooth'}));
})();
