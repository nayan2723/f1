import"./f1data-CYHUHGUy.js";document.getElementById("navbar-root").innerHTML=renderNavbar("circuits.html");document.getElementById("footer-root").innerHTML=renderFooter();function e(t){const i=t==="all"?F1Data.circuits:F1Data.circuits.filter(a=>a.type===t);document.getElementById("circuit-grid").innerHTML=i.map((a,c)=>`
        <div class="circuit-card animate-in" style="animation-delay:${c*.05}s" data-type="${a.type}">
          <div class="circuit-card-header">
            <div>
              <h3>${a.name}</h3>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:4px">📍 ${a.location}, ${a.country}</div>
            </div>
            <span class="round-badge">R${String(a.round).padStart(2,"0")}</span>
          </div>
          <div class="circuit-card-details">
            <div class="circuit-detail"><span class="circuit-detail-label">Date</span><span class="circuit-detail-value">${a.date}, 2026</span></div>
            <div class="circuit-detail"><span class="circuit-detail-label">Circuit Length</span><span class="circuit-detail-value">${a.length}</span></div>
            <div class="circuit-detail"><span class="circuit-detail-label">Race Laps</span><span class="circuit-detail-value">${a.laps}</span></div>
            <div class="circuit-detail"><span class="circuit-detail-label">Circuit Type</span><span class="circuit-detail-value" style="color:${a.type.includes("Street")?"var(--team-mcl)":a.type==="High-Speed"?"var(--team-mer)":"var(--team-amr)"}">${a.type}</span></div>
            <div class="circuit-detail"><span class="circuit-detail-label">Race Distance</span><span class="circuit-detail-value">${(a.laps*parseFloat(a.length)).toFixed(1)} km</span></div>
          </div>
        </div>
      `).join("")}e("all");document.getElementById("circuit-filter").addEventListener("click",t=>{t.target.classList.contains("tab-btn")&&(document.querySelectorAll("#circuit-filter .tab-btn").forEach(i=>i.classList.remove("active")),t.target.classList.add("active"),e(t.target.dataset.filter))});animateOnScroll();
