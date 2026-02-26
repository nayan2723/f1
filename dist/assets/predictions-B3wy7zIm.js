import"./f1data-Bkmt7dHv.js";document.getElementById("navbar-root").innerHTML=renderNavbar("predictions.html");document.getElementById("footer-root").innerHTML=renderFooter();const n=[...F1Data.drivers].sort((t,i)=>i.winProb-t.winProb);document.getElementById("win-prob-list").innerHTML=n.map((t,i)=>{const e=F1Data.getTeamColor(t.team);return`
      <div class="prediction-item">
        <span class="prediction-rank">${i+1}</span>
        <span class="prediction-driver">
          <span style="color:${e};margin-right:8px">●</span>${t.name}
        </span>
        <div class="prediction-bar-container">
          <div class="prediction-bar" style="width:${t.winProb*5}%;background:linear-gradient(90deg, ${e}cc, ${e}33)"></div>
        </div>
        <span class="prediction-pct" style="color:${e}">${t.winProb}%</span>
      </div>`}).join("");const c=n.slice(0,6),l=["🥇","🥈","🥉","4th","5th","6th"],s=c.map((t,i)=>{const e=F1Data.getTeamColor(t.team);return`
      <div class="stat-card" style="text-align:center">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${e};border-radius:16px 16px 0 0"></div>
        <div style="font-size:28px;margin-bottom:8px">${l[i]}</div>
        <div class="stat-value" style="font-size:18px">${t.name}</div>
        <div class="stat-detail" style="color:${e}">${F1Data.getTeamName(t.team)}</div>
        <div style="font-family:'Orbitron';font-size:22px;font-weight:800;color:${e};margin-top:12px">${t.winProb}%</div>
        <div style="font-size:10px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:1px">Win Probability</div>
      </div>`});document.getElementById("podium-grid").innerHTML=s.slice(0,3).join("");document.getElementById("podium-grid-2").innerHTML=s.slice(3).join("");const p=F1Data.teams.map(t=>{const e=F1Data.getDriversByTeam(t.id).reduce((a,o)=>a+o.winProb,0),r=F1Data.carPerformance[t.id],d=Math.round(Object.values(r).reduce((a,o)=>a+o,0)/6);return{...t,totalProb:e,avgPerf:d}}).sort((t,i)=>i.totalProb-t.totalProb);document.getElementById("constructor-projection").innerHTML=p.map((t,i)=>{const e=F1Data.getDriversByTeam(t.id).map(r=>r.name).join(" & ");return`
      <div class="prediction-item" style="padding:14px 0">
        <span class="prediction-rank" style="${i<3?"color:var(--f1-red)":""}">${i+1}</span>
        <div style="width:200px">
          <div style="font-weight:700;font-size:14px">${t.name}</div>
          <div style="font-size:11px;color:var(--text-secondary)">${e}</div>
        </div>
        <div style="width: 100px; height: 32px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
           <img src="${t.car}" alt="${t.abbr} Car" loading="lazy" style="max-height:100%; max-width:100%; object-fit:contain; filter:drop-shadow(0px 2px 4px rgba(0,0,0,0.5));" onerror="this.outerHTML='<div style=\\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, ${t.color}44, transparent);border-radius:4px;\\'><img src=\\'' + (F1Data.legacy.teamLogos?.[t.abbr] || F1Data.legacy.teamLogos?.[t.name] || '') + '\\' style=\\'max-height:16px;\\'></div>';">
        </div>
        <div class="prediction-bar-container" style="flex:1">
          <div class="prediction-bar" style="width:${t.totalProb*2.5}%;background:linear-gradient(90deg, ${t.color}cc, ${t.color}33)"></div>
        </div>
        <div style="text-align:right;width:80px">
          <div style="font-family:'Orbitron';font-size:14px;font-weight:700;color:${t.color}">${t.totalProb.toFixed(1)}%</div>
          <div style="font-size:9px;color:var(--text-tertiary)">Avg: ${t.avgPerf}</div>
        </div>
      </div>`}).join("");animateOnScroll();
