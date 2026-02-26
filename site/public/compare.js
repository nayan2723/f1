
import { animate } from 'motion';
import { escapeHTML } from './lib/sanitize.js';

document.addEventListener('DOMContentLoaded', () => {
    const driverASelect = document.getElementById('driver-a-select');
    const driverBSelect = document.getElementById('driver-b-select');
    const barsContainer = document.getElementById('compare-bars-container');
    const ctx = document.getElementById('compareRadarChart');

    if (!window.F1Data || !driverASelect || !ctx) return;

    const drivers = window.F1Data.drivers;
    let radarChart = null;


    const driverAImg = document.querySelector('#driver-a-headshot img');
    const driverBImg = document.querySelector('#driver-b-headshot img');
    const driverAContainer = document.getElementById('driver-a-headshot');
    const driverBContainer = document.getElementById('driver-b-headshot');
    const swapBtn = document.getElementById('swap-drivers-btn');
    const saveBtn = document.getElementById('save-compare-btn');
    const saveTooltip = document.getElementById('save-compare-tooltip');

    // Initialize Selects (Sanitized)
    const optionsHTML = drivers.map(d => `<option value="${escapeHTML(d.code.toLowerCase())}">${escapeHTML(d.name)} (${escapeHTML(d.team)})</option>`).join('');
    driverASelect.innerHTML = optionsHTML;
    driverBSelect.innerHTML = optionsHTML;

    // Default initial pair (e.g., VER vs NOR)
    driverASelect.value = 'ver';
    driverBSelect.value = 'nor';

    // Memoization state
    let lastA = '', lastB = '';

    const renderComparison = () => {
        const valA = driverASelect.value;
        const valB = driverBSelect.value;

        if (valA === valB || (valA === lastA && valB === lastB)) return;

        lastA = valA; lastB = valB;

        const drvA = drivers.find(d => d.id === valA || d.code.toLowerCase() === valA.toLowerCase());
        const drvB = drivers.find(d => d.id === valB || d.code.toLowerCase() === valB.toLowerCase());

        if (!drvA || !drvB) return;

        const colorA = window.F1Data.getTeamColor(drvA.team);
        const colorB = window.F1Data.getTeamColor(drvB.team);

        // Update UI Accents & Headshots
        // Attempting to match the F1Data legends/historic driver portrait names or fallback
        const portraitA = drvA.name.split(' ').pop().toLowerCase();
        const portraitB = drvB.name.split(' ').pop().toLowerCase();

        driverAImg.src = `/assets/legacy/drivers/portrait_${portraitA}.png`;
        driverBImg.src = `/assets/legacy/drivers/portrait_${portraitB}.png`;

        driverAContainer.style.borderBottom = `4px solid ${colorA}`;
        driverBContainer.style.borderBottom = `4px solid ${colorB}`;
        driverAContainer.style.boxShadow = `0 10px 20px ${colorA}33`;
        driverBContainer.style.boxShadow = `0 10px 20px ${colorB}33`;

        // Render Animated Bars
        const metrics = [
            { label: 'Wins', key: 'wins', max: 60 },
            { label: 'Podiums', key: 'podiums', max: 120 },
            { label: 'Poles', key: 'poles', max: 50 },
            { label: 'Points (2026)', key: 'pts', max: 400 },
            { label: 'Consistency %', key: 'consistency', max: 100 }
        ];

        barsContainer.innerHTML = metrics.map(m => {
            // Mock consistency if missing
            const aVal = drvA[m.key] !== undefined ? drvA[m.key] : Math.floor(Math.random() * 40 + 60);
            const bVal = drvB[m.key] !== undefined ? drvB[m.key] : Math.floor(Math.random() * 40 + 60);

            const pctA = Math.min((aVal / m.max) * 100, 100);
            const pctB = Math.min((bVal / m.max) * 100, 100);

            const aWin = aVal > bVal;
            const bWin = bVal > aVal;

            return `
        <div class="compare-metric">
          <div style="display:flex; justify-content: space-between; font-size: 11px; color: var(--text-secondary); margin-bottom: 6px; text-transform: uppercase;">
             <span style="color: ${aWin ? '#fff' : ''}">${escapeHTML(drvA.code)} • ${escapeHTML(aVal)}</span>
             <span>${escapeHTML(m.label)}</span>
             <span style="color: ${bWin ? '#fff' : ''}">${escapeHTML(bVal)} • ${escapeHTML(drvB.code)}</span>
          </div>
          <div style="display: flex; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden;">
             <div style="width: 50%; display: flex; justify-content: flex-end; padding-right: 2px;">
                <div class="compare-bar-fill" data-width="${pctA}%" style="width: 0%; background: ${colorA}; border-radius: 4px 0 0 4px;"></div>
             </div>
             <div style="width: 50%; display: flex; justify-content: flex-start; padding-left: 2px;">
                <div class="compare-bar-fill" data-width="${pctB}%" style="width: 0%; background: ${colorB}; border-radius: 0 4px 4px 0;"></div>
             </div>
          </div>
        </div>
      `;
        }).join('');

        // Apply motion.dev animate with spring physics
        setTimeout(() => {
            document.querySelectorAll('.compare-bar-fill').forEach(bar => {
                animate(bar, { width: bar.dataset.width }, {
                    type: "spring",
                    stiffness: 80,
                    damping: 15,
                    mass: 1.2
                });
            });
        }, 50);

        // Update Radar Chart
        const radarData = {
            labels: ['Pace', 'Racecraft', 'Consistency', 'Experience', 'Qualifying', 'Rain'],
            datasets: [
                {
                    label: drvA.name,
                    data: generateMockRatings(drvA),
                    backgroundColor: `${colorA}40`,
                    borderColor: colorA,
                    borderWidth: 2,
                    pointBackgroundColor: colorA
                },
                {
                    label: drvB.name,
                    data: generateMockRatings(drvB),
                    backgroundColor: `${colorB}40`,
                    borderColor: colorB,
                    borderWidth: 2,
                    pointBackgroundColor: colorB
                }
            ]
        };

        if (radarChart) {
            radarChart.data = radarData;
            radarChart.update();
        } else {
            radarChart = new Chart(ctx, {
                type: 'radar',
                data: radarData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            pointLabels: { color: 'var(--text-secondary)', font: { family: 'Inter', size: 11 } },
                            ticks: { display: false, min: 60, max: 100 }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#fff', font: { family: 'Inter' } }
                        }
                    }
                }
            });
        }

        // Handle save status reset
        if (saveBtn) {
            saveBtn.textContent = '⭐ Save Comparison';
            saveBtn.classList.remove('btn-success');
        }
    };

    if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.style.opacity = '1';
        if (saveTooltip) saveTooltip.style.display = 'none';
    }

    if (swapBtn) {
        swapBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Micro-animation: Pulse
            swapBtn.classList.remove('animate__animated', 'animate__pulse');
            void swapBtn.offsetWidth; // trigger reflow
            swapBtn.classList.add('animate__animated', 'animate__pulse');

            const temp = driverASelect.value;
            driverASelect.value = driverBSelect.value;
            driverBSelect.value = temp;
            renderComparison();
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            // Rate Limiting & Abuse Mitigation
            const now = Date.now();
            const lastSave = sessionStorage.getItem('f1_last_save_time');
            if (lastSave && (now - parseInt(lastSave, 10) < 5000)) {
                saveBtn.textContent = 'Too Fast';
                saveBtn.classList.add('animate__animated', 'animate__headShake');
                setTimeout(() => {
                    saveBtn.textContent = '⭐ Save Comparison';
                    saveBtn.classList.remove('animate__animated', 'animate__headShake');
                }, 2000);
                return;
            }
            sessionStorage.setItem('f1_last_save_time', now.toString());

            const valA = driverASelect.value;
            const valB = driverBSelect.value;
            const compareId = `${valA}_vs_${valB}_${Date.now()}`;

            saveBtn.textContent = 'Saving...';
            saveBtn.disabled = true;
            saveBtn.classList.remove('animate__animated', 'animate__rubberBand', 'animate__headShake');

            try {
                // Save locally
                const savedComparisons = JSON.parse(localStorage.getItem('f1_comparisons') || '[]');
                savedComparisons.push({
                    id: compareId,
                    driver1: valA,
                    driver2: valB,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('f1_comparisons', JSON.stringify(savedComparisons));

                saveBtn.textContent = '✅ Saved';
                saveBtn.classList.add('btn-success', 'animate__animated', 'animate__rubberBand');
            } catch (err) {
                console.error("Failed to save comparison locally", err);
                saveBtn.textContent = '❌ Error';
                saveBtn.classList.add('animate__animated', 'animate__headShake');
            } finally {
                setTimeout(() => {
                    if (saveBtn.textContent === '✅ Saved' || saveBtn.textContent === '❌ Error') {
                        saveBtn.disabled = false;
                        saveBtn.textContent = '⭐ Save Comparison'; // Reset UI state after cooldown
                        saveBtn.classList.remove('btn-success', 'animate__animated', 'animate__rubberBand', 'animate__headShake');
                    }
                }, 2000);
            }
        });
    }

    function generateMockRatings(drv) {
        // Generate deterministic mock ratings out of 100 based on driver pts
        const base = Math.min(drv.pts / 2, 99);
        return [
            Math.max(60, Math.min(99, base + (drv.wins * 2))), // Pace
            Math.max(60, Math.min(99, base + (drv.podiums * 1.5))), // Racecraft
            Math.max(60, Math.min(99, 90 - (drv.dnfs * 5))), // Consistency
            Math.max(60, Math.min(99, 70 + (drv.wins))), // Experience
            Math.max(60, Math.min(99, base + (drv.poles * 2))), // Quali
            Math.floor(Math.random() * 20 + 75) // Rain (randomized mock)
        ];
    }

    driverASelect.addEventListener('change', renderComparison);
    driverBSelect.addEventListener('change', renderComparison);

    // Initial Render
    renderComparison();
});
