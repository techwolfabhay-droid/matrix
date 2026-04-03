/* ── Navbar scroll ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ── Hamburger ── */
const ham = document.getElementById('ham');
const nl = document.getElementById('navLinks');
ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  nl.classList.toggle('open');
});
nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  ham.classList.remove('open');
  nl.classList.remove('open');
}));

/* ── Scroll Reveal ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.rv').forEach(el => obs.observe(el));

/* ── Counter animation ── */
function runCount(el) {
  const t = parseInt(el.dataset.t), d = 1800, s = t / (d / 16);
  let c = 0;
  const iv = setInterval(() => {
    c += s;
    if (c >= t) { el.textContent = t; clearInterval(iv); }
    else el.textContent = Math.floor(c);
  }, 16);
}
window.addEventListener('load', () => setTimeout(() => {
  document.querySelectorAll('.cnt').forEach(el => runCount(el));
}, 700));

/* ── Hero particles ── */
(function () {
  const con = document.getElementById('heroPts');
  const cols = ['#F97316', '#FBBF24', '#5BC8F5', 'rgba(255,255,255,0.5)', '#22C55E'];
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.className = 'pt';
    const sz = Math.random() * 5 + 2;
    p.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;bottom:-10px;
      background:${cols[Math.floor(Math.random() * cols.length)]};
      animation-duration:${Math.random() * 12 + 8}s;animation-delay:${Math.random() * 10}s;`;
    con.appendChild(p);
  }
})();

/* ── Active nav on scroll ── */
const secs = ['hero', 'services', 'solar', 'petroleum', 'why', 'process', 'projects', 'testimonials', 'contact'];
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 130) cur = id;
  });
  document.querySelectorAll('.nav__links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
}, { passive: true });

/* ── Project filter ── */
function fProj(cat, btn) {
  document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('act'));
  btn.classList.add('act');
  document.querySelectorAll('.proj').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.classList.remove('hid');
      item.style.display = '';
    } else {
      item.classList.add('hid');
      setTimeout(() => { if (item.classList.contains('hid')) item.style.display = 'none'; }, 350);
    }
  });
}

/* ── WhatsApp form submit ── */
function sendWA(e) {
  e.preventDefault();
  const name = document.getElementById('f_name').value.trim();
  const phone = document.getElementById('f_phone').value.trim();
  const service = document.getElementById('f_service').value;
  const budget = document.getElementById('f_budget').value;
  const city = document.getElementById('f_city').value.trim();
  const msg = document.getElementById('f_msg').value.trim();
  if (!name || !phone || !service || !city) {
    alert('Please fill all required fields (Name, Phone, Service, City).');
    return;
  }
  const text = `*Matrix Solar & Petroleum — New Enquiry*\n\n` +
    `👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n🔧 *Service:* ${service}\n` +
    `💰 *Budget:* ${budget || 'Not specified'}\n📍 *Location:* ${city}\n💬 *Message:* ${msg || '—'}`;
  /* ⚠️ Replace 91XXXXXXXXXX with actual WhatsApp number */
  window.open('https://wa.me/91XXXXXXXXXX?text=' + encodeURIComponent(text), '_blank');
}

