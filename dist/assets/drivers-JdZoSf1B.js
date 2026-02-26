import"./f1data-Bkmt7dHv.js";import"./mountReact-Bcx_AE3E.js";import"./vendor-react-C2FUrQ2K.js";import"./vendor-DXLWAiYI.js";import"./vendor-radix-206XVAFP.js";document.getElementById("navbar-root").innerHTML=renderNavbar("drivers.html");document.getElementById("footer-root").innerHTML=renderFooter();const l=F1Data.getSortedDrivers();document.getElementById("driver-grid").innerHTML=l.map((a,t)=>{const s=F1Data.getTeamColor(a.team),d=F1Data.getTeamName(a.team);F1Data.getTeamAbbr(a.team);const v=a.recent.map(i=>{let e="";const r=parseInt(i);return isNaN(r)||(r<=3?e="top3":r<=5?e="top5":r<=10&&(e="top10")),`<span class="result-badge ${e}">${i}</span>`}).join("");return`
      <div class="driver-card animate-in" data-code="${a.code}" style="animation-delay:${t*.05}s">
        <div class="driver-card-accent" style="background:${s}"></div>
        <div class="driver-card-body">
          <div class="driver-card-header">
            <div class="driver-card-info">
              <h3>${a.name}</h3>
              <span class="team-name" style="color:${s}">${d}</span>
            </div>
            <span class="driver-code-badge">${a.code}</span>
          </div>
          <div class="driver-position-badge" style="border-color:${s};background:${s}20;color:${s}">P${a.pos}</div>
          <div class="driver-stats-grid">
            <div class="driver-stat"><div class="driver-stat-label">Wins</div><div class="driver-stat-value">${a.wins}</div></div>
            <div class="driver-stat"><div class="driver-stat-label">Podiums</div><div class="driver-stat-value">${a.podiums}</div></div>
            <div class="driver-stat"><div class="driver-stat-label">DNFs</div><div class="driver-stat-value">${a.dnfs}</div></div>
            <div class="driver-stat"><div class="driver-stat-label">Points</div><div class="driver-stat-value">${a.pts}</div></div>
          </div>
          <div class="win-prob-bar">
            <div class="win-prob-header">
              <span class="win-prob-label">Win Probability</span>
              <span class="win-prob-value" style="color:${s}">${a.winProb}%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" data-width="${a.winProb*5}" style="background:linear-gradient(90deg, ${s}cc, ${s}44)"></div>
            </div>
          </div>
          <div class="recent-results">${v}</div>
        </div>
      </div>`}).join("");animateProgressBars();animateOnScroll();
