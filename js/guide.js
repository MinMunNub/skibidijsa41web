
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const fmt = n => `$${n.toFixed(2)}`;
const pic = (seed, w = 560, h = 340) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

document.addEventListener('DOMContentLoaded', () => {
  
  if (typeof buildHeader === 'function') buildHeader({ brandLink: 'index.html' });

  
  const builds = [
    
    {
      id: 'great-amd', section: 'streaming', title: 'Great AMD Gaming Build', price: 1061.82, tier: 'Mid 1080p/1440p',
      desc: 'Balanced AMD build for 1080p high & 1440p medium-high. Quiet, efficient, stream-ready.',
      notes: 'Prioritize GPU value & airflow.',
      parts: {
        CPU: 'AMD Ryzen 5 7600', Motherboard: 'B650 Micro ATX (DDR5)', Memory: '16 GB (2×8) DDR5-5600', Storage: '1 TB NVMe Gen4',
        GPU: 'RTX 3060 Ti / RX 6700 XT', Case: 'Montech XR ATX Mid Tower', PSU: '650W 80+ Bronze', Cooler: '120mm tower', OS: 'Windows 11 Home'
      }
    },
    {
      id: 'great-intel', section: 'streaming', title: 'Great Intel Gaming Build', price: 1111.81, tier: 'Mid 1080p/1440p',
      desc: 'Intel i5-14600K with a strong mid GPU. Great for mixed gaming/streaming workloads.',
      notes: 'Good upgrade path to higher GPU later.',
      parts: {
        CPU: 'Intel Core i5-14600K', Motherboard: 'B760 / Z690 ATX (DDR5)', Memory: '32 GB (2×16) DDR5-6000', Storage: '1 TB NVMe Gen4',
        GPU: 'RTX 4070 / RX 7800 XT', Case: 'Montech XR ATX Mid Tower', PSU: '750W 80+ Gold', Cooler: '240mm AIO', OS: 'Windows 11 Home'
      }
    },
    {
      id: 'excellent-amd', section: 'streaming', title: 'Excellent AMD Gaming/Streaming', price: 1211.27, tier: 'Upper Mid 1440p High',
      desc: 'Ryzen 5 9600 + 4070-class. High refresh 1440p and smooth streaming.',
      notes: 'Strong raster; solid thermals.',
      parts: {
        CPU: 'AMD Ryzen 5 9600', Motherboard: 'B650 ATX', Memory: '32 GB (2×16) DDR5-6000', Storage: '1 TB NVMe Gen4',
        GPU: 'RTX 4070 / RX 7800 XT', Case: 'LANCOOL 205M Mesh mATX', PSU: '750W 80+ Gold', Cooler: 'Dual-fan tower', OS: 'Windows 11 Home'
      }
    },
    {
      id: 'excellent-intel', section: 'streaming', title: 'Excellent Intel Gaming/Streaming', price: 1190.70, tier: 'Upper Mid 1440p High',
      desc: 'i5-14600K + 4070-class. Fantastic single-core & creator performance.',
      notes: 'Consider undervolt for acoustics.',
      parts: {
        CPU: 'Intel Core i5-14600K', Motherboard: 'B760 / Z690 ATX', Memory: '32 GB (2×16) DDR5-6000', Storage: '1 TB NVMe Gen4',
        GPU: 'RTX 4070', Case: 'LANCOOL 205M Mesh mATX', PSU: '750W 80+ Gold', Cooler: '240mm AIO', OS: 'Windows 11 Home'
      }
    },
    {
      id: 'enthusiast-amd', section: 'streaming', title: 'Enthusiast AMD Gaming/Streaming', price: 1487.33, tier: '1440p Ultra',
      desc: 'Ryzen 7 7700 + RX 7800 XT class for serious 1440p & streaming.',
      notes: 'Add 2TB NVMe for creator workloads.',
      parts: {
        CPU: 'AMD Ryzen 7 7700', Motherboard: 'B650E ATX', Memory: '32 GB (2×16) DDR5-6000', Storage: '1–2 TB NVMe Gen4',
        GPU: 'RX 7800 XT', Case: 'Phanteks XT PRO ULTRA ATX', PSU: '850W 80+ Gold', Cooler: '240/280mm AIO', OS: 'Windows 11 Pro'
      }
    },
    {
      id: 'enthusiast-intel', section: 'streaming', title: 'Enthusiast Intel Gaming/Streaming', price: 1524.10, tier: '1440p Ultra',
      desc: 'i7-13700K with 4070 Ti for top-tier 1440p & x264 streaming.',
      notes: 'Strong upgrade path to 4080.',
      parts: {
        CPU: 'Intel Core i7-13700K', Motherboard: 'Z790 ATX', Memory: '32 GB (2×16) DDR5-6400', Storage: '2 TB NVMe Gen4',
        GPU: 'RTX 4070 Ti', Case: 'Phanteks XT PRO ULTRA ATX', PSU: '850W 80+ Gold', Cooler: '360mm AIO', OS: 'Windows 11 Pro'
      }
    },
    {
      id: 'magnificent-amd', section: 'streaming', title: 'Magnificent AMD Gaming/Streaming', price: 2079.60, tier: '4K Ready',
      desc: '7800X3D + RX 7900 XTX for monster raster; great 4K & high-FPS 1440p.',
      notes: 'Mind case airflow for GPU thermals.',
      parts: {
        CPU: 'AMD Ryzen 7 7800X3D', Motherboard: 'X670E ATX', Memory: '32–64 GB DDR5-6000', Storage: '2 TB NVMe Gen4',
        GPU: 'RX 7900 XTX', Case: 'Corsair 4000D Airflow', PSU: '850–1000W 80+ Gold', Cooler: '360mm AIO', OS: 'Windows 11 Pro'
      }
    },
    {
      id: 'magnificent-intel', section: 'streaming', title: 'Magnificent Intel Gaming/Streaming', price: 2449.00, tier: '4K Ready',
      desc: 'i7-14700K + RTX 4080 SUPER for efficient 4K & creator workloads.',
      notes: 'Pair with a 4K/120Hz VRR display.',
      parts: {
        CPU: 'Intel Core i7-14700K', Motherboard: 'Z790 ATX', Memory: '32–64 GB DDR5-6400', Storage: '2 TB NVMe Gen4',
        GPU: 'RTX 4080 SUPER', Case: 'Corsair 3500X ARGB ATX', PSU: '850–1000W 80+ Gold', Cooler: '360mm AIO', OS: 'Windows 11 Pro'
      }
    },

    
    {
      id: 'entry-amd', section: 'gaming', title: 'Entry Level AMD Gaming Build', price: 681.40, tier: 'Entry 1080p',
      desc: 'Budget AMD rig focused on esports + lighter AAA at 1080p.',
      notes: 'Upgrade GPU first later.',
      parts: {
        CPU: 'AMD Ryzen 5 5600', Motherboard: 'B550 mATX', Memory: '16 GB (2×8) DDR4-3200', Storage: '500 GB NVMe',
        GPU: 'RX 6600', Case: 'Cooler Master Q300L V2 mATX', PSU: '550W 80+ Bronze', Cooler: 'Stock', OS: 'Windows 11 Home'
      }
    },
    {
      id: 'entry-intel', section: 'gaming', title: 'Entry Level Intel Gaming Build', price: 690.64, tier: 'Entry 1080p',
      desc: 'Core i3-14100F based value build for 1080p esports.',
      notes: 'Easy RAM/GPU upgrades.',
      parts: {
        CPU: 'Intel Core i3-14100F', Motherboard: 'B760M mATX (DDR5)', Memory: '16 GB (2×8) DDR5-5600', Storage: '500 GB NVMe',
        GPU: 'Arc A580 / GTX 1660 Super', Case: 'Cooler Master Q300L V2 mATX', PSU: '550W 80+ Bronze', Cooler: 'Stock', OS: 'Windows 11 Home'
      }
    },
    {
      id: 'modest-amd', section: 'gaming', title: 'Modest AMD Gaming Build', price: 875.08, tier: 'Mid 1080p Ultra / 1440p Medium',
      desc: '5600X + RX 7600 XT for strong 1080p and starter 1440p.',
      notes: 'Add 1 TB SSD if budget allows.',
      parts: {
        CPU: 'AMD Ryzen 5 5600X', Motherboard: 'B550 mATX', Memory: '16 GB (2×8) DDR4-3600', Storage: '1 TB NVMe Gen3',
        GPU: 'RX 7600 XT', Case: 'NZXT H3 Flow mATX', PSU: '650W 80+ Bronze', Cooler: 'Tower air', OS: 'Windows 11 Home'
      }
    },
    {
      id: 'modest-intel', section: 'gaming', title: 'Modest Intel Gaming Build', price: 923.56, tier: 'Mid 1080p Ultra / 1440p Medium',
      desc: 'i5-12600KF paired with RX 7600 XT for smooth 1080p.',
      notes: 'Plenty of headroom on LGA1700.',
      parts: {
        CPU: 'Intel Core i5-12600KF', Motherboard: 'B660 / B760 mATX', Memory: '32 GB (2×16) DDR4-3200', Storage: '1 TB NVMe Gen3',
        GPU: 'RX 7600 XT', Case: 'NZXT H3 Flow mATX', PSU: '650W 80+ Bronze', Cooler: 'Tower air', OS: 'Windows 11 Home'
      }
    },
    {
      id: 'mainstream-amd', section: 'gaming', title: 'Mainstream AMD Gaming Build', price: 1189.90, tier: '1440p High',
      desc: 'Ryzen 5 7600 + RX 7700 XT is the 1440p sweet spot.',
      notes: 'Consider 2TB if you play many AAA titles.',
      parts: {
        CPU: 'AMD Ryzen 5 7600', Motherboard: 'B650 ATX', Memory: '32 GB (2×16) DDR5-6000', Storage: '1 TB NVMe Gen4',
        GPU: 'RX 7700 XT', Case: 'Fractal Pop Air ATX', PSU: '750W 80+ Gold', Cooler: 'Dual-fan tower', OS: 'Windows 11 Home'
      }
    },
    {
      id: 'mainstream-intel', section: 'gaming', title: 'Mainstream Intel Gaming Build', price: 1249.99, tier: '1440p High',
      desc: 'i5-13400F + RTX 4060 Ti for balanced 1440p.',
      notes: 'DLSS 3 helps in newer games.',
      parts: {
        CPU: 'Intel Core i5-13400F', Motherboard: 'B760 ATX', Memory: '32 GB (2×16) DDR5-5600', Storage: '1 TB NVMe Gen4',
        GPU: 'RTX 4060 Ti (16 GB if budget)', Case: 'Fractal Pop Air ATX', PSU: '750W 80+ Gold', Cooler: '240mm AIO / strong air', OS: 'Windows 11 Home'
      }
    },
  ];

  
  const makeCard = b => `
    <article class="card build" data-id="${b.id}" tabindex="0" aria-label="${b.title}">
      <img src="${pic(b.id)}" alt="${b.title}">
      <div class="card-head">
        <h4>${b.title}</h4>
        <span class="muted">${b.tier}</span>
      </div>
      <p class="muted">${b.desc}</p>
      <div class="foot">
        <span class="btn tiny" style="pointer-events:none;">${fmt(b.price)}</span>
        <span class="btn primary tiny">View</span>
      </div>
    </article>
  `;

  $('#grid-streaming').innerHTML = builds.filter(b => b.section === 'streaming').map(makeCard).join('');
  $('#grid-gaming').innerHTML = builds.filter(b => b.section === 'gaming').map(makeCard).join('');


  const dlg = $('#guideDialog');
  const dlgTitle = $('#dlg-title');
  const dlgHero = $('#dlg-hero');
  const dlgDesc = $('#dlg-desc');
  const dlgPrice = $('#dlg-price');
  const dlgTier = $('#dlg-tier');
  const dlgNotes = $('#dlg-notes');
  const dlgParts = $('#dlg-parts');

  function openGuide(b) {
    dlgTitle.textContent = b.title;
    dlgHero.src = pic(`${b.id}-hero`, 1200, 420);
    dlgHero.alt = b.title;
    dlgHero.style.display = 'block';
    dlgDesc.textContent = b.desc;
    dlgPrice.textContent = fmt(b.price);
    dlgTier.textContent = b.tier;
    dlgNotes.textContent = b.notes || '—';
    dlgParts.innerHTML = Object.entries(b.parts)
      .map(([k, v]) => `<li style="border:1px solid var(--card-border);border-radius:10px;padding:10px 12px;"><b>${k}</b>: ${v}</li>`)
      .join('');
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
  }

  $$('.card.build').forEach(el => {
    const data = builds.find(b => b.id === el.dataset.id);
    el.addEventListener('click', () => openGuide(data));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGuide(data); }
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && dlg.hasAttribute('open')) dlg.close();
  });
});
