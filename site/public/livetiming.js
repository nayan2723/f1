// F1 Insight - Phase 5 Simulated Live Timing
document.addEventListener('DOMContentLoaded', () => {

    const tbody = document.getElementById('live-timing-body');
    const btnToggleLive = document.getElementById('btn-toggle-live');
    const sessionStatus = document.getElementById('live-session-status');

    if (!tbody || !window.F1Data) return;

    const compounds = ['S', 'M', 'H', 'I', 'W'];
    let isLive = true;
    let timerId = null;
    let currentLap = 12;
    const totalLaps = 58;

    // Clone array for strict state mutation tracking
    let driverState = window.F1Data.getSortedDrivers().map((d, index) => ({
        id: d.id,
        name: d.name,
        code: d.code,
        team: d.team,
        color: window.F1Data.getTeamColor(d.team),
        pos: index + 1,
        startPos: index + 1,
        tyre: compounds[Math.floor(Math.random() * 3)], // randomize Dry compounds
        fastestLap: false,
        interval: 0,
        gap: 0,
        history: [] // track position history
    }));

    // Initial Gap Seeding
    let currentGap = 0;
    driverState.forEach((d, i) => {
        if (i > 0) {
            const shift = (Math.random() * 2) + 0.5;
            d.interval = parseFloat(shift.toFixed(3));
            currentGap += shift;
            d.gap = parseFloat(currentGap.toFixed(3));
        }
    });

    // Assign one initial fastest lap
    driverState[Math.floor(Math.random() * 5)].fastestLap = true;

    // Granular row rendering for absolute performance (avoid table innerHTML destruction)
    const renderRows = (firstLoad = false) => {
        if (firstLoad) tbody.innerHTML = '';

        // Check for user-preference regarding motion
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        driverState.forEach(d => {
            let row = document.getElementById(`drv-row-${d.id}`);

            const change = d.startPos - d.pos;
            const chgHtml = change > 0
                ? `<span style="color:var(--f1-teal); font-weight:bold;">▲ ${change}</span>`
                : change < 0
                    ? `<span style="color:var(--f1-red); font-weight:bold;">▼ ${Math.abs(change)}</span>`
                    : `<span style="color:var(--text-tertiary);">-</span>`;

            const fastestHtml = d.fastestLap ? `<span style="color:#B822AD; font-size:10px; margin-left: 6px;">(FL)</span>` : '';
            const tyreColor = d.tyre === 'S' ? '#e21021' : d.tyre === 'M' ? '#fdcd15' : d.tyre === 'H' ? '#ffffff' : '#45b84d';

            if (!row) {
                row = document.createElement('tr');
                row.id = `drv-row-${d.id}`;
                if (!reduceMotion) row.style.transition = 'transform 0.4s ease, background 0.3s ease';
                tbody.appendChild(row);
            }

            // Visual pulse if position changed
            if (!firstLoad && row.dataset.pos && parseInt(row.dataset.pos) !== d.pos && !reduceMotion) {
                row.style.background = 'rgba(255, 255, 255, 0.1)';
                setTimeout(() => row.style.background = 'transparent', 400);
            }

            row.dataset.pos = d.pos;

            row.innerHTML = `
        <td class="pos-cell" style="font-weight:700;">${d.pos}</td>
        <td style="font-size:12px;">${chgHtml}</td>
        <td>
          <div class="driver-cell" style="display:flex; align-items:center;">
             <span class="team-color-bar" style="background:${d.color}; display:inline-block; width:3px; height:16px; margin-right:8px;"></span>
             <span class="driver-name" style="font-family:'Inter'; font-weight:600;">${d.name} ${fastestHtml}</span>
          </div>
        </td>
        <td style="text-align:center;">
          <div style="width:20px; height:20px; border-radius:50%; border:2px solid ${tyreColor}; color:#fff; font-size:10px; display:inline-flex; align-items:center; justify-content:center; font-weight:bold;">${d.tyre}</div>
        </td>
        <td style="text-align:right; font-family:'Orbitron'; font-size:13px; color:var(--text-secondary);">${d.pos === 1 ? 'Leader' : '+' + d.interval.toFixed(3)}</td>
        <td style="text-align:right; font-family:'Orbitron'; font-size:13px;">${d.pos === 1 ? '' : '+' + d.gap.toFixed(3)}</td>
      `;
        });

        // Reorder DOM rows to match state
        const rowsArray = Array.from(tbody.children);
        rowsArray.sort((a, b) => parseInt(a.dataset.pos) - parseInt(b.dataset.pos));
        rowsArray.forEach(tr => tbody.appendChild(tr)); // fast DOM reorder without recreation
    };

    const simulateTick = () => {
        if (!isLive) return;

        // Mutate state logic
        currentLap = Math.min(currentLap + 1, totalLaps);
        sessionStatus.innerHTML = `Session: RACE | Laps: ${currentLap}/${totalLaps} | Track: DRY`;

        // 10% chance for an overtake somewhere in the grid
        if (Math.random() < 0.25) {
            const swapIdx = Math.floor(Math.random() * (driverState.length - 1)) + 1; // 1 to 21
            // Swap positions
            const driverA = driverState[swapIdx];
            const driverB = driverState[swapIdx - 1];

            driverA.pos -= 1;
            driverB.pos += 1;

            // Sort array back
            driverState.sort((a, b) => a.pos - b.pos);
        }

        // Recalculate gaps
        let accGap = 0;
        driverState.forEach((d, i) => {
            // Clear fastest lap
            d.fastestLap = false;
            if (i > 0) {
                // Delta shift
                let delta = (Math.random() * 0.4) - 0.2; // -0.2 to +0.2
                d.interval = Math.max(0.1, parseFloat((d.interval + delta).toFixed(3)));
                accGap += d.interval;
                d.gap = parseFloat(accGap.toFixed(3));
            } else {
                d.interval = 0;
                d.gap = 0;
            }
        });

        // Assign new fastest lap randomly
        driverState[Math.floor(Math.random() * 8)].fastestLap = true;

        // Push to UI via RAF to prevent CLS or frame dropping
        window.requestAnimationFrame(() => renderRows(false));

        if (currentLap >= totalLaps) {
            stopSimulation();
            sessionStatus.innerHTML = `Session: FINISHED | Laps: 58/58 | Track: DRY`;
        }
    };

    const startSimulation = () => {
        isLive = true;
        btnToggleLive.querySelector('.btn-text').textContent = 'Pause Feed';
        btnToggleLive.classList.remove('btn-secondary');
        btnToggleLive.classList.add('btn-primary');
        timerId = setInterval(simulateTick, 3000);
    };

    const stopSimulation = () => {
        isLive = false;
        clearInterval(timerId);
        btnToggleLive.querySelector('.btn-text').textContent = 'Resume Feed';
        btnToggleLive.classList.remove('btn-primary');
        btnToggleLive.classList.add('btn-secondary');
    };

    btnToggleLive.addEventListener('click', () => {
        if (isLive) stopSimulation();
        else startSimulation();
    });

    // Cleanup on unmount (SPA-simulated security)
    window.addEventListener('beforeunload', stopSimulation);

    // Init
    renderRows(true);
    startSimulation();

});
