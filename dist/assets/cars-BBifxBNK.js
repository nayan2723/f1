import"./f1data-CYHUHGUy.js";document.getElementById("navbar-root").innerHTML=renderNavbar("cars.html");document.getElementById("footer-root").innerHTML=renderFooter();const s=[{key:"downforce",label:"Downforce",icon:"⬇️"},{key:"dragEff",label:"Drag Efficiency",icon:"💨"},{key:"ers",label:"ERS Performance",icon:"⚡"},{key:"highSpeed",label:"High-Speed",icon:"🏎️"},{key:"street",label:"Street Circuit",icon:"🏙️"},{key:"technical",label:"Technical Circuit",icon:"🔧"}];document.getElementById("car-tabs").innerHTML=F1Data.teams.map((a,t)=>`<button class="tab-btn ${t===0?"active":""}" data-tab="car-${a.id}">${a.abbr}</button>`).join("");document.getElementById("car-tab-contents").innerHTML=F1Data.teams.map((a,t)=>{const e=F1Data.carPerformance[a.id],i=F1Data.getDriversByTeam(a.id).map(r=>r.name).join(" & "),o=s.map(r=>`
        <div class="car-stat">
          <div class="car-stat-header">
            <span class="car-stat-name">${r.icon} ${r.label}</span>
            <span class="car-stat-value" style="color:${a.color}">${e[r.key]}</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar" data-width="${e[r.key]}" style="background:linear-gradient(90deg, ${a.color}cc, ${a.color}44)"></div>
          </div>
        </div>
      `).join(""),c=Math.round(Object.values(e).reduce((r,l)=>r+l,0)/6);return`
      <div class="tab-content ${t===0?"active":""}" id="car-${a.id}">
        <div class="glass-card" style="margin-top:20px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:30px">
            <div style="flex: 1;">
              <h3 style="font-size:32px;font-weight:700">${a.name}</h3>
              <div style="font-size:14px;color:var(--text-secondary);margin-top:8px">${i}</div>
            </div>
            
            <div style="flex: 2; height: 160px; display: flex; align-items: center; justify-content: center;">
              <img src="${a.car}" alt="${a.name} 2026 Car" loading="${t===0?"eager":"lazy"}" style="max-height: 100%; max-width: 100%; object-fit: contain; filter: drop-shadow(0px 15px 20px rgba(0,0,0,0.6));" onerror="this.outerHTML='<div style=\\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, ${a.color}AA, transparent);border-radius:8px;\\'><img src=\\'' + (F1Data.legacy.teamLogos?.[t.abbr] || F1Data.legacy.teamLogos?.[t.name] || '') + '\\' style=\\'max-height:60px;\\'></div>';">
            </div>

            <div style="text-align:right; flex: 1;">
              <div style="font-family:'Orbitron';font-size:36px;font-weight:800;color:${a.color}">${c}</div>
              <div style="font-size:12px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:1px">Overall Rating</div>
            </div>
          </div>
          <div class="car-stats-grid">${o}</div>
        </div>
      </div>`}).join("");initTabs();animateProgressBars();const d={responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{color:"rgba(255,255,255,0.05)"},ticks:{color:"#6a6a7a",font:{size:10}}},y:{grid:{color:"rgba(255,255,255,0.05)"},ticks:{color:"#6a6a7a",font:{size:10}},min:60,max:100}}};function n(a,t){new Chart(document.getElementById(a),{type:"bar",data:{labels:F1Data.teams.map(e=>e.abbr),datasets:[{data:F1Data.teams.map(e=>F1Data.carPerformance[e.id][t]),backgroundColor:F1Data.teams.map(e=>e.color+"cc"),borderColor:F1Data.teams.map(e=>e.color),borderWidth:1,borderRadius:6}]},options:d})}n("highSpeedChart","highSpeed");n("streetChart","street");n("technicalChart","technical");document.getElementById("comparison-table").innerHTML=`
      <thead><tr>
        <th>METRIC</th>
        ${F1Data.teams.map(a=>`<th style="color:${a.color}">${a.abbr}</th>`).join("")}
      </tr></thead>
      <tbody>${s.map(a=>`
        <tr>
          <td style="font-weight:600">${a.label}</td>
          ${F1Data.teams.map(t=>{const e=F1Data.carPerformance[t.id][a.key],i=Math.max(...F1Data.teams.map(o=>F1Data.carPerformance[o.id][a.key]));return`<td class="points-cell" style="${e===i?"color:"+t.color:""}">${e}</td>`}).join("")}
        </tr>
      `).join("")}</tbody>`;animateOnScroll();
