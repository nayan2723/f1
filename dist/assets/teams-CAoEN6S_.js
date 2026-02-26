import"./f1data-Bkmt7dHv.js";document.getElementById("navbar-root").innerHTML=renderNavbar("teams.html");document.getElementById("footer-root").innerHTML=renderFooter();document.getElementById("team-grid").innerHTML=F1Data.teams.map((a,s)=>{const e=F1Data.constructorStats[a.id],i=F1Data.getDriversByTeam(a.id).map(t=>t.name).join(" & "),r=[{label:"Points",value:e.pts,max:800},{label:"Wins",value:e.wins,max:24},{label:"Podiums",value:e.podiums,max:48},{label:"Poles",value:e.poles,max:24},{label:"1–2 Finishes",value:e.oneTwo,max:24}].map(t=>`
        <div class="team-stat-row">
          <span class="team-stat-name">${t.label}</span>
          <span class="team-stat-val">${t.value}</span>
        </div>
      `).join("");return`
      <div class="team-card animate-in" style="animation-delay:${s*.08}s">
        <div class="team-card-accent" style="background:${a.color}"></div>
        <div class="team-card-body">
          <div class="team-card-header">
            <div style="width: 100%;">
              <div style="display:flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <div>
                  <h3>${a.name}</h3>
                  <div style="font-size:12px;color:var(--text-secondary);margin-top:4px">${i}</div>
                </div>
                <span class="team-abbr" style="font-family:'Orbitron';font-size:14px;font-weight:700;color:${a.color};opacity:0.6">${a.abbr}</span>
              </div>
              <div class="team-car-container" style="height: 100px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                 <img src="${a.car}" alt="${a.name} 2026 Car" loading="${s<4?"eager":"lazy"}" style="max-height: 100%; max-width: 100%; object-fit: contain; filter: drop-shadow(0px 10px 15px rgba(0,0,0,0.5));" onerror="this.outerHTML='<div style=\\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, ${a.color}88, transparent);border-radius:4px;\\'><span style=\\'font-family:Orbitron;font-weight:700;color:rgba(255,255,255,0.5)\\'>${a.abbr}</span></div>';">
              </div>
            </div>
          </div>
          ${r}
          <div style="margin-top:16px">
            <div class="team-stat-row">
              <span class="team-stat-name">Reliability</span>
              <span class="team-stat-val" style="color:${e.reliability>=93?"#27F4D2":e.reliability>=88?"#FF8700":"#E8002D"}">${e.reliability}%</span>
            </div>
            <div class="progress-bar-container" style="margin-top:4px">
              <div class="progress-bar" data-width="${e.reliability}" style="background:linear-gradient(90deg, ${a.color}cc, ${a.color}44)"></div>
            </div>
          </div>
          <div style="margin-top:16px">
            <div class="team-stat-row">
              <span class="team-stat-name">Budget Cap Usage</span>
              <span class="team-stat-val">${e.budget}%</span>
            </div>
            <div class="progress-bar-container" style="margin-top:4px">
              <div class="progress-bar" data-width="${e.budget}" style="background:linear-gradient(90deg, ${e.budget>=95?"#E8002D":e.budget>=90?"#FF8700":"#27F4D2"}cc, ${a.color}44)"></div>
            </div>
          </div>
        </div>
      </div>`}).join("");animateProgressBars();animateOnScroll();
