// ============================================
// F1 INSIGHT 2026 – SHARED DATA & UTILITIES
// ============================================

const F1Data = {
  // ─── TEAMS ───
  teams: [
    { id: 'rbr', name: 'Red Bull Racing', abbr: 'RBR', color: '#3671C6', drivers: ['VER', 'HAD'], car: '/assets/legacy/Car models/red bull car.png' },
    { id: 'mcl', name: 'McLaren F1 Team', abbr: 'MCL', color: '#FF8700', drivers: ['NOR', 'PIA'], car: '/assets/legacy/Car models/mc laren car.png' },
    { id: 'fer', name: 'Scuderia Ferrari', abbr: 'FER', color: '#E8002D', drivers: ['LEC', 'HAM'], car: '/assets/legacy/Car models/ferrari car.png' },
    { id: 'mer', name: 'Mercedes-AMG F1', abbr: 'MER', color: '#27F4D2', drivers: ['RUS', 'ANT'], car: '/assets/legacy/Car models/mercedes car.png' },
    { id: 'amr', name: 'Aston Martin F1', abbr: 'AMR', color: '#229971', drivers: ['ALO', 'STR'], car: '/assets/legacy/Car models/aston martin car.png' },
    { id: 'wil', name: 'Williams Racing', abbr: 'WIL', color: '#64C4FF', drivers: ['ALB', 'SAI'], car: '/assets/legacy/Car models/williams car.png' },
    { id: 'alp', name: 'Alpine F1 Team', abbr: 'ALP', color: '#0093CC', drivers: ['GAS', 'COL'], car: '/assets/legacy/Car models/alpine car.png' },
    { id: 'haa', name: 'Haas F1 Team', abbr: 'HAA', color: '#B6BABD', drivers: ['OCO', 'BEA'], car: '/assets/legacy/Car models/haas car.png' },
    { id: 'aud', name: 'Audi F1 Team', abbr: 'AUD', color: '#00E701', drivers: ['HUL', 'BOR'], car: '/assets/legacy/Car models/audi car.png' },
    { id: 'rcb', name: 'Racing Bulls', abbr: 'RCB', color: '#6692FF', drivers: ['LAW', 'LIN'], car: '/assets/legacy/Car models/racing bulls car.png' },
    { id: 'cad', name: 'Cadillac F1 Team', abbr: 'CAD', color: '#C5A04F', drivers: ['PER', 'BOT'], car: '/assets/legacy/Car models/cadillac car.png' },
  ],

  // ─── DRIVERS (22 exact) ───
  drivers: [
    { code: 'VER', name: 'Max Verstappen', team: 'rbr', num: 1, pos: 1, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 18.5, recent: ['—', '—', '—', '—', '—'] },
    { code: 'HAD', name: 'Isack Hadjar', team: 'rbr', num: 20, pos: 12, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 2.1, recent: ['—', '—', '—', '—', '—'] },
    { code: 'NOR', name: 'Lando Norris', team: 'mcl', num: 4, pos: 2, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 16.2, recent: ['—', '—', '—', '—', '—'] },
    { code: 'PIA', name: 'Oscar Piastri', team: 'mcl', num: 81, pos: 5, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 8.4, recent: ['—', '—', '—', '—', '—'] },
    { code: 'LEC', name: 'Charles Leclerc', team: 'fer', num: 16, pos: 3, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 14.8, recent: ['—', '—', '—', '—', '—'] },
    { code: 'HAM', name: 'Lewis Hamilton', team: 'fer', num: 44, pos: 4, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 11.3, recent: ['—', '—', '—', '—', '—'] },
    { code: 'RUS', name: 'George Russell', team: 'mer', num: 63, pos: 6, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 7.8, recent: ['—', '—', '—', '—', '—'] },
    { code: 'ANT', name: 'Kimi Antonelli', team: 'mer', num: 12, pos: 10, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 3.5, recent: ['—', '—', '—', '—', '—'] },
    { code: 'ALO', name: 'Fernando Alonso', team: 'amr', num: 14, pos: 8, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 3.2, recent: ['—', '—', '—', '—', '—'] },
    { code: 'STR', name: 'Lance Stroll', team: 'amr', num: 18, pos: 15, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 0.8, recent: ['—', '—', '—', '—', '—'] },
    { code: 'ALB', name: 'Alexander Albon', team: 'wil', num: 23, pos: 11, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 2.4, recent: ['—', '—', '—', '—', '—'] },
    { code: 'SAI', name: 'Carlos Sainz Jr.', team: 'wil', num: 55, pos: 7, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 4.1, recent: ['—', '—', '—', '—', '—'] },
    { code: 'GAS', name: 'Pierre Gasly', team: 'alp', num: 10, pos: 9, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 2.0, recent: ['—', '—', '—', '—', '—'] },
    { code: 'COL', name: 'Franco Colapinto', team: 'alp', num: 43, pos: 17, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 0.5, recent: ['—', '—', '—', '—', '—'] },
    { code: 'OCO', name: 'Esteban Ocon', team: 'haa', num: 31, pos: 14, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 0.9, recent: ['—', '—', '—', '—', '—'] },
    { code: 'BEA', name: 'Oliver Bearman', team: 'haa', num: 87, pos: 16, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 0.7, recent: ['—', '—', '—', '—', '—'] },
    { code: 'HUL', name: 'Nico Hülkenberg', team: 'aud', num: 27, pos: 13, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 1.2, recent: ['—', '—', '—', '—', '—'] },
    { code: 'BOR', name: 'Gabriel Bortoleto', team: 'aud', num: 5, pos: 18, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 0.4, recent: ['—', '—', '—', '—', '—'] },
    { code: 'LAW', name: 'Liam Lawson', team: 'rcb', num: 30, pos: 19, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 0.5, recent: ['—', '—', '—', '—', '—'] },
    { code: 'LIN', name: 'Arvid Lindblad', team: 'rcb', num: 40, pos: 20, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 0.3, recent: ['—', '—', '—', '—', '—'] },
    { code: 'PER', name: 'Sergio Pérez', team: 'cad', num: 11, pos: 21, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 0.2, recent: ['—', '—', '—', '—', '—'] },
    { code: 'BOT', name: 'Valtteri Bottas', team: 'cad', num: 77, pos: 22, pts: 0, wins: 0, podiums: 0, dnfs: 0, poles: 0, fastLaps: 0, winProb: 0.1, recent: ['—', '—', '—', '—', '—'] },
  ],

  // ─── CIRCUITS (2026 Calendar) ───
  circuits: [
    { round: 1, name: 'Australian Grand Prix', location: 'Melbourne', country: 'Australia', date: 'Mar 16', laps: 58, length: '5.278 km', type: 'Street/Park' },
    { round: 2, name: 'Chinese Grand Prix', location: 'Shanghai', country: 'China', date: 'Mar 23', laps: 56, length: '5.451 km', type: 'Technical' },
    { round: 3, name: 'Japanese Grand Prix', location: 'Suzuka', country: 'Japan', date: 'Apr 6', laps: 53, length: '5.807 km', type: 'High-Speed' },
    { round: 4, name: 'Bahrain Grand Prix', location: 'Sakhir', country: 'Bahrain', date: 'Apr 13', laps: 57, length: '5.412 km', type: 'Technical' },
    { round: 5, name: 'Saudi Arabian Grand Prix', location: 'Jeddah', country: 'Saudi Arabia', date: 'Apr 20', laps: 50, length: '6.174 km', type: 'Street' },
    { round: 6, name: 'Miami Grand Prix', location: 'Miami', country: 'USA', date: 'May 4', laps: 57, length: '5.412 km', type: 'Street' },
    { round: 7, name: 'Emilia Romagna Grand Prix', location: 'Imola', country: 'Italy', date: 'May 18', laps: 63, length: '4.909 km', type: 'Technical' },
    { round: 8, name: 'Monaco Grand Prix', location: 'Monte Carlo', country: 'Monaco', date: 'May 25', laps: 78, length: '3.337 km', type: 'Street' },
    { round: 9, name: 'Spanish Grand Prix', location: 'Barcelona', country: 'Spain', date: 'Jun 1', laps: 66, length: '4.675 km', type: 'Technical' },
    { round: 10, name: 'Canadian Grand Prix', location: 'Montreal', country: 'Canada', date: 'Jun 15', laps: 70, length: '4.361 km', type: 'Street' },
    { round: 11, name: 'Austrian Grand Prix', location: 'Spielberg', country: 'Austria', date: 'Jun 29', laps: 71, length: '4.318 km', type: 'High-Speed' },
    { round: 12, name: 'British Grand Prix', location: 'Silverstone', country: 'UK', date: 'Jul 6', laps: 52, length: '5.891 km', type: 'High-Speed' },
    { round: 13, name: 'Belgian Grand Prix', location: 'Spa', country: 'Belgium', date: 'Jul 27', laps: 44, length: '7.004 km', type: 'High-Speed' },
    { round: 14, name: 'Hungarian Grand Prix', location: 'Budapest', country: 'Hungary', date: 'Aug 3', laps: 70, length: '4.381 km', type: 'Technical' },
    { round: 15, name: 'Dutch Grand Prix', location: 'Zandvoort', country: 'Netherlands', date: 'Aug 31', laps: 72, length: '4.259 km', type: 'Technical' },
    { round: 16, name: 'Italian Grand Prix', location: 'Monza', country: 'Italy', date: 'Sep 7', laps: 53, length: '5.793 km', type: 'High-Speed' },
    { round: 17, name: 'Azerbaijan Grand Prix', location: 'Baku', country: 'Azerbaijan', date: 'Sep 21', laps: 51, length: '6.003 km', type: 'Street' },
    { round: 18, name: 'Singapore Grand Prix', location: 'Marina Bay', country: 'Singapore', date: 'Oct 5', laps: 62, length: '4.940 km', type: 'Street' },
    { round: 19, name: 'United States Grand Prix', location: 'Austin', country: 'USA', date: 'Oct 19', laps: 56, length: '5.513 km', type: 'Technical' },
    { round: 20, name: 'Mexico City Grand Prix', location: 'Mexico City', country: 'Mexico', date: 'Oct 26', laps: 71, length: '4.304 km', type: 'Technical' },
    { round: 21, name: 'São Paulo Grand Prix', location: 'Interlagos', country: 'Brazil', date: 'Nov 9', laps: 71, length: '4.309 km', type: 'Technical' },
    { round: 22, name: 'Las Vegas Grand Prix', location: 'Las Vegas', country: 'USA', date: 'Nov 22', laps: 50, length: '6.201 km', type: 'Street' },
    { round: 23, name: 'Qatar Grand Prix', location: 'Lusail', country: 'Qatar', date: 'Nov 30', laps: 57, length: '5.419 km', type: 'High-Speed' },
    { round: 24, name: 'Abu Dhabi Grand Prix', location: 'Yas Marina', country: 'UAE', date: 'Dec 7', laps: 58, length: '5.281 km', type: 'Technical' },
  ],

  // ─── CAR PERFORMANCE (per team, 0-100 scale) ───
  carPerformance: {
    rbr: { downforce: 94, dragEff: 91, ers: 92, highSpeed: 95, street: 88, technical: 93 },
    mcl: { downforce: 92, dragEff: 93, ers: 90, highSpeed: 93, street: 91, technical: 91 },
    fer: { downforce: 93, dragEff: 89, ers: 94, highSpeed: 90, street: 92, technical: 92 },
    mer: { downforce: 90, dragEff: 90, ers: 91, highSpeed: 91, street: 87, technical: 89 },
    amr: { downforce: 86, dragEff: 85, ers: 84, highSpeed: 84, street: 82, technical: 85 },
    wil: { downforce: 83, dragEff: 84, ers: 82, highSpeed: 85, street: 80, technical: 81 },
    alp: { downforce: 82, dragEff: 83, ers: 80, highSpeed: 82, street: 81, technical: 80 },
    haa: { downforce: 79, dragEff: 78, ers: 77, highSpeed: 80, street: 76, technical: 78 },
    aud: { downforce: 80, dragEff: 80, ers: 83, highSpeed: 79, street: 77, technical: 79 },
    rcb: { downforce: 81, dragEff: 81, ers: 79, highSpeed: 83, street: 79, technical: 80 },
    cad: { downforce: 75, dragEff: 74, ers: 73, highSpeed: 76, street: 74, technical: 74 },
  },

  // ─── CONSTRUCTOR STATS ───
  constructorStats: {
    rbr: { pts: 0, wins: 0, podiums: 0, poles: 0, oneTwo: 0, reliability: 96.2, budget: 94.5 },
    mcl: { pts: 0, wins: 0, podiums: 0, poles: 0, oneTwo: 0, reliability: 94.8, budget: 92.1 },
    fer: { pts: 0, wins: 0, podiums: 0, poles: 0, oneTwo: 0, reliability: 93.5, budget: 97.8 },
    mer: { pts: 0, wins: 0, podiums: 0, poles: 0, oneTwo: 0, reliability: 95.1, budget: 93.4 },
    amr: { pts: 0, wins: 0, podiums: 0, poles: 0, oneTwo: 0, reliability: 91.3, budget: 88.7 },
    wil: { pts: 0, wins: 0, podiums: 0, poles: 0, oneTwo: 0, reliability: 90.2, budget: 82.3 },
    alp: { pts: 0, wins: 0, podiums: 0, poles: 0, oneTwo: 0, reliability: 88.7, budget: 85.6 },
    haa: { pts: 0, wins: 0, podiums: 0, poles: 0, oneTwo: 0, reliability: 87.4, budget: 78.2 },
    aud: { pts: 0, wins: 0, podiums: 0, poles: 0, oneTwo: 0, reliability: 85.9, budget: 91.0 },
    rcb: { pts: 0, wins: 0, podiums: 0, poles: 0, oneTwo: 0, reliability: 89.1, budget: 79.5 },
    cad: { pts: 0, wins: 0, podiums: 0, poles: 0, oneTwo: 0, reliability: 83.5, budget: 76.8 },
  },

  // Helper to get team by id
  getTeam(id) { return this.teams.find(t => t.id === id); },
  getTeamColor(id) { return this.getTeam(id)?.color || '#fff'; },
  getTeamName(id) { return this.getTeam(id)?.name || id; },
  getTeamAbbr(id) { return this.getTeam(id)?.abbr || id.toUpperCase(); },
  getDriversByTeam(teamId) { return this.drivers.filter(d => d.team === teamId); },
  getSortedDrivers() { return [...this.drivers].sort((a, b) => a.pos - b.pos); },
};

