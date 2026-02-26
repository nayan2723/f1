import"./f1data-Bkmt7dHv.js";document.getElementById("navbar-root").innerHTML=renderNavbar("legacy.html");document.getElementById("footer-root").innerHTML=renderFooter();function t(i){return`<span class="legacy-tag">${i}</span>`}document.getElementById("timeline-root").innerHTML=F1Data.legacy.timeline.map((i,a)=>`
      <div class="timeline-item animate-in" style="animation-delay:${a*.1}s">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-year">${i.year}</div>
          <h3 class="timeline-title">${i.title}</h3>
          ${i.image?`<img src="${i.image}" alt="${i.title} – ${i.year} – Formula 1" loading="lazy" class="timeline-image" data-year="${i.year}" onerror="this.classList.add('legacy-fallback');">`:""}
          <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
            <span style="font-size:10px;padding:2px 6px;border:1px solid rgba(197,160,79,0.3);border-radius:4px;color:#C5A04F;">${i.era}</span>
            ${i.tags.map(e=>t(e)).join("")}
          </div>
          <p class="timeline-desc">${i.desc}</p>
          <div class="timeline-insight"><strong>Why It Matters:</strong> ${i.insight}</div>
        </div>
      </div>
    `).join("");document.getElementById("rivalries-root").innerHTML=F1Data.legacy.rivalries.map((i,a)=>`
      <div class="rivalry-card animate-in" style="animation-delay:${a*.1}s">
        <div class="rivalry-dual">
          <div class="rivalry-side">
            <img src="${i.img1}" alt="${i.driver1} – ${i.era} – Formula 1" loading="lazy" data-year="${i.era.replace(/[^0-9]/g,"").slice(0,4)||"Historic"}" onerror="this.classList.add('legacy-fallback');" style="width:80px;height:80px;border-radius:50%;margin-bottom:12px;border:2px solid rgba(255,255,255,0.1);object-fit:cover;">
            <h4>${i.driver1}</h4>
          </div>
          <div class="rivalry-vs">VS</div>
          <div class="rivalry-side">
            <img src="${i.img2}" alt="${i.driver2} – ${i.era} – Formula 1" loading="lazy" data-year="${i.era.replace(/[^0-9]/g,"").slice(0,4)||"Historic"}" onerror="this.classList.add('legacy-fallback');" style="width:80px;height:80px;border-radius:50%;margin-bottom:12px;border:2px solid rgba(255,255,255,0.1);object-fit:cover;">
            <h4>${i.driver2}</h4>
          </div>
        </div>
        <div class="rivalry-info">
          <div style="display:flex;gap:8px;margin-bottom:12px;justify-content:center;flex-wrap:wrap;">
            ${i.tags.map(e=>t(e)).join("")}
          </div>
          ${i.summary}
        </div>
      </div>
    `).join("");document.getElementById("cars-root").innerHTML=F1Data.legacy.historicCars.map((i,a)=>`
      <div class="historic-car animate-in" style="animation-delay:${a*.1}s">
        <div class="historic-car-img" style="background: url('${i.image}') center/cover no-repeat;" role="img" aria-label="${i.name} – ${i.era} – Formula 1"></div>
        <div class="historic-car-body">
          <div class="historic-car-title">${i.name}</div>
          <div class="historic-car-inno">Key Tech: ${i.innovation}</div>
          <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
            <span style="font-size:10px;padding:2px 6px;border:1px solid rgba(197,160,79,0.3);border-radius:4px;color:#C5A04F;">${i.era}</span>
            ${i.tags.map(e=>t(e)).join("")}
          </div>
          <div class="historic-car-desc">${i.description}</div>
        </div>
      </div>
    `).join("");document.getElementById("hall-root").innerHTML=F1Data.legacy.legends.map((i,a)=>`
      <div class="hall-card animate-in" style="animation-delay:${a*.1}s">
        <div class="hall-image-wrapper" style="text-align:center;margin-bottom:20px;">
           <img src="${i.image}" alt="${i.name} – ${i.era} – Formula 1" loading="lazy" data-year="${i.era.split("-")[0]||"Legend"}" onerror="this.classList.add('legacy-fallback');" style="width:120px;height:120px;object-fit:cover;border-radius:50%;border:2px solid #C5A04F;">
        </div>
        <div class="hall-titles">${i.titles}</div>
        <div style="font-size:10px;color:#C5A04F;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px">World Titles</div>
        <div class="hall-name">${i.name}</div>
        <div class="hall-highlight">${i.highlightStats}</div>
        <div style="display:flex;gap:8px;margin-bottom:16px;justify-content:center;flex-wrap:wrap;">
          ${i.tags.map(e=>t(e)).join("")}
        </div>
        <div class="hall-quote">${i.quote.replace(/"/g,"&quot;")}</div>
      </div>
    `).join("");document.getElementById("culture-root").innerHTML=F1Data.legacy.culture.map((i,a)=>`
      <div class="reg-card animate-in" style="animation-delay:${a*.1}s; border-color: rgba(197, 160, 79, 0.2)">
        <h3 style="color:#C5A04F; font-size:16px; margin-bottom:8px;">${i.title}</h3>
        <p>${i.desc}</p>
        <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;">
          ${i.tags.map(e=>t(e)).join("")}
        </div>
      </div>
    `).join("");document.getElementById("trivia-root").innerHTML=F1Data.legacy.trivia.map((i,a)=>`
      <div class="trivia-card animate-in" style="animation-delay:${a*.1}s" role="button" aria-expanded="false" aria-controls="trivia-answer-${a}" tabindex="0" onclick="this.classList.toggle('flipped'); this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');">
        <div class="trivia-inner">
          <div class="trivia-front" aria-hidden="false">
            <div class="trivia-icon">❓</div>
            <div class="trivia-q">${i.q}</div>
            <div style="font-size:10px; color:var(--text-tertiary); margin-top:12px; text-transform:uppercase;">Click to Reveal</div>
          </div>
          <div class="trivia-back" id="trivia-answer-${a}" aria-hidden="true">
            <div class="trivia-icon">💡</div>
            <div class="trivia-a">${i.a}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.7);margin-top:12px;">${i.context}</div>
            <div style="display:flex;gap:8px;margin-top:12px;justify-content:center;flex-wrap:wrap;">
              ${i.tags.map(e=>t(e)).join("")}
            </div>
          </div>
        </div>
      </div>
    `).join("");animateOnScroll();const r=document.querySelector(".timeline");r&&window.addEventListener("scroll",()=>{const i=r.getBoundingClientRect(),a=Math.max(0,Math.min(1,(window.innerHeight-i.top)/(i.height+window.innerHeight)));r.style.setProperty("--scroll-progress",a*100+"%")});const l=document.querySelector(".legacy-btn");l&&l.addEventListener("click",function(i){i.preventDefault(),document.querySelector("#timeline").scrollIntoView({behavior:"smooth"})});