// ─── Navigation HTML Generator ───
function renderNavbar(activePage) {
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'drivers.html', label: 'Drivers' },
    { href: 'teams.html', label: 'Teams' },
    { href: 'cars.html', label: 'Cars' },
    { href: 'circuits.html', label: 'Circuits' },
    { href: 'regulations.html', label: 'Regulations' },
    { href: 'compare.html', label: 'Compare' },
    { href: 'race-weekend.html', label: 'Live Race' },
    { href: 'predictions.html', label: 'Predictions' },
    { href: 'legacy.html', label: 'Legacy' },
  ];
  const links = pages.map(p =>
    `<a href="${p.href}" class="${p.href === activePage ? 'active' : ''}">${p.label}</a>`
  ).join('');

  return `
  <nav class="navbar">
    <a href="index.html" class="nav-brand">
      <span class="nav-brand-bar"></span>
      <span class="nav-brand-text">F1 INSIGHT</span>
    </a>
    <div class="nav-links">${links}</div>
    <div class="nav-search">
      <span class="nav-search-icon">🔍</span>
      <input type="text" placeholder="Search drivers, teams..." />
    </div>
    <div class="nav-notifications" id="nav-notifications-container">
      <!-- Notification bell will go here -->
    </div>
    <div class="nav-auth" id="nav-auth-container">
      <!-- Auth state will be injected here by auth.js -->
    </div>
  </nav>
  <div class="scroll-progress"><div id="scroll-progress-bar"></div></div>`;
}

// ─── Footer HTML Generator ───
function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-brand">
        <span class="footer-brand-bar"></span>
        <span class="footer-brand-text">F1 INSIGHT 2026</span>
      </div>
      <ul class="footer-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="drivers.html">Drivers</a></li>
        <li><a href="teams.html">Teams</a></li>
        <li><a href="cars.html">Cars</a></li>
        <li><a href="circuits.html">Circuits</a></li>
        <li><a href="regulations.html">Regulations</a></li>
        <li><a href="predictions.html">Predictions</a></li>
        <li><a href="legacy.html">Legacy</a></li>
      </ul>
      <p class="footer-disclaimer">© 2026 F1 Insight. Data is simulated for demonstration purposes. Not affiliated with Formula 1.</p>
    </div>
  </footer>`;
}

// ─── Countdown Timer ───
function initCountdown(targetDate, elementId) {
  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance < 0) return;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);
    const el = document.getElementById(elementId);
    if (el) {
      el.querySelector('.cd-days').textContent = String(days).padStart(2, '0');
      el.querySelector('.cd-hours').textContent = String(hours).padStart(2, '0');
      el.querySelector('.cd-mins').textContent = String(mins).padStart(2, '0');
      el.querySelector('.cd-secs').textContent = String(secs).padStart(2, '0');
    }
  }
  update();
  setInterval(update, 1000);
}

// ─── Animated Progress Bars ───
function animateProgressBars() {
  const bars = document.querySelectorAll('.progress-bar[data-width]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => { bar.style.width = '0%'; observer.observe(bar); });
}

// ─── Animate Elements ───
function animateOnScroll() {
  const els = document.querySelectorAll('.animate-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => { el.style.animationPlayState = 'paused'; observer.observe(el); });
}

// ─── Global Scroll Reveal ───
function initGlobalScrollReveal() {
  // Automatically tag target elements if they aren't explicitly tagged
  const targets = document.querySelectorAll('.glass-card, .stat-card, .section-title, .editorial-article, .timeline-item, .hero-content');
  targets.forEach(el => el.classList.add('reveal-on-scroll'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

// ─── Scroll Progress Indicator ───
function initScrollProgress() {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const bar = document.getElementById('scroll-progress-bar');
        if (bar) bar.style.width = scrolled + '%';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// Auto-initialize global scripts
document.addEventListener('DOMContentLoaded', () => {
  initGlobalScrollReveal();
  initScrollProgress();
});

// ─── Tab Switching ───
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.tab-group');
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
}

// ============================================
// F1 LEGACY DATA
// ============================================

F1Data.legacy = {
  // ─── TIMELINE ───
  timeline: [
    { year: '1950', title: 'First Official F1 Championship', desc: 'The FIA Formula One World Championship officially began at Silverstone, UK. Giuseppe Farina won the inaugural race driving an Alfa Romeo, eventually securing the first world title.', insight: 'Established the foundation of global motorsport.', image: '/assets/legacy/timeline/timeline_1950_silverstone.webp', era: 'The Pioneers', tags: ['Alfa Romeo', 'Farina', 'Silverstone'] },
    { year: '1961–1965', title: 'The Jim Clark Era', desc: 'Jim Clark and Lotus revolutionized the sport with the monocoque chassis. Clark secured two world championships and redefined the standards of natural driving talent.', insight: 'Pioneered lightweight, aerodynamic car design.', image: '/assets/legacy/timeline/timeline_1963_clark.webp', era: 'Rear-Engine Revolution', tags: ['Lotus', 'Jim Clark', 'Monocoque'] },
    { year: '1976', title: 'Lauda vs Hunt', desc: "One of sport's greatest rivalries. Niki Lauda returned just weeks after a near-fatal fiery crash at the Nürburgring to battle playboy James Hunt for the title, ultimately decided by a single point in Japan.", insight: 'Brought F1 into the global mainstream consciousness.', image: '/assets/legacy/timeline/timeline_1976_lauda_hunt.webp', era: 'The Danger Era', tags: ['Ferrari', 'McLaren', 'Lauda', 'Hunt'] },
    { year: '1988', title: 'McLaren MP4/4 Dominance', desc: 'Ayrton Senna and Alain Prost won 15 out of 16 races in the legendary Honda-powered McLaren MP4/4, a record of dominance that stood for decades.', insight: 'Set the benchmark for absolute team perfection.', image: '/assets/legacy/timeline/timeline_1988_mp44.webp', era: 'Turbo Era', tags: ['McLaren', 'Honda', 'Senna', 'Prost'] },
    { year: '1994', title: 'Tragedy at Imola', desc: 'The fatal crashes of Ayrton Senna and Roland Ratzenberger during the San Marino Grand Prix weekend shocked the world and forever changed Formula 1.', insight: 'Triggered a massive, permanent safety revolution in F1.', image: '/assets/legacy/timeline/timeline_1994_imola.webp', era: 'Safety Revolution', tags: ['Williams', 'Senna', 'Ratzenberger', 'Imola'] },
    { year: '2008', title: 'Hamilton Wins by One Point', desc: 'In a dramatic rain-soaked Brazilian finale, Lewis Hamilton passed Timo Glock on the final corner of the final lap to win his first world championship by a single point over local hero Felipe Massa.', insight: 'The most dramatic championship decider in modern history.', image: '/assets/legacy/timeline/timeline_2008_brazil.webp', era: 'V8 Era', tags: ['McLaren', 'Ferrari', 'Hamilton', 'Massa'] },
    { year: '2010–2013', title: 'Vettel & Red Bull Era', desc: 'Sebastian Vettel and Red Bull Racing claimed four consecutive double world championships, mastering blown diffusers and high-downforce aerodynamics.', insight: 'Established Red Bull as a historic powerhouse.', image: '/assets/legacy/timeline/timeline_2010_vettel.webp', era: 'Aerodynamic Era', tags: ['Red Bull', 'Vettel', 'Newey'] },
    { year: '2014', title: 'The Hybrid Era Begins', desc: 'F1 introduced 1.6-liter V6 turbo-hybrid power units. Mercedes absolutely dominated, launching an unprecedented era of success and pushing automotive efficiency to new heights.', insight: 'Aligned F1 with global road-car technology trends.', image: '/assets/legacy/timeline/timeline_2014_hybrid.webp', era: 'Turbo-Hybrid Era', tags: ['Mercedes', 'Hamilton', 'Rosberg', 'Hybrid'] },
    { year: '2021', title: 'Abu Dhabi Title Decider', desc: 'Max Verstappen and Lewis Hamilton entered the final race tied on points. A controversial late safety car restart led to a last-lap shootout, with Verstappen taking his maiden title.', insight: 'A polarizing moment that ignited a massive new global fanbase.', image: '/assets/legacy/timeline/timeline_2021_abudhabi.webp', era: 'Ground Effect Era', tags: ['Red Bull', 'Mercedes', 'Verstappen', 'Hamilton'] },
    {
      year: '2026', title: 'The New Power Revolution', desc: 'F1 shifts to 50% electric power, 100% sustainable fuels, and active aerodynamics. Smaller, lighter cars aim to bring back closer racing while pushing extreme sustainability.', insight: "F1's leap toward a net-zero carbon future.", image: '/assets/legacy/timeline/timeline_2026_concept.webp', era: 'Sustainable Era', tags: ['Active Aero', 'Sustainable Fuel', '50% Electric']
    }
  ],

  // ─── RIVALRIES ───
  rivalries: [
    { driver1: 'Senna', driver2: 'Prost', img1: '/assets/legacy/rivalries/portrait_senna.png', img2: '/assets/legacy/rivalries/portrait_prost.png', summary: 'The most intense teammate battle in history. Peak raw speed vs calculating intelligence.', championshipImpact: 'Defined the late 80s and early 90s, splitting six titles between them from 1985 to 1991.', era: 'Late 80s/Early 90s', tags: ['McLaren', 'Suzuka Crash'] },
    { driver1: 'Lauda', driver2: 'Hunt', img1: '/assets/legacy/rivalries/portrait_lauda.png', img2: '/assets/legacy/rivalries/portrait_hunt.png', summary: '1976: The disciplined Austrian computer vs the charismatic British playboy.', championshipImpact: 'A legendary one-point championship decider in treacherous conditions in Japan 1976.', era: '1976', tags: ['Ferrari', 'McLaren', 'Nürburgring'] },
    { driver1: 'Hamilton', driver2: 'Rosberg', img1: '/assets/legacy/rivalries/portrait_hamilton_mercedes.png', img2: '/assets/legacy/rivalries/portrait_rosberg.png', summary: 'Childhood friends turned bitter enemies as Mercedes dominated the early hybrid era.', championshipImpact: "Decided the 2014 and 2016 drivers' championships in final-race showdowns in Abu Dhabi.", era: 'Early Hybrid Era', tags: ['Mercedes', 'Silver War'] },
    { driver1: 'Verstappen', driver2: 'Hamilton', img1: '/assets/legacy/rivalries/portrait_verstappen.png', img2: '/assets/legacy/rivalries/portrait_hamilton.png', summary: '2021: Generational clash of the seven-time champion vs the relentless young lion.', championshipImpact: 'One of the most fiercely contested seasons ever, culminating in a controversial last-lap pass.', era: '2021', tags: ['Red Bull', 'Mercedes', 'Abu Dhabi'] }
  ],

  // ─── HISTORIC CARS ───
  historicCars: [
    { name: 'Ferrari 312T', innovation: 'Transverse Gearbox', description: 'Redefined handling and weight distribution, winning four constructors titles in the 1970s under Niki Lauda and Jody Scheckter.', image: '/assets/legacy/cars/car_ferrari_312t.png', era: '1975-1980', tags: ['Ferrari', 'Lauda', 'V12'] },
    { name: 'McLaren MP4/4', innovation: 'Low-slung Aerodynamics', description: "Gordon Murray's masterpiece won 15 of 16 races in 1988, powered by a dominant, ultra-compact Honda V6 turbo engine.", image: '/assets/legacy/cars/car_mclaren_mp44.png', era: '1988', tags: ['McLaren', 'Senna', 'Prost'] },
    { name: 'Williams FW14B', innovation: 'Active Suspension', description: 'The most technologically advanced car of its time, dominating 1992 with computer-controlled active suspension and traction control.', image: '/assets/legacy/cars/car_williams_fw14b.png', era: '1992', tags: ['Williams', 'Mansell', 'Active Suspension'] },
    { name: 'Brawn BGP 001', innovation: 'Double Diffuser', description: 'A genius interpretation of the 2009 regulations led to a massive downforce advantage and a fairy-tale championship for the new team.', image: '/assets/legacy/cars/car_brawn_bgp001.png', era: '2009', tags: ['Brawn GP', 'Button', 'Double Diffuser'] },
    { name: 'Red Bull RB19', innovation: 'Ground Effect Mastery', description: 'The most statistically successful car ever built, winning an incredible 21 of 22 races in the 2023 season under Max Verstappen.', image: '/assets/legacy/cars/car_redbull_rb19.png', era: '2023', tags: ['Red Bull', 'Verstappen', 'Ground Effect'] },
    { name: '2026 Concept', innovation: 'Active Aero & 50% EV', description: 'The next generation: radically smaller, 30kg lighter, with adjustable aero wings and pure sustainable fuels.', image: '/assets/legacy/cars/car_2026_concept.png', era: '2026', tags: ['FIA', 'Sustainable', 'Active Aero'] }
  ],

  // ─── LEGENDS HALL ───
  legends: [
    { name: 'Michael Schumacher', titles: 7, highlightStats: '91 Wins | The Red Baron', quote: '"Once something is a passion, the motivation is there."', image: '/assets/legacy/drivers/portrait_schumacher.png', era: '1991-2012', tags: ['Ferrari', 'Benetton', 'Legend'] },
    { name: 'Lewis Hamilton', titles: 7, highlightStats: '100+ Wins | Statistical GOAT', quote: '"Still I rise."', image: '/assets/legacy/drivers/portrait_hamilton_hall.png', era: '2007-Present', tags: ['Mercedes', 'McLaren', 'Ferrari'] },
    { name: 'Juan Manuel Fangio', titles: 5, highlightStats: '24 Wins | The Maestro', quote: '"You must always strive to be the best, but you must never believe that you are."', image: '/assets/legacy/drivers/portrait_fangio.png', era: '1950s', tags: ['Alfa Romeo', 'Maserati', 'Mercedes', 'Ferrari'] },
    { name: 'Alain Prost', titles: 4, highlightStats: '51 Wins | The Professor', quote: '"Good decision making is about choosing the right risk."', image: '/assets/legacy/drivers/portrait_prost_hall.png', era: '1980-1993', tags: ['McLaren', 'Williams', 'Renault', 'Ferrari'] },
    { name: 'Sebastian Vettel', titles: 4, highlightStats: '53 Wins | The Youngest Champ', quote: '"Everybody is a Ferrari fan. Even if they say they\'re not, they are Ferrari fans."', image: '/assets/legacy/drivers/portrait_vettel.png', era: '2007-2022', tags: ['Red Bull', 'Ferrari', 'Aston Martin'] },
    { name: 'Ayrton Senna', titles: 3, highlightStats: '41 Wins | The Magic', quote: '"If you no longer go for a gap that exists, you are no longer a racing driver."', image: '/assets/legacy/drivers/portrait_senna_hall.png', era: '1984-1994', tags: ['McLaren', 'Lotus', 'Williams'] },
    { name: 'Niki Lauda', titles: 3, highlightStats: '25 Wins | The Phoenix', quote: '"A wise man can learn more from his enemies than a fool from his friends."', image: '/assets/legacy/drivers/portrait_lauda_hall.png', era: '1971-1985', tags: ['Ferrari', 'McLaren', 'Brabham'] }
  ],

  // ─── CULTURE ───
  culture: [
    { title: 'Team Orders', desc: 'From Ferrari\'s "Fernando is faster than you" to Red Bull\'s "Multi 21", the ethical dilemma of prioritizing one driver over another has sparked intense debate regarding sporting fairness versus team strategy.', era: 'All Eras', tags: ['Politics', 'Ferrari', 'Red Bull'] },
    { title: 'Crashgate 2008', desc: 'Nelson Piquet Jr. was ordered by Renault management to crash deliberately in Singapore to trigger a perfectly-timed safety car, helping his teammate Fernando Alonso win the race.', era: '2008', tags: ['Scandal', 'Renault', 'Singapore'] },
    { title: 'The DAS System', desc: 'In 2020, Mercedes introduced Dual Axis Steering, a loophole allowing drivers to adjust front wheel toe angles on the straights by pulling the steering wheel. It was promptly banned for the following year.', era: '2020', tags: ['Innovation', 'Mercedes', 'Tech'] },
    {
      title: 'Spygate 2007', desc: "McLaren was fined a record $100 million and excluded from the Constructors' Championship for being in unauthorized possession of hundreds of pages of confidential Ferrari technical documents.", era: '2007', tags: ['Scandal', 'McLaren', 'Ferrari']
    },
    { title: 'Budget Cap Drama', desc: 'The introduction of the cost cap in 2021 changed F1 forever. Teams exceeding the limit now face severe sporting and financial penalties, fundamentally altering the development war.', era: '2021-Present', tags: ['Finance', 'FIA', 'Regulations'] }
  ],

  // ─── TRIVIA ───
  trivia: [
    { q: 'What is the fastest pit stop in F1 history?', a: '1.80 Seconds', context: 'McLaren set the record servicing Lando Norris at the 2023 Qatar Grand Prix.', era: '2023', tags: ['Pit Stop', 'McLaren', 'Record'] },
    { q: 'Who is the youngest race winner?', a: 'Max Verstappen', context: 'He won the 2016 Spanish Grand Prix on his Red Bull debut at 18 years and 228 days old.', era: '2016', tags: ['Record', 'Verstappen', 'Red Bull'] },
    { q: 'What is the closest championship finish?', a: '0.5 Points', context: 'Niki Lauda beat teammate Alain Prost by exactly half a point to win the 1984 title.', era: '1984', tags: ['Record', 'Lauda', 'Prost'] },
    { q: 'Which driver has the most consecutive wins?', a: 'Max Verstappen', context: 'He won 10 consecutive races during his overwhelmingly dominant 2023 season.', era: '2023', tags: ['Record', 'Verstappen'] },
    { q: "Which team has the most Constructors' Titles?", a: 'Scuderia Ferrari', context: "Ferrari holds the record with 16 Constructors' World Championships.", era: 'All Eras', tags: ['Record', 'Ferrari', 'Constructors'] },
    { q: 'Who has the most career pole positions?', a: 'Lewis Hamilton', context: 'Hamilton holds the all-time record, surpassing 100 pole positions in his career.', era: 'Modern Era', tags: ['Record', 'Hamilton', 'Qualifying'] }
  ],

  // ─── TEAM LOGOS MAPPING ───
  teamLogos: {
    'Alpine': '/assets/legacy/logos/alpine.png',
    'Aston Martin': '/assets/legacy/logos/aston_martin.jpg',
    'Audi': '/assets/legacy/logos/audi.jpg',
    'Cadillac': '/assets/legacy/logos/cadillac.png',
    'Ferrari': '/assets/legacy/logos/ferrarri.jpg',
    'Haas': '/assets/legacy/logos/haas.jpg',
    'McLaren': '/assets/legacy/logos/mclaren.jpg',
    'Mercedes': '/assets/legacy/logos/mercedes.png',
    'Racing Bulls': '/assets/legacy/logos/racing_bulls.jpg',
    'Red Bull': '/assets/legacy/logos/red_bull.png',
    'Williams': '/assets/legacy/logos/williams.png'
  }
};
